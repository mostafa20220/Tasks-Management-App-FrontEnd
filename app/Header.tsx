import UserInfo from "components/UserInfo";
import Link from "next/link";

export const Header = () => {
  return (
    <header className="bg-blue-500 text-white p-4">
      <nav className="flex justify-between items-center px-4">
        <Link href={"/"} className="text-2xl font-bold">
          Tasks Management
        </Link>
        <UserInfo />
      </nav>
    </header>
  );
};
