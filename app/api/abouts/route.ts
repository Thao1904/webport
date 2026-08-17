import { connectDB } from "@/config/db";
import { AboutService } from "@/server/services/about.service";
import { NextResponse } from "next/server";

const service = new AboutService()
export async function POST(req: Request) {
    try {
        await connectDB()

        const body = await req.json()

        const about = await service.createAbout(body)
        return NextResponse.json(about, { status: 201 })
    }
    catch (err: any) {
        if (err.message === "VALIDATION_ERROR") {
            return NextResponse.json({ error: err.message }, { status: 400 })
        }
        return NextResponse.json({ error: "Failed" }, { status: 500 })
    }
}