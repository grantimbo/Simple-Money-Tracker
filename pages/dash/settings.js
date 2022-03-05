import { useState, useContext, useEffect } from "react";
import { doc, setDoc, getFirestore } from "firebase/firestore";
import { Context } from "../../support/globalState";
import Head from "next/head";
import DashLayout from "../../components/DashLayout";
import Button from "../../components/Button";
import ButtonLink from "../../components/ButtonLink";
import Input from "../../components/Input";
import BackHomeLink from "../../components/BackHomeLink";
import PageTitle from "../../components/PageTitle";

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
          <Input
            type={`text`}
            color="gray"
            value={currency}
            setValue={setCurrency}
            placeholder="$"
            additionalClasses="mb-4"
          />
          <Button onClick={() => saveInfo()} text="Save" icon="lock" />
        </section>

        <PageTitle title="Categories" />

        <section className="grid grid-cols-2 gap-2 w-8/12 mb-6">
          <div>
            <h2 className="text-gray-400 text-md mb-1">Expenses</h2>
            <div className="grid gap-2">
              {ctx?.profile?.category?.expense?.map((cat) => {
                return (
                  <div
                    key={cat?.name}
                    className={`bg-gray-50 border rounded-full py-2 px-4 text-sm flex items-center  space-x-2 text-gray-600`}
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
          </div>

          <div>
            <h2 className="text-gray-400 text-md mb-1">Income</h2>
            <div className="grid gap-2">
              {ctx?.profile?.category?.income?.map((cat) => {
                return (
                  <div
                    key={cat?.name}
                    className={`bg-gray-50 border rounded-full py-2 px-4 text-sm flex items-center  space-x-2 text-gray-600`}
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
          </div>
        </section>

        <ButtonLink
          additionalClasses="w-full max-w-xs"
          text="Edit Categories"
          href="/dash/categories"
          icon="edit"
        />
      </DashLayout>
    </div>
  );
};

export default Settings;
