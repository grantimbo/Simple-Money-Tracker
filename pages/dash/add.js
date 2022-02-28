import Head from "next/head";
import Link from "next/link";
import { useState, useContext } from "react";
import Router from "next/router";
import DashLayout from "../../components/DashLayout";
import Header from "../../components/Header";
import { Context } from "../../support/globalState";
import { doc, setDoc, getFirestore } from "firebase/firestore";

// create array of categories
const ExpenseCategory = ["Food", "Transport", "Utilities", "Entertainment"];
const IncomeCategory = ["Food", "Transport", "Utilities", "Entertainment"];

export default function Home() {
  const ctx = useContext(Context);
  const [method, setMethod] = useState(0);
  const [category, setCategory] = useState("Food");
  const [value, setValue] = useState(0);
  const [note, setNote] = useState("");

  const addData = async () => {
    if (!category || value <= 0) {
      alert("Value must be greater than 0");
      return;
    }

    const IncomeExpenseList = ctx.profile.data;

    IncomeExpenseList.push({
      category: category,
      value: value,
      date: `${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`,
      note: note,
      method: method === 0 ? "expense" : "income",
    });

    const tmpData = {
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
          <div className="flex justify-between">
            <div>
              <button
                className="py-2 px-4 bg-green-600 rounded-md text-white mr-2"
                onClick={() => setMethod(0)}
              >
                Expense
              </button>
              <button
                className="py-2 px-4 bg-green-600 rounded-md text-white"
                onClick={() => setMethod(1)}
              >
                Income
              </button>
            </div>

            <Link href="/dash">{`< Back`}</Link>
          </div>

          {method === 0 && (
            <div className="mt-6">
              <div className="grid grid-cols-5 gap-2 ">
                {ExpenseCategory.map((cat) => {
                  return (
                    <div
                      onClick={() => setCategory(cat)}
                      key={cat}
                      className={`${
                        cat == category
                          ? "bg-green-500 border-green-600 text-white"
                          : "bg-gray-50"
                      }  border rounded-lg p-2 cursor-pointer h-16 flex items-center justify-center`}
                    >
                      {cat}
                    </div>
                  );
                })}
              </div>

              {method === 0 && category !== "" && (
                <div className="mt-10">
                  <textarea
                    onChange={(e) => setNote(e.target.value)}
                    className="border bg-gray-50"
                  />
                  <input
                    type={"number"}
                    onChange={(e) => setValue(e.target.value)}
                    className="bg-gray-50 border px-4 py-2 rounded-md"
                  />
                  <button
                    onClick={() => addData()}
                    className="bg-yellow-500 text-white px-4 py-2 rounded-full"
                  >
                    Add Expense
                  </button>
                </div>
              )}
            </div>
          )}

          {method === 1 && (
            <div>
              {IncomeCategory.map((cat) => {
                return (
                  <div onClick={() => setCategory(cat)} key={cat}>
                    {cat}
                  </div>
                );
              })}

              {method === 1 && category !== "" && (
                <div className="mt-10">
                  <textarea
                    onChange={(e) => setNote(e.target.value)}
                    className="border bg-gray-50"
                  />
                  <input
                    type={"number"}
                    onChange={(e) => setValue(e.target.value)}
                    className="bg-gray-50 border px-4 py-2 rounded-md"
                  />
                  <button
                    onClick={() => addData()}
                    className="bg-yellow-500 text-white px-4 py-2 rounded-full"
                  >
                    Add Income
                  </button>
                </div>
              )}
            </div>
          )}
        </main>
      </DashLayout>
    </div>
  );
}
