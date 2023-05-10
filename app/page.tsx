"use client";

import { useSession } from "next-auth/react";
import Navbar from "./components/Navbar";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Forslag from "./components/Forslag";

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [forslag, setForslag] = useState([
    {
      type: "activity",
      beskrivelse: "Beklager, men jeg forstår fortsatt ikke hva du mener. Kan du gi meg mer informasjon eller spesifisere hva du mener?",
      tittel: "CRAZY TILLEG I BONUS",
      sted: "Oslo",
      tid: Date.now(),
      status: "🛠️pending",
    },
  ]);

  return status === "unauthenticated" ? (
    router.push("/login")
  ) : (
    <main className="w-screen h-screen bg-gray-600 flex flex-row">
      <Navbar />
      <div className="flex w-full h-full justify-around items-center">
        <div className="w-2/5 h-5/6 bg-gray-500 flex justify-top items-center flex-col pt-5 gap-5 rounded">
          {Object.values(forslag).map((forslag) => {
            return <Forslag key={283871630194} forslag={forslag} />;
          })}
        </div>
        <div className="w-1/5 h-5/6 bg-gray-500 flex justify-top items-center flex-col pt-5 gap-5 rounded p-5">
          <div className="bg-gray-400 w-full p-4 pt-2 gap-2 rounded flex flex-col justify-center items-center">
            <h1 className="font-bold">Aktivitet</h1>
            <input className="bg-gray-300 p-1 pr-2 rounded w-full" type="text" placeholder="Tittel" />
            <input className="bg-gray-300 p-1 pr-2 rounded w-full" type="text" placeholder="Beskrivelse" />
            <input className="bg-gray-300 p-1 pr-2 rounded w-full" type="text" placeholder="Tid" />
            <input className="bg-gray-300 p-1 pr-2 rounded w-full" type="text" placeholder="Sted" />
            <button className="bg-gray-200 p-1 pr-2 rounded w-full">Legg til forslag</button>
          </div>
        </div>
      </div>
    </main>
  );
}
