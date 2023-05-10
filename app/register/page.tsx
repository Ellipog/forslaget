"use client";

import { useState } from "react";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  function register() {
    console.log(email, password);
    axios
      .post("/api/register", { email: email, password: password })
      .then((res) => {
        toast.success("Bruker opprettet!");
        router.push("/");
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <main className="w-screen h-screen bg-gray-600 flex flex-row">
      <div className="w-full h-full flex justify-center items-center ">
        <div className="flex justify-center items-center flex-col w-96 h-96 bg-slate-400 gap-4 rounded">
          <h1 className="text-2xl font-bold">Register</h1>
          <div className="flex flex-col gap-4 p-5">
            <input className="p-2 text-left rounded w-72" type="email" value={email} placeholder="E-Mail..." onChange={(e) => setEmail(e.target.value)} />
            <input className="p-2 text-left rounded w-72" type="password" value={password} placeholder="Password..." onChange={(e) => setPassword(e.target.value)} />
          </div>
          <button className="p-2 text-center rounded bg-slate-300 w-72" onClick={() => register()}>
            Registrer
          </button>
          <Link href="/login">
            <button className="p-2 text-center rounded bg-slate-300 w-72">Har allerede bruker</button>
          </Link>
        </div>
      </div>
    </main>
  );
}
