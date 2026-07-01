import { connectDB } from "@/config/db"
import { ArtService } from "@/server/services/art.service"
import { NextResponse } from "next/server"

const service = new ArtService()

export async function GET(
  _: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB()

    const art = await service.getArtById(params.id)

    return NextResponse.json(art)
  } catch (err: any) {
    if (err.message === "ART_NOT_FOUND") {
      return NextResponse.json({ error: err.message }, { status: 404 })
    }

    return NextResponse.json({ error: "Failed" }, { status: 400 })
  }
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB()

    const body = await req.json()

    const updated = await service.updateArt(params.id, body)

    return NextResponse.json(updated)
  } catch (err: any) {
    if (err.message === "ART_NOT_FOUND") {
      return NextResponse.json({ error: err.message }, { status: 404 })
    }

    return NextResponse.json({ error: "Failed" }, { status: 400 })
  }
}

export async function DELETE(
  _: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB()

    await service.deleteArt(params.id)

    return NextResponse.json({ message: "Deleted" })
  } catch (err: any) {
    if (err.message === "ART_NOT_FOUND") {
      return NextResponse.json({ error: err.message }, { status: 404 })
    }

    return NextResponse.json({ error: "Failed" }, { status: 400 })
  }
}