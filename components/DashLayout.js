import Router from "next/router";
import { useContext, useEffect } from "react";
import { Context } from "../support/globalState";
import Header from "./Header";
import Loading from "../components/Loading";

export default function DashLayout({ children }) {
  const ctx = useContext(Context);
  const { profile, loggedIn } = ctx;

  useEffect(() => {
    if (loggedIn == false) {
      if (profile === null) {
        Router.push("/login");
      }
    }
  }, [ctx.loggedIn]);

  return (
    <>
      {profile === 0 || loggedIn === null ? (
        <Loading />
      ) : (
        <>
          <Header />
          <main className="p-4 max-w-screen-lg mx-auto mb-24">{children}</main>
        </>
      )}
    </>
  );
}
