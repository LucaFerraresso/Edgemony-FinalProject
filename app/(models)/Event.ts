import mongoose, { Schema } from "mongoose";

mongoose.connect(process.env.MONGODB_URI!);
mongoose.Promise = global.Promise;

const eventSchema = new Schema({
    _id: { type: String, required: true },
    title: { type: String, required: true },
    longTitle: { type: String, required: true },
    image: { type: String, required: true },
    tag: { type: [String], required: true },  // Modifica qui per essere un array di stringhe
    description: { type: String, required: true },
    date: { type: String, required: false },
    price: { type: String, required: false },
    location: { type: String, required: false },
});

const Event = mongoose.models.Event || mongoose.model("Event", eventSchema);

export default Event;