import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useState, useEffect, useContext } from "react";
import { Context } from "../support/globalState";
import { doc, setDoc, getFirestore } from "firebase/firestore";
import Router from "next/router";
import Input from "../components/Input";
import Button from "../components/Button";
import ButtonLink from "../components/ButtonLink";
import Title from "../components/Title";

const SignUp = () => {
  const ctx = useContext(Context);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const auth = getAuth();
  const db = getFirestore();

  const createAccount = () => {
    if (!email || !password) {
      ctx.notify("success", "Please enter an email and password");
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;

        const addDataToFirebase = async () => {
          await setDoc(doc(db, "users", user.uid), {
            name: "Los Angeles",
            state: "CA",
            country: "USA",
          });

          Router.push("/dash");
          ctx.notify("success", "Succefully created account");
        };

        addDataToFirebase();
      })
      .catch((error) => {
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
        />

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
