import { useState, useContext } from "react";
import { Context } from "../../support/globalState";
import { doc, setDoc, collection, getFirestore } from "firebase/firestore";
import Button from "../Button";

const DeleteItem = ({ id, setShowDetails }) => {
  const ctx = useContext(Context);
  const { uid, set, data, notify, activeMonth } = ctx;

  const [loading, setLoading] = useState(null);

  const removeItem = async () => {
    setLoading("Deleting...");
    let tmpIncome = 0;
    let tmpExpense = 0;
    const tmpItems = [].concat(data || []);
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

    // firebase reference
    const db = getFirestore();
    const dataRef = collection(db, `users/${uid}/data`);
    await setDoc(doc(dataRef, activeMonth), finalData)
      .then(() => {
        set("data", newList);
        set("total", total);
        notify("success", "Item deleted successfully");
        setShowDetails(null);
      })
      .catch((err) => {
        notify("error", err.message);
        setLoading(null);
      });
  };

  return (
    <>
      <Button
        onClick={() => removeItem()}
        icon="delete_outline"
        color="red"
        text="Delete"
        loading={loading}
      />
    </>
  );
};

export default DeleteItem;
