import Head from "next/head";
import Link from "next/link";
import DashLayout from "../../components/DashLayout";
import Header from "../../components/Header";
import { Context } from "../../support/globalState";
import { useState, useContext, useEffect } from "react";
import Card from "../../components/Card";
import Details from "../../components/Details";

export default function Income() {
  const ctx = useContext(Context);
  const [showDetails, setShowDetails] = useState(null);

  const incomeList = ctx?.profile?.data?.filter(
    (item) => item.method == "income"
  );

  return (
    <div className="">
      <Head>
        <title>Income</title>
      </Head>

      <DashLayout>
        <Header />
        <main className="p-4">
          <div className="flex justify-between mb-4">
            <h1 className="text-3xl font-medium">Income</h1>
            <Link href={`/dash`}>
              <a className="text-lg bg-lime-500 rounded-full px-4 py-2 text-white flex items-center space-x-2">
                <span className="material-icons-round">arrow_back</span>
                <span>Back</span>
              </a>
            </Link>
          </div>

          <div className="grid gap-3">
            {incomeList?.map((e) => {
              return (
                <div key={e?.id} onClick={() => setShowDetails(e)}>
                  <Card item={e} />
                </div>
              );
            })}

            {(incomeList?.length === 0 || !incomeList) && <div>No data</div>}
          </div>
        </main>
      </DashLayout>

      {showDetails && (
        <Details data={showDetails} setShowDetails={setShowDetails} />
      )}
    </div>
  );
}
