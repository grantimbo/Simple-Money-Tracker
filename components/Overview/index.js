import { useContext } from "react";
import { Context } from "../../support/globalState";
import TotalCard from "./TotalCard";

export default function Overview() {
  const ctx = useContext(Context);
  const {
    profile: {
      account: { currency },
      total,
    },
  } = ctx;

  return (
    <div className="w-full grid grid-cols-3 gap-5 mt-6">
      <TotalCard
        currency={currency}
        name="Income"
        link="/dash/income"
        data={total?.income}
      />

      <TotalCard
        currency={currency}
        name="Expenses"
        link="/dash/expenses"
        data={total?.expense}
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
