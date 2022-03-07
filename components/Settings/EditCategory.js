import Head from "next/head";
import Link from "next/link";
import { useState, useContext, useEffect } from "react";
import Router from "next/router";
import DashLayout from "../DashLayout";
import Header from "../Header";
import { Context } from "../../support/globalState";
import { doc, setDoc, getFirestore } from "firebase/firestore";
import Button from "../Button";

import { categoryIcons } from "../../support/categoryIcons";
import Input from "../Input";

export default function EditCategory({ data, setEditCategoryModal }) {
  const ctx = useContext(Context);

  console.log(data?.name);

  const [name, setName] = useState(data?.name);
  const [icon, setIcon] = useState(data?.category);
  const [category, setCategory] = useState(data?.category);

  const addCategory = async () => {
    if (!icon || !name || !category) {
      ctx?.notify("error", "Please fill the empty fields");
      return;
    }

    let tmpData = null;

    if (category === "expense") {
      const ExpenseCategory = ctx?.profile?.category?.expense;

      // const tae = ExpenseCategory.find((e) => e.id == id)

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
    await setDoc(doc(db, "users", ctx?.uid), tmpData).then(() => {
      ctx?.notify("success", "Category successfully added");
      setEditCategoryModal(false);
    });
  };

  return (
    <main className="">
      <div className="mt-6">
        <div className="grid">
          <p className="text-gray-400 text-md mb-1">Name</p>
          <Input
            type={"text"}
            color="gray"
            value={name}
            setValue={setName}
            className="bg-gray-50 border px-4 py-2 rounded-md focus:outline-orange-500"
            placeholder="Name"
            additionalClasses="mb-4"
          />
          <p className="text-gray-400 text-md mb-1">Category</p>
          <div className="flex space-x-2 mb-4">
            <div
              onClick={() => setCategory("expense")}
              className={`${
                category === "expense"
                  ? "bg-lime-500 text-white"
                  : "bg-lime-100 text-lime-700 border-lime-400 border-2"
              } px-4 py-1 rounded-full cursor-pointer`}
            >
              Expense
            </div>
            <div
              onClick={() => setCategory("income")}
              className={`${
                category === "income"
                  ? "bg-lime-500 text-white"
                  : "bg-lime-100 text-lime-500 border-lime-400 border-2"
              } px-4 py-1 rounded-full cursor-pointer`}
            >
              Income
            </div>
          </div>
          <p className="text-gray-400 text-md mb-1">Icon</p>
          <div className="max-h-72 overflow-y-auto  mb-6">
            <div className="grid gap-1 grid-cols-6">
              {categoryIcons?.map((e) => (
                <div
                  key={e}
                  onClick={(e) => setIcon(e?.target?.dataset?.value)}
                  data-value={e}
                  className={`${
                    icon == e
                      ? "bg-lime-500 text-lime-100 border-lime-400 "
                      : "bg-gray-100 text-gray-400"
                  } flex items-center justify-center border px-4 py-2 rounded-md cursor-pointer`}
                >
                  <span className="material-icons-round " data-value={e}>
                    {e}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <Button
            onClick={() => addCategory()}
            text="Save Category"
            icon="save"
          ></Button>
        </div>
      </div>
    </main>
  );
}
