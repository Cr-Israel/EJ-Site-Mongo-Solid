import { FastifyInstance } from "fastify";

import { create } from "../controllers/create";
import { fetchAllStudents } from "../controllers/fetch-all-students";
import { getStudentByEmail } from "../controllers/get-student-by-email";


export async function studentRoutes(app: FastifyInstance) {
  app.post('/student', create)
  app.get('/students', fetchAllStudents)
  app.get('/student', getStudentByEmail)
}