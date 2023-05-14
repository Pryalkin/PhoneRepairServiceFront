import {Component, OnDestroy, OnInit} from '@angular/core';
import {NotificationType} from "../enum/notification-type.enum";
import {HttpErrorResponse} from "@angular/common/http";
import {ActivatedRoute, Params} from "@angular/router";
import {NotificationService} from "../service/notification.service";
import {Subscription} from "rxjs";
import {PhoneRepairRequestAnswerDTO} from "../dto/phoneRepairRequestAnswerDTO";
import {UserService} from "../service/user.service";

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit, OnDestroy {

  private idApp: string = '';
  private subscriptions: Subscription[] = [];
  public phoneRepairRequestAnswerDTO: PhoneRepairRequestAnswerDTO = new PhoneRepairRequestAnswerDTO();

  constructor(private userService: UserService,
              private notificationService: NotificationService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getTopicGroup();
  }

  private getTopicGroup(): void{
    this.route.params.subscribe((params: Params) => {
      this.idApp = params['idApp'];
      this.subscriptions.push(
        this.userService.getDetails(this.idApp).subscribe(
          (response: PhoneRepairRequestAnswerDTO) => {
            console.log(response)
            this.phoneRepairRequestAnswerDTO = response;
          },
          (errorResponse: HttpErrorResponse) => {
            this.sendNotification(NotificationType.ERROR, errorResponse.error.message);
          }
        )
      );
    });
  }

  public takeRating(i: number): void {

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
