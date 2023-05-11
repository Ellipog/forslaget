"use client";

import Navbar from "../components/Navbar";
import Link from "next/link";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function Login() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const router = useRouter();

	return (
		<main className="w-screen h-screen bg-[#383838] flex flex-row">
			<div className="w-full h-full flex justify-center items-center ">
				<div className="flex justify-center items-center flex-col w-96 h-96 bg-[#404040] gap-4 border-4 border-white">
					<h1 className="text-2xl font-bold text-white">Login</h1>
					<div className="flex flex-col gap-4 p-5">
						<input
							className="p-2 text-left w-72 border-2 border-white bg-[#404040] text-white"
							type="email"
							value={email}
							placeholder="E-Mail..."
							onChange={(e) => setEmail(e.target.value)}
						/>
						<input
							className="p-2 text-left w-72 border-2 border-white bg-[#404040] text-white"
							type="password"
							value={password}
							placeholder="Password..."
							onChange={(e) => setPassword(e.target.value)}
						/>
					</div>
					<button
						className="p-2 text-center rounded bg-white w-72"
						onClick={() => {
							signIn("credentials", { email: email, password: password, redirect: false }).then((res) => {
								if (res.error) {
									toast.error("Feil email eller passord 💀");
								} else {
									toast.success("Logget inn!");
									router.push("/");
								}
							});
						}}
					>
						Logg in
					</button>
					<Link href="/register">
						<button className="p-2 text-center rounded bg-white w-72">Har ikke bruker?</button>
					</Link>
				</div>
			</div>
		</main>
	);
}
