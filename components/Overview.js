import Router from "next/router";
import { useContext, useEffect } from "react";
import { Context } from "../support/globalState";
import { doc, setDoc, getFirestore } from "firebase/firestore";

export default function Overview() {
  const ctx = useContext(Context);
  const {
    profile: { total },
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
      await setDoc(doc(db, "users", ctx?.uid), tmpData).then(() => {
        // add data to database
        console.log("Successfully updated data");
      });
    };
    updateData();
  }, []);

  return (
    <>
      <div className="w-full grid grid-cols-3 gap-5">
        <div
          onClick={() => Router.push(`/dash/income`)}
          className="bg-gray-50 py-10 border rounded-lg flex items-center justify-center cursor-pointer"
        >
          <div>
            <div className="text-4xl font-medium">{total?.income || 0}</div>
            <div className=" font-light">Income</div>
          </div>
        </div>
        <div
          onClick={() => Router.push(`/dash/expenses`)}
          className="bg-gray-50 py-8 border rounded-lg flex items-center justify-center cursor-pointer"
        >
          <div>
            <div className="text-4xl font-medium">{total?.expense || 0}</div>
            <div className=" font-light">Expense</div>
          </div>
        </div>
        <div className="bg-gray-50 py-8 border rounded-lg flex items-center justify-center">
          <div>
            <div className="text-4xl font-medium">{total?.balance || 0}</div>
            <div className=" font-light">Balance</div>
          </div>
        </div>
      </div>
    </>
  );
}
