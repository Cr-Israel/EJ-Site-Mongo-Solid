import { Prisma, Student } from "@prisma/client";
import { StudentRepository } from "../student-repository";
import { randomUUID } from "crypto";

export class InMemoryStudentRepository implements StudentRepository {
  public items: Student[] = []

  async findByEmail(email: string) {
    const student = this.items.find((item) => item.email === email)

    if (!student) {
      return null
    }

    return student
  }

  async fetchAllStudent() {
    return this.items
  }

  async create(data: Prisma.StudentCreateInput) {
    const user = {
      id: randomUUID(),
      name: data.name,
      lastname: data.lastname,
      course: data.course,
      github: data.github,
      email: data.email,
      hardskills: data.hardskills,
      softskills: data.softskills,
      projects: data.projects,
    }

    this.items.push(user)

    return user
  }
}