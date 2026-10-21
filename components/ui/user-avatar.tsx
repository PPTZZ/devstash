"use client";

import React, { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

export type UserAvatarProps = {
  name?: string | null;
  email?: string | null;
  image?: string | null;
  size?: "sm" | "md" | "lg";
  className?: string;
};

export function getInitials(
  name?: string | null,
  email?: string | null
): string {
  const trimmedName = name?.trim();
  if (trimmedName) {
    const parts = trimmedName.split(/\s+/).filter(Boolean);
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
    }
    if (parts.length === 1) {
      return parts[0].slice(0, 2).toUpperCase();
    }
  }

  const trimmedEmail = email?.trim();
  if (trimmedEmail && trimmedEmail.length > 0) {
    return trimmedEmail[0].toUpperCase();
  }

  return "U";
}

const sizeClasses: Record<
  NonNullable<UserAvatarProps["size"]>,
  { container: string; dimensions: number }
> = {
  sm: { container: "h-7 w-7 text-[10px]", dimensions: 28 },
  md: { container: "h-8 w-8 text-xs", dimensions: 32 },
  lg: { container: "h-10 w-10 text-sm", dimensions: 40 },
};

export function UserAvatar({
  name,
  email,
  image,
  size = "md",
  className,
}: UserAvatarProps) {
  const [failedSrc, setFailedSrc] = useState<string | null>(null);
  const { container, dimensions } = sizeClasses[size];
  const initials = getInitials(name, email);

  if (image && failedSrc !== image) {
    return (
      <Image
        src={image}
        alt={name || email || "User Avatar"}
        width={dimensions}
        height={dimensions}
        unoptimized
        onError={() => setFailedSrc(image)}
        className={cn(
          container,
          "rounded-full border border-border/60 object-cover shrink-0",
          className
        )}
      />
    );
  }

  return (
    <div
      aria-label={name || email || "User Avatar"}
      className={cn(
        container,
        "rounded-full bg-primary/15 text-primary border border-primary/25 flex items-center justify-center font-bold tracking-tight shrink-0 select-none",
        className
      )}
    >
      {initials}
    </div>
  );
}
