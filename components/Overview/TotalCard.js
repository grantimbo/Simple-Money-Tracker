import Router from "next/router";
import { numberWithCommas } from "../../support/formatNumber";

const OverviewCard = ({ currency, link, data, name }) => {
  const value = () => {
    return `${currency ? currency : "$"}${numberWithCommas(data || 0)}`;
  };

  const displayValue = () => {
    if (name == "Balance") {
      if (data < 0) {
        const d = numberWithCommas(data || 0);
        return `-${currency ? currency : "$"}${d.slice(1)}`;
      } else {
        return value();
      }
    } else {
      return value();
    }
  };

  return (
    <div
      onClick={() => Router.push(link)}
      className="bg-white shadow-sm p-2 rounded-lg flex items-center cursor-pointer md:p-6"
      title={`${name}: ${displayValue()}`}
    >
      <div className="w-full">
        <div className="text-xl font-medium md:text-4xl truncate">
          {displayValue()}
        </div>
        <div className="text-xs font-thin md:font-light md:text-base">
          {name}
        </div>
      </div>
    </div>
  );
};

export default OverviewCard;
