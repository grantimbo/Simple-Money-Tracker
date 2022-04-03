import { useContext, useState, useEffect } from "react";
import { Context } from "../../support/globalState";
import DashLayout from "../../components/DashLayout";
import BackHomeLink from "../../components/BackHomeLink";
import PageTitle from "../../components/PageTitle";
import List from "../../components/List";
import Title from "../../components/Title";
import BarChart from "../../components/Overview/BarChart";

export default function Income() {
  const ctx = useContext(Context);
  const [filterWord, setFilterWord] = useState(null);
  const [filteredItems, setFilteredItems] = useState([]);

  const chartData = [];
  const incomeList = [];

  ctx?.data?.filter((item, index) => {
    if (item.method == 1) {
      incomeList.push(item);
      if (
        ctx?.data?.findIndex((x) => x.category.name == item.category.name) ===
        index
      ) {
        chartData.push({
          category: item.category.name,
          value: parseInt(item.value),
        });
      } else {
        let oten = chartData.findIndex(
          (x) => x.category === item.category.name
        );
        chartData[oten].value += parseInt(item.value);
      }
    }
  });

  useEffect(() => {
    if (!filterWord) {
      setFilteredItems(incomeList);
    } else {
      const filtered = incomeList.filter((item) => {
        if (
          item.category.name.toLowerCase().includes(filterWord.toLowerCase())
        ) {
          return item;
        }
      });
      setFilteredItems(filtered);
    }
  }, [filterWord]);

  return (
    <>
      <Title title="Income" />
      <DashLayout>
        <BackHomeLink />
        <PageTitle title={`Income Overview`} />
        <BarChart
          data={chartData}
          filterWord={filterWord}
          setFilterWord={setFilterWord}
        />
        <List data={filteredItems} />
      </DashLayout>
    </>
  );
}
