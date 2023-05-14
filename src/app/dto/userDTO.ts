export class UserDTO {
  public username: string;
  public email: string;
  public password: string;
  public password2: string;

  constructor() {
    this.username = '';
    this.email = '';
    this.password = '';
    this.password2 = '';
  }
}
