import { useState, useContext } from "react";
import { Context } from "../../support/globalState";
import { doc, setDoc, collection, getFirestore } from "firebase/firestore";
import Input from "../Input";
import InputDate from "../InputDate";
import InputLabel from "../InputLabel";
import EditItemFooter from "./EditItemFooter";
import Button from "../Button";

const UpdateItem = (props) => {
  const ctx = useContext(Context);
  const { uid, set, notify, activeMonth } = ctx;
  const {
    id,
    date,
    note,
    value,
    setValue,
    setNote,
    setDate,
    setEditItem,
    method,
    setShowDetails,
  } = props;

  const [loading, setLoading] = useState(null);

  const updateData = async () => {
    // check for erors
    if (!date || !note || value <= 0) {
      if (value == 0) {
        ctx.notify("error", "Value cannot be 0");
      } else {
        ctx.notify("error", "Please fill all the fields");
      }
      return;
    }

    setLoading("Updating...");

    let tmpIncome = 0;
    let tmpExpense = 0;
    const tmpItems = [].concat(ctx?.data || []);

    // assign new values
    tmpItems.forEach((e) => {
      if (e.id == id) {
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

    // firebase reference
    const db = getFirestore();
    const dataRef = collection(db, `users/${uid}/data`);
    await setDoc(doc(dataRef, activeMonth), finalData)
      .then(() => {
        set("data", tmpItems);
        set("total", total);
        notify("success", "Item successfully updated");
        setShowDetails(null);
      })
      .catch((err) => {
        notify("error", err.message);
        setLoading(null);
      });
  };

  return (
    <>
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
          placeholder={`Notes for this ${method == 0 ? "Expense" : "Income"}`}
          additionalClasses="mb-4"
        />
      </section>

      <EditItemFooter>
        <Button
          onClick={() => setEditItem(false)}
          icon="close"
          text="Cancel"
          color="gray"
        />
        <Button
          onClick={() => updateData()}
          icon="save"
          text="Update"
          loading={loading}
        />
      </EditItemFooter>
    </>
  );
};

export default UpdateItem;
