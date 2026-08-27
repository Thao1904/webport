import { UploadService } from "@/server/services/upload.service"
import { NextResponse } from "next/server"

const service = new UploadService()
export async function POST(req: Request) {
    try {
        const body = await req.json()

        const social = await service.uploadFile(body.base64, body.storageFolder)
        return NextResponse.json(social, { status: 201 })
    }
    catch (err: any) {
        if (err.messsage == "VALIDATION_ERROR") {
            return NextResponse.json({ error: err.message }, { status: 400 })
        }
    }
}
