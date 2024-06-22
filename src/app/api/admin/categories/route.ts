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

export const POST = async (request: Request, context: any) => {
    try {
        const body = await request.json()
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
