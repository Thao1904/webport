import mongoose, { Mongoose } from "mongoose"

declare global {
  var mongoose: {
    conn: Mongoose | null
    promise: Promise<Mongoose> | null
  }
}

const MONGODB_URI = process.env.MONGODB_URI || "mongodb+srv://tranconghieu0301_db_user:Tchieu0301@thaoportfolio.a4jwm4n.mongodb.net/"

if (!MONGODB_URI) {
  throw new Error("Missing MONGODB_URI")
}

let cached = global.mongoose

if (!cached) {
  cached = global.mongoose = {
    conn: null,
    promise: null,
  }
}

export async function connectDB() {
  if (cached.conn) return cached.conn

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI)
  }

  cached.conn = await cached.promise
  return cached.conn
}