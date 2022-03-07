import { numberWithCommas } from "../support/formatNumber";
import { Context } from "../support/globalState";
import { useContext } from "react";

const Card = (props) => {
  const ctx = useContext(Context);
  const {
    profile: {
      account: { currency },
    },
  } = ctx;

  const { item } = props;
  return (
    <div
      className="bg-gray-50 border rounded-lg px-4 py-2 cursor-pointer fade-in"
      key={item?.id}
    >
      <div className="text-md border-b pb-1 flex items-center justify-between text-gray-400">
        <span>{item?.date}</span>
        <span>
          {`${
            item?.method === "expense" ? "Expenses" : "Income"
          } : ${numberWithCommas(item?.value)}`}
        </span>
      </div>
      <div className="flex items-center justify-between py-2 pb-1 text-2xl font-medium">
        <span className="flex space-x-3 items-center ">
          <span className="material-icons-round">{item?.category?.icon}</span>
          <div>{item?.note}</div>
        </span>
        <div>
          {item?.method === "expense" && "-"} {currency ? currency : "$"}
          {numberWithCommas(item?.value)}
        </div>
      </div>
    </div>
  );
};

export default Card;
