"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { LogOut, User } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { UserAvatar } from "@/components/auth/user-avatar";
import { logoutAction } from "@/actions/auth-actions";

type UserMenuProps = {
  firstName: string;
  lastName: string;
  email: string;
  avatarUrl?: string | null;
};

export function UserMenu({
  firstName,
  lastName,
  email,
  avatarUrl,
}: UserMenuProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleLogout = () => {
    startTransition(async () => {
      await logoutAction();
      router.refresh();
    });
  };

  return (
    <div className="flex items-center space-x-2">
      <span className="font-bold text-sm text-green-base">
        {firstName + " " + lastName}
      </span>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            type="button"
            className="rounded-full focus:outline-none focus:ring-2 focus:ring-green-base focus:ring-offset-2"
            disabled={isPending}
          >
            <UserAvatar
              firstName={firstName}
              lastName={lastName}
              avatarUrl={avatarUrl}
            />
          </button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-semibold leading-none text-green-dark">
                {firstName} {lastName}
              </p>
              <p className="text-xs leading-none text-gray">{email}</p>
            </div>
          </DropdownMenuLabel>

          <DropdownMenuSeparator />

          <DropdownMenuItem disabled>
            <User className="mr-2 size-4" />
            Meu perfil
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem
            onClick={handleLogout}
            className="text-destructive focus:text-destructive"
          >
            <LogOut className="mr-2 size-4" />
            Sair
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
