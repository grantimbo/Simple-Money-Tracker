import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useState, useContext, useEffect } from "react";
import { Context } from "../support/globalState";
import Link from "next/link";
import Router from "next/router";

const Login = () => {
  const ctx = useContext(Context);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (ctx?.loggedIn) {
      Router.push("/dash");
    }
  }, [ctx]);

  const handleLogIn = () => {
    const auth = getAuth();

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;

        alert("Sign in successful");
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
        onClick={() => handleLogIn()}
        className="px-4 py-2 border bg-blue-600 text-white"
      >
        Log In
      </button>
      <Link href={`/signup`}>Create Account</Link>
    </div>
  );
};

export default Login;
