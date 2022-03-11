import { useState, useContext } from "react";
import { Context } from "../../support/globalState";
import { doc, setDoc, getFirestore } from "firebase/firestore";
import Button from "../Button";
import Input from "../Input";

const Details = ({ data, setShowDetails }) => {
  const [editItem, setEditItem] = useState(false);
  const [value, setValue] = useState(data?.value);
  const [date, setDate] = useState(data?.date);
  const [note, setNote] = useState(data?.note);

  const ctx = useContext(Context);
  const IncomeExpenseList = ctx.profile.data || [];

  const deleteItem = async (id) => {
    const newList = IncomeExpenseList?.filter((item) => item.id !== id);
    let tmpIncome = 0;
    let tmpExpense = 0;
    newList.forEach((element) => {
      if (element.method == "expense") {
        tmpExpense += parseFloat(element.value);
      } else {
        tmpIncome += parseFloat(element.value);
      }
    });

    const tmpData = {
      ...ctx?.profile,
      total: {
        income: tmpIncome,
        expense: tmpExpense,
        balance: tmpIncome - tmpExpense,
      },
      data: newList,
    };

    const db = getFirestore();
    await setDoc(doc(db, "users", ctx?.uid), tmpData).then(() => {
      // add data to database
      ctx?.notify("success", "Item deleted successfully");
      setShowDetails(null);
    });
  };

  const updateData = async () => {
    let tmpIncome = 0;
    let tmpExpense = 0;

    for (const item of IncomeExpenseList) {
      if (item["id"] == data?.id) {
        item["value"] = value;
        item["date"] = date;
        item["note"] = note;
        break;
      }
    }

    IncomeExpenseList.forEach((element) => {
      if (element.method == "expense") {
        tmpExpense += parseFloat(element.value);
      } else {
        tmpIncome += parseFloat(element.value);
      }
    });

    const tmpData = {
      ...ctx?.profile,
      total: {
        income: tmpIncome,
        expense: tmpExpense,
        balance: tmpIncome - tmpExpense,
      },
      data: IncomeExpenseList,
    };

    const db = getFirestore();
    await setDoc(doc(db, "users", ctx?.uid), tmpData).then(() => {
      // add data to database
      ctx?.notify("success", "Item deleted successfully");
      setShowDetails(null);
    });
  };
  return (
    <>
      <div className="font-medium border-b border-gray-200 pb-2 mb-4 flex items-center space-x-2">
        <span className="material-icons-round">{data?.category?.icon}</span>
        <span className="text-2xl capitalize">
          {data?.category?.name ? data?.category?.name : data?.method}
        </span>
      </div>

      {!editItem && (
        <div className="text-lg grid gap-1">
          <div>
            Category:{" "}
            <span className="font-medium capitalize">{data?.method}</span>
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
        <section className="grid max-w-xs mb-16">
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
        <Button
          onClick={() => deleteItem(data.id)}
          icon="delete_outline"
          color="red"
          text="Delete"
        />

        {editItem ? (
          <Button onClick={() => updateData()} icon="save" text="Update" />
        ) : (
          <Button onClick={() => setEditItem(true)} icon="edit" text="Edit" />
        )}
      </div>
    </>
  );
};

export default Details;
