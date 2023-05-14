import {Component, OnDestroy, OnInit} from '@angular/core';
import {NotificationType} from "../enum/notification-type.enum";
import {HttpErrorResponse} from "@angular/common/http";
import {NotificationService} from "../service/notification.service";
import {AuthenticationService} from "../service/authentication.service";
import {Router} from "@angular/router";
import {Subscription} from "rxjs";
import {UserDTO} from "../dto/userDTO";
import {CustomHttpResponse} from "../dto/custom-http-response";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, OnDestroy{
  showLoading: boolean = false;
  private subscriptions: Subscription[] = [];

  constructor(private router: Router, private authenticationService: AuthenticationService,
              private notificationService: NotificationService) { }

  ngOnInit(): void {
    if(this.authenticationService.isUserLoggedIn()){
      this.router.navigate(['/user']);
    } else {
      this.router.navigate(['/register']);
    }
  }

  public onRegister(user: UserDTO): void{
    console.log(user);
    this.showLoading = true;
    this.subscriptions.push(
      this.authenticationService.registration(user).subscribe(
        (response: CustomHttpResponse) => {
          this.showLoading = false;
          this.sendNotification(NotificationType.SUCCESS, `A new account was created.
          Please check your email for password to log in.`);
          this.router.navigate(['/login']);
        },
        (errorResponse: HttpErrorResponse) => {
          console.log(errorResponse);
          this.sendNotification(NotificationType.ERROR, errorResponse.error.message);
          this.showLoading = false;
        }
      )
    );
  }

  private sendNotification(notificationType: NotificationType, message: string): void {
    if (message) {
      this.notificationService.notify(notificationType, message);
    } else {
      this.notificationService.notify(notificationType, 'An error occured. Please try again.');
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
