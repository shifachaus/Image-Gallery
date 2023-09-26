import React, { useEffect, useState } from "react";
import Image from "next/image";
import { FcLike } from "react-icons/fc";
import { GoHeart } from "react-icons/go";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { auth, db } from "../firebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";

type ImageData = {
  id: Number;
  urls: {
    small: string;
    regular: string;
  };
  user: {
    name: string;
  };
};

interface Like {
  likeId: string;
  userId: string;
}

type Props = {
  image: ImageData;
};

const Images = ({ image }: Props) => {
  const [user] = useAuthState(auth);

  const [show, setShow] = useState(false);
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState<Like[] | null>(null);

  const {
    id,
    urls: { small, regular },
    user: { name },
  } = image;

  const likeRef = collection(db, "likes");
  const likesDoc = query(likeRef, where("postId", "==", id));

  const getLikes = async () => {
    const data = await getDocs(likesDoc);

    // console.log(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    // setLikes(data?.docs?.length);
    // console.log(data.docs.map((doc) => ({ userId: doc.data().userId })));

    setLikes(
      data.docs.map((doc) => ({ userId: doc.data().userId, likeId: doc.id }))
    );
  };

  async function addLike() {
    try {
      const newDoc = await addDoc(likeRef, {
        userId: user?.uid,
        postId: id,
        regular,
        name,
        liked: true,
      });

      if (user) {
        setLikes((prev) =>
          prev
            ? // This is done to avoid mutating the state directly.
              [...prev, { userId: user?.uid, likeId: newDoc.id }]
            : [{ userId: user?.uid, likeId: newDoc.id }]
        );
      }
    } catch (err) {
      console.log(err);
    }
  }

  async function removeLike() {
    try {
      // query the specific 'like' that we want to delete
      const likeToDeleteQuery = query(
        likeRef,
        where("postId", "==", id),
        where("userId", "==", user?.uid)
      );
      // get the data from that 'like' to obtain the ID
      const likeToDeleteData = await getDocs(likeToDeleteQuery);
      //Put the ID inside the doc function.
      const likeId = likeToDeleteData.docs[0].id;
      const likeToDelete = doc(db, "likes", likeId);
      // delete a specific document.
      await deleteDoc(likeToDelete);

      if (user) {
        setLikes(
          (prev) => prev && prev.filter((like) => like.likeId !== likeId)
        );
      }
    } catch (err) {
      console.log(err);
    }
  }

  // Show 'Liked' if the current user has liked the post
  const hasUserLiked = likes?.find((like) => like?.userId === user?.uid);

  useEffect(() => {
    getLikes();
  }, []);

  return (
    <div className="relative bg-neutral-200 rounded-md">
      <Image
        src={regular}
        alt="Image"
        className="w-full object-cover object-center group-hover:opacity-75 h-72 cursor-pointer transition-all duration-300 ease-linear rounded-md"
        width={200}
        height={200}
        onDoubleClick={!hasUserLiked ? addLike : removeLike}
        onMouseOver={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
      />

      <div
        className={` ${
          show ? "block" : "hidden"
        } p-2 rounded-md absolute top-3 right-3 bg-white `}
      >
        {hasUserLiked ? (
          <FcLike className="text-lg" />
        ) : (
          <GoHeart className="font-bold  text-lg stroke-current text-black " />
        )}
      </div>
      <h2
        className={` ${
          show ? "block" : "hidden"
        } text-sm font-semibold text-white pb-2 absolute bottom-3  left-3`}
      >
        {name}
      </h2>

      {/* <p className="pt-2 text-white ">{likes?.length} likes</p> */}
    </div>
  );
};

export default Images;
