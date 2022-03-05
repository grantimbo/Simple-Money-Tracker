import Router from "next/router";
import { useContext, useEffect } from "react";
import { Context } from "../support/globalState";
import { doc, setDoc, getFirestore } from "firebase/firestore";
import { numberWithCommas } from "../support/formatNumber";

export default function Overview() {
  const ctx = useContext(Context);
  const {
    profile: {
      account: { currency },
      total,
    },
  } = ctx;

  useEffect(() => {
    let tmpIncome = 0;
    let tmpExpense = 0;
    const IncomeExpenseList = ctx.profile.data || [];
    IncomeExpenseList.forEach((element) => {
      if (element.method == "expense") {
        tmpExpense += parseFloat(element.value);
      } else {
        tmpIncome += parseFloat(element.value);
      }
    });

    const tmpData = {
      ...ctx?.profile,
      total: {
        income: tmpIncome,
        expense: tmpExpense,
        balance: tmpIncome - tmpExpense,
      },
    };

    const db = getFirestore();
    const updateData = async () => {
      await setDoc(doc(db, "users", ctx?.uid), tmpData);
    };
    updateData();
  }, []);

  return (
    <>
      <div className="w-full grid grid-cols-3 gap-5 mt-6">
        <div
          onClick={() => Router.push(`/dash/income`)}
          className="bg-gray-50 py-6 px-6 border rounded-lg flex items-center  cursor-pointer"
        >
          <div>
            <div className="text-4xl font-medium">{`${
              currency ? currency : "$"
            }${numberWithCommas(total?.income || 0)}`}</div>
            <div className=" font-light">Income</div>
          </div>
        </div>
        <div
          onClick={() => Router.push(`/dash/expenses`)}
          className="bg-gray-50 py-6 px-6 border rounded-lg flex items-center  cursor-pointer"
        >
          <div>
            <div className="text-4xl font-medium">{`${
              currency ? currency : "$"
            }${numberWithCommas(total?.expense || 0)}`}</div>
            <div className=" font-light">Expense</div>
          </div>
        </div>
        <div
          onClick={() => Router.push(`/dash/balance`)}
          className="bg-gray-50 py-6 px-6 border rounded-lg flex items-center  cursor-pointer"
        >
          <div>
            <div className="text-4xl font-medium">{`${
              currency ? currency : "$"
            }${numberWithCommas(total?.balance || 0)}`}</div>
            <div className=" font-light">Balance</div>
          </div>
        </div>
      </div>
    </>
  );
}
