import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    const categories = [
        { name: 'Category 1' },
        { name: 'Category 2' },
        { name: 'Category 3' }
    ];

    for (const category of categories) {
        await prisma.category.create({
            data: category,
        });
    }
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
