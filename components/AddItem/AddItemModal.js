import { useState, useContext } from "react";
import { Context } from "../../support/globalState";
import { doc, setDoc, collection, getFirestore } from "firebase/firestore";
import Button from "../Button";
import Input from "../Input";
import PageTitle from "../PageTitle";
import Title from "../Title";
import TabSelector from "./TabSelector";
import CategorySelector from "./CategorySelector";

const AddItem = ({ setAddItem }) => {
  const ctx = useContext(Context);
  const { uid, set, notify, monthData, profile } = ctx;

  const [method, setMethod] = useState(0);
  const [category, setCategory] = useState(null);
  const [value, setValue] = useState(0);
  const [note, setNote] = useState("");

  const saveItem = async () => {
    // check for erors
    if (!category || value <= 0) {
      ctx.notify("error", "Please fill all the fields");
      return;
    }

    let tmpIncome = 0;
    let tmpExpense = 0;
    const tmpItems = [].concat(ctx?.data) || [];

    // add new data
    tmpItems.push({
      id: `${Date.now()}`,
      category: {
        name: category?.name,
        icon: category?.icon,
      },
      value: value,
      date: `${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`,
      note: note,
      method: method,
    });

    // calculate total
    tmpItems.forEach((e) => {
      e.method == 0
        ? (tmpExpense += parseFloat(e.value))
        : (tmpIncome += parseFloat(e.value));
    });

    const total = {
      income: tmpIncome,
      expense: tmpExpense,
      balance: tmpIncome - tmpExpense,
    };

    // final data
    const finalData = {
      data: tmpItems,
      total: total,
    };

    // save to firebase
    const db = getFirestore();
    const dataRef = collection(db, `users/${uid}/data`);
    await setDoc(doc(dataRef, monthData), finalData).then(() => {
      set("data", tmpItems);
      set("total", total);
      notify("success", "Item added successfully");
      setAddItem(false);
    });
  };

  return (
    <>
      <Title title={method === 0 ? "Add Expense" : "Add Income"} />
      <PageTitle title={method === 0 ? "Add Expense" : "Add Income"} />
      <TabSelector method={method} setMethod={setMethod} />

      <div className="mt-6">
        <div className="mt-6 grid ">
          <p className="text-gray-400 text-md mb-1">Amount</p>
          <Input
            color={`gray`}
            type={`number`}
            setValue={setValue}
            placeholder={`${profile?.account?.currency || "$"}0.00`}
            additionalClasses="mb-5"
          />

          <p className="text-gray-400 text-md mb-1">Note</p>
          <Input
            color={`gray`}
            type={`text`}
            setValue={setNote}
            placeholder={`Notes for this ${
              method === 0 ? "expense" : "income"
            }`}
            additionalClasses="mb-4"
          />

          <p className="text-gray-400 text-md mb-1">Category</p>
          <CategorySelector
            method={method}
            category={category}
            setCategory={setCategory}
          />

          <Button
            onClick={() => saveItem()}
            icon={`save`}
            text={method === 0 ? "Save Expense" : "Save Income"}
          />
        </div>
      </div>
    </>
  );
};

export default AddItem;
