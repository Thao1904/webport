import { connectDB } from "@/config/db"
import { SocialService } from "@/server/services/social.service"
import { NextResponse } from "next/server"

const service = new SocialService()
export async function POST(req: Request) {
    try {
        await connectDB()

        const body = await req.json()

        const social = await service.createSocial(body)
        return NextResponse.json(social, { status: 201 })
    }
    catch (err: any) {
        if (err.messsage == "VALIDATION_ERROR") {
            return NextResponse.json({ error: err.message }, { status: 400 })
        }
    }
}
