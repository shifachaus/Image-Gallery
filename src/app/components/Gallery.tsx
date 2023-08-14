"use client";
import React, { useState, useEffect } from "react";

import Images from "./Images";

interface Image {
  id: string;
  urls: string;
}

const Gallery = () => {
  const [images, setImages] = useState<Image[]>([]);
  const [filteredImages, setFilteredImages] = useState<Image[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [input, setInput] = useState("");

  const fetchImages = async () => {
    try {
      const response = await fetch(
        `https://api.unsplash.com/photos?page=${page}&client_id=${process.env.NEXT_PUBLIC_UNPLASH_API_KEY}&per_page=9`
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log();
      setImages((oldImages) => {
        if (page === 1) {
          return data;
        } else {
          return [...oldImages, ...data];
        }
      });
      setFilteredImages((oldImages) => {
        if (page === 1) {
          return data;
        } else {
          return [...oldImages, ...data];
        }
      });
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
    async function handleInfiniteScroll() {
      try {
        if (
          window.innerHeight + document.documentElement.scrollTop + 1 >=
          document.documentElement.scrollHeight
        ) {
          setLoading(true);
          setPage((prev) => prev + 1);
        }
      } catch (err) {
        console.log(err);
      }
    }

    window.addEventListener("scroll", handleInfiniteScroll);

    return () => window.removeEventListener("scroll", handleInfiniteScroll);
  }, [filteredImages]);

  const onSearch = () => {
    const filteredList = images?.filter((img: any) =>
      img?.user?.name.toLowerCase().includes(input.toLowerCase())
    );
    setFilteredImages(filteredList);
  };

  return (
    <div className="container max-w-7xl mx-auto flex flex-col gap-4">
      <div>
        <input
          type="text"
          placeholder="Search..."
          className="bg-gray-900 border border-slate-300 rounded"
          onChange={(e) => {
            setInput(e.target.value), onSearch();
          }}
          value={input}
        />
      </div>
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3  justify-center ">
        {filteredImages?.map((image, index) => {
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
