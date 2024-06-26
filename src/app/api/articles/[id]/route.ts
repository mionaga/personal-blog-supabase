import { PrismaClient } from "@prisma/client"
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export const GET = async (
    req: Request,
    { params }: { params: { id: string} },
) => {
    const id = params.id

    try {
        const article = await prisma.article.findUnique({
            where: {
                 id: parseInt(id),
             },

             include: {
                articleCategories: {
                    include: {
                        category: {
                            select: {
                                id: true,
                                name: true,
                            },
                        },
                    } 
                },
             },
        })

        if (!article) {
            return NextResponse.json({ status: 'Not Found' }, { status: 404 });
        }

        return NextResponse.json({ status: 'OK', article: article }, {status: 200});
    } catch (error) {
        if (error  instanceof Error)
        return NextResponse.json({ status: error.message }, { status: 500 });
    }
}