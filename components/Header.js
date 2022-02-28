import LogOut from "./Logout";

const Header = () => {
  return (
    <header>
      <nav className="flex items-center justify-between flex-wrap bg-gray-50 h-14 px-4 border-b">
        <div className="text-lg font-medium">Simple Money Tracker</div>
        <LogOut />
      </nav>
    </header>
  );
};

export default Header;
