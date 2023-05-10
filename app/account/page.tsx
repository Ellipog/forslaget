"use client";

import { signOut, useSession } from "next-auth/react";
import Navbar from "../components/Navbar";
import { useRouter } from "next/navigation";

export default function Account() {
  const { data: session, status } = useSession();
  const router = useRouter();

  return status === "unauthenticated" ? (
    router.push("/login")
  ) : (
    <main className="flex flex-row w-screen h-screen">
      <Navbar />
      <div className="flex w-full h-full justify-center items-center">
        <p>LOREM PIPISIM</p>
        <button onClick={() => signOut({ callbackUrl: "/login" })}>Logg ut</button>
      </div>
    </main>
  );
}
