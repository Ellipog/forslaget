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
	const [aktivitet, setAktivitet] = useState({ type: "Activity", tittel: "", beskrivelse: "", tid: "", sted: "", status: "🛠️venter", creation: Date.now() });
	const [update, setUpdate] = useState(false);

	async function fetchForslag() {
		const { data } = await axios.get("/api/fetchForslag");
		setForslag(data);
	}

	async function sendAktivitetForslag() {
		axios.post("/api/godtaActivityForslag", aktivitet);
		toast.success("Forslag sendt!");
		setTimeout(() => {
			setUpdate(!update);
		}, 1000);
	}

	useEffect(() => {
		fetchForslag();
	}, [update]);

	return status === "unauthenticated" ? (
		router.push("/login")
	) : (
		<main className="w-screen h-screen bg-[#383838] flex flex-row">
			<Navbar />
			<div className="flex w-full h-full justify-around items-center">
				<div className="w-2/5 h-5/6 bg-[#404040] flex justify-top items-center flex-col pt-5 gap-5 border-2 border-[#E0E0E0]">
					{Object.values(forslag).map((forslag, i) => {
						return <Forslag key={i} forslag={forslag} setForslag={setForslag} setUpdate={setUpdate} update={update} />;
					})}
				</div>
				<div className="w-1/5 h-5/6 bg-[#404040] flex justify-top items-center flex-col pt-5 gap-5 border-2 border-[#E0E0E0]">
					<div className="w-full p-4 pt-2 gap-2 rounded flex flex-col justify-center items-center">
						<h1 className="text-white font-extrabold">Aktivitet</h1>
						<input
							className="border-white bg-[#484848] text-white p-1 pr-2 border-2 w-full rounded"
							type="text"
							placeholder="Tittel"
							value={aktivitet.tittel}
							onChange={(e) => setAktivitet({ ...aktivitet, tittel: e.target.value })}
						/>
						<input
							className="border-white bg-[#484848] text-white p-1 pr-2 border-2 w-full rounded"
							type="text"
							placeholder="Beskrivelse"
							value={aktivitet.beskrivelse}
							onChange={(e) => setAktivitet({ ...aktivitet, beskrivelse: e.target.value })}
						/>
						<input
							className="border-white bg-[#484848] text-white p-1 pr-2 border-2 w-full rounded"
							type="date"
							placeholder="Tid"
							value={aktivitet.tid}
							onChange={(e) => setAktivitet({ ...aktivitet, tid: e.target.value })}
						/>
						<input
							className="border-white bg-[#484848] text-white p-1 pr-2 border-2 w-full rounded"
							type="text"
							placeholder="Sted"
							value={aktivitet.sted}
							onChange={(e) => setAktivitet({ ...aktivitet, sted: e.target.value })}
						/>
						<button className="p-1 pr-2 w-72 text-white font-medium" onClick={() => sendAktivitetForslag()}>
							Legg til forslag
						</button>
					</div>
				</div>
			</div>
		</main>
	);
}
