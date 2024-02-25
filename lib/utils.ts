import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import type { NextResponse } from "next/server";
import { LRUCache } from "lru-cache";

type Options = {
  uniqueTokenPerInterval?: number;
  interval?: number;
};

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}