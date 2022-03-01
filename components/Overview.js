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
          className="bg-gray-50 border rounded-lg p-10 cursor-pointer"
        >
          <div className="text-3xl">{total?.income || 0}</div>
          <div className="text-xs">Income</div>
        </div>
        <div
          onClick={() => Router.push(`/dash/expenses`)}
          className="bg-gray-50 border rounded-lg p-10 cursor-pointer"
        >
          <div className="text-3xl">{total?.expense || 0}</div>
          <div className="text-xs">Expense</div>
        </div>
        <div className="bg-gray-50 border rounded-lg p-10">
          <div className="text-3xl">{total?.balance || 0}</div>
          <div className="text-xs">Balance</div>
        </div>
      </div>
    </>
  );
}
