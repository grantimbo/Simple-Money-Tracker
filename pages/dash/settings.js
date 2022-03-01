import { useState, useContext, useEffect } from "react";
import { Context } from "../../support/globalState";
import Header from "../../components/Header";
import Head from "next/head";
import DashLayout from "../../components/DashLayout";
import Button from "../../components/Button";
import ButtonLink from "../../components/ButtonLink";
import Input from "../../components/Input";

const Settings = () => {
  const ctx = useContext(Context);

  const [name, setName] = useState(ctx?.profile?.name);
  const [category, setCategory] = useState(0);
  const [catList, setCatList] = useState([]);

  // create array of categories
  const ExpenseCategory = ctx?.profile?.category?.expense;
  const IncomeCategory = ctx?.profile?.category?.income;

  useEffect(() => {
    if (category === 0) {
      setCatList(ExpenseCategory);
    } else {
      setCatList(IncomeCategory);
    }
  }, [category]);

  return (
    <div>
      <Head>
        <title>Settings | Simple Money Tracker</title>
      </Head>

      <DashLayout>
        <Header />
        <main className="p-4">
          <h1 className="text-3xl font-medium mb-8">Profile</h1>
          <div className="grid gap-2 max-w-xs mb-10">
            <Input type={`text`} setValue={setName} placeholder="Name" />
            <Button onClick={() => saveInfo()} text="Save" icon="lock" />
          </div>

          <h1 className="text-3xl font-medium mb-8">Categories</h1>
          <div className="border-b-2 border-lime-400 flex space-x-1">
            <div
              onClick={() => setCategory(0)}
              className={`${
                category === 0
                  ? "bg-lime-500 text-white"
                  : "bg-lime-100 text-lime-700 border-lime-400 border-2"
              } px-4 py-1 border-b-0 rounded-t-xl cursor-pointer`}
            >
              Expenses
            </div>
            <div
              onClick={() => setCategory(1)}
              className={`${
                category === 1
                  ? "bg-lime-500 text-white"
                  : "bg-lime-100 text-lime-500 border-lime-400 border-2"
              } px-4 py-1 border-b-0 rounded-t-xl cursor-pointer`}
            >
              Income
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 mb-6 mt-2">
            {catList?.map((cat) => {
              return (
                <div
                  key={cat?.name}
                  className={`bg-gray-50 border rounded-lg p-2  h-16 flex items-center justify-center space-x-2 text-gray-600`}
                >
                  {cat?.icon && (
                    <span className="material-icons-round text-gray-500">
                      {cat?.icon}
                    </span>
                  )}
                  <span>{cat?.name}</span>
                </div>
              );
            })}
          </div>

          <ButtonLink
            text="Add Cagegories"
            href="/dash/categories"
            icon="add_circle_outline"
          />
        </main>
      </DashLayout>
    </div>
  );
};

export default Settings;
