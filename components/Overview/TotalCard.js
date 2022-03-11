import Router from "next/router";
import { numberWithCommas } from "../../support/formatNumber";

const OverviewCard = ({ currency, link, data, name }) => {
  return (
    <div
      onClick={() => Router.push(link)}
      className="bg-white shadow-sm py-6 px-6 rounded-lg flex items-center  cursor-pointer"
    >
      <div>
        <div className="text-4xl font-medium">
          {currency ? currency : "$"}
          {numberWithCommas(data || 0)}
        </div>
        <div className="font-light">{name}</div>
      </div>
    </div>
  );
};

export default OverviewCard;
