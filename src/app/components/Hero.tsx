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

      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2">
        <input
          type="text"
          placeholder="Search for free photos"
          className="focus:ring-0 focus:border-gray-100 shadow-md border border-white rounded-lg bg-white font-semibold text-gray-500 placeholder-gray-500 text-lg  sm:w-[500px] md:w-[600px]   py-3 px-3 "
          onChange={onSearch}
          value={input}
        />
      </div>
    </div>
  );
};

export default Hero;
