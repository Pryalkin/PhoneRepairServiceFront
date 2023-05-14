export class PhoneRepairDTO{
  public engineer: string;
  public phoneNumber: string;

  constructor(engineer: string, phoneNumber: string) {
    this.engineer = engineer
    this.phoneNumber = phoneNumber
  }

}
