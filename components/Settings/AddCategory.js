import { useState, useContext, useEffect } from "react";
import { Context } from "../../support/globalState";
import { doc, setDoc, getFirestore } from "firebase/firestore";
import Button from "../Button";
import { categoryIcons } from "../../support/categoryIcons";
import Input from "../Input";
import { generateID } from "../../support/generateID";

export default function AddCategory({ setAddCategoryModal }) {
  const ctx = useContext(Context);

  const [loading, setLoading] = useState(null);
  const [method, setMethod] = useState(null);
  const [name, setName] = useState(null);
  const [icon, setIcon] = useState(null);

  const saveCategory = async () => {
    //check for erors
    if (!name || !icon || method === null) {
      ctx?.notify("error", "Please fill the empty fields");
      return;
    }

    setLoading("Saving...");

    //  check for duplicates
    const tmpCategories = [].concat(ctx?.profile?.categories || []);
    if (tmpCategories?.find((e) => e?.name === name)) {
      ctx?.notify("error", "Category already exist");
      return;
    }

    // push new items
    tmpCategories.push({
      id: generateID(),
      name: name,
      icon: icon,
      method: method,
    });

    // update profile
    const tmpData = {
      ...ctx?.profile,
      categories: tmpCategories,
    };

    const db = getFirestore();
    await setDoc(doc(db, "users", ctx?.uid), tmpData)
      .then(() => {
        ctx?.notify("success", "Category successfully added");
        setAddCategoryModal(false);
      })
      .catch(() => {
        ctx?.notify("error", "Error adding category");
        setLoading(null);
      });
  };

  return (
    <main className="">
      <div className="mt-6">
        <div className="grid">
          <p className="text-gray-400 text-base mb-1">Name</p>
          <Input
            type={"text"}
            color="gray"
            setValue={setName}
            className="bg-gray-50 border px-4 py-2 rounded-md focus:outline-orange-500"
            placeholder="Name"
            additionalClasses="mb-4"
          />

          <p className="text-gray-400 text-base mb-1">Category</p>
          <div className="flex space-x-2 mb-4">
            <div
              onClick={() => setMethod(0)}
              className={`${
                method === 0
                  ? "bg-lime-500 text-white"
                  : "bg-lime-100 text-lime-500 border-lime-400 border-2"
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

          <p className="text-gray-400 text-base mb-1">Icon</p>
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
            onClick={() => saveCategory()}
            text="Save Category"
            icon="save"
            loading={loading}
          ></Button>
        </div>
      </div>
    </main>
  );
}
