import { Prisma, Student } from "@prisma/client";

import { prisma } from "@/lib/prisma";
import { StudentRepository } from "../student-repository";

export class PrismaStudentRepository implements StudentRepository {
  async create(data: Prisma.StudentCreateInput) {
    const student = await prisma.student.create({
      data,
      include: {
        hardskills: true,
        softskills: true,
        projects: true,
      },
    })

    return student
  }

  async fetchAllStudent() {
    const students = await prisma.student.findMany({
      include: {
        hardskills: true,
        softskills: true,
        projects: true,
      }
    })

    return students
  }

  async findByEmail(email: string) {
    const student = await prisma.student.findUnique({
      where: {
        email,
      },
      include: {
        hardskills: true,
        softskills: true,
        projects: true,
      }
    })

    return student
  }

}