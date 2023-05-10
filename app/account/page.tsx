"use client";

import { signOut, useSession } from "next-auth/react";
import Navbar from "../components/Navbar";
import { redirect, useRouter } from "next/navigation";
import { useEffect } from "react";

export default async function Account() {
	const { data: session, status } = useSession();
	const router = useRouter();

	useEffect(() => {
		if (!session?.user) return router.push("/login");
	}, [router, session]);

	return (
		<main className="flex flex-row w-screen h-screen">
			<Navbar />
			<div className="flex w-full h-full justify-center items-center">
				<p>LOREM PIPISIM</p>
				<button onClick={() => signOut({ callbackUrl: "/login" })}>Logg ut</button>
			</div>
		</main>
	);
}
