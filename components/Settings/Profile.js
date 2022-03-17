import { useState, useContext } from "react";
import { doc, setDoc, getFirestore } from "firebase/firestore";
import { Context } from "../../support/globalState";
import Button from "../Button";
import Input from "../Input";
import SelectCurrency from "./SelectCurrency";
import InputLabel from "../InputLabel";

const Profile = () => {
  const ctx = useContext(Context);

  const [name, setName] = useState(ctx?.profile?.name || "");
  const [currency, setCurrency] = useState(ctx?.profile?.currency || "$");

  const saveInfo = async () => {
    if (!currency) {
      ctx.notify("error", `Currency must not be empty`);
      return;
    }

    const tmpData = {
      ...ctx.profile,
      name: name,
      currency: currency,
    };

    // Add a new document in collection "cities"
    const db = getFirestore();
    await setDoc(doc(db, "users", ctx?.uid), tmpData).then(() => {
      // add data to database
      ctx.notify("success", "Profile updated");
    });
  };

  return (
    <section className="grid mb-8 max-w-sm md:mb-16">
      <InputLabel text="Name" />
      <Input
        type={`text`}
        color="gray"
        value={name}
        setValue={setName}
        placeholder="Hudson Grant"
        additionalClasses="mb-4"
      />

      <InputLabel text="Currency" />
      <SelectCurrency
        currency={currency}
        setCurrency={setCurrency}
        color="gray"
      />
      <Button onClick={() => saveInfo()} text="Save" icon="lock" />
    </section>
  );
};

export default Profile;
