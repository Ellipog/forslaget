"use client";

import { signOut, useSession } from "next-auth/react";
import Navbar from "../components/Navbar";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

export default function Account() {
	const { data: session, status } = useSession();
	const router = useRouter();

	return status === "unauthenticated" ? (
		router.push("/login")
	) : (
		<main className="w-screen h-screen bg-gray-600 flex flex-row">
			<Navbar />
			<div className="flex w-full h-full justify-around items-center flex-col">
				<p>Velkommen {session?.user.email}</p>
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
