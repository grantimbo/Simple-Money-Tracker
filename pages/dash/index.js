import Head from "next/head";
import Link from "next/link";
import Overview from "../../components/Overview";
import DashLayout from "../../components/DashLayout";
import Header from "../../components/Header";
import { useState, useContext } from "react";
import { Context } from "../../support/globalState";

export default function Home() {
  const ctx = useContext(Context);

  return (
    <div className="">
      <Head>
        <title>Dashboard</title>
      </Head>
      <DashLayout>
        <Header />
        <main className="p-4">
          <Overview />

          <div className="grid gap-4 mt-10">
            {ctx?.profile?.data?.map((e) => {
              return (
                <div
                  className="bg-gray-50 border rounded-lg p-4"
                  key={e?.note}
                  onClick={() => console.log("hello")}
                >
                  <div className="text-xs border-b pb-1 flex items-center justify-between">
                    <span>{e?.date}</span>
                    <span>Expenses: {e?.value}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>
                      <div>{e?.category}</div>
                      <div>{e?.note}</div>
                    </span>
                    <div>
                      {e?.method === "expense" && "-"} {e?.value}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <Link href={`/dash/add`}>
            <a className="fixed bottom-4 right-6  text-lg bg-blue-500 rounded-full px-4 py-2 text-white mt-8">
              {`+ Add`}
            </a>
          </Link>
        </main>
      </DashLayout>
    </div>
  );
}
