export class StudentDoesNotExistsError extends Error {
  constructor() {
    super('Student does not exists.')
  }
}