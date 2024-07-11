import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";

import { makeCreateUseCase } from "@/use-cases/factories/make-create-use-case";
import { StudentAlreadyExistsError } from "@/use-cases/errors/student-already-exists-error";

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createBodySchema = z.object({
    name: z.string(),
    lastname: z.string(),
    course: z.string(),
    github: z.string(),
    email: z.string().email(),
    hardskills: z.array(z.object({
      name: z.string()
    })),
    softskills: z.array(z.object({
      name: z.string()
    })),
    projects: z.array(z.object({
      name: z.string(),
      description: z.string()
    })),
  })

  const {
    name,
    lastname,
    course,
    github,
    email,
    hardskills,
    softskills,
    projects,
  } = createBodySchema.parse(request.body)

  try {
    const createUseCase = makeCreateUseCase()

    await createUseCase.execute({
      name,
      lastname,
      course,
      github,
      email,
      hardskills: hardskills.map(hardskill => hardskill.name),
      softskills: softskills.map(softskill => softskill.name),
      projects,
    })
  } catch (err) {
    if (err instanceof StudentAlreadyExistsError) {
      return reply.status(409).send({ message: err.message })
    }

    throw err
  }

  return reply.status(201).send()
}