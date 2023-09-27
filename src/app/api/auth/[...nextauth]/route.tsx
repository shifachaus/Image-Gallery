import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/app/firebaseConfig";
import { FirestoreAdapter } from "@auth/firebase-adapter";
import { cert } from "firebase-admin/app";
import { Adapter } from "next-auth/adapters";

export const authOptions: AuthOptions = {
  // Configure one or more authentication providers
  adapter: FirestoreAdapter({
    credential: cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY!.replace(/\\n/g, "\n"),
    }),
  }) as Adapter,

  pages: {
    signIn: "/sign-in",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
        username: {
          label: "Username",
          type: "text",
          placeholder: "John Smith",
        },
      },
      async authorize(credentials): Promise<any> {
        try {
          const userCredential = await signInWithEmailAndPassword(
            auth,
            (credentials as any).email,
            (credentials as any).password
          );

          // You can return the user object or any additional data you want to pass to the session
          return Promise.resolve(userCredential.user);
        } catch (error) {
          // If authentication fails, return null or throw an error
          // (Note: Returning null here will display a generic "Invalid credentials" error message)
          return Promise.resolve(null);
        }
      },
    }),
  ],

  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
