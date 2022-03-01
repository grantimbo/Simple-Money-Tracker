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
        <div className="fixed top-0 bottom-0 left-0 right-0 flex items-center justify-center">
          <h1 className="text-3xl font-medium">Loading...</h1>
        </div>
      ) : (
        <div>{children}</div>
      )}
    </>
  );
}
