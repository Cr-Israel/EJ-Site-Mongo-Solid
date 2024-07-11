import { afterAll, beforeAll, describe, expect, it } from "vitest"
import request from "supertest"

import { app } from "@/app"

describe('Create (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to create a student', async () => {
    const response = await request(app.server)
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

    expect(response.statusCode).toEqual(201)
  })
})