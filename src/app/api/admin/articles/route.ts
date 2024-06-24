import { supabase } from "@/utils/supabase";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

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

        return NextResponse.json({ status: 'OK', articles: articles }, { status: 200 }) 
    } catch (error) {
        if (error instanceof Error)
            return NextResponse.json({ status: error.message }, {status: 500})
    }
}


export const POST = async (req: Request) => {
   const token = req.headers.get('Authorization') ?? ''
   const { error } = await supabase.auth.getUser(token);
   if (error) 
    return NextResponse.json({ status: error.message }, { status: 400 })

    try {
        const body = await req.json();
        const { title, content, categories, thumbnailImageKey } = body;

        const data = await prisma.article.create({
            data: {
                title,
                content,
                thumbnailImageKey,
            },
        })

        for (const categoryID of categories) {
            await prisma.articleCategory.create({
                data: {
                    categoryId: parseInt(categoryID),
                    articleId: data.id,
                },
            });
        }

        return NextResponse.json({
            status: 'OK',
            message: '作成しました。',
            id: data.id,
        })
    } catch (error) {
        console.error('Error creating article:', error);
        if (error instanceof Error) {
            if (error.name === 'PrismaClientKnownRequestError') {
                return NextResponse.json({ status: error.message }, { status: 400 });
            }
            return NextResponse.json({ status: error.message }, { status: 500 });
        }
        return NextResponse.json({ status: 'Unknown error' }, { status: 500 });
    }
}

export const DELETE = async (
    request: Request,
    { params }: { params: { id: string } },
) => {
    const id = params.id;

    try {
        await prisma.article.delete({
            where: {
                id: parseInt(id),
            },
        })
        return NextResponse.json({ status: 'ok' }, { status: 200 })
    } catch (error) {
        if (error instanceof Error)
            return NextResponse.json({ status: error.message }, { status: 400 })
    }
}