import { Component, OnInit } from '@angular/core';
import {Subscription} from "rxjs";
import {PhoneRepairRequestAnswerDTO} from "../dto/phoneRepairRequestAnswerDTO";
import {NotificationService} from "../service/notification.service";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {AuthenticationService} from "../service/authentication.service";
import {UserService} from "../service/user.service";
import {HttpErrorResponse} from "@angular/common/http";
import {NotificationType} from "../enum/notification-type.enum";
import {PhoneRepairDTO} from "../dto/phoneRepairDTO";
import {CustomHttpResponse} from "../dto/custom-http-response";
import {PhoneRepairAnswerDTO} from "../dto/phoneRepairAnswerDTO";

@Component({
  selector: 'app-ready',
  templateUrl: './ready.component.html',
  styleUrls: ['./ready.component.css']
})
export class ReadyComponent implements OnInit {

  private subscriptions: Subscription[] = [];
  public phoneRepairAnswerDTO: Array<PhoneRepairAnswerDTO> = new Array<PhoneRepairAnswerDTO>();
  // public phoneRepairAnswerDTO: Array<PhoneRepairAnswerDTO> = new Array<PhoneRepairAnswerDTO>();

  constructor(private notificationService: NotificationService,
              private route: ActivatedRoute,
              private router: Router,
              private authenticationService: AuthenticationService,
              private userService: UserService) { }

  ngOnInit(): void {
    if(this.authenticationService.getRole() == "ROLE_USER") this.getReady()
    if(this.authenticationService.getRole() == "ROLE_ENGINEER") this.getReadyForEngineer()
  }

  private getReady(){
    this.route.params.subscribe((params: Params) => {
      this.subscriptions.push(
        this.userService.getReady(this.authenticationService.getUsername()).subscribe(
          (response: Array<PhoneRepairAnswerDTO>) => {
            this.phoneRepairAnswerDTO = response;
          },
          (errorResponse: HttpErrorResponse) => {
            this.sendNotification(NotificationType.ERROR, errorResponse.error.message);
          }
        )
      );
    });
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

  private getReadyForEngineer() {
    this.route.params.subscribe((params: Params) => {
      this.subscriptions.push(
        this.userService.getReadyForEngineer(this.authenticationService.getUsername()).subscribe(
          (response: Array<PhoneRepairAnswerDTO>) => {
            this.phoneRepairAnswerDTO = response;
            console.log(response)
          },
          (errorResponse: HttpErrorResponse) => {
            this.sendNotification(NotificationType.ERROR, errorResponse.error.message);
          }
        )
      );
    });
  }

}
