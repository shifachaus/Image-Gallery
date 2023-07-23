import bcrypt from "bcrypt";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "@/app/firebaseConfig";
import {
  getFirestore,
  collection,
  addDoc,
  doc,
  setDoc,
} from "firebase/firestore";
import { NextResponse } from "next/server";

export async function POST(request) {
  console.log(request, "REQ");
  const body = await request.json();
  const { name, email, password } = body;

  if (!name || !email || !password)
    return new NextResponse("Mission Fields", { status: 400 });

  const userAuth = await createUserWithEmailAndPassword(auth, email, password);
  updateProfile(userAuth.user, {
    displayName: name,
  });

  const userDocRef = doc(db, "users", userAuth.user.uid);
  try {
    const userRef = await setDoc(userDocRef, {
      name,
      email,
      id: userAuth.user.uid,
    });

    console.log(userDocRef, "VALUE");
    return NextResponse.json(userDocRef);
  } catch (error) {
    if (error.code === "auth/email-already-in-use") {
      console.log("Invalid email id");
    } else {
      console.log("error creating the user", error.message);
      console.log("error creating the user", error.message);
    }
  }
}
