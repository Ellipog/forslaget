"use client";

import { useSession } from "next-auth/react";
import Navbar from "./components/Navbar";
import { useRouter } from "next/navigation";

export default function Home() {
	const { data: session, status } = useSession();
	const router = useRouter();

	return (
		<main className="w-screen h-screen bg-gray-600 flex flex-row">
			<Navbar />
			<div className="flex w-full h-full justify-center items-center"></div>
		</main>
	);
}
