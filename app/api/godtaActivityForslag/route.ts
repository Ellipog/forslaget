import mongoose from "mongoose";
import { NextResponse } from "next/server";
import userSchema from "../schema/activityForslagSchema";

if (mongoose.modelNames().includes("Forslag")) {
	var forslag = mongoose.model("Forslag");
} else {
	forslag = mongoose.model("Forslag", userSchema);
}

mongoose.connect(process.env.MONGODB);

export async function POST(request: Request) {
	const body = await request.json();
	const { type, beskrivelse, tittel, sted, tid, status, creation } = body;
	const filter = { beskrivelse: beskrivelse, tittel: tittel };

	const update = { type: type, beskrivelse: beskrivelse, tittel: tittel, sted: sted, tid: tid, status: status, creation: creation };
	const options = { upsert: true };
	const Forslag = await forslag.findOneAndUpdate(filter, update, options);

	return NextResponse.json(Forslag);
}
