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
  const { loggedIn } = ctx;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(null);

  useEffect(() => {
    loggedIn && Router.push("/dash");
  }, [loggedIn]);

  const handleLogIn = () => {
    setLoading("Loggin In...");
    const auth = getAuth();

    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        ctx.notify("success", "Sign in successful");
      })
      .catch((error) => {
        ctx.notify("error", error.message);
        setLoading(null);
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
        <Button
          onClick={() => handleLogIn()}
          text="Login"
          icon="lock"
          loading={loading}
        />

        <p className="text-center py-2 text-gray-500">or</p>

        <ButtonLink href={`/signup`} text="Create Account" color="gray" />
        <ButtonLink href={`/recovery`} text="Reset my Password" color="gray" />
      </div>
    </>
  );
};

export default Login;
