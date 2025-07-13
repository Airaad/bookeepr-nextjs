import bcrypt from "bcrypt";

const saltRounds = 10;

export async function passwordHash(password: string) {
  return await bcrypt.hash(password, saltRounds);
}

export async function compareHash(password: string, hashPassword: string) {
  return await bcrypt.compare(password, hashPassword);
}
