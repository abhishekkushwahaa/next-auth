"use client";

import { signOut } from "next-auth/react";

function SignOutButtom() {
  return (
    <div>
      <button
        className="bg-green-400 rounded-md p-2"
        onClick={() => signOut({ callbackUrl: "/login", redirect: true })}
      >
        Sign out
      </button>
    </div>
  );
}
export default SignOutButtom;
