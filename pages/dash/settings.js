import { useState, useContext, useEffect } from "react";
import { doc, setDoc, getFirestore } from "firebase/firestore";
import { Context } from "../../support/globalState";
import Head from "next/head";
import DashLayout from "../../components/DashLayout";
import Button from "../../components/Button";
import Input from "../../components/Input";
import BackHomeLink from "../../components/BackHomeLink";
import PageTitle from "../../components/PageTitle";
import SelectCurrency from "../../components/Settings/SelectCurrency";
import Categories from "../../components/Settings/Categories";

const Settings = () => {
  const ctx = useContext(Context);

  const [name, setName] = useState(ctx?.profile?.account?.name);
  const [currency, setCurrency] = useState(ctx?.profile?.account?.currency);

  const saveInfo = async () => {
    if (!currency) {
      ctx.notify("error", `Currency must not be empty`);
      return;
    }

    const tmpData = {
      ...ctx?.profile,
      account: {
        name: name,
        currency: currency,
      },
    };

    // Add a new document in collection "cities"
    const db = getFirestore();
    await setDoc(doc(db, "users", ctx?.uid), tmpData).then(() => {
      // add data to database
      ctx.notify("success", "Profile updated");
    });
  };

  return (
    <div>
      <Head>
        <title>Settings | Simple Money Tracker</title>
      </Head>

      <DashLayout>
        <BackHomeLink />

        <PageTitle title="Settings" />

        <section className="grid max-w-xs mb-16">
          <p className="text-gray-400 text-md mb-1">Name</p>
          <Input
            type={`text`}
            color="gray"
            value={name}
            setValue={setName}
            placeholder="Hudson Grant"
            additionalClasses="mb-4"
          />
          <p className="text-gray-400 text-md mb-1">Currency</p>

          <SelectCurrency
            currency={currency}
            setCurrency={setCurrency}
            color="gray"
          />
          <Button onClick={() => saveInfo()} text="Save" icon="lock" />
        </section>

        <PageTitle title="Categories" />

        <Categories />
      </DashLayout>
    </div>
  );
};

export default Settings;
