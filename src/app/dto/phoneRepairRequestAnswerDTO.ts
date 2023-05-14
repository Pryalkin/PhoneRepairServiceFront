import {UserAnswerDTO} from "./userAnswerDTO";

export class PhoneRepairRequestAnswerDTO {
  public phoneNumber: string;
  public idApp: string;
  public causeOfFailure: string;
  public photos: [];
  public customer: UserAnswerDTO;
  public dateOfRequestForPhoneRepair: Date

  constructor() {
    this.phoneNumber = '';
    this.idApp = '';
    this.causeOfFailure = '';
    this.photos = [];
    this.customer = new UserAnswerDTO();
    this.dateOfRequestForPhoneRepair = new Date()
  }
}
