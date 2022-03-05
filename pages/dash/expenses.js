import Head from "next/head";
import Link from "next/link";
import DashLayout from "../../components/DashLayout";
import { Context } from "../../support/globalState";
import { useState, useContext, useEffect } from "react";
import Card from "../../components/Card";
import Details from "../../components/Details";
import BackHomeLink from "../../components/BackHomeLink";
import PageTitle from "../../components/PageTitle";

export default function Expenses() {
  const ctx = useContext(Context);
  const [showDetails, setShowDetails] = useState(null);

  const expenseList = ctx?.profile?.data?.filter(
    (item) => item.method == "expense"
  );

  return (
    <div className="">
      <Head>
        <title>Expenses | Simple Money Tracker</title>
      </Head>

      <DashLayout>
        <BackHomeLink />

        <PageTitle title={`Expenses`} />

        <div className="grid gap-3">
          {expenseList?.map((e) => {
            return (
              <div key={e?.id} onClick={() => setShowDetails(e)}>
                <Card item={e} />
              </div>
            );
          })}

          {(expenseList?.length === 0 || !expenseList) && <div>No data</div>}
        </div>
      </DashLayout>

      {showDetails && (
        <Details data={showDetails} setShowDetails={setShowDetails} />
      )}
    </div>
  );
}
