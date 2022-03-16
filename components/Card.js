import { numberWithCommas } from "../support/formatNumber";
import { Context } from "../support/globalState";
import { useContext } from "react";

const Card = (props) => {
  const ctx = useContext(Context);
  const {
    profile: { currency },
  } = ctx;

  const { item } = props;
  const date = new Date(item.date);

  return (
    <div
      className="bg-white rounded-lg shadow-sm px-4 py-2 cursor-pointer fade-in"
      key={item?.id}
    >
      <div className="text-md border-b border-gray-100 pb-1 flex items-center justify-between text-gray-400">
        <span>
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
        <span>
          {`${item?.method == 0 ? "Expenses" : "Income"} : ${numberWithCommas(
            item?.value
          )}`}
        </span>
      </div>
      <div className="flex items-center justify-between py-2 pb-1 text-2xl font-medium">
        <span className="flex space-x-3 items-center ">
          <span className="material-icons-round">{item?.category?.icon}</span>
          <div>{item?.note}</div>
        </span>
        <div>
          {item?.method == 0 && "-"} {currency ? currency : "$"}
          {numberWithCommas(item?.value)}
        </div>
      </div>
    </div>
  );
};

export default Card;
