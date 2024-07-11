import { GetStudentByEmailUseCase } from "../get-student-by-email";
import { PrismaStudentRepository } from "@/repositories/prisma/prisma-student-repository";

export function makeGetStudentByEmailUseCase() {
  const prismaStudentRepository = new PrismaStudentRepository()
  const getStudentByEmailUseCase = new GetStudentByEmailUseCase(prismaStudentRepository)

  return getStudentByEmailUseCase
}