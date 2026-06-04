import Link from "next/dist/client/link";
import { Logo } from "../logo";

export function AppHeader() {
  return (
    <header className="border-b border-gray-300 flex items-center">
      <h1 className="font-semibold">
        <Link className="text-xl font-bold" href="/">
          <Logo />
        </Link>
      </h1>
    </header>
  );
}
