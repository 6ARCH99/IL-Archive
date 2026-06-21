import { Router } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { z } from "zod";
import { prisma } from "../lib/prisma.js";

const router = Router();

const registerSchema = z.object({
  fullName: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(8),
  phone: z.string().min(8),
  address: z.string().min(5),
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

router.post("/register", async (req, res) => {
  const parsed = registerSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.flatten() });
    return;
  }

  const existing = await prisma.user.findUnique({
    where: { email: parsed.data.email },
  });
  if (existing) {
    res.status(409).json({ error: "Email already registered" });
    return;
  }

  const passwordHash = await bcrypt.hash(parsed.data.password, 10);
  const user = await prisma.user.create({
    data: {
      email: parsed.data.email,
      passwordHash,
      fullName: parsed.data.fullName,
      phone: parsed.data.phone,
      address: parsed.data.address,
      memberSince: new Date(),
    },
    select: {
      id: true,
      email: true,
      fullName: true,
      phone: true,
      address: true,
      memberSince: true,
    },
  });

  const token = signToken(user.id, user.email);
  res.status(201).json({ user, token });
});

router.post("/login", async (req, res) => {
  const parsed = loginSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.flatten() });
    return;
  }

  const user = await prisma.user.findUnique({
    where: { email: parsed.data.email },
  });
  if (!user || !(await bcrypt.compare(parsed.data.password, user.passwordHash))) {
    res.status(401).json({ error: "Invalid email or password" });
    return;
  }

  const token = signToken(user.id, user.email);
  res.json({
    token,
    user: {
      id: user.id,
      email: user.email,
      fullName: user.fullName,
      phone: user.phone,
      address: user.address,
      profilePhotoUrl: user.profilePhotoUrl,
      status: user.status,
      rank: user.rank,
      memberSince: user.memberSince,
      verified: user.verified,
    },
  });
});

function signToken(userId: string, email: string) {
  const secret = process.env.JWT_SECRET ?? "dev-secret";
  return jwt.sign({ userId, email }, secret, { expiresIn: "7d" });
}

export default router;
