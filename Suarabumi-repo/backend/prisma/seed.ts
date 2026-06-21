import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { co2FromWeightKg, pointsFromDeposit } from "../src/lib/climate.js";

const prisma = new PrismaClient();

async function main() {
  await prisma.pointRedemption.deleteMany();
  await prisma.activity.deleteMany();
  await prisma.userBadge.deleteMany();
  await prisma.userChallenge.deleteMany();
  await prisma.deposit.deleteMany();
  await prisma.challenge.deleteMany();
  await prisma.badge.deleteMany();
  await prisma.user.deleteMany();

  const passwordHash = await bcrypt.hash("password123", 10);

  const demoUser = await prisma.user.create({
    data: {
      email: "putra.wijaya@email.com",
      passwordHash,
      fullName: "Putra Wijaya",
      phone: "+62 812-3456-7890",
      address: "Kelapa Gading, Jakarta Utara",
      status: "active",
      rank: "Top 12% Contributor",
      memberSince: new Date("2026-01-15"),
      verified: true,
      totalPoints: 12450,
      co2SavedKg: 127.5,
      totalWeightKg: 145,
      activeDays: 89,
      profilePhotoUrl: null,
    },
  });

  const peers = [
    { fullName: "Budi Santoso", email: "budi@email.com", totalPoints: 8450, totalWeightKg: 120 },
    { fullName: "Siti Nurhaliza", email: "siti@email.com", totalPoints: 7890, totalWeightKg: 110 },
    { fullName: "Ahmad Rizki", email: "ahmad@email.com", totalPoints: 7320, totalWeightKg: 95 },
    { fullName: "Dewi Lestari", email: "dewi@email.com", totalPoints: 6420, totalWeightKg: 88 },
  ];

  for (const p of peers) {
    await prisma.user.create({
      data: {
        ...p,
        passwordHash,
        phone: "08120000000",
        address: "Jakarta",
        co2SavedKg: co2FromWeightKg(p.totalWeightKg),
        activeDays: 60,
      },
    });
  }

  const badges = await Promise.all([
    prisma.badge.create({
      data: {
        code: "pemula",
        name: "Pemula Aktif",
        description: "Setor pertama kali",
        icon: "🌱",
      },
    }),
    prisma.badge.create({
      data: {
        code: "konsisten",
        name: "Konsisten",
        description: "Setor 10x berturut-turut",
        icon: "⭐",
      },
    }),
    prisma.badge.create({
      data: {
        code: "top_contributor",
        name: "Top Contributor",
        description: "Top 10% bulan ini",
        icon: "🏆",
      },
    }),
    prisma.badge.create({
      data: {
        code: "inspirator",
        name: "Inspirator",
        description: "Ajak 5 teman",
        icon: "🎯",
      },
    }),
  ]);

  for (const badge of badges) {
    await prisma.userBadge.create({
      data: { userId: demoUser.id, badgeId: badge.id },
    });
  }

  const challenge = await prisma.challenge.create({
    data: {
      title: "Setor 10 kg Minggu Ini",
      description: "Pilah 10 kg sampah dalam seminggu",
      targetValue: 10,
      targetUnit: "kg",
      rewardPoints: 500,
      difficulty: "medium",
      durationDays: 7,
      endsAt: new Date(Date.now() + 3 * 86400000),
      isFeatured: true,
    },
  });

  await prisma.userChallenge.create({
    data: {
      userId: demoUser.id,
      challengeId: challenge.id,
      progress: 6.5,
      status: "active",
    },
  });

  const now = new Date();
  const depositDays = [6, 5, 4, 3, 2, 1, 0];
  for (const offset of depositDays) {
    const d = new Date(now);
    d.setDate(d.getDate() - offset);
    const weight = offset % 2 === 0 ? 8 : 6.5;
    await prisma.deposit.create({
      data: {
        userId: demoUser.id,
        weightKg: weight,
        co2SavedKg: co2FromWeightKg(weight),
        points: pointsFromDeposit(weight),
        location: "Drop Point Sudirman",
        type: "drop_point",
        createdAt: d,
      },
    });
  }

  for (let m = 5; m >= 0; m--) {
    const d = new Date(now.getFullYear(), now.getMonth() - m, 15);
    const weight = 14 + m * 2;
    await prisma.deposit.create({
      data: {
        userId: demoUser.id,
        weightKg: weight,
        co2SavedKg: co2FromWeightKg(weight),
        points: pointsFromDeposit(weight),
        createdAt: d,
      },
    });
  }

  await prisma.activity.createMany({
    data: [
      {
        userId: demoUser.id,
        type: "deposit",
        title: "Setor Sampah",
        description: "8 kg — Drop Point Sudirman",
        pointsDelta: 450,
        createdAt: new Date(Date.now() - 2 * 3600000),
      },
      {
        userId: demoUser.id,
        type: "redemption",
        title: "Tukar Poin",
        description: "Ke GoPay",
        pointsDelta: -2000,
        createdAt: new Date(Date.now() - 86400000),
      },
      {
        userId: demoUser.id,
        type: "pickup",
        title: "Penjemputan",
        description: "Jl. Melati No. 15",
        pointsDelta: 680,
        createdAt: new Date(Date.now() - 3 * 86400000),
      },
    ],
  });

  console.log("Seed complete.");
  console.log("Demo login: putra.wijaya@email.com / password123");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
