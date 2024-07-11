import { Student } from "@prisma/client"

import { StudentRepository } from "@/repositories/student-repository"

interface FetchAllStudentsUseCaseResponse {
  students: Student[]
}

export class FetchAllStudentsUseCase {
  constructor(private studentRepository: StudentRepository) { }

  async execute(): Promise<FetchAllStudentsUseCaseResponse> {
    const students =  await this.studentRepository.fetchAllStudent()

    return {
      students
    }
  }
}