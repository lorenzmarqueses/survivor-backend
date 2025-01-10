import { ItemType, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Example: Add a user
  // Clear existing data
  await prisma.item.deleteMany({});
  await prisma.survivor.deleteMany({});
  await prisma.user.deleteMany({});

  // Add a user
  await prisma.user.create({
    data: {
      email: 'john.doe@example.com',
      password: 'password123',
    },
  });

  // Example: Add items
  const items = [
    { name: 'Water', description: 'Bottled water', type: ItemType.WATER },
    { name: 'Food', description: 'Canned food', type: ItemType.FOOD },
    {
      name: 'Medication',
      description: 'Painkillers',
      type: ItemType.MEDICATION,
    },
    {
      name: 'C-Virus Vaccine',
      description: 'Vaccine for the C-Virus',
      type: ItemType.CVIRUS_VACCINE,
    },
  ];

  await prisma.item.createMany({
    data: items,
  });

  // Example: Add survivors
  const survivors = [
    {
      name: 'Alice',
      age: 30,
      gender: 'Female',
      latitude: 52.52,
      longitude: 13.405,
      infected: false,
    },
    {
      name: 'Bob',
      age: 25,
      gender: 'Male',
      latitude: 52.52,
      longitude: 13.405,
      infected: false,
    },
    {
      name: 'Charlie',
      age: 35,
      gender: 'Male',
      latitude: 52.52,
      longitude: 13.405,
      infected: false,
    },
  ];

  await prisma.survivor.createMany({
    data: survivors,
  });
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
