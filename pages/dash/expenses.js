import { useContext } from "react";
import { Context } from "../../support/globalState";
import DashLayout from "../../components/DashLayout";
import BackHomeLink from "../../components/BackHomeLink";
import PageTitle from "../../components/PageTitle";
import List from "../../components/List";
import Title from "../../components/Title";

export default function Expenses() {
  const ctx = useContext(Context);

  const expenseList = ctx?.profile?.data?.filter(
    (item) => item.method == "expense"
  );

  return (
    <>
      <Title title="Expense" />
      <DashLayout>
        <BackHomeLink />
        <PageTitle title={`Expense`} />
        <List data={expenseList} />
      </DashLayout>
    </>
  );
}
