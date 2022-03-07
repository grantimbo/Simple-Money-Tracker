import Head from "next/head";
import Link from "next/link";
import Overview from "../../components/Overview";
import DashLayout from "../../components/DashLayout";
import Details from "../../components/Details";
import Header from "../../components/Header";
import { useState, useContext } from "react";
import { Context } from "../../support/globalState";
import Card from "../../components/Card";
import AddItem from "../../components/AddItem";
import Button from "../../components/Button";

export default function Home() {
  const ctx = useContext(Context);

  const [showDetails, setShowDetails] = useState(null);
  const [addItem, setAddItem] = useState(false);

  return (
    <div className="">
      <Head>
        <title>Dashboard | Simple Money Tracker</title>
      </Head>

      <DashLayout>
        <Overview />

        <Button
          onClick={() => setAddItem(true)}
          setAddItem={setAddItem}
          text="Add Item"
          icon="add_circle_outline"
          additionalClasses="mt-8"
        >
          Add Item
        </Button>

        <div className="mx-auto grid gap-3 mt-6">
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
      </DashLayout>

      {showDetails && (
        <Details data={showDetails} setShowDetails={setShowDetails} />
      )}

      {addItem && (
        <div className="fixed -top-2 left-0 bottom-0 right-0 p-10 fade-in">
          <div className="bg-gray-50 rounded-lg p-4 max-w-xl w-full mx-auto mt-20 relative z-10 ">
            <div
              onClick={() => setAddItem(null)}
              className="absolute right-3 top-2 cursor-pointer "
            >
              <span className="material-icons-round text-4xl">
                highlight_off
              </span>
            </div>
            <AddItem setAddItem={setAddItem} />
          </div>
          <div
            onClick={() => setAddItem(null)}
            className="absolute top-0 left-0 bottom-0 right-0 bg-black bg-opacity-30"
          />
        </div>
      )}
    </div>
  );
}
