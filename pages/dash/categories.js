import Head from "next/head";
import Link from "next/link";
import { useState, useContext, useEffect } from "react";
import Router from "next/router";
import DashLayout from "../../components/DashLayout";
import Header from "../../components/Header";
import { Context } from "../../support/globalState";
import { doc, setDoc, getFirestore } from "firebase/firestore";
import Button from "../../components/Button";

export default function Categories() {
  const ctx = useContext(Context);
  const [catList, setCatList] = useState(null);
  const [method, setMethod] = useState(0);
  const [name, setName] = useState(0);
  const [icon, setIcon] = useState("");

  // create array of categories
  const ExpenseCategory = ctx?.profile?.category?.expense;
  const IncomeCategory = ctx?.profile?.category?.income;

  useEffect(() => {
    if (method === 0) {
      setCatList(ExpenseCategory);
    } else {
      setCatList(IncomeCategory);
    }
  }, [method]);

  const addCategory = async () => {
    if (!icon || !name) {
      alert("Icon and Name fields must not be empty");
      return;
    }

    let tmpData = null;

    if (method === 0) {
      const ExpenseCategory = ctx?.profile?.category?.expense || [];

      ExpenseCategory.push({
        name: name,
        icon: icon,
      });

      tmpData = {
        category: {
          expense: ExpenseCategory,
          income: ctx?.profile?.category?.income || [],
        },
        ...ctx?.profile,
      };
    } else {
      const IncomeCategory = ctx?.profile?.category?.income || [];

      IncomeCategory.push({
        name: name,
        icon: icon,
      });

      tmpData = {
        category: {
          expense: ctx?.profile?.category?.expense || [],
          income: IncomeCategory,
        },
        ...ctx?.profile,
      };
    }

    // Add a new document in collection
    const db = getFirestore();
    await setDoc(doc(db, "users", ctx?.uid), tmpData);
  };

  return (
    <div className="">
      <Head>
        <title>Categories | Simple Money Tracker</title>
      </Head>

      <Header />

      <main className="p-4">
        <div className="flex justify-between">
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
            <a className="text-lg bg-lime-500 rounded-full px-4 py-2 text-white flex items-center space-x-2">
              <span className="material-icons-round">arrow_back</span>
              <span>Back</span>
            </a>
          </Link>
        </div>

        <div className="mt-6">
          <div className="grid grid-cols-3 gap-2 mb-10">
            {catList?.map((cat) => {
              return (
                <div
                  key={cat?.name}
                  className={`bg-gray-50 border rounded-lg p-2  h-16 flex items-center justify-center space-x-2 text-gray-600`}
                >
                  {cat?.icon && (
                    <span className="material-icons-round text-gray-500">
                      {cat?.icon}
                    </span>
                  )}
                  <span>{cat?.name}</span>
                </div>
              );
            })}
          </div>

          <div className="grid gap-3">
            <input
              type={"text"}
              onChange={(e) => setName(e.target.value)}
              className="bg-gray-50 border px-4 py-2 rounded-md focus:outline-orange-500"
              placeholder="Name"
            />
            <input
              type={"text"}
              onChange={(e) => setIcon(e.target.value)}
              className="bg-gray-50 border px-4 py-2 rounded-md focus:outline-orange-500"
              placeholder="Icon"
            />

            <button
              onClick={() => addCategory()}
              className="bg-orange-500 text-white px-4 py-2 rounded-lg"
            >
              Save Category
            </button>
          </div>
        </div>
      </main>
      {/* </DashLayout> */}
    </div>
  );
}
