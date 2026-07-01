import { connectDB } from "@/config/db"
import { ExperienceService } from "@/server/services/experience.service"
import { NextResponse } from "next/server"

const service = new ExperienceService()

export async function GET(
  _: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB()

    const experience = await service.getExperienceById(params.id)

    return NextResponse.json(experience)
  } catch (err: any) {
    if (err.message === "EXPERIENCE_NOT_FOUND") {
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
    const updated = await service.updateExperience(params.id, body)

    return NextResponse.json(updated)
  } catch (err: any) {
    if (err.message === "EXPERIENCE_NOT_FOUND") {
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

    await service.deleteExperience(params.id)

    return NextResponse.json({ message: "Deleted" })
  } catch (err: any) {
    if (err.message === "EXPERIENCE_NOT_FOUND") {
      return NextResponse.json({ error: err.message }, { status: 404 })
    }

    return NextResponse.json({ error: "Failed" }, { status: 400 })
  }
}