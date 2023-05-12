"use client";

import { signOut, useSession } from "next-auth/react";
import Navbar from "../components/Navbar";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

export default function Account() {
  const { data: session, status } = useSession();
  const router = useRouter();

  // logic to check if the user is an admin or not + if its logged in or not
  return status === "unauthenticated" ? (
    router.push("/login")
  ) : // @ts-ignore
  session?.user.isAdmin ? (
    <main className="w-screen h-screen bg-[#383838] flex flex-row">
      <Navbar />
      <div className="flex w-full h-full justify-center gap-12 items-center flex-col">
        <p className="text-white">Velkommen {session?.user.email}</p>
        <button
          className="p-2 text-center rounded bg-slate-300 w-72"
          onClick={() => {
            router.push("/batch");
          }}
        >
          Batch opprett brukere
        </button>
        <button
          className="p-2 text-center rounded bg-slate-300 w-72"
          onClick={() => {
            toast.success("Logget ut!");
            signOut({ callbackUrl: "/login" });
          }}
        >
          Logg ut
        </button>
      </div>
    </main>
  ) : (
    <main className="w-screen h-screen bg-[#383838] flex flex-row">
      <Navbar />
      <div className="flex w-full h-full justify-center gap-12 items-center flex-col">
        <p className="text-white">Velkommen {session?.user.email}</p>
        <button
          className="p-2 text-center rounded bg-slate-300 w-72"
          onClick={() => {
            toast.success("Logget ut!");
            signOut({ callbackUrl: "/login" });
          }}
        >
          Logg ut
        </button>
      </div>
    </main>
  );
}
