"use client";
import React, { useState, useEffect, ChangeEvent } from "react";
import heroImage from "../../../public/heroImage.jpg";
import Image from "next/image";
import Navbar from "./Navbar";

interface SearchProps {
  onSearch: (e: ChangeEvent<HTMLInputElement>) => void;
  input: string;
}

const Hero: React.FC<SearchProps> = ({ onSearch, input }) => {
  return (
    <div className="relative">
      <Navbar />

      <Image
        src={heroImage}
        alt="Image"
        className="w-full object-cover object-center group-hover:opacity-75 h-[500px] cursor-pointer transition-all duration-300 ease-linear"
        quality={100}
        placeholder="blur"
      />

      <div className="flex items-center absolute top-1/2 left-1/2 transform -translate-x-1/2  shadow-md rounded-lg bg-white     py-1 px-3">
        <input
          type="text"
          placeholder="Search for free photos"
          className="sm:w-[500px] md:w-[600px] border border-white focus:ring-0 focus:border-gray-500 font-semibold text-gray-500 placeholder-gray-500 text-lg "
          onChange={onSearch}
          value={input}
        />
        <span className="px-4">
          <svg
            className="w-5 h-5 text-gray-500 "
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
        </span>
      </div>
    </div>
  );
};

export default Hero;
