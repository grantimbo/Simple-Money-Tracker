import Head from "next/head";
import Link from "next/link";
import Overview from "../../components/Overview";
import DashLayout from "../../components/DashLayout";
import Details from "../../components/Details";
import Header from "../../components/Header";
import { useState, useContext } from "react";
import { Context } from "../../support/globalState";

export default function Home() {
  const ctx = useContext(Context);

  const [showDetails, setShowDetails] = useState(null);

  return (
    <div className="">
      <Head>
        <title>Dashboard</title>
      </Head>
      {showDetails && (
        <Details data={showDetails} setShowDetails={setShowDetails} />
      )}
      <DashLayout>
        <Header />
        <main className="p-4">
          <Overview />

          <div className="grid gap-4 mt-10">
            {ctx?.profile?.data?.map((e) => {
              return (
                <div
                  className="bg-gray-50 border rounded-lg p-4 cursor-pointer"
                  key={e?.id}
                  onClick={() => setShowDetails(e)}
                >
                  <div className="text-xs border-b pb-1 flex items-center justify-between">
                    <span>{e?.date}</span>
                    <span>
                      {e?.method === "expense" ? "Expenses" : "Income"}
                      {" : "}
                      {e?.value}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="flex space-x-3">
                      <span className="material-icons-round">
                        {e?.category?.icon}
                      </span>
                      <div>{e?.note}</div>
                    </span>
                    <div>
                      {e?.method === "expense" && "-"} {e?.value}
                    </div>
                  </div>
                </div>
              );
            })}

            {(ctx?.profile?.data?.length === 0 || !ctx?.profile?.data) && (
              <div>No data</div>
            )}
          </div>
          <Link href={`/dash/add`}>
            <a className="fixed bottom-4 right-6  text-lg bg-blue-500 rounded-full px-4 py-2 text-white mt-8 flex items-center space-x-2">
              <span className="material-icons-round">add_circle_outline</span>
              <span>Add</span>
            </a>
          </Link>
        </main>
      </DashLayout>
    </div>
  );
}
