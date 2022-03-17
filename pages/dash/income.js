import { useContext } from "react";
import { Context } from "../../support/globalState";
import DashLayout from "../../components/DashLayout";
import BackHomeLink from "../../components/BackHomeLink";
import PageTitle from "../../components/PageTitle";
import List from "../../components/List";
import Title from "../../components/Title";
import TotalCard from "../../components/Overview/TotalCard";

export default function Income() {
  const ctx = useContext(Context);
  const {
    total,
    profile: { currency },
  } = ctx;

  const incomeList = ctx?.data?.filter((item) => item.method == 1);

  return (
    <>
      <Title title="Income" />
      <DashLayout>
        <BackHomeLink />
        <PageTitle title={`Income`} />
        <div className="mb-4">
          <TotalCard
            currency={currency}
            name="Expenses"
            link="/dash/expenses"
            data={total?.income}
          />
        </div>
        <List data={incomeList} />
      </DashLayout>
    </>
  );
}
