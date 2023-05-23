import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {CustomHttpResponse} from "../dto/custom-http-response";
import {environment} from "../../environments/environment";
import {HttpClient, HttpResponse} from "@angular/common/http";
import {PhoneRepairRequestAnswerDTO} from "../dto/phoneRepairRequestAnswerDTO";
import {PhoneRepairAnswerDTO} from "../dto/phoneRepairAnswerDTO";
import {PhoneRepairDTO} from "../dto/phoneRepairDTO";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private host: string = environment.apiUrl;

  constructor(private http: HttpClient) { }

  createFormData(phoneNumber: string, causeOfFailure: string, photos: File[], username: string) {
    const formData = new FormData();
    formData.append('phoneNumber', phoneNumber);
    formData.append('causeOfFailure', causeOfFailure);
    formData.append('username', username);
    formData.append('photo1', photos[0]);
    formData.append('photo2', photos[1]);
    formData.append('photo3', photos[2]);
    return formData;
  }

  public registration(formData: FormData): Observable<CustomHttpResponse>{
    return this.http.post<CustomHttpResponse>
    (`${this.host}/phone_repair_request/create`, formData);
  }

  // public getActive(): Observable<Array<PhoneRepairRequestAnswerDTO>> {
  //   return this.http.get<Array<PhoneRepairRequestAnswerDTO>>
  //   (`${this.host}/phone_repair_request/user/get/active`);
  // }

  public getActive(username: string): Observable<Array<PhoneRepairAnswerDTO>> {
    return this.http.get<Array<PhoneRepairAnswerDTO>>
    (`${this.host}/phone_repair/get/for_customer/${username}`);
  }

  public getActiveForEngineer(username: string): Observable<Array<PhoneRepairAnswerDTO>> {
    return this.http.get<Array<PhoneRepairAnswerDTO>>
    (`${this.host}/phone_repair/get/for_engineer/${username}`);
  }

  getInactive(): Observable<Array<PhoneRepairRequestAnswerDTO>> {
    return this.http.get<Array<PhoneRepairRequestAnswerDTO>>
    (`${this.host}/phone_repair_request/user/get/inactive`);
  }

  getDetails(idApp: string): Observable<PhoneRepairRequestAnswerDTO> {
    return this.http.get<PhoneRepairRequestAnswerDTO>
    (`${this.host}/phone_repair_request/user/get/details/${idApp}`);
  }

  getInactiveForEngineer(): Observable<Array<PhoneRepairRequestAnswerDTO>> {
    return this.http.get<Array<PhoneRepairRequestAnswerDTO>>
    (`${this.host}/phone_repair_request/engineer/get/inactive`);
  }

  onTake(phoneRepairDTO: PhoneRepairDTO): Observable<CustomHttpResponse>{
    return this.http.post<CustomHttpResponse>
    (`${this.host}/phone_repair/registration`, phoneRepairDTO);
  }

  ready(phoneRepairDTO: PhoneRepairDTO): Observable<CustomHttpResponse>{
    return this.http.post<CustomHttpResponse>
    (`${this.host}/phone_repair/ready`, phoneRepairDTO);
  }

  public getReady(username: string): Observable<Array<PhoneRepairAnswerDTO>> {
    return this.http.get<Array<PhoneRepairAnswerDTO>>
    (`${this.host}/phone_repair/get/for_customer/on_ready/${username}`);
  }

  public getReadyForEngineer(username: string): Observable<Array<PhoneRepairAnswerDTO>> {
    return this.http.get<Array<PhoneRepairAnswerDTO>>
    (`${this.host}/phone_repair/get/for_engineer/on_ready/${username}`);
  }
}
