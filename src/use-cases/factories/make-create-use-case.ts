import { CreateUseCase } from "../create";
import { PrismaStudentRepository } from "@/repositories/prisma/prisma-student-repository";

export function makeCreateUseCase() {
  const prismaStudentRepository = new PrismaStudentRepository()
  const createUseCase = new CreateUseCase(prismaStudentRepository)

  return createUseCase
}