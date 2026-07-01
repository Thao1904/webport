import { connectDB } from "@/config/db"
import { ExperienceService } from "@/server/services/experience.service"
import { NextResponse } from "next/server"

const service = new ExperienceService()

export async function GET() {
  try {
    await connectDB()

    const data = await service.getAllExperiences()
    return NextResponse.json(data)
  } catch (err) {
    return NextResponse.json({ error: "Failed" }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    await connectDB()

    const body = await req.json()
    const experience = await service.createExperience(body)

    return NextResponse.json(experience, { status: 201 })
  } catch (err: any) {
    if (err.message === "VALIDATION_ERROR") {
      return NextResponse.json({ error: err.message }, { status: 400 })
    }

    return NextResponse.json({ error: "Failed" }, { status: 500 })
  }
}