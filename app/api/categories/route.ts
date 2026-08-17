import { CategoryService } from '@/server/services/category.service'
import { connectDB } from '@/config/db'
import { NextResponse } from 'next/server'

const service = new CategoryService()
export async function POST(req: Request) {
    try {
        await connectDB()
        const body = await req.json()
        const category = await service.createCategory(body)
        return NextResponse.json(category, { status: 201 })
    }
    catch (err: any) {
        if (err.message == "VALIDATION_ERROR") {
            return NextResponse.json({ error: err.message }, { status: 400 })
        }
    }
}
