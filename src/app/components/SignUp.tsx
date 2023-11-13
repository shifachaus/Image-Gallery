"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import gallery from "../../../public/gallery.png";
import axios from "axios";
import { auth } from "../firebaseConfig";

import { useRouter } from "next/navigation";
import { useAuthState } from "react-firebase-hooks/auth";
import Image from "next/image";

const SignUp = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const router = useRouter();
  const [user, loading, error] = useAuthState(auth);

  const registerUser = async (e: any) => {
    e.preventDefault();
    const data = { name, password, email };
    try {
      const response = await axios.post("/api/register", data, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      router.push("/sign-in");
    } catch (err) {
      console.log(err);
      alert("An error occurred!");
    }
  };

  useEffect(() => {
    if (user) {
      router.push("/");
    }
  }, [router, user]);

  return (
    <section className="relative  space-y-6 md:grid md:grid-flow-col">
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
        <div className="flex flex-col gap-2">
          <h3 className="mt-20 text-2xl md:text-3xl font-bold leading-9 tracking-normal text-neutral-800">
            Sign Up
          </h3>
          <p className="text-sm font-light  text-gray-600">
            Please fill your information below
          </p>
        </div>

        <div className="mt-10 md:w-[300px] lg:w-[400px]">
          <form className="space-y-6" onSubmit={registerUser}>
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium leading-6 text-gray-700"
              >
                Name
              </label>
              <div className="mt-2">
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  placeholder="Name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="block bg-transparent w-full rounded-md border-0 py-1.5 text-neutral-700 shadow-sm ring-1 ring-inset ring-gray-400 placeholder:text-neutral-500 focus:ring-1 focus:ring-inset focus:ring-gray-400 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

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
                  className="block bg-transparent w-full rounded-md border-0 py-1.5 text-neutral-700 shadow-sm ring-1 ring-inset ring-gray-400 placeholder:text-neutral-500 focus:ring-1 focus:ring-inset focus:ring-gray-400 sm:text-sm sm:leading-6"
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
                  placeholder="******************"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block bg-transparent w-full rounded-md border-0 py-1.5 text-neutral-700 shadow-sm ring-1 ring-inset ring-gray-400 placeholder:text-neutral-500 focus:ring-1 focus:ring-inset focus:ring-gray-400 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                disabled={!name || !email || !password}
                type="submit"
                className="mt-8 flex w-full justify-center rounded-md bg-gray-900 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
              >
                Register
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-neutral-500">
            Already have an account?{"  "}
            <Link
              href="/sign-in"
              className="text-sm text-[#007DFA] font-semibold"
            >
              Login to your account
            </Link>
          </p>
        </div>
      </main>
    </section>
  );
};

export default SignUp;
