export class OrgEmailAlreadyExists extends Error {
  constructor() {
    super("E-mail already exists.");
  }
}
