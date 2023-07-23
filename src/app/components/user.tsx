"use client";
import { signOut, useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export const User = () => {
  const session = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/signin");
    },
  });
  console.log(session);

  return (
    <div>
      <p className="">{JSON.stringify(session)}</p>
      <button className="" onClick={() => signOut()}>
        Logout
      </button>
    </div>
  );
};

User.requireAuth = true;
