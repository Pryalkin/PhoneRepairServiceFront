import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpResponse} from "@angular/common/http";
import { environment } from '..//..//environments/environment';
import {Observable} from "rxjs";
import {UserDTO} from "../dto/userDTO";
import {UserAnswerDTO} from "../dto/userAnswerDTO";
import { JwtHelperService } from "@auth0/angular-jwt";
import { CustomHttpResponse } from "../dto/custom-http-response";


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private host: string = environment.apiUrl;
  private token?: string | null;
  private loggedInUsername?: string | null;
  private jwtHelper = new JwtHelperService();

  constructor(private http: HttpClient) { }

  public login(userDTO: UserDTO): Observable<HttpResponse<UserAnswerDTO>>{
    return this.http.post<UserAnswerDTO>
    (`${this.host}/user/login`, userDTO, {observe: 'response'});
  }

  public registration(userDTO: UserDTO): Observable<CustomHttpResponse>{
    return this.http.post<CustomHttpResponse>
    (`${this.host}/user/registration`, userDTO);
  }

  public logout(): void{
   this.token = null;
   this.loggedInUsername = null;
   localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('users');
  }

  public saveToken(token: string | null): void{
    this.token = token;
    if (typeof token === "string") {
      localStorage.setItem('token', token);
    }
  }

  public addUserToLocalCache(userAnswerDTO: UserAnswerDTO | null): void{
    localStorage.setItem('user', JSON.stringify(userAnswerDTO));
  }

  public getUserFromLocalCache(): UserAnswerDTO {
    return JSON.parse(<string>localStorage.getItem('user'));
  }

  public loadToken(): void {
    this.token = localStorage.getItem('token');
  }

  public getToken(): string | null{
    return this.token!;
  }

  public isUserLoggedIn(): boolean {
    this.loadToken();
    if (this.token != null && this.token !== ''){
      if (this.jwtHelper.decodeToken(this.token).sub != null || ''){
        if (!this.jwtHelper.isTokenExpired(this.token)){
          this.loggedInUsername = this.jwtHelper.decodeToken(this.token).sub;
          return true;
        }
      }
    } else {
      this.logout();
    }
    return false;
  }

  public getUsername(): string{
    return <string>localStorage.getItem('username');
  }

  public setUsername(username: string): void{
    localStorage.setItem('username', username);
  }


  public setRole(role: string) {
    localStorage.setItem('role', role);
  }

  public getRole(): string{
    return <string>localStorage.getItem('role');
  }

}
