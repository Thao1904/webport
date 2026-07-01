import { connectDB } from "@/config/db"
import { ArtService } from "@/server/services/art.service"
import { NextResponse } from "next/server"

const service = new ArtService()

export async function GET() {
  try {
    await connectDB()

    const data = await service.getAllArts()
    return NextResponse.json(data)
  } catch (err) {
    return NextResponse.json({ error: "Failed" }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    await connectDB()

    const body = await req.json()

    const art = await service.createArt(body)

    return NextResponse.json(art, { status: 201 })
  } catch (err: any) {
    if (err.message === "VALIDATION_ERROR") {
      return NextResponse.json({ error: err.message }, { status: 400 })
    }

    return NextResponse.json({ error: "Failed" }, { status: 500 })
  }
}