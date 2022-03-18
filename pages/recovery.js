import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { useState, useContext, useEffect } from "react";
import { Context } from "../support/globalState";
import Router from "next/router";
import Input from "../components/Input";
import Button from "../components/Button";
import ButtonLink from "../components/ButtonLink";
import Title from "../components/Title";

const Recovery = () => {
  const ctx = useContext(Context);
  const { loggedIn } = ctx;
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(null);

  useEffect(() => {
    loggedIn && Router.push("/dash");
  }, [loggedIn]);

  const resetPassword = () => {
    setLoading("Sending...");
    const auth = getAuth();

    sendPasswordResetEmail(auth, email)
      .then(() => {
        setLoading(null);
        ctx.notify("success", "Password reset email sent!");
      })
      .catch((error) => {
        setLoading(null);
        ctx.notify("error", error.message);
      });
  };

  return (
    <>
      <Title title="Reset Password" />

      <div className="grid gap-2 max-w-sm p-10 mx-auto mt-36">
        <h1 className="text-3xl font-medium mb-8 text-center">
          Reset Password
        </h1>
        <Input type={`text`} setValue={setEmail} placeholder="Email" />
        <Button
          onClick={() => resetPassword()}
          text="Reset Password"
          icon="lock"
          loading={loading}
        />

        <p className="text-center py-2 text-gray-500">or</p>

        <ButtonLink href={`/login`} text="Back to Login" color="gray" />
      </div>
    </>
  );
};

export default Recovery;
