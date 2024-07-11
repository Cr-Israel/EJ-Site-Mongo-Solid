import { beforeEach, describe, expect, it } from "vitest"

import { FetchAllStudentsUseCase } from "./fetch-all-students"
import { InMemoryStudentRepository } from "@/repositories/in-memory/in-memory-student-repository"

let studentRepository: InMemoryStudentRepository
let sut: FetchAllStudentsUseCase

describe('Fetch All Students Use Case', () => {
  beforeEach(() => {
    studentRepository = new InMemoryStudentRepository()
    sut = new FetchAllStudentsUseCase(studentRepository)
  })

  it('should be able to fetch all students', async () => {
    await studentRepository.create({
      name: 'John',
      lastname: 'Doe',
      course: 'Computer Science',
      email: 'johndoe@example.com',
      github: 'John-Doe'
    })

    await studentRepository.create({
      name: 'Selina',
      lastname: 'Doe',
      course: 'Data Science',
      email: 'selinadoe@example.com',
      github: 'Selina-Doe'
    })

    const response = await sut.execute()

    expect(response.students).toHaveLength(2)
    expect(response.students).toEqual([
      expect.objectContaining(
        {
          name: 'John',
          lastname: 'Doe',
          course: 'Computer Science',
          email: 'johndoe@example.com',
          github: 'John-Doe'
        },
      ),
      expect.objectContaining(
        {
          name: 'Selina',
          lastname: 'Doe',
          course: 'Data Science',
          email: 'selinadoe@example.com',
          github: 'Selina-Doe'
        },
      )
    ])
    expect(response.students[1]).toEqual(
      expect.objectContaining({
        name: 'Selina',
        lastname: 'Doe',
        course: 'Data Science',
        email: 'selinadoe@example.com',
        github: 'Selina-Doe'
      })
    )
  })
})