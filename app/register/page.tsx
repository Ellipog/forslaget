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

  // validates email, check if email is empty, check if password is empty, send post request to /api/register
  function register() {
    const isValidEmail = validateEmail(email);
    if (email === "" || password === "") {
      toast.error("Fyll inn alle feltene!");
      return;
    } else if (isValidEmail) {
      // makes account, sends email and password to /api/register folder
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
    } else {
      toast.error("Ugyldig email!");
      return;
    }
  }

  function validateEmail(email: string) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  return (
    <main className="w-screen h-screen bg-[#383838] flex flex-row">
      <div className="w-full h-full flex justify-center items-center ">
        <div className="flex justify-center items-center flex-col w-96 h-96 bg-[#404040] gap-4 border-4 border-white">
          <h1 className="text-2xl font-bold text-white">Register</h1>
          <div className="flex flex-col gap-4 p-5">
            <input className="p-2 text-left w-72 border-2 border-white bg-[#404040] text-white" type="email" value={email} placeholder="E-Mail..." onChange={(e) => setEmail(e.target.value)} />
            <input
              className="p-2 text-left w-72 border-2 border-white bg-[#404040] text-white"
              type="password"
              value={password}
              placeholder="Password..."
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button className="p-2 text-center rounded bg-white w-72" onClick={() => register()}>
            Registrer
          </button>
          <Link href="/login">
            <button className="p-2 text-center rounded bg-white w-72">Har allerede bruker</button>
          </Link>
        </div>
      </div>
    </main>
  );
}
