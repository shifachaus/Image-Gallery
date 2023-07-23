"use client";
import React, { useState, useEffect } from "react";

import Images from "./Images";

interface Image {
  id: string;
  urls: string;
}

const Gallery = () => {
  const [images, setImages] = useState<Image[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const fetchImages = async () => {
    try {
      const response = await fetch(
        `https://api.unsplash.com/photos?page=${page}&client_id=${process.env.NEXT_PUBLIC_UNPLASH_API_KEY}&per_page=9`
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      // console.log(data);
      setImages((prev) => [...prev, ...data]);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error fetching images:", error);
    }
  };
  useEffect(() => {
    fetchImages();
  }, [page]);

  useEffect(() => {
    console.log(
      document.documentElement.scrollHeight,
      window.innerHeight,
      document.documentElement.scrollTop
    );
    const handleInfiniteScroll = async () => {
      try {
        if (
          window.innerHeight + document.documentElement.scrollTop + 1 >=
          document.documentElement.scrollHeight
        ) {
          setLoading(true);
          setPage((prev) => prev + 1);
        }
      } catch (err) {}
    };

    window.addEventListener("scroll", handleInfiniteScroll);

    return () => window.removeEventListener("scroll", handleInfiniteScroll);
  }, []);

  console.log(loading);

  return (
    <div className="container max-w-7xl mx-auto flex flex-col gap-4">
      <div>
        <input
          type="text"
          placeholder="Search"
          className="bg-gray-900 border border-gray-900 "
        />
      </div>
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3  justify-center ">
        {images?.map((image, index) => {
          const { id } = image;

          return <Images key={id} image={image} />;
        })}
      </div>
      {loading && (
        <div className="bg-gray-900 border border-gray-900 p-2 mt-4 ">
          <h1 className="text-center font-medium">Loading...</h1>
        </div>
      )}
    </div>
  );
};

export default Gallery;

// https://api.unsplash.com/search/collections?page=1&query=office&client_id=aavFyT0HePdkj1HFFMoHLmyJH_0sF1uyvljOArspHfw&count=20

//https://api.unsplash.com/photos/?client_id=aavFyT0HePdkj1HFFMoHLmyJH_0sF1uyvljOArspHfw&count=20

//https://api.unsplash.com/photos/random?client_id=${process.env.NEXT_PUBLIC_UNPLASH_API_KEY}&count=20
