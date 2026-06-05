"use client";

import { cn } from "@/lib/utils";

type UserAvatarProps = {
  firstName: string;
  lastName: string;
  avatarUrl?: string | null;
  className?: string;
};

export function UserAvatar({
  firstName,
  lastName,
  avatarUrl,
  className,
}: UserAvatarProps) {
  const initials = `${firstName[0] ?? ""}${lastName[0] ?? ""}`.toUpperCase();

  if (avatarUrl) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={avatarUrl}
        alt={`${firstName} ${lastName}`}
        className={cn(
          "size-8 rounded-full object-cover ring-2 ring-white",
          className,
        )}
      />
    );
  }

  return (
    <span
      aria-label={`${firstName} ${lastName}`}
      className={cn(
        "inline-flex size-8 items-center justify-center rounded-full bg-green-base text-xs font-semibold text-white ring-2 ring-white",
        className,
      )}
    >
      {initials}
    </span>
  );
}
