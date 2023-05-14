export class UserAnswerDTO {
  public username: string;
  public email: string;
  public role: string;
  public authorities: [];

  constructor() {
    this.username = '';
    this.email = '';
    this.role = '';
    this.authorities = [];
  }
}
