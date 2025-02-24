export const getDependencies = (withPrisma) => {
   return  [
    'express',
    'pg',
    'cors',
    'express-validator',
    'passport',
    'passport-jwt',
    'jsonwebtoken',
    'dotenv',
     ...withPrisma ? ['prisma', '@prisma/client'] : []
  ]
}