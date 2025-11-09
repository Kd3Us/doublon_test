import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Début du seeding...');

  const adminPassword = await bcrypt.hash('admin123', 12);
  
  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@magnhetic.com' },
    update: {},
    create: {
      email: 'admin@magnhetic.com',
      firstName: 'Admin',
      lastName: 'Magn\'Hetic',
      role: 'ADMIN',
      password: adminPassword,
    },
  });

  console.log('Utilisateur admin créé:', adminUser.email);

  const events = [
    {
      title: 'Photoshoot des premières années',
      description: 'Magn\'Hetic organise un photoshoot dédié aux étudiants de première année, pour vous offrir des portraits de qualité à utiliser sur vos profils en ligne et candidatures.',
      date: new Date('2025-03-15T14:00:00Z'),
      startTime: '14:00',
      endTime: '17:00',
      location: 'Campus Central',
      maxCapacity: 50,
      creatorId: adminUser.id,
    },
    {
      title: 'Workshop Networking',
      description: 'Magn\'Hetic organise un workshop dédié au networking, pensé pour aider les étudiants à développer leur aisance relationnelle.',
      date: new Date('2025-03-22T09:00:00Z'),
      startTime: '09:00',
      endTime: '12:00',
      location: 'Auditorium Principal',
      maxCapacity: 80,
      creatorId: adminUser.id,
    },
  ];

  for (const eventData of events) {
    const event = await prisma.event.upsert({
      where: { 
        id: eventData.title + '_' + eventData.date.toISOString()
      },
      update: {},
      create: eventData,
    });
    console.log('Événement créé:', event.title);
  }

  const testUsers = [
    {
      email: 'etudiant@hetic.net',
      firstName: 'Pierre',
      lastName: 'Dupont',
      role: 'STUDENT' as const,
    },
    {
      email: 'entreprise@example.com',
      firstName: 'Marie',
      lastName: 'Martin',
      role: 'COMPANY' as const,
    }
  ];

  for (const userData of testUsers) {
    const user = await prisma.user.upsert({
      where: { email: userData.email },
      update: {},
      create: userData,
    });

    if (userData.role === 'STUDENT') {
      await prisma.studentInfo.upsert({
        where: { userId: user.id },
        update: {},
        create: {
          userId: user.id,
          school: 'HETIC',
          year: 3,
          field: 'Développement Web'
        }
      });
    }

    if (userData.role === 'COMPANY') {
      await prisma.companyInfo.upsert({
        where: { userId: user.id },
        update: {},
        create: {
          userId: user.id,
          companyName: 'TechCorp',
          position: 'Responsable RH'
        }
      });
    }

    console.log('Utilisateur créé:', user.email);
  }

  console.log('Seeding terminé avec succès!');
}

main()
  .catch((e) => {
    console.error('Erreur pendant le seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });