import { useContext } from "react";
import { Context } from "../support/globalState";
import { doc, setDoc, getFirestore } from "firebase/firestore";
import Button from "./Button";

const Details = ({ data, setShowDetails }) => {
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

  return (
    <>
      <div className="font-medium border-b border-gray-200 pb-2 mb-4 flex items-center space-x-2">
        <span className="material-icons-round">{data?.category?.icon}</span>
        <span className="text-2xl capitalize">
          {data?.category?.name ? data?.category?.name : data?.method}
        </span>
      </div>

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

      <div className="border-t border-gray-200 py-2 pt-5 mt-4 flex space-x-2 justify-end">
        <Button
          onClick={() => deleteItem(data.id)}
          icon="delete_outline"
          color="red"
          text="Delete"
        />

        <Button onClick={() => alert("test")} icon="edit" text="Edit" />
      </div>
    </>
  );
};

export default Details;
