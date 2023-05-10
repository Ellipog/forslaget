"use client";

import { useSession } from "next-auth/react";
import Navbar from "./components/Navbar";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Forslag from "./components/Forslag";
import { toast } from "react-hot-toast";
import axios from "axios";

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [forslag, setForslag] = useState([]);
  const [aktivitet, setAktivitet] = useState({ type: "aktivitet", tittel: "", beskrivelse: "", tid: "", sted: "", status: "🛠️venter" });

  async function fetchForslag() {
    const { data } = await axios.get("/api/fetchForslag");
    setForslag(data);
  }

  async function sendAktivitetForslag() {
    axios.post("/api/godtaActivityForslag", aktivitet);
    toast.success("Forslag sendt!");
    router.refresh();
  }

  useEffect(() => {
    fetchForslag();
  }, []);

  return status === "unauthenticated" ? (
    router.push("/login")
  ) : (
    <main className="w-screen h-screen bg-gray-600 flex flex-row">
      <Navbar />
      <div className="flex w-full h-full justify-around items-center">
        <div className="w-2/5 h-5/6 bg-gray-500 flex justify-top items-center flex-col pt-5 gap-5 rounded">
          {Object.values(forslag).map((forslag) => {
            return <Forslag key={283871630194} forslag={forslag} setForslag={setForslag} />;
          })}
        </div>
        <div className="w-1/5 h-5/6 bg-gray-500 flex justify-top items-center flex-col pt-5 gap-5 rounded p-5">
          <div className="bg-gray-400 w-full p-4 pt-2 gap-2 rounded flex flex-col justify-center items-center">
            <h1 className="font-bold">Aktivitet</h1>
            <input className="bg-gray-300 p-1 pr-2 rounded w-full" type="text" placeholder="Tittel" value={aktivitet.tittel} onChange={(e) => setAktivitet({ ...aktivitet, tittel: e.target.value })} />
            <input
              className="bg-gray-300 p-1 pr-2 rounded w-full"
              type="text"
              placeholder="Beskrivelse"
              value={aktivitet.beskrivelse}
              onChange={(e) => setAktivitet({ ...aktivitet, beskrivelse: e.target.value })}
            />
            <input className="bg-gray-300 p-1 pr-2 rounded w-full" type="date" placeholder="Tid" value={aktivitet.tid} onChange={(e) => setAktivitet({ ...aktivitet, tid: e.target.value })} />
            <input className="bg-gray-300 p-1 pr-2 rounded w-full" type="text" placeholder="Sted" value={aktivitet.sted} onChange={(e) => setAktivitet({ ...aktivitet, sted: e.target.value })} />
            <button className="bg-gray-200 p-1 pr-2 rounded w-full" onClick={() => sendAktivitetForslag()}>
              Legg til forslag
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
