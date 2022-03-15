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

  const [name, setName] = useState(data?.name);
  const [icon, setIcon] = useState(data?.icon);
  const [method, setMethod] = useState(data?.method);

  const deleteCategory = async () => {
    const tmpCategories = [].concat(ctx?.profile?.categories || []);

    const tmpData = {
      ...ctx?.profile,
      categories: tmpCategories.filter((e) => e?.id != data?.id),
    };

    const db = getFirestore();
    await setDoc(doc(db, "users", ctx?.uid), tmpData).then(() => {
      ctx?.notify("success", "Category successfully deleted");
      setEditCategoryModal(null);
    });
  };

  const updateCategory = async () => {
    const tmpCategories = [].concat(ctx?.profile?.categories || []);

    const tmpData = {
      ...ctx?.profile,
      categories: tmpCategories.map((e) => {
        if (e?.id == data?.id) {
          return {
            ...e,
            name: name,
            icon: icon,
            method: method,
          };
        }
        return e;
      }),
    };

    const db = getFirestore();
    await setDoc(doc(db, "users", ctx?.uid), tmpData).then(() => {
      ctx?.notify("success", "Category successfully updated");
      setEditCategoryModal(null);
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
              onClick={() => setMethod(0)}
              className={`${
                method === 0
                  ? "bg-lime-500 text-white"
                  : "bg-lime-100 text-lime-700 border-lime-400 border-2"
              } px-4 py-1 rounded-full cursor-pointer`}
            >
              Expense
            </div>
            <div
              onClick={() => setMethod(1)}
              className={`${
                method === 1
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

          <div className="flex items-center justify-end space-x-2">
            <Button
              onClick={() => deleteCategory()}
              text="Delete"
              color="red"
              icon="delete"
            />

            <Button
              onClick={() => updateCategory()}
              text="Update"
              icon="save"
            />
          </div>
        </div>
      </div>
    </main>
  );
}
