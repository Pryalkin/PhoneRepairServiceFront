import {PhoneRepairRequestAnswerDTO} from "./phoneRepairRequestAnswerDTO";

export class PhoneRepairAnswerDTO{
  public dateOfAcceptanceOfTheRequest: Date;
  public engineer: string;
  public phoneRepairRequestAnswerDTO: PhoneRepairRequestAnswerDTO;
  public roomNumber: string;

  constructor() {
    this.dateOfAcceptanceOfTheRequest = new Date();
    this.engineer = '';
    this.phoneRepairRequestAnswerDTO = new PhoneRepairRequestAnswerDTO();
    this.roomNumber = ''
  }

}
