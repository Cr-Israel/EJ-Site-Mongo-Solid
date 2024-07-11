import { beforeEach, describe, expect, it } from "vitest"

import { CreateUseCase } from "./create"
import { InMemoryStudentRepository } from "@/repositories/in-memory/in-memory-student-repository"
import { StudentAlreadyExistsError } from "./errors/student-already-exists-error"

let studentRepository: InMemoryStudentRepository
let sut: CreateUseCase

describe('Create Use Case', () => {
  beforeEach(() => {
    studentRepository = new InMemoryStudentRepository()
    sut = new CreateUseCase(studentRepository)
  })

  it('should not be able to create a student with same e-mail', async () => {
    await sut.execute({
      name: 'John',
      lastname: 'Doe',
      course: 'Computer Science',
      github: 'John-Doe',
      email: 'johndoe@teste.com',
      hardskills: ['Node', 'React'],
      softskills: ['Smart conversecion', 'Gorgeus'],
      projects: [
        {
          name: 'Web Site',
          description: 'Create the Back-End of the application'
        },
        {
          name: 'Web Site',
          description: 'Create the Back-End of the application'
        }
      ],
    })

    expect(() =>
      sut.execute({
        name: 'Jonny',
        lastname: 'Doe',
        course: 'Computer Science',
        github: 'Jonny-Doe',
        email: 'johndoe@teste.com',
        hardskills: [''],
        softskills: [''],
        projects: [
          {
            name: '',
            description: ''
          },
        ],
      })
    ).rejects.toBeInstanceOf(StudentAlreadyExistsError)
  })

  it('should be able to create a student', async () => {
    const { student } = await sut.execute({
      name: 'John',
      lastname: 'Doe',
      course: 'Computer Science',
      github: 'John-Doe',
      email: 'johndoe@teste.com',
      hardskills: ['Node', 'React'],
      softskills: ['Smart conversecion', 'Gorgeus'],
      projects: [
        {
          name: 'Web Site',
          description: 'Create the Back-End of the application'
        },
        {
          name: 'Web Site',
          description: 'Create the Back-End of the application'
        }
      ],
    })

    expect(student.id).toEqual(expect.any(String))
    expect(student).toEqual(
      expect.objectContaining({
        name: 'John'
      })
    )
  })
})