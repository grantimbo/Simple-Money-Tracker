import Router from "next/router";
import { useContext, useEffect } from "react";
import { Context } from "../support/globalState";

export default function DashLayout({ children }) {
  const ctx = useContext(Context);
  const { profile, loggedIn } = ctx;

  useEffect(() => {
    if (!ctx) {
      return;
    }

    if (!loggedIn) {
      Router.push("/login");
    }
  }, []);

  return (
    <>
      {profile === 0 || loggedIn === false ? (
        <div>Loading...</div>
      ) : (
        <div>{children}</div>
      )}
    </>
  );
}
