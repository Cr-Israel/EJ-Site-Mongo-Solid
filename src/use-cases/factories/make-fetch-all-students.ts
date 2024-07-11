import { FetchAllStudentsUseCase } from "../fetch-all-students";
import { PrismaStudentRepository } from "@/repositories/prisma/prisma-student-repository";

export function makeFetchAllStudentsUseCase() {
  const prismaStudentRepository = new PrismaStudentRepository()
  const fetchAllStudentsUseCase = new FetchAllStudentsUseCase(prismaStudentRepository)

  return fetchAllStudentsUseCase
}