import { FastifyReply, FastifyRequest } from "fastify";

import { makeFetchAllStudentsUseCase } from "@/use-cases/factories/make-fetch-all-students";

export async function fetchAllStudents(request: FastifyRequest, reply: FastifyReply) {

  const fetchAllStudentsUseCase = makeFetchAllStudentsUseCase()

  const students = await fetchAllStudentsUseCase.execute()

  return reply.status(200).send(students)
}