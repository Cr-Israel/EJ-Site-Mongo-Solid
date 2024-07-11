import { Student } from "@prisma/client"

import { StudentRepository } from "@/repositories/student-repository"
import { StudentDoesNotExistsError } from "./errors/student-does-not-exists-error"

interface GetStudentByEmailUseCaseRequest {
  email: string
}

interface GetStudentByEmailUseCaseResponse {
  student: Student
}

export class GetStudentByEmailUseCase {
  constructor(private studentRepository: StudentRepository) { }

  async execute({
    email
  }: GetStudentByEmailUseCaseRequest): Promise<GetStudentByEmailUseCaseResponse> {
    const student = await this.studentRepository.findByEmail(email)

    if(!student) {
      throw new StudentDoesNotExistsError()
    }

    return {
      student
    }
  }
}