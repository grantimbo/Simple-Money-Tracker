import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useState, useEffect, useContext } from "react";
import { Context } from "../support/globalState";
import { doc, setDoc, getFirestore } from "firebase/firestore";
import Router from "next/router";
import Input from "../components/Input";
import Button from "../components/Button";
import ButtonLink from "../components/ButtonLink";
import Title from "../components/Title";
import { generateID } from "../support/generateID";

const SignUp = () => {
  const ctx = useContext(Context);
  const { loggedIn } = ctx;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(null);

  const auth = getAuth();
  const db = getFirestore();

  useEffect(() => {
    loggedIn && Router.push("/dash");
  }, [loggedIn]);

  const createAccount = () => {
    if (!email || !password) {
      ctx.notify("error", "Please enter an email and password");
      return;
    }
    setLoading("Creating Account...");

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;

        const addDataToFirebase = async () => {
          await setDoc(doc(db, "users", user.uid), {
            name: "",
            currency: "$",
            categories: [
              {
                icon: "view_agenda",
                id: generateID(),
                method: 0,
                name: "Others",
              },
              {
                icon: "bolt",
                id: generateID(),
                method: 0,
                name: "Bills",
              },
              {
                icon: "restaurant",
                id: generateID(),
                method: 0,
                name: "Food",
              },
              {
                icon: "shopping_basket",
                id: generateID(),
                method: 0,
                name: "Shopping",
              },
              {
                icon: "child_friendly",
                id: generateID(),
                method: 0,
                name: "Baby",
              },
              {
                icon: "health_and_safety",
                id: generateID(),
                method: 0,
                name: "Health",
              },
              {
                icon: "account_balance_wallet",
                id: generateID(),
                method: 1,
                name: "Salary",
              },
              {
                icon: "devices",
                id: generateID(),
                method: 1,
                name: "Freelancing",
              },
              {
                icon: "savings",
                id: generateID(),
                method: 1,
                name: "Investments",
              },
            ],
          });

          Router.push("/dash");
          ctx.notify("success", "Succefully created account");
        };

        addDataToFirebase();
      })
      .catch((error) => {
        setLoading(null);
        ctx.notify("error", error.message);
      });
  };

  return (
    <>
      <Title title="Create Account" />

      <div className="grid gap-2 max-w-sm p-10 mx-auto mt-36">
        <h1 className="text-3xl font-medium mb-8 text-center">
          Create Account
        </h1>

        <Input type={`text`} setValue={setEmail} placeholder="Email" />
        <Input
          type={`password`}
          setValue={setPassword}
          placeholder="Password"
        />

        <Button
          onClick={() => createAccount()}
          text="Create Account"
          icon="person_outline"
          loading={loading}
        />

        <p className="text-center py-2 text-gray-500">or</p>

        <ButtonLink
          href={`/login`}
          text="I have already an Account"
          color="gray"
        />
      </div>
    </>
  );
};

export default SignUp;
