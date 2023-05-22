export class PhoneRepairDTO{
  public engineer: string;
  public idApp: string;

  constructor(engineer: string, idApp: string) {
    this.engineer = engineer
    this.idApp = idApp
  }

}
