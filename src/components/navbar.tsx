"use client";

import { usePathname } from "next/navigation";
import { HomeNav } from "./home";
import { JoinNav } from "./join";

export function Navbar() {
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  return isHomePage ? <HomeNav /> : <JoinNav />;
}
