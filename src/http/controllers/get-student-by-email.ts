import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";

import { makeGetStudentByEmailUseCase } from "@/use-cases/factories/make-get-student-by-email";
import { StudentDoesNotExistsError } from "@/use-cases/errors/student-does-not-exists-error";

export async function getStudentByEmail(request: FastifyRequest, reply: FastifyReply) {
  const getStudentByEmailQueryParamSchema = z.object({
    email: z.string(),
  })

  const {
    email
  } = getStudentByEmailQueryParamSchema.parse(request.query)

  try {
    const getStudentByEmail = makeGetStudentByEmailUseCase()

    const student = await getStudentByEmail.execute({ email })
    return reply.status(200).send(student)
  } catch (err) {
    if (err instanceof StudentDoesNotExistsError) {
      return reply.status(400).send({ message: err.message })
    }

    throw err
  }
}