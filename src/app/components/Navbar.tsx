"use client";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { signOut as logOut } from "firebase/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection, query } from "firebase/firestore";
import { auth, db } from "../firebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";

const Navbar = () => {
  const session = useSession();
  const [user] = useAuthState(auth);
  // console.log(session);

  // console.log(user?.displayName);

  const handleSignOut = async () => {
    await signOut({ callbackUrl: "/sign-in" });
    await logOut(auth);
  };

  // const [users, loading, error] = useCollection(query(collection(db, "users")));

  return (
    <div className="fixed top-0 inset-x-0 h-fit bg-zinc-100 border-b border-zinc-300 z-[10] py-2">
      <div className="container max-w-7xl mx-auto flex items-start justify-between gap-02">
        {/* logo */}
        <Link href="/" className="flex gap-2 item-center">
          <p className="text-zinc-700 txt-sm font-medium ">Gallery</p>
        </Link>

        <div className="flex items-center gap-4">
          {/* <p>{session?.data?.user?.email}</p> */}
          {/* <p>Firebase: {users?.docs[0]?.data().name}</p> */}
          <p className="text-sm font-medium">
            Welcome back, {user?.displayName}
          </p>
          {/* Search */}

          <button
            className="bg-black px-2 py-1  text-white rounded cursor-pointer"
            onClick={handleSignOut}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
