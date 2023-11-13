"use client";
import React, { useState, useEffect, ChangeEvent } from "react";

import Images from "./Images";
import Hero from "./Hero";
import FilterButtons from "./FilterButtons";
import Loading from "./Loading";

interface Image {
  id: string;
  urls: {
    small: string;
    regular: string;
  };
  user?: {
    name: string;
  };
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

  const onSearch = async (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
    if (input === "") return;
    try {
      const response = await fetch(
        `https://api.unsplash.com/search/photos?client_id=${process.env.NEXT_PUBLIC_UNPLASH_API_KEY}&query=${input}`
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setFilteredImages(data.results);

      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error fetching images:", error);
    }
  };

  const handleFilter = async (category: string) => {
    try {
      const response = await fetch(
        `https://api.unsplash.com/search/photos?client_id=${process.env.NEXT_PUBLIC_UNPLASH_API_KEY}&query=${category}`
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      // console.log(data.results, "HEE");
      setFilteredImages(data.results);

      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error fetching images:", error);
    }
  };

  return (
    <section>
      <Hero onSearch={onSearch} input={input} />
      <main className=" max-w-7xl mx-auto flex flex-col gap-4 ">
        <FilterButtons handleFilter={handleFilter} fetchImages={fetchImages} />

        {filteredImages.length === 0 ? (
          <Loading />
        ) : (
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-3 mt-10 p-4">
            {filteredImages?.map((image, index) => {
              return <Images key={index} image={image} />;
            })}
          </div>
        )}
      </main>
    </section>
  );
};

export default Gallery;
