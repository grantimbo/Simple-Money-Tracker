import Head from "next/head";
import { useState, useContext, useEffect } from "react";
import Router from "next/router";
import { doc, setDoc, getFirestore } from "firebase/firestore";
import Button from "./Button";
import Input from "./Input";
import PageTitle from "./PageTitle";
import { Context } from "../support/globalState";
import Title from "./Title";

const AddItem = ({ setAddItem }) => {
  const ctx = useContext(Context);
  const [catList, setCatList] = useState(null);
  const [method, setMethod] = useState(0);
  const [category, setCategory] = useState(null);
  const [categoryIcon, setCategoryIcon] = useState(null);
  const [value, setValue] = useState(0);
  const [note, setNote] = useState("");

  const currencySign = ctx?.profile?.account?.currency || "$";

  // create array of categories
  const ExpenseCategory = ctx?.profile?.category?.expense;
  const IncomeCategory = ctx?.profile?.category?.income;
  const IncomeExpenseList = ctx.profile.data || [];

  useEffect(() => {
    if (method === 0) {
      setCategory(ExpenseCategory?.[0]?.name);
      setCategoryIcon(ExpenseCategory?.[0]?.icon);
      setCatList(ExpenseCategory);
    } else {
      setCategory(IncomeCategory?.[0]?.name);
      setCategoryIcon(IncomeCategory?.[0]?.icon);
      setCatList(IncomeCategory);
    }
  }, [method]);

  const addData = async () => {
    if (!category || value <= 0) {
      ctx.notify("error", "Please fill all the fields");
      return;
    }

    IncomeExpenseList.push({
      id: Date.now(),
      category: {
        name: category,
        icon: categoryIcon,
      },
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
      setAddItem && setAddItem(false);
      ctx?.notify("success", "Item added successfully");
      Router.push("/dash");
    });
  };

  return (
    <>
      <Title title={method === 0 ? "Add Expense" : "Add Income"} />

      <PageTitle title={`Add ${method === 0 ? "Expense" : "Income"}`} />

      <div className="border-b-2 border-lime-400 flex space-x-1">
        <div
          onClick={() => setMethod(0)}
          className={`${
            method === 0
              ? "bg-lime-500 text-white"
              : "bg-lime-100 text-lime-700 border-lime-400 border-2"
          } px-4 py-1 border-b-0 rounded-t-xl cursor-pointer`}
        >
          Expense
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
        <div className="mt-6 grid ">
          <p className="text-gray-400 text-md mb-1">Amount</p>
          <Input
            color={`gray`}
            type={`number`}
            setValue={setValue}
            placeholder={`${currencySign}0.00`}
            additionalClasses="mb-5"
          />

          <p className="text-gray-400 text-md mb-1">Note</p>
          <Input
            color={`gray`}
            type={`text`}
            setValue={setNote}
            placeholder={`Say something about this ${
              method === 0 ? "expense" : "income"
            }`}
            additionalClasses="mb-4"
          />

          <p className="text-gray-400 text-md mb-1">Category</p>
          <div className="grid grid-cols-4 gap-2 mb-6">
            {catList?.map((cat) => {
              return (
                <div
                  onClick={() => setCategory(cat?.name)}
                  key={cat?.name}
                  className={`${
                    cat?.name === category
                      ? "bg-lime-200 border-lime-500 text-lime-600 "
                      : "bg-gray-50 text-gray-500"
                  }  border-2 rounded-full px-4 py-2 cursor-pointer flex items-center justify-center space-x-2`}
                >
                  {cat?.icon && (
                    <span className="material-icons-round">{cat?.icon}</span>
                  )}
                  <span>{cat?.name}</span>
                </div>
              );
            })}
          </div>

          <Button
            onClick={() => addData()}
            icon={`save`}
            text={`Save ${method === 0 ? "Expense" : "Income"}`}
          />
        </div>
      </div>
    </>
  );
};

export default AddItem;
