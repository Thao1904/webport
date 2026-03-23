import { connectDB } from "@/config/db"
import { ProjectService } from "@/server/services/project.service"
import { NextResponse } from "next/server"

const service = new ProjectService()

export async function GET(
  _: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB()

    const project = await service.getProjectById(params.id)

    return NextResponse.json(project)
  } catch (err: any) {
    if (err.message === "PROJECT_NOT_FOUND") {
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

    const updated = await service.updateProject(params.id, body)

    return NextResponse.json(updated)
  } catch (err: any) {
    if (err.message === "PROJECT_NOT_FOUND") {
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

    await service.deleteProject(params.id)

    return NextResponse.json({ message: "Deleted" })
  } catch (err: any) {
    if (err.message === "PROJECT_NOT_FOUND") {
      return NextResponse.json({ error: err.message }, { status: 404 })
    }

    return NextResponse.json({ error: "Failed" }, { status: 400 })
  }
}