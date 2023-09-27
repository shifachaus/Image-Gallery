"use client";

import { useEffect } from "react";
import { auth } from "./firebaseConfig";
import { useRouter } from "next/navigation";
import Gallery from "./components/Gallery";
import { onAuthStateChanged } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import Loading from "./components/Loading";

export default function Home() {
  const router = useRouter();
  const [user] = useAuthState(auth);

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

  return <div>{user === null ? <Loading /> : <Gallery />}</div>;
}
