import { connectDB } from "@/config/db"
import { ProjectService } from "@/server/services/project.service"
import { NextResponse } from "next/server"

const service = new ProjectService()

export async function GET() {
  try {
    await connectDB()

    const data = await service.getAllProjects()
    return NextResponse.json(data)
  } catch (err) {
    return NextResponse.json({ error: "Failed" }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    await connectDB()

    const body = await req.json()
    console.log(body);
    

    const project = await service.createProject(body)

    return NextResponse.json(project, { status: 201 })
  } catch (err: any) {
    console.log(err);
    
    if (err.message === "VALIDATION_ERROR") {
      return NextResponse.json({ error: err.message }, { status: 400 })
    }

    return NextResponse.json({ error: "Failed" }, { status: 500 })
  }
}