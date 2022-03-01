import { getAuth, signOut } from "firebase/auth";
import Router from "next/router";
import { useContext } from "react";
import { Context } from "../support/globalState";

const LogOut = () => {
  const ctx = useContext(Context);
  const auth = getAuth();
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        ctx.notify("success", "Sign out successful");
        Router.push(`/login`);
      })
      .catch((error) => {
        // An error happened.
        ctx.notify("error", error.message);
      });
  };

  return (
    <button
      onClick={() => handleSignOut()}
      className="px-3 py-1 text-sm flex items-center space-x-2"
    >
      <span className="material-icons-round text-[1.1rem]">lock_open</span>
      <span>Logout</span>
    </button>
  );
};

export default LogOut;
