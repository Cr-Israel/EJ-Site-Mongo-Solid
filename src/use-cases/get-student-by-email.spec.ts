import { beforeEach, describe, expect, it } from "vitest"

import { GetStudentByEmailUseCase } from "./get-student-by-email"
import { StudentDoesNotExistsError } from "./errors/student-does-not-exists-error"
import { InMemoryStudentRepository } from "@/repositories/in-memory/in-memory-student-repository"

let studentRepository: InMemoryStudentRepository
let sut: GetStudentByEmailUseCase

describe('Get Student Use Case', () => {
  beforeEach(() => {
    studentRepository = new InMemoryStudentRepository()
    sut = new GetStudentByEmailUseCase(studentRepository)
  })

  it('should not be able to get a student does not exists', async () => {
    await expect(() =>
      sut.execute({
        email: 'test@example.com'
      })
    ).rejects.toBeInstanceOf(StudentDoesNotExistsError)
  })

  it('should be able to get student by e-mail', async () => {
    const studentEmail = 'johndoe@example.com'

    await studentRepository.create({
      name: 'John',
      lastname: 'Doe',
      course: 'Computer Science',
      email: studentEmail,
      github: 'John-Doe',
    })

    const response = await sut.execute({
      email: studentEmail
    })

    expect(response.student.email).toEqual(expect.any(String))
    expect(response.student.email).toEqual(studentEmail)
  })
})