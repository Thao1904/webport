import { connectDB } from "@/config/db"
import { ProjectService } from "@/server/services/project.service"
import { NextResponse } from "next/server"

const service = new ProjectService()

export async function GET(
  _: Request,
  { params }: { params: { slug: string } }
) {
  try {
    await connectDB()
    const { slug } = await params
    const project = await service.getProjectBySlug(slug)

    return NextResponse.json(project)
  } catch (err: any) {
    if (err.message === "PROJECT_NOT_FOUND") {
      return NextResponse.json({ error: err.message }, { status: 404 })
    }

    return NextResponse.json({ error: "Failed" }, { status: 400 })
  }
}