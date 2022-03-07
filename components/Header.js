import Link from "next/link";
import { useState, useContext } from "react";
import { Context } from "../support/globalState";
import Button from "./Button";
import LogOut from "./Logout";

const Header = () => {
  const ctx = useContext(Context);
  const [dropdown, showDropdown] = useState(false);
  return (
    <header>
      <nav className="flex items-center justify-between flex-wrap bg-gray-50 h-16 px-4 border-b">
        <Link href={`/dash`}>
          <a className="text-2xl font-medium cursor-pointer">
            Simple Money Tracker
          </a>
        </Link>

        <div
          className="flex items-center space-x-2 cursor-pointer"
          onClick={() => (!dropdown ? showDropdown(true) : showDropdown(false))}
        >
          {ctx?.profile?.account?.name && (
            <span>{ctx?.profile?.account?.name}</span>
          )}
          <span className="material-icons-round text-3xl">account_circle</span>
        </div>
      </nav>

      {dropdown && (
        <>
          <div className="bg-gray-50 fixed top-[53px] shadow-xl shadow-gray-300 right-3 border z-50 rounded-lg grid text-lg fade-in">
            <Link href="/dash/settings">
              <a className="border-b px-4 py-2 flex items-center space-x-2">
                <span className="material-icons-round text-[1.1rem]">
                  settings
                </span>
                <span>Settings</span>
              </a>
            </Link>

            <LogOut />
          </div>
          <div
            className="bg-gray-50 bg-opacity-5 fixed z-40 top-0 bottom-0 w-full "
            onClick={() => showDropdown(false)}
          />
        </>
      )}
    </header>
  );
};

export default Header;
