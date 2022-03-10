import BackHomeLink from "../../components/BackHomeLink";
import DashLayout from "../../components/DashLayout";
import PageTitle from "../../components/PageTitle";
import Title from "../../components/Title";

export default function Balance() {
  return (
    <>
      <Title title="Balance" />
      <DashLayout>
        <BackHomeLink />
        <PageTitle title={`Balance`} />
      </DashLayout>
    </>
  );
}
