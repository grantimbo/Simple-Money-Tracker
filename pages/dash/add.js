import Head from "next/head";
import Link from "next/link";
import { useState, useContext, useEffect } from "react";
import Router from "next/router";
import DashLayout from "../../components/DashLayout";
import Header from "../../components/Header";
import { Context } from "../../support/globalState";
import { doc, setDoc, getFirestore } from "firebase/firestore";
import Button from "../../components/Button";
import Input from "../../components/Input";

export default function Home() {
  const ctx = useContext(Context);
  const [catList, setCatList] = useState(null);
  const [method, setMethod] = useState(0);
  const [category, setCategory] = useState(null);
  const [value, setValue] = useState(0);
  const [note, setNote] = useState("");

  // create array of categories
  const ExpenseCategory = ctx?.profile?.category?.expense;
  const IncomeCategory = ctx?.profile?.category?.income;
  const IncomeExpenseList = ctx.profile.data || [];

  useEffect(() => {
    if (method === 0) {
      setCategory(ExpenseCategory?.[0]?.name);
      setCatList(ExpenseCategory);
      console.log(ExpenseCategory?.[0]?.name);
    } else {
      setCategory(IncomeCategory?.[0]?.name);
      setCatList(IncomeCategory);
    }
  }, [method]);

  const addData = async () => {
    if (!category || value <= 0) {
      alert("Value must be greater than 0");
      return;
    }

    IncomeExpenseList.push({
      id: Date.now(),
      category: category,
      value: value,
      date: `${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`,
      note: note,
      method: method === 0 ? "expense" : "income",
    });

    const tmpData = {
      ...ctx?.profile,
      data: IncomeExpenseList,
    };

    // Add a new document in collection "cities"
    const db = getFirestore();
    await setDoc(doc(db, "users", ctx?.uid), tmpData).then(() => {
      // add data to database
      Router.push("/dash");
    });
  };

  return (
    <div className="">
      <Head>
        <title>Add {method === 0 ? "Expense" : "Income"}</title>
      </Head>

      <DashLayout>
        <Header />

        <main className="p-4">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-medium mb-8">{`Add ${
              method === 0 ? "Expense" : "Income"
            }`}</h1>

            <Link href="/dash">
              <a className="text-lg bg-lime-500 rounded-full px-4 py-2 text-white flex items-center space-x-2">
                <span className="material-icons-round">arrow_back</span>
                <span>Back</span>
              </a>
            </Link>
          </div>

          <div className="border-b-2 border-lime-400 flex space-x-1">
            <div
              onClick={() => setMethod(0)}
              className={`${
                method === 0
                  ? "bg-lime-500 text-white"
                  : "bg-lime-100 text-lime-700 border-lime-400 border-2"
              } px-4 py-1 border-b-0 rounded-t-xl cursor-pointer`}
            >
              Expenses
            </div>
            <div
              onClick={() => setMethod(1)}
              className={`${
                method === 1
                  ? "bg-lime-500 text-white"
                  : "bg-lime-100 text-lime-500 border-lime-400 border-2"
              } px-4 py-1 border-b-0 rounded-t-xl cursor-pointer`}
            >
              Income
            </div>
          </div>

          <div className="mt-6">
            <div className="grid grid-cols-3 gap-2">
              {catList?.map((cat) => {
                return (
                  <div
                    onClick={() => setCategory(cat?.name)}
                    key={cat?.name}
                    className={`${
                      cat?.name === category
                        ? "bg-lime-200 border-lime-500 text-lime-600 "
                        : "bg-gray-50"
                    }  border-2 rounded-lg p-2 cursor-pointer h-16 flex items-center justify-center space-x-2`}
                  >
                    {cat?.icon && (
                      <span className="material-icons-round">{cat?.icon}</span>
                    )}
                    <span>{cat?.name}</span>
                  </div>
                );
              })}
            </div>

            <div className="mt-10 grid gap-3">
              <Input type={`text`} setValue={setNote} placeholder="Note" />
              <Input type={`number`} setValue={setValue} placeholder="Amount" />

              <Button
                onClick={() => addData()}
                icon={`add_circle_outline`}
                text={`Add ${method === 0 ? "Expense" : "Income"}`}
              />
            </div>
          </div>
        </main>
      </DashLayout>
    </div>
  );
}
