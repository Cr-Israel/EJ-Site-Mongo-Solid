import { Prisma, Student } from "@prisma/client";

export interface StudentRepository {
  create(data: Prisma.StudentCreateInput): Promise<Student>
  fetchAllStudent(): Promise<Student[]>
  findByEmail(email: string): Promise<Student | null>
}