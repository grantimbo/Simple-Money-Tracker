import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useState, useContext, useEffect } from "react";
import { Context } from "../support/globalState";
import Router from "next/router";
import Input from "../components/Input";
import Button from "../components/Button";
import ButtonLink from "../components/ButtonLink";
import Title from "../components/Title";

const Login = () => {
  const ctx = useContext(Context);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    console.log(ctx);
    if (ctx.loggedIn == true) {
      Router.push("/dash");
    }
  }, [ctx?.loggedIn]);

  const handleLogIn = () => {
    console.log("Logging in...");
    const auth = getAuth();

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        // const user = userCredential.user;
        ctx.notify("success", "Sign in successful");
      })
      .catch((error) => {
        // const errorCode = error.code;
        ctx.notify("error", error.message);
        // ..
      });
  };

  return (
    <>
      <Title title="Login" />

      <div className="grid gap-2 max-w-sm p-10 mx-auto mt-36">
        <h1 className="text-3xl font-medium mb-8 text-center">Login</h1>
        <Input type={`text`} setValue={setEmail} placeholder="Email" />
        <Input
          type={`password`}
          setValue={setPassword}
          placeholder="Password"
        />
        <Button onClick={() => handleLogIn()} text="Login" icon="lock" />
        <ButtonLink href={`/signup`} text="Create Account" color="gray" />
      </div>
    </>
  );
};

export default Login;
