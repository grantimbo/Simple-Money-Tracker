import { useContext } from "react";
import { Context } from "../../support/globalState";
import Overview from "../../components/Overview";
import DashLayout from "../../components/DashLayout";
import AddItemButton from "../../components/AddItem/AddItemButton";
import List from "../../components/List";
import Title from "../../components/Title";
import DateSelector from "../../components/DateSelector";

export default function Home() {
  const ctx = useContext(Context);
  const allList = ctx?.data || [];

  return (
    <>
      <Title title="Dashboard" />
      <DashLayout>
        <Overview />
        <div className="my-4 flex items-center justify-end md:justify-between md:my-8">
          <AddItemButton />
          <DateSelector />
        </div>
        <List data={allList} />
      </DashLayout>
    </>
  );
}
