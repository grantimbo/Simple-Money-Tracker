const TabSelector = ({ method, setMethod }) => {
  return (
    <div className="border-b-2 border-lime-400 flex space-x-1">
      <div
        onClick={() => setMethod("expense")}
        className={`${
          method === "expense"
            ? "bg-lime-500 text-white"
            : "bg-lime-100 text-lime-700 border-lime-400 border-2"
        } px-4 py-1 border-b-0 rounded-t-xl cursor-pointer`}
      >
        Expense
      </div>
      <div
        onClick={() => setMethod("income")}
        className={`${
          method === "income"
            ? "bg-lime-500 text-white"
            : "bg-lime-100 text-lime-500 border-lime-400 border-2"
        } px-4 py-1 border-b-0 rounded-t-xl cursor-pointer`}
      >
        Income
      </div>
    </div>
  );
};

export default TabSelector;
