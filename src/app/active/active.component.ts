import {Component, OnDestroy, OnInit} from '@angular/core';
import {NotificationType} from "../enum/notification-type.enum";
import {HttpErrorResponse} from "@angular/common/http";
import {AuthenticationService} from "../service/authentication.service";
import {NotificationService} from "../service/notification.service";
import {Subscription} from "rxjs";
import {ActivatedRoute, Params} from "@angular/router";
import {PhoneRepairRequestAnswerDTO} from "../dto/phoneRepairRequestAnswerDTO";
import {UserService} from "../service/user.service";

@Component({
  selector: 'app-active',
  templateUrl: './active.component.html',
  styleUrls: ['./active.component.css']
})
export class ActiveComponent  implements OnInit, OnDestroy {

  private subscriptions: Subscription[] = [];
  public phoneRepairRequestAnswerDTO: Array<PhoneRepairRequestAnswerDTO> = new Array<PhoneRepairRequestAnswerDTO>();

  constructor(private notificationService: NotificationService,
              private route: ActivatedRoute,
              private authenticationService: AuthenticationService,
              private userService: UserService) { }

  ngOnInit(): void {
    this.getActive();
  }

  private getActive(){
    this.route.params.subscribe((params: Params) => {
      this.subscriptions.push(
        this.userService.getActive().subscribe(
          (response: Array<PhoneRepairRequestAnswerDTO>) => {
            this.phoneRepairRequestAnswerDTO = response;
            console.log(response)
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

}
