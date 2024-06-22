import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export const PUT = async (
    req: Request,
    { params }: { params: { id: string } },
) => {
    const id = params.id;
    const { name } = await req.json();

    if (!name) {
        return NextResponse.json({ status: 'Bad Request', message: 'Missing required fields' }, { status: 400 });
    }

    try {
        const category = await prisma.category.update({
            where: {
                id: parseInt(id),
            },
            data: {
                name,
            },
        })

        return NextResponse.json({ status: 'OK', category: category }, { status: 200 })
    } catch (error) {
        if (error instanceof Error) 
            return NextResponse.json({ status: error.message }, { status: 400 });
    }
}

export const DELETE = async (
    req: NextResponse,
    { params }: { params: { id: string } },
) => {
    const id = params.id;

    try {
        await prisma.category.delete({
            where: {
                id: parseInt(id),
            },
        })
        return NextResponse.json( { status: 'OK' }, { status: 200 } )
    } catch (error) {
        if (error instanceof Error)
            return NextResponse.json({ status: error.message }, { status: 400 })
    }
}