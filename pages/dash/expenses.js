import { useContext } from "react";
import { Context } from "../../support/globalState";
import DashLayout from "../../components/DashLayout";
import BackHomeLink from "../../components/BackHomeLink";
import PageTitle from "../../components/PageTitle";
import List from "../../components/List";
import Title from "../../components/Title";
import TotalCard from "../../components/Overview/TotalCard";

export default function Expenses() {
  const ctx = useContext(Context);
  const {
    total,
    profile: { currency },
  } = ctx;

  const expenseList = ctx?.data?.filter((item) => item.method == 0);

  return (
    <>
      <Title title="Expense" />
      <DashLayout>
        <BackHomeLink />
        <PageTitle title={`Expense`} />
        <div className="mb-10">
          <TotalCard
            currency={currency}
            name="Expenses"
            link="/dash/expenses"
            data={total?.income}
          />
        </div>
        <List data={expenseList} />
      </DashLayout>
    </>
  );
}
