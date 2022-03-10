import { useContext } from "react";
import { Context } from "../../support/globalState";
import Overview from "../../components/Overview";
import Head from "next/head";
import DashLayout from "../../components/DashLayout";
import AddItemButton from "../../components/AddItemButton";
import List from "../../components/List";
import Title from "../../components/Title";

export default function Home() {
  const ctx = useContext(Context);
  const allList = ctx?.profile?.data || [];

  console.log(ctx);

  return (
    <>
      <Title title="Dashboard" />
      <DashLayout>
        <Overview />
        <AddItemButton />
        <List data={allList} />
      </DashLayout>
    </>
  );
}
