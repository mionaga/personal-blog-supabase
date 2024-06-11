import { PrismaClient } from "@prisma/client/extension";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export const GET = async (req: NextRequest) => {
    try {
        const articles = await prisma.article.findMany({
            include: {
                articleCategories: {
                    include: {
                        category: {
                            select: {
                                id: true,
                                name: true,
                            },
                        },
                    },
                },
            },
            orderBy: {
                createdAt: 'desc',
            },
        })

        return NextResponse.json({ status: 'OK', articles: articles }, { status: 200 }) 
    } catch (error) {
        if (error instanceof Error)
            return NextRequest.json({ status: error.message }, {status: 500})
    }
}

