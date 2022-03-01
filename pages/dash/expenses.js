import Head from "next/head";
import Link from "next/link";
import DashLayout from "../../components/DashLayout";
import Header from "../../components/Header";
import { Context } from "../../support/globalState";
import { useState, useContext, useEffect } from "react";

export default function Expenses() {
  const ctx = useContext(Context);

  const expenseList = ctx?.profile?.data?.filter(
    (item) => item.method == "expense"
  );

  return (
    <div className="">
      <Head>
        <title>Income</title>
      </Head>

      <DashLayout>
        <Header />
        <main className="p-4">
          <div className="flex justify-end mb-4">
            <Link href={`/dash`}>
              <a className="text-lg bg-blue-500 rounded-full px-4 py-2 text-white flex items-center space-x-2">
                <span className="material-icons-round">arrow_back</span>
                <span>Back</span>
              </a>
            </Link>
          </div>

          <div>
            {expenseList?.map((e) => {
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

            {(expenseList?.length === 0 || !expenseList) && <div>No data</div>}
          </div>
        </main>
      </DashLayout>
    </div>
  );
}
