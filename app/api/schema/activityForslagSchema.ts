import mongoose from "mongoose";

const activityForslagSchema = new mongoose.Schema({
	type: { type: String, required: true },
	beskrivelse: { type: String, required: true },
	tittel: { type: String, default: false },
	sted: { type: String, default: false },
	tid: { type: String, default: false },
	status: { type: String, default: false },
	creation: { type: String, default: false },
});

export default activityForslagSchema;
