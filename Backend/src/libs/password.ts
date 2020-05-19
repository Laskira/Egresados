import bcrypt from "bcryptjs";

// Encriptación de contraseña
export async function encryptPassword(Password: string): Promise<string> {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(Password, salt);
}

// Validar encriptación
export async function validateEncrypt(password: string, Password: string): Promise<boolean> {
  return await bcrypt.compare(password, Password);
}
