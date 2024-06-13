import { PrismaClient } from "@prisma/client"
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export const GET = async (
    req: NextRequest,
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

        return NextResponse.json({ status: 'OK', article: article }, {status: 200})
    } catch (error) {
        if (error  instanceof Error)
        return NextResponse.json({ status: error.message }, { status: 500 });
    }
}


export const PUT = async (
    req: NextRequest,
    { params }: { params: { id: string } }, 
) => {
    const id = params.id;
    const { title, content, categories, thumbnailUrl } = await req.json()

    if (!title || !content || !categories || !thumbnailUrl) {
        return NextResponse.json({ status: 'Bad Request', message: 'Missing required fields' }, { status: 400 });
    };

    try {
        const article = await prisma.article.update({
            where: {
                id: parseInt(id),
            },
            data: {
                title,
                content,
                thumbnailUrl,
            },
        })

        await prisma.articleCategory.deleteMany({
            where: {
                articleId: parseInt(id),
            },
        })

        for (const category of categories) {
            await prisma.articleCategory.create({
                data: {
                    categoryId: category.id,
                    articleId: article.id,
                },
            })
        }

       return NextResponse.json({ status: 'OK', article: article }, { status: 200 })
    } catch (error) {
        if (error instanceof Error) 
            return NextResponse.json({ status: error.message }, { status: 400 });
    }
} 

export const DELETE = async (
    req: NextRequest,
    { params }: { params: { id: string } }, 
) => {
    const id = params.id;

    try {
        await prisma.article.delete({
            where: {
                id: parseInt(id),
            },
        })

        return NextResponse.json({ status: 'OK' }, { status: 200 })
    } catch (error) {
        if (error instanceof Error)
            return NextResponse.json({ status: error.message }, { status: 400 })
    }
}