import mongoose from "mongoose";
import { NextResponse } from "next/server";
import userSchema from "../schema/activityForslagSchema";

if (mongoose.modelNames().includes("Forslag")) {
  var forslag = mongoose.model("Forslag");
} else {
  forslag = mongoose.model("Forslag", userSchema);
}

mongoose.connect(process.env.MONGODB);

export async function GET(request: Request) {
  const Forslag = await forslag.find({});

  return NextResponse.json(Forslag);
}
