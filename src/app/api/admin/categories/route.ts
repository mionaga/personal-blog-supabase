import { PrismaClient } from "@prisma/client/extension";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export const GET = async (req: NextRequest) => {
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

export const POST = async (req: Request) => {
    try {
        const body = await req.json();
        const { name } = body;

        if(!name) {
            return NextResponse.json({ status: 'Bad Request', message: 'Missing required fields' }, { status: 400 });
        }

        const data = await prisma.category.create({ data: { name } })

        return NextResponse.json({
            status: 'OK',
            message: '作成しました。',
            id: data.id,
        })
    } catch (error) {
        if (error instanceof Error)
        return NextResponse.json({ status: error.message }, { status: 500 });
    }
}