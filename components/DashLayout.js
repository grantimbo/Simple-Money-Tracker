import Router from "next/router";
import { useContext, useEffect } from "react";
import { Context } from "../support/globalState";
import Header from "./Header";

export default function DashLayout({ children }) {
  const ctx = useContext(Context);
  const { profile, loggedIn } = ctx;

  useEffect(() => {
    if (loggedIn == false) {
      Router.push("/login");
    }
  }, [ctx.loggedIn]);

  return (
    <>
      {profile === 0 || loggedIn === null ? (
        <div className="fixed top-0 bottom-0 left-0 right-0 flex items-center justify-center">
          <h1 className="text-3xl font-medium">Loading...</h1>
        </div>
      ) : (
        <>
          <Header />
          <main className="p-4 max-w-screen-lg mx-auto mb-24">{children}</main>
        </>
      )}
    </>
  );
}
