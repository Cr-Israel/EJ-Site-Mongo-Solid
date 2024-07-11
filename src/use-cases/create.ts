import { Student } from "@prisma/client"

import { StudentRepository } from "@/repositories/student-repository"
import { StudentAlreadyExistsError } from "./errors/student-already-exists-error"

interface CreateUseCaseRequest {
  name: string
  lastname: string
  course: string
  github: string
  email: string
  hardskills: string[]
  softskills: string[]
  projects: { name: string, description: string }[]
}

interface CreateUseCaseResponse {
  student: Student
}

export class CreateUseCase {
  constructor(private studentRepository: StudentRepository) { }

  async execute({
    name,
    lastname,
    course,
    github,
    email,
    hardskills,
    softskills,
    projects,
  }: CreateUseCaseRequest): Promise<CreateUseCaseResponse> {
    const studentWithSameEmail = await this.studentRepository.findByEmail(email)

    if(studentWithSameEmail) {
      throw new StudentAlreadyExistsError()
    }

    const student = await this.studentRepository.create({
      name,
      lastname,
      course,
      github,
      email,
      hardskills: {
        create: hardskills.map((hardskill) => ({ name: hardskill }))
      },
      softskills: {
        create: softskills.map((softskill) => ({ name: softskill }))
      },
      projects: {
        create: projects.map((project) => ({ name: project.name, description: project.description }))
      },
    })

    return {
      student
    }
  }
}