"use client";

import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import { auth, db } from "./firebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Gallery from "./components/Gallery";
import { onAuthStateChanged } from "firebase/auth";

export default function Home() {
  const router = useRouter();
  const session = useSession();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        router.push("/");
      } else {
        router.push("/sign-in");
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="p-8 ">
      <Navbar />
      <Gallery />
    </div>
  );
}
