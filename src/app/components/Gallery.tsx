"use client";
import React, { useState, useEffect, ChangeEvent } from "react";

import Images from "./Images";
import Hero from "./Hero";
import FilterButtons from "./FilterButtons";

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

  const onSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
    const filteredList = images?.filter((img: any) =>
      img?.user?.name.toLowerCase().includes(input.toLowerCase())
    );
    setFilteredImages(filteredList);
  };

  return (
    <section>
      <Hero onSearch={onSearch} input={input} />
      <main className=" max-w-7xl mx-auto flex flex-col gap-4 ">
        <FilterButtons />
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-3 mt-10 p-4">
          {filteredImages?.map((image, index) => {
            const { id } = image;

            return <Images key={id} image={image} />;
          })}
        </div>
        {loading && (
          <div className="rounded shadow-sm w-1/2 mx-auto bg-neutral-200 border border-neutral-200 p-2 my-5 ">
            <h1 className="text-center font-medium">Loading...</h1>
          </div>
        )}
      </main>
    </section>
  );
};

export default Gallery;
