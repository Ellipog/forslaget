"use client";

import { useSession } from "next-auth/react";
import Navbar from "../components/Navbar";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import axios from "axios";

export default function Home() {
	const { data: session, status } = useSession();
	const router = useRouter();
	const [batch, setBatch] = useState([]);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	async function sendBatch() {
		// axios post each element
		if (batch.length === 0) {
			toast.error("Ingen brukere i batch!");
			return;
		} else {
			Object.values(batch).map((user) => {
				axios.post("/api/register", user);
			});
			toast.success("Brukere opprettet! sendt!");
			setBatch([]);
		}
	}

	// will push the data from the email and password inputs to the batch array
	async function saveUser() {
		const isValidEmail = validateEmail(email);
		if (email === "" || password === "") {
			toast.error("Fyll inn alle feltene!");
			return;
		} else if (isValidEmail) {
			setBatch(() => [...batch, { email: email, password: password }]);
			setEmail("");
			setPassword("");
			toast.success("Bruker lagt til i batch!");
		} else {
			toast.error("Ugyldig email!");
			return;
		}
		console.log(batch);
	}

	function validateEmail(email: string) {
		const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return re.test(email);
	}

	return status === "unauthenticated" ? (
		router.push("/login")
	) : // @ts-ignore
	!session?.user.isAdmin ? (
		router.push("/")
	) : (
		<main className="w-screen h-screen bg-[#383838] flex flex-row justify-center items-center">
			<Navbar />
			<div className="flex w-3/6 h-full justify-center gap-5 items-center flex-col text-white">
				BATCH IMPORT
				{/* user creation */}
				<div className="flex flex-col gap-4">
					<input
						type="text"
						placeholder="Email..."
						className="border-2 border-white rounded p-2 bg-[#484848] text-white"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
					<input
						type="text"
						placeholder="Password..."
						className="border-2 border-white rounded p-2 bg-[#484848] text-white"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
					<button className="border-2 border-white rounded p-2 bg-[#484848] text-white" onClick={() => saveUser()}>
						Lagre bruker
					</button>
				</div>
			</div>
			<div className="flex w-3/6 h-5/6 justify-center gap-5 items-center flex-col text-white">
				<h1 className="font-bold text-2xl">Saved Users</h1>
				<div className="flex w-4/6 h-5/6 gap-6 justify-top items-center flex-col bg-[#404040] border-2 p-5 rounded">
					{Object.values(batch).map((user, i) => {
						return (
							<div key={i} className="flex flex-row gap-4 w-full">
								<div className="w-3/6">
									<p>Email:</p>
									<p>{user.email}</p>
								</div>
								<div className="w-3/6">
									<p>Password:</p>
									<p>{user.password}</p>
								</div>
								{/* button to remove current user from batch */}
								<button
									className="border-2 border-white rounded p-2 bg-[#484848] text-white"
									onClick={() => {
										const newBatch = [...batch];
										newBatch.splice(i, 1);
										setBatch(newBatch);
										toast.success("Bruker fjernet fra batch!");
									}}
								>
									Fjern bruker
								</button>
							</div>
						);
					})}
				</div>
				<button className="border-2 w-2/6 border-white rounded p-2 bg-[#484848] text-white" onClick={() => sendBatch()}>
					Send batch
				</button>
			</div>
		</main>
	);
}
