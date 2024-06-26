import { supabase } from "@/utils/supabase";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export const PUT = async (
    req: Request,
    { params }: { params: { id: string } },
) => {
    const id = params.id;
    const token = req.headers.get('Authorization') ?? '';
    const { error } = await supabase.auth.getUser(token);
    const { name } = await req.json();

    if(error) {
        return NextResponse.json({ status: error.message }, { status: 400 })
    }

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
    req: NextRequest,
    { params }: { params: { id: string } },
) => {
    const token = req.headers.get('Authorization') ?? '';
    const { error } = await supabase.auth.getUser(token); 
    const id = params.id;

    if (error)
        return NextResponse.json({ status: error.message }, { status: 400 })

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