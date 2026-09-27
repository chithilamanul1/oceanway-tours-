import { jwtVerify, SignJWT } from 'jose';
import { cookies } from 'next/headers';

const getJwtSecretKey = () => {
  const secret = process.env.JWT_SECRET || 'fallback_secret_only_for_dev_do_not_use_in_prod';
  if (!secret) {
    throw new Error('JWT_SECRET is not set');
  }
  return new TextEncoder().encode(secret);
};

export async function verifyAuth(token: string) {
  try {
    const verified = await jwtVerify(token, getJwtSecretKey());
    return verified.payload;
  } catch (err) {
    throw new Error('Your token has expired.');
  }
}

export async function createAuthToken() {
  return await new SignJWT({})
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('1d') // 1 day expiration
    .sign(getJwtSecretKey());
}

export const AUTH_COOKIE_NAME = 'oceanway_admin_token';
