import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { PrismaClient, TokenRole } from '@prisma/client';

const prisma = new PrismaClient();

export const createToken = async (hash: string): Promise<string> => {
  const token = await prisma.token.findUnique({ where: { hash } });

  if (!token) {
    throw new Error('Token no encontrado.');
  }

  const jwtToken = jwt.sign({ id: token.id, email: token.email, role: token.role }, process.env.JWT_SECRET || '', {
    expiresIn: '1h',
  });

  return jwtToken;
};

export const verifyToken = (jwtToken: string): Record<string, unknown> => {
  try {
    const decoded = jwt.verify(jwtToken, process.env.JWT_SECRET || '');
    return decoded as Record<string, unknown>;
  } catch (error) {
    throw new Error('Token inválido.');
  }
};

export const generateHash = async (email: string, role: TokenRole): Promise<string> => {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(`${email}-${role}-${Date.now()}`, salt);
  return hash;
};
