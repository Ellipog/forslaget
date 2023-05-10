"use client";

import Navbar from "../components/Navbar";
import Link from "next/link";
import axios from "axios";
import { useState } from "react";
import { signIn } from "next-auth/react";

export default function Login() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	return (
		<main className="w-screen h-screen bg-gray-600 flex flex-row">
			<Navbar />
			<div className="w-full h-full flex justify-center items-center ">
				<div className="flex justify-center items-center flex-col w-96 h-96 bg-slate-400 gap-4 rounded">
					<h1 className="text-2xl font-bold">Login</h1>
					<div className="flex flex-col gap-4 p-5">
						<input className="p-2 text-left rounded w-72" value={email} placeholder="E-Mail..." onChange={(e) => setEmail(e.target.value)} />
						<input className="p-2 text-left rounded w-72" value={password} placeholder="Password..." onChange={(e) => setPassword(e.target.value)} />
					</div>
					<button className="p-2 text-center rounded bg-slate-300 w-72" onClick={() => signIn("credentials", { email: email, password: password, callbackUrl: "/" })}>
						Logg in
					</button>
					<Link href="/register">
						<button className="p-2 text-center rounded bg-slate-300 w-72">Har ikke bruker?</button>
					</Link>
				</div>
			</div>
		</main>
	);
}
