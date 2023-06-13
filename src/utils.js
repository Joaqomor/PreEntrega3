import { fileURLToPath } from "url";
import { dirname } from "path";
import bcrypt from "bcrypt"


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


export const hashPassword = async (password) => {
    return bcrypt.hash(password, 10)
}

export const comparePasswords = async (password, passwordDB) => {
    return bcrypt.compare(password, passwordDB)
}

export default __dirname;


