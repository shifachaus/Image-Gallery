"use client";
import React, { useState, useEffect } from "react";
interface FilterProps {
  handleFilter: (category: string) => void;
  fetchImages: () => void;
}

const categories: string[] = ["Nature", "Ocean", "vintage"];

const FilterButtons: React.FC<FilterProps> = ({
  handleFilter,
  fetchImages,
}) => {
  const [active, setActive] = useState("Home");
  return (
    <div className="mt-14 flex gap-2  mx-auto flex-wrap  justify-center">
      <button
        onClick={() => {
          fetchImages();
          setActive("Home");
        }}
        className={`py-2 px-4 ${
          active === "Home"
            ? "text-white shadow-sm text-lg bg-black border hover:bg-gray-800  rounded-full"
            : "text-gray-600 font-medium text-md hover:text-gray-900"
        }`}
      >
        Home
      </button>
      {categories?.map((cat, index) => {
        return (
          <button
            key={index}
            onClick={() => {
              handleFilter(cat);
              setActive(cat);
            }}
            className={`py-2 px-4 ${
              active === cat
                ? "text-white shadow-sm text-lg bg-black border hover:bg-gray-800  rounded-full"
                : "text-gray-600 font-medium text-md hover:text-gray-900"
            }`}
          >
            {cat}
          </button>
        );
      })}
    </div>
  );
};

export default FilterButtons;
