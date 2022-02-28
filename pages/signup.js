import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useState, useEffect, useContext } from "react";
import { Context } from "../support/globalState";
import { doc, setDoc, getFirestore } from "firebase/firestore";
import Router from "next/router";
import Link from "next/link";

const SignUp = () => {
  const ctx = useContext(Context);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const auth = getAuth();
  const db = getFirestore();

  const createAccount = () => {
    if (!email || !password) {
      alert("Please enter an email and password");
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;

        console.log(user);

        const addDataToFirebase = async () => {
          await setDoc(doc(db, "users", user.uid), {
            name: "Los Angeles",
            state: "CA",
            country: "USA",
          });

          Router.push("/dash");
        };

        addDataToFirebase();

        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
  };

  return (
    <div className="login">
      <Link href={`/login`}>I have already an Account</Link>
      <input
        type={`text`}
        onChange={(e) => setEmail(e?.target?.value)}
        placeholder="Email"
        className="px-4 py-2 border bg-gray-50"
      />
      <input
        type={`password`}
        onChange={(e) => setPassword(e?.target?.value)}
        placeholder="Password"
        className="px-4 py-2 border bg-gray-50"
      />
      <button
        onClick={() => createAccount()}
        className="px-4 py-2 border bg-blue-600 text-white"
      >
        Create Account
      </button>
    </div>
  );
};

export default SignUp;
