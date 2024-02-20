import mongoose from "mongoose";

export function connect() {
  mongoose
    .connect(process.env.MongoDB_URL!, {
      tls: true,
    })
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.error("Hey there is some error", err));
}
