"use client";
import React, { useState, useEffect, ChangeEvent } from "react";

const FilterButtons = () => {
  return (
    <div className="mt-14 flex gap-2  mx-auto flex-wrap  justify-center">
      <button className="shadow-sm py-1 px-4  text-white font-medium text-lg bg-black border  rounded-full">
        All
      </button>
      <button className=" py-1 px-4 text-md">Nature</button>
      <button className=" py-1 px-4 text-md">Ocean</button>
      <button className=" py-1 px-4 text-md">summer</button>
      <button className=" py-1 px-4 text-md">Travel</button>
    </div>
  );
};

export default FilterButtons;
