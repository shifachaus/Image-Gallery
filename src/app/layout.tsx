import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import SessionProvider from "@/SessionProvider";
import SignIn from "./components/SignIn";
import Home from "./page";
import { getServerSession } from "next-auth";
// import { authOptions } from "../../pages/api/auth/[...nextauth]";
import { authOptions } from "./api/auth/[...nextauth]/route";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "GalleryGaze",
  description: "Infinite Imagery",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="antialiased">
          <SessionProvider session={session}>{children}</SessionProvider>
        </div>
      </body>
    </html>
  );
}
