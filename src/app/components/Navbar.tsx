"use client";
"use client";
import React, { useState, useEffect } from "react";
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

  const [scrolling, setScrolling] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 500) {
        setScrolling(true);
      } else {
        setScrolling(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleSignOut = async () => {
    await signOut({ callbackUrl: "/sign-in" });
    await logOut(auth);
  };

  return (
    <main
      className={`absolute top-0 inset-x-0 h-fit  z-[10] py-4 transition-all duration-300`}
    >
      <nav className=" container max-w-7xl mx-auto flex items-start justify-between gap-02">
        <Link href="/" className="flex gap-2 item-center">
          <p className="text-stone-900 font-semibold text-lg tracking-wide ">
            Gallery
          </p>
        </Link>

        <div className="flex items-center gap-4 ">
          <p className={`text-sm font-semibold -tracking-tighter text-white`}>
            Hello, {user?.displayName}
          </p>

          <button
            className="px-2 py-1  rounded cursor-pointer"
            onClick={handleSignOut}
          >
            <span>
              <svg
                className={`w-5 h-5 text-white`}
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 16 16"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.4"
                  d="M4 8h11m0 0-4-4m4 4-4 4m-5 3H3a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h3"
                />
              </svg>
            </span>
          </button>
        </div>
      </nav>
    </main>
  );
};

export default Navbar;
