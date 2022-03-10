import { useContext } from "react";
import { Context } from "../../support/globalState";
import DashLayout from "../../components/DashLayout";
import BackHomeLink from "../../components/BackHomeLink";
import PageTitle from "../../components/PageTitle";
import List from "../../components/List";
import Title from "../../components/Title";

export default function Income() {
  const ctx = useContext(Context);

  const incomeList = ctx?.profile?.data?.filter(
    (item) => item.method == "income"
  );

  return (
    <>
      <Title title="Income" />
      <DashLayout>
        <BackHomeLink />
        <PageTitle title={`Income`} />
        <List data={incomeList} />
      </DashLayout>
    </>
  );
}
