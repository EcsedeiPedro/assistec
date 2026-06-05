import Link from "next/link";
import { Logo } from "../logo";
import { getCurrentUser } from "@/lib/auth";
import { UserMenu } from "./user-menu";

export async function AppHeader() {
  const user = await getCurrentUser();

  return (
    <header className="border-b border-gray-300 flex items-center justify-between px-6 py-4">
      <Link className="text-xl font-bold" href="/">
        <Logo width="80px" />
      </Link>

      {user && (
        <UserMenu
          firstName={user.firstName}
          lastName={user.lastName}
          email={user.email}
          avatarUrl={user.avatarUrl}
        />
      )}
    </header>
  );
}
