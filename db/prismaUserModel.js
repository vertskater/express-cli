export const generatePrismaUserModel = () => {
  return `
    model User {
      id        String   @id @default(uuid())
      forename  String
      lastname  String
      email     String   @unique
      password  String
      role      Role     @default(USER)
      createdAt DateTime @default(now())
      updatedAt DateTime @updatedAt
    }
    
    enum Role {
      ADMIN
      USER
    }
  `;
}