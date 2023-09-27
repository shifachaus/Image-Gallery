"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { redirect } from "next/navigation";
import { auth } from "@/app/firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useAuthState } from "react-firebase-hooks/auth";
import gallery from "../../../public/gallery.png";
import Image from "next/image";

const SignIn = () => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [user, loading, error] = useAuthState(auth);

  const router = useRouter();

  const loginUser = async (e: any) => {
    e.preventDefault();

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      await signIn("credentials", {
        email,
        password,
        redirect: true,
        callbackUrl: "/",
      });
    } catch (error) {
      console.log("Error signing in:", error);
    }
  };

  useEffect(() => {
    if (user) {
      router.push("/");
    }
  }, [router, user]);

  return (
    <section className="relative    space-y-6 md:grid md:grid-flow-col ">
      <div className="hidden md:block overflow-hidden md:col-span-5 ">
        <Image
          src={gallery}
          alt="Image"
          className="w-10/12 h-screen object-cover object-center group-hover:opacity-75 cursor-pointer transition-all duration-300 ease-linear"
          quality={100}
          placeholder="blur"
        />
      </div>
      <main className="mx-auto  md:col-span-7 container">
        <h3 className="mt-20 text-2xl md:text-3xl font-bold leading-9 tracking-normal text-gray-800">
          Welcome Back!
        </h3>

        <div className="mt-10  md:w-[300px] lg:w-[400px]">
          <form className="space-y-6" onSubmit={loginUser}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-700"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="Email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block bg-transparent w-full rounded-md border-0 py-1.5 text-neutral-400 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-neutral-400 focus:ring-1 focus:ring-inset focus:ring-gray-400 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-700"
              >
                Password
              </label>

              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  placeholder="*********************"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block bg-transparent w-full rounded-md border-0 py-1.5 text-neutral-400 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-neutral-400 focus:ring-1 focus:ring-inset focus:ring-gray-400 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                disabled={!email || !password}
                type="submit"
                className="mt-8 flex w-full justify-center rounded-md bg-gray-900 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
              >
                Sign In
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-neutral-400">
            Don’t haven an account?{" "}
            <Link
              href="/sign-up"
              className="text-sm text-[#007DFA] font-semibold"
            >
              Sign up
            </Link>
          </p>
        </div>
      </main>
    </section>
  );
};

export default SignIn;
