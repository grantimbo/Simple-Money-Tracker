import { useState, useContext } from "react";
import { Context } from "../../support/globalState";
import { doc, setDoc, collection, getFirestore } from "firebase/firestore";
import Button from "../Button";
import Input from "../Input";
import PageTitle from "../PageTitle";
import Title from "../Title";
import TabSelector from "./TabSelector";
import CategorySelector from "./CategorySelector";
import { generateID } from "../../support/generateID";
import InputLabel from "../InputLabel";

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
    const tmpItems = [].concat(ctx?.data || []);

    // add new data
    tmpItems.push({
      id: generateID(),
      category: category,
      value: value,
      date: Date.now(),
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

      <div className="mt-4 grid md:mt-6">
        <InputLabel text={`Amount`} />
        <Input
          color={`gray`}
          type={`number`}
          setValue={setValue}
          placeholder={`${profile?.account?.currency || "$"}0.00`}
          additionalClasses="mb-3 md:mb-6"
        />

        <InputLabel text={`Note`} />
        <Input
          color={`gray`}
          type={`text`}
          setValue={setNote}
          placeholder={`Notes for this ${method === 0 ? "expense" : "income"}`}
          additionalClasses="mb-3 md:mb-6"
        />

        <InputLabel text={`Category`} />
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
    </>
  );
};

export default AddItem;
