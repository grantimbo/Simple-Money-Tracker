import { useState, useContext } from "react";
import { Context } from "../../support/globalState";
import { doc, setDoc, collection, getFirestore } from "firebase/firestore";
import Button from "../Button";
import Input from "../Input";

const Details = ({ data, setShowDetails }) => {
  const ctx = useContext(Context);
  const { uid, set, notify, monthData, profile } = ctx;

  // firebase reference
  const db = getFirestore();
  const dataRef = collection(db, `users/${uid}/data`);

  const [editItem, setEditItem] = useState(false);
  const [value, setValue] = useState(data?.value);
  const [date, setDate] = useState(data?.date);
  const [note, setNote] = useState(data?.note);

  let tmpIncome = 0;
  let tmpExpense = 0;
  const tmpItems = [].concat(ctx?.data || []);

  const deleteItem = async (id) => {
    const newList = tmpItems.filter((item) => item.id !== id);

    // calculate new total
    newList.forEach((e) => {
      e.method == 0
        ? (tmpExpense += parseFloat(e.value))
        : (tmpIncome += parseFloat(e.value));
    });

    // calculate total
    const total = {
      income: tmpIncome,
      expense: tmpExpense,
      balance: tmpIncome - tmpExpense,
    };

    // final data
    const finalData = {
      data: newList,
      total: total,
    };

    await setDoc(doc(dataRef, monthData), finalData).then(() => {
      set("data", newList);
      set("total", total);
      notify("success", "Item deleted successfully");
      setShowDetails(null);
    });
  };

  const updateData = async () => {
    // set new values
    for (const item of tmpItems) {
      if (item["id"] == data?.id) {
        item["value"] = value;
        item["date"] = date;
        item["note"] = note;
        break;
      }
    }

    // calculate new total
    tmpItems.forEach((e) => {
      e.method == 0
        ? (tmpExpense += parseFloat(e.value))
        : (tmpIncome += parseFloat(e.value));
    });

    // calculate total
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

    await setDoc(doc(dataRef, monthData), finalData).then(() => {
      set("data", tmpItems);
      set("total", total);
      notify("success", "Item successfully updated");
      setShowDetails(null);
    });
  };

  return (
    <>
      <div className="font-medium border-b border-gray-200 pb-2 mb-4 flex items-center space-x-2">
        <span className="material-icons-round">
          {data?.category?.icon && <>{data?.category?.icon}</>}
          {!data?.category?.name && (
            <>{data?.method == 0 ? "receipt" : "account_balance_wallet"}</>
          )}
        </span>

        <span className="text-2xl capitalize">
          {data?.category?.name && data?.category?.name}
          {!data?.category?.name && (
            <>{data?.method == 0 ? " Expense" : " Income"}</>
          )}
        </span>
      </div>

      {!editItem && (
        <div className="text-lg grid gap-1">
          <div>
            Category:{" "}
            <span className="font-medium capitalize">
              {data?.method == 0 ? "Expense" : "Income"}
            </span>
          </div>
          <div>
            Value: <span className="font-medium">{data?.value}</span>
          </div>
          <div>
            Date: <span className="font-medium">{data?.date}</span>
          </div>
          <div>
            Note: <span className="font-medium">{data?.note}</span>
          </div>
        </div>
      )}

      {editItem && (
        <section className="grid">
          <p className="text-gray-400 text-md mb-1">Value</p>
          <Input
            type={`text`}
            color="gray"
            value={value}
            setValue={setValue}
            placeholder="Hudson Grant"
            additionalClasses="mb-4"
          />

          <p className="text-gray-400 text-md mb-1">Date</p>
          <Input
            type={`text`}
            color="gray"
            value={date}
            setValue={setDate}
            placeholder="Hudson Grant"
            additionalClasses="mb-4"
          />

          <p className="text-gray-400 text-md mb-1">Note</p>
          <Input
            type={`text`}
            color="gray"
            value={note}
            setValue={setNote}
            placeholder="Hudson Grant"
            additionalClasses="mb-4"
          />
        </section>
      )}

      <div className="border-t border-gray-200 py-2 pt-5 mt-4 flex space-x-2 justify-end">
        {editItem ? (
          <>
            <Button
              onClick={() => setEditItem(false)}
              icon="close"
              text="Cancel"
              color="gray"
            />
            <Button onClick={() => updateData()} icon="save" text="Update" />
          </>
        ) : (
          <>
            <Button
              onClick={() => deleteItem(data?.id)}
              icon="delete_outline"
              color="red"
              text="Delete"
            />
            <Button onClick={() => setEditItem(true)} icon="edit" text="Edit" />
          </>
        )}
      </div>
    </>
  );
};

export default Details;
