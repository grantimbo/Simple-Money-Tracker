import BackHomeLink from "../../components/BackHomeLink";
import DashLayout from "../../components/DashLayout";
import Head from "next/head";
import PageTitle from "../../components/PageTitle";

export default function Balance() {
  return (
    <>
      <Head>
        <title>Balance | Simple Money Tracker</title>
      </Head>

      <DashLayout>
        <BackHomeLink />

        <PageTitle title={`Balance`} />
      </DashLayout>
    </>
  );
}
