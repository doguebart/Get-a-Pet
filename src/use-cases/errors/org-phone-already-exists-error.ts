export class OrgPhoneAlreadyExists extends Error {
  constructor() {
    super("Phone already exists.");
  }
}
