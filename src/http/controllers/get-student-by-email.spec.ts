import { afterAll, beforeAll, describe, expect, it } from "vitest"
import request from "supertest"

import { app } from "@/app"

describe('Get Student By E-mail (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to get a student by e-mail', async () => {
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

    const selinaEmail = 'selinadoe@teste.com'

    await request(app.server)
      .post('/student')
      .send({
        name: 'Selina',
        lastname: 'Doe',
        course: 'Data Science',
        github: 'Delina-Doe',
        email: selinaEmail,
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
      .get(`/student?email=${selinaEmail}`)
      .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body.student).toEqual(expect.objectContaining({
      email: selinaEmail
    }))
  })
})