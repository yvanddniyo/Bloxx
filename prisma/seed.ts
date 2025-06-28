import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
async function main() {
  const post1 = await prisma.article.upsert({
    where: { title: 'Prisma Adds Support for MongoDB' },
    update: {},
    create: {
      title: 'Prisma Adds Support for MongoDB',
      imageUrl:
        'https://media.istockphoto.com/id/1457821554/photo/hereford-cattle-grazing-in-a-lush-green-pasture.jpg?s=612x612&w=0&k=20&c=Fidl9Cr-Bf_XJZt28MYlVSOkDtviLkWvdV-U4WJmDTc=',
      body: "Prisma now supports MongoDB, allowing developers to use Prisma's powerful features with MongoDB databases.",
      description:
        "We are excited to share that today's Prisma ORM release adds stable support for MongoDB!",
      category: 'FINANCE',

      published: false,
    },
  });

  const post2 = await prisma.article.upsert({
    where: { title: 'Prisma ORM Release Notes' },
    update: {},
    create: {
      title: 'Prisma ORM Release Notes',
      imageUrl:
        'https://media.istockphoto.com/id/1457821554/photo/hereford-cattle-grazing-in-a-lush-green-pasture.jpg?s=612x612&w=0&k=20&c=Fidl9Cr-Bf_XJZt28MYlVSOkDtviLkWvdV-U4WJmDTc=',
      body: 'The latest release of Prisma ORM includes several new features and improvements.',
      description:
        'Check out the latest release notes for Prisma ORM to learn about new features and improvements.',
      category: 'FINANCE',
      published: true,
    },
  });
  console.log({ post1, post2 });
}

// execute the main function
main()
  .catch((e) => {
    // if an error occurs, log it and exit the process
    console.error('Error during seeding:');
    {
      console.error(e);
      process.exit(1);
    }
  })
  .finally(async () => {
    // close the Prisma Client connection
    await prisma.$disconnect();
  });
