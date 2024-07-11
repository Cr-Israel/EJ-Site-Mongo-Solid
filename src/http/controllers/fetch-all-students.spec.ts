import { afterAll, beforeAll, describe, expect, it } from "vitest"
import request from "supertest"

import { app } from "@/app"

describe('Fetch All Students (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to list all students', async () => {
    await request(app.server)
      .post('/student')
      .send({
        name: 'John',
        lastname: 'Doe',
        course: 'Computer Science',
        github: 'John-Doe',
        email: 'johndoe@teste.com',
        hardskills: [
          {
            name: "Node"
          }
        ],
        softskills: [
          {
            name: "Smart conversecion"
          }
        ],
        projects: [
          {
            name: "Web Site",
            description: "Create the Back-End of the application"
          }
        ]
      })

    await request(app.server)
      .post('/student')
      .send({
        name: 'Selina',
        lastname: 'Doe',
        course: 'Data Science',
        github: 'Delina-Doe',
        email: 'selinadoe@teste.com',
        hardskills: [
          {
            name: ""
          }
        ],
        softskills: [
          {
            name: ""
          }
        ],
        projects: [
          {
            name: "",
            description: ""
          }
        ]
      })

    const response = await request(app.server)
      .get('/students')
      .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body.students).toHaveLength(2)
    expect(response.body.students[1]).toEqual(
      expect.objectContaining({
        email: 'selinadoe@teste.com',
      })
    )
  })
})