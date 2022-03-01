import Link from "next/link";
import { useState } from "react";
import Button from "./Button";
import LogOut from "./Logout";

const Header = () => {
  const [dropdown, showDropdown] = useState(false);
  return (
    <header>
      <nav className="flex items-center justify-between flex-wrap bg-gray-50 h-14 px-4 border-b">
        <Link href={`/dash`}>
          <a className="text-xl font-medium cursor-pointer">
            Simple Money Tracker
          </a>
        </Link>

        <span
          className="material-icons-round text-3xl cursor-pointer"
          onClick={() => (!dropdown ? showDropdown(true) : showDropdown(false))}
        >
          account_circle
        </span>
      </nav>

      {dropdown && (
        <>
          <div className="bg-gray-50 fixed top-12 shadow-xl shadow-gray-300 right-3 border z-50 rounded-lg grid">
            <Link href="/dash/settings">
              <a className="border-b px-3 py-1 text-sm flex items-center space-x-2">
                <span className="material-icons-round text-[1.1rem]">
                  settings
                </span>
                <span>Settings</span>
              </a>
            </Link>
            <Link href="/dash/categories">
              <a className="border-b px-3 py-1 text-sm flex items-center space-x-2">
                <span className="material-icons-round text-[1.1rem]">
                  format_list_bulleted
                </span>
                <span>Categories</span>
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
