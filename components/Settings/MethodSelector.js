const MethodSelector = ({ method, setMethod }) => {
  return (
    <div className="flex space-x-2 mb-4">
      <div
        onClick={() => setMethod(0)}
        className={`${
          method === 0
            ? "bg-lime-500 text-white"
            : "bg-lime-100 text-lime-500 border-lime-400 border-2"
        } px-4 py-1 rounded-full cursor-pointer`}
      >
        Expense
      </div>
      <div
        onClick={() => setMethod(1)}
        className={`${
          method === 1
            ? "bg-lime-500 text-white"
            : "bg-lime-100 text-lime-500 border-lime-400 border-2"
        } px-4 py-1 rounded-full cursor-pointer`}
      >
        Income
      </div>
    </div>
  );
};

export default MethodSelector;
