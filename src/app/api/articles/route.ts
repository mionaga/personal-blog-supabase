import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export const GET = async (req: Request) => {
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
        console.log(articles);
        return NextResponse.json({ status: 'OK', articles: articles }, { status: 200 }) 
    } catch (error) {
        if (error instanceof Error)
            return NextResponse.json({ status: error.message }, {status: 500})
    }
}

