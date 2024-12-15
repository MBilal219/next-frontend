import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function tableDescription(input: string) {
  const stripped = input.replace(/<\/?[^>]+(>|$)/g, ""); // Remove HTML tags
  return stripped.length > 30 ? stripped.slice(0, 30) + "..." : stripped;
}
