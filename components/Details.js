import { useContext } from "react";
import { Context } from "../support/globalState";
import { doc, setDoc, getFirestore } from "firebase/firestore";

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
      setShowDetails(null);
    });
  };

  return (
    <div className="fixed top-0 left-0 bottom-0 right-0 p-10">
      <div className="bg-gray-50 border rounded-lg p-4 max-w-screen-md w-full mx-auto mt-20 relative z-10">
        <div
          onClick={() => setShowDetails(null)}
          className="absolute right-6 top-4 bg-gray-100 rounded-md px-2 text-gray-500 border cursor-pointer"
        >
          Close
        </div>
        <div className="font-medium border-b pb-2 mb-4">
          <span className="material-icons-round">{data?.category?.icon}</span>
          <span className="text-2xl">{data?.category?.name}</span>
        </div>
        <div>Category: {data?.method}</div>
        <div>Value: {data?.value}</div>
        <div>Date: {data?.date}</div>
        <div>Note: {data?.note}</div>

        <div className="border-t py-2 pt-2 flex space-x-2 justify-end">
          <button
            onClick={() => alert("Edit work in progress")}
            className=" bg-orange-500 rounded-lg px-4 py-2 text-white flex items-center space-x-2"
          >
            <span className="material-icons-round">edit</span>
            <span>Edit</span>
          </button>
          <button
            onClick={() => deleteItem(data.id)}
            className=" bg-red-500 rounded-lg px-4 py-2 text-white flex items-center space-x-2"
          >
            <span className="material-icons-round">delete_outline</span>
            <span>Delete</span>
          </button>
        </div>
      </div>

      <div
        onClick={() => setShowDetails(null)}
        className="absolute top-0 left-0 bottom-0 right-0 bg-black bg-opacity-30"
      ></div>
    </div>
  );
};

export default Details;
