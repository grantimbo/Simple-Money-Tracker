const Card = (props) => {
  const { item } = props;
  return (
    <div
      className="bg-gray-50 border rounded-lg px-4 py-2 cursor-pointer"
      key={item?.id}
    >
      <div className="text-xs border-b pb-1 flex items-center justify-between">
        <span>{item?.date}</span>
        <span>
          {`${item?.method === "expense" ? "Expenses" : "Income"} : ${
            item?.value
          }`}
        </span>
      </div>
      <div className="flex items-center justify-between py-2 pb-1">
        <span className="flex space-x-3 items-center">
          <span className="material-icons-round">{item?.category?.icon}</span>
          <div>{item?.note}</div>
        </span>
        <div>
          {item?.method === "expense" && "-"} {item?.value}
        </div>
      </div>
    </div>
  );
};

export default Card;
