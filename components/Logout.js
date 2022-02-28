import { getAuth, signOut } from "firebase/auth";
import Router from "next/router";
const LogOut = () => {
  const auth = getAuth();
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        Router.push(`/login`);
      })
      .catch((error) => {
        // An error happened.
        console.log(error);
        alert("Something went wrong");
      });
  };

  return (
    <button
      onClick={() => handleSignOut()}
      className="px-4 py-2 text-white bg-gray-700 rounded-full text-sm"
    >
      Logout
    </button>
  );
};

export default LogOut;
