"use client";
import React, { useState, useEffect } from "react";

import Images from "./Images";

const Gallery = () => {
  const [images, setImages] = useState([]);
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch(
          `https://api.unsplash.com/photos/?client_id=${process.env.NEXT_PUBLIC_UNPLASH_API_KEY}&per_page=30`
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        // console.log(data);
        setImages(data);
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };
    fetchImages();
  }, []);

  return (
    <div className="container max-w-7xl mx-auto grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3  justify-center ">
      {images?.map((image, index) => {
        const { id } = image;

        return <Images key={id} image={image} />;
      })}
    </div>
  );
};

export default Gallery;

// https://api.unsplash.com/search/collections?page=1&query=office&client_id=aavFyT0HePdkj1HFFMoHLmyJH_0sF1uyvljOArspHfw&count=20

//https://api.unsplash.com/photos/?client_id=aavFyT0HePdkj1HFFMoHLmyJH_0sF1uyvljOArspHfw&count=20

//https://api.unsplash.com/photos/random?client_id=${process.env.NEXT_PUBLIC_UNPLASH_API_KEY}&count=20
