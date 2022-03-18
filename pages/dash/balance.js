import { useContext } from "react";
import { Context } from "../../support/globalState";
import BackHomeLink from "../../components/BackHomeLink";
import DashLayout from "../../components/DashLayout";
import PageTitle from "../../components/PageTitle";
import Title from "../../components/Title";
import TotalCard from "../../components/Overview/TotalCard";

export default function Balance() {
  const ctx = useContext(Context);
  const {
    total,
    profile: { currency },
  } = ctx;

  return (
    <>
      <Title title="Balance" />
      <DashLayout>
        <BackHomeLink />
        <PageTitle title={`Balance`} />
        <div className="mb-10">
          <TotalCard
            currency={currency}
            name="Balance"
            link="/dash/expenses"
            data={total?.balance}
          />
        </div>
      </DashLayout>
    </>
  );
}
