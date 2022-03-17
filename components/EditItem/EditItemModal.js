import { useState, useContext } from "react";
import { Context } from "../../support/globalState";
import { doc, setDoc, collection, getFirestore } from "firebase/firestore";
import Button from "../Button";
import Input from "../Input";
import { numberWithCommas } from "../../support/formatNumber";
import InputDate from "../InputDate";
import InputLabel from "../InputLabel";

const Details = ({ data, setShowDetails }) => {
  const ctx = useContext(Context);
  const { uid, set, notify, monthData, profile } = ctx;

  // firebase reference
  const db = getFirestore();
  const dataRef = collection(db, `users/${uid}/data`);

  const [editItem, setEditItem] = useState(false);
  const [value, setValue] = useState(data?.value);
  const [date, setDate] = useState(new Date(data?.date));
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
    // check for erors
    if (!date || !note || value <= 0) {
      ctx.notify("error", "Please fill all the fields");
      return;
    }

    // assign new values
    tmpItems.forEach((e) => {
      if (e.id == data?.id) {
        e.value = value;
        e.date = new Date(date).getTime();
        e.note = note;

        e.method == 0
          ? (tmpExpense += parseFloat(value))
          : (tmpIncome += parseFloat(value));
      } else {
        e.method == 0
          ? (tmpExpense += parseFloat(e.value))
          : (tmpIncome += parseFloat(e.value));
      }
    });

    // sort date
    tmpItems.sort((a, b) => {
      return a.date - b.date;
    });

    // reverse sorted (new firstst)
    tmpItems.reverse();

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
        <span className="material-icons-round text-lg md:text-2xl">
          {data?.category?.icon && <>{data?.category?.icon}</>}
          {!data?.category?.name && (
            <>{data?.method == 0 ? "receipt" : "account_balance_wallet"}</>
          )}
        </span>

        <span className="text-xl font-medium md:text-3xl">
          {data?.category?.name && data?.category?.name}
          {!data?.category?.name && (
            <>{data?.method == 0 ? " Expense" : " Income"}</>
          )}
        </span>
      </div>

      {!editItem && (
        <div className="text-base grid gap-1 md:text-lg">
          <div>
            <span>{`Value: `}</span>
            <span className="font-medium">{`${
              ctx?.profile?.currency ? ctx?.profile?.currency : "$"
            }${numberWithCommas(data?.value || 0)}`}</span>
          </div>

          <div>
            <span>{`Note: `}</span>
            <span className="font-medium">{data?.note}</span>
          </div>

          <div>
            <span>{`Date: `}</span>
            <span className="font-medium">
              {date.toLocaleString("default", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
              {` — `}
              {date.toLocaleString("default", {
                hour: "numeric",
                hour12: true,
                minute: "numeric",
              })}
            </span>
          </div>

          <div>
            <span>{`Category: `}</span>
            <span className="font-medium capitalize">
              {data?.method == 0 ? "Expense" : "Income"}
            </span>
          </div>
        </div>
      )}

      {editItem && (
        <section className="grid">
          <InputLabel text="Value" />
          <Input
            type={`number`}
            color="gray"
            value={value}
            setValue={setValue}
            placeholder="Hudson Grant"
            additionalClasses="mb-4"
          />

          <InputLabel text="Date" />
          <InputDate
            color="gray"
            value={date}
            setValue={setDate}
            placeholder="Hudson Grant"
            additionalClasses="mb-4"
          />

          <InputLabel text="Note" />
          <Input
            type={`text`}
            color="gray"
            value={note}
            setValue={setNote}
            placeholder={`Notes for this ${
              data?.method === 0 ? "expense" : "income"
            }`}
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
