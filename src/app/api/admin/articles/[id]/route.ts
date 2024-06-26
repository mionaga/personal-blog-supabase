import { supabase } from "@/utils/supabase";
import { PrismaClient } from "@prisma/client"
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export const GET = async (
    req: Request,
    { params }: { params: { id: string} },
) => {
    const id = params.id;
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
    req: Request,
    { params }: { params: { id: string } }, 
) => {
    const token = req.headers.get('Authorization') ?? ''
    const { error } = await supabase.auth.getUser(token);
    if (error)
        return NextResponse.json({ status: error.message }, { status: 400 });

    const id = params.id;
    const { title, content, categories, thumbnailImageKey } = await req.json()

    // console.log('Received PUT data:', { title, content, categories, thumbnailImageKey });

    if (!title || !content || !categories || !thumbnailImageKey) {
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
                thumbnailImageKey,
            },
        })

        await prisma.articleCategory.deleteMany({
            where: {
                articleId: parseInt(id),
            },
        })

        for (const categoryID of categories) {
            await prisma.articleCategory.create({
                data: {
                    categoryId: parseInt(categoryID),
                    articleId: article.id,
                },
            });
        }


       return NextResponse.json({ status: 'OK', article: article }, { status: 200 })
    } catch (error) {
        if (error instanceof Error) 
            return NextResponse.json({ status: error.message }, { status: 400 });
    }
} 

export const DELETE = async (
    req: Request,
    { params }: { params: { id: string } }, 
) => {
    const id = params.id;
    const token = req.headers.get('Authorization') ?? ''

    const { error } = await supabase.auth.getUser(token);
    if (error)
        return NextResponse.json({ status: error.message }, { status: 400 })

    try {
        const article = await prisma.article.findUnique({
            where: {
                id: parseInt(id)
            },
        })
         await prisma.article.delete({
            where: {
                id: parseInt(id),
            },
        })

        return NextResponse.json({ status: 'OK', article }, { status: 200 })
    } catch (error) {
        if (error instanceof Error)
            return NextResponse.json({ status: error.message }, { status: 400 })
    }
}