import bcrypt from "bcrypt";

const SALT_ROUNDS = 10;

/** 비밀번호 해싱 */
export async function hashPassword(password: string) {
  return await bcrypt.hash(password, SALT_ROUNDS);
}

/** 비밀번호 검증 */
export async function verifyPassword(password: string, hashedPassword: string) {
  return await bcrypt.compare(password, hashedPassword);
}
