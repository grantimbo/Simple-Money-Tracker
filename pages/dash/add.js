import Head from "next/head";
import Link from "next/link";
import { useState, useContext, useEffect } from "react";
import Router from "next/router";
import DashLayout from "../../components/DashLayout";
import Header from "../../components/Header";
import { Context } from "../../support/globalState";
import { doc, setDoc, getFirestore } from "firebase/firestore";

export default function Home() {
  const ctx = useContext(Context);
  const [catList, setCatList] = useState(null);
  const [method, setMethod] = useState(0);
  const [category, setCategory] = useState("");
  const [value, setValue] = useState(0);
  const [note, setNote] = useState("");

  // create array of categories
  const ExpenseCategory = ctx?.profile?.category?.expense;
  const IncomeCategory = ctx?.profile?.category?.income;
  const IncomeExpenseList = ctx.profile.data || [];

  useEffect(() => {
    if (method === 0) {
      setCatList(ExpenseCategory);
      setCategory(ExpenseCategory?.[0]?.name);
    } else {
      setCatList(IncomeCategory);
      setCategory(IncomeCategory?.[0]?.name);
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
          <div className="flex justify-between items-center">
            <div>
              <button
                className={`${
                  method === 0
                    ? " bg-orange-500"
                    : "bg-gray-100 text-gray-500 border"
                } py-2 px-4  rounded-md text-white mr-2`}
                onClick={() => setMethod(0)}
              >
                Expense
              </button>
              <button
                className={`${
                  method === 1
                    ? " bg-orange-500"
                    : "bg-gray-100 text-gray-500 border"
                } py-2 px-4  rounded-md text-white`}
                onClick={() => setMethod(1)}
              >
                Income
              </button>
            </div>

            <Link href="/dash">
              <a className="text-lg bg-blue-500 rounded-full px-4 py-2 text-white flex items-center space-x-2">
                <span className="material-icons-round">arrow_back</span>
                <span>Back</span>
              </a>
            </Link>
          </div>

          <div className="mt-6">
            <div className="grid grid-cols-3 gap-2">
              {catList?.map((cat) => {
                return (
                  <div
                    onClick={() => setCategory(cat)}
                    key={cat?.name}
                    className={`${
                      cat?.name == category?.name
                        ? "bg-orange-200 border-orange-500 text-orange-500"
                        : "bg-gray-50"
                    }  border rounded-lg p-2 cursor-pointer h-16 flex items-center justify-center space-x-2`}
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
              <textarea
                onChange={(e) => setNote(e.target.value)}
                className="border bg-gray-50 px-4 py-2 focus:outline-orange-500"
                placeholder="Note"
              />
              <input
                type={"number"}
                onChange={(e) => setValue(e.target.value)}
                className="bg-gray-50 border px-4 py-2 rounded-md focus:outline-orange-500"
                placeholder="Value"
              />
              <button
                onClick={() => addData()}
                className="bg-orange-500 text-white px-4 py-2 rounded-full"
              >
                Add Expense
              </button>
            </div>
          </div>
        </main>
      </DashLayout>
    </div>
  );
}
