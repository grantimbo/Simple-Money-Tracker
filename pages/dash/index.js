import Head from "next/head";
import Link from "next/link";
import Overview from "../../components/Overview";
import DashLayout from "../../components/DashLayout";
import Details from "../../components/Details";
import Header from "../../components/Header";
import { useState, useContext } from "react";
import { Context } from "../../support/globalState";
import Card from "../../components/Card";

export default function Home() {
  const ctx = useContext(Context);

  const [showDetails, setShowDetails] = useState(null);

  return (
    <div className="">
      <Head>
        <title>Dashboard | Simple Money Tracker</title>
      </Head>

      <DashLayout>
        <Header />
        <main className="p-4">
          <Overview />

          <div className="grid gap-3 mt-6">
            {ctx?.profile?.data?.map((e) => {
              return (
                <div key={e?.id} onClick={() => setShowDetails(e)}>
                  <Card item={e} />
                </div>
              );
            })}

            {(ctx?.profile?.data?.length === 0 || !ctx?.profile?.data) && (
              <div>No data</div>
            )}
          </div>
          <Link href={`/dash/add`}>
            <a className="fixed bottom-10 right-10  text-lg bg-lime-500 rounded-full px-4 py-2 text-white mt-8 flex items-center space-x-2">
              <span className="material-icons-round">add_circle_outline</span>
              <span>Add Item</span>
            </a>
          </Link>
        </main>
      </DashLayout>

      {showDetails && (
        <Details data={showDetails} setShowDetails={setShowDetails} />
      )}
    </div>
  );
}
