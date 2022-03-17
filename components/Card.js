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

  const displayValue = () => {
    return `${item?.method == 0 ? "-" : ""} ${
      currency ? currency : "$"
    }${numberWithCommas(item?.value)}`;
  };

  return (
    <div
      className="bg-white rounded-lg shadow-sm px-2 py-1 cursor-pointer fade-in md:px-4 md:py-2"
      key={item?.id}
    >
      <div className="text-xs border-b border-gray-100 pb-1 flex items-center justify-between text-gray-400 md:text-base">
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
      <div
        className="flex items-center justify-between py-1 pb-1 text-base font-medium md:py-2 md:text-2xl"
        title={`${displayValue()} | ${item?.note}`}
      >
        <span className="flex space-x-1 items-center md:space-x-3">
          <span className="material-icons-round text-sm md:text-base">
            {item?.category?.icon}
          </span>
          <div>{item?.note}</div>
        </span>
        <div>{displayValue()}</div>
      </div>
    </div>
  );
};

export default Card;
