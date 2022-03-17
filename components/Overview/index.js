import { useContext } from "react";
import { Context } from "../../support/globalState";
import TotalCard from "./TotalCard";

export default function Overview() {
  const ctx = useContext(Context);
  const {
    total,
    profile: { currency },
  } = ctx;

  return (
    <div className="w-full grid grid-cols-3 gap-2 mt-4 md:mt-6 md:gap-5">
      <TotalCard
        currency={currency}
        name="Expenses"
        link="/dash/expenses"
        data={total?.expense}
      />

      <TotalCard
        currency={currency}
        name="Income"
        link="/dash/income"
        data={total?.income}
      />

      <TotalCard
        currency={currency}
        name="Balance"
        link="/dash/balance"
        data={total?.balance}
      />
    </div>
  );
}
