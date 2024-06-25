import { supabase } from "@/utils/supabase";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export const GET = async (request: Request) => {
    try {
        const categories = await prisma.category.findMany({
            orderBy: {
                createdAt: 'desc',
            },
        })

        return NextResponse.json({ status: 'OK', categories: categories }, { status: 200 })
    } catch (error) {
        if (error instanceof Error)
            return NextResponse.json({ status: error.message }, { status: 500 })
    }
}

export const POST = async (req: Request, context: any) => {
    const token = req.headers.get('Authorization') ?? '';
    const { error } = await supabase.auth.getUser(token)
    if (error)
        return NextResponse.json({ status: error.message }, { status: 400 })

    try {
        const body = await req.json()
        const { name } = body

        const data = await prisma.category.create({ data: { name } })

        return NextResponse.json({
            status: 'OK',
            message: '作成しました。',
            id: data.id,
        })
    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({ status: error.message }, { status: 400 });
        }
    }
}
