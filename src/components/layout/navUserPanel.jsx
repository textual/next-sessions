"use client";
import { useAuth } from "@/contexts/auth";
import Link from "next/link";
const NavUserPanel = () => {
  const { isAuthenticated, user } = useAuth();

  return (
    <div className="ml-2">
      {Boolean(isAuthenticated) ? (
        <Link href="/dashboard">{user?.name}</Link>
      ) : (
        <>
          <Link href="/auth/login">login</Link>
          {" | "}
          <Link href="/auth/register">register</Link>
        </>
      )}
    </div>
  );
};
export default NavUserPanel;
