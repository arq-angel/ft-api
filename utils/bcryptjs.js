import bcrypt, { hash } from "bcryptjs";
const saltRound = 15;

export const hashPassword = (plainPassword) => {
  return bcrypt.hashSync(plainPassword, saltRound);
};

export const comparePassword = (plainPassword, hashedPassword) => {
  return bcrypt.compareSync(plainPassword, hashedPassword);
};
