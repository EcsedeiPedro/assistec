import Link from "next/dist/client/link";
import { Logo } from "../logo";

export function AppHeader() {
  return (
    <header className="border-b border-gray-300 flex items-center justify-between px-6 py-4 ">
      <Link className="text-xl font-bold" href="/">
        <Logo />
      </Link>
    </header>
  );
}
