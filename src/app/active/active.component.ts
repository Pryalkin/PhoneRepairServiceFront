import {Component, OnDestroy, OnInit} from '@angular/core';
import {NotificationType} from "../enum/notification-type.enum";
import {HttpErrorResponse} from "@angular/common/http";
import {AuthenticationService} from "../service/authentication.service";
import {NotificationService} from "../service/notification.service";
import {Subscription} from "rxjs";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {PhoneRepairRequestAnswerDTO} from "../dto/phoneRepairRequestAnswerDTO";
import {UserService} from "../service/user.service";
import {PhoneRepairAnswerDTO} from "../dto/phoneRepairAnswerDTO";
import {PhoneRepairDTO} from "../dto/phoneRepairDTO";
import {CustomHttpResponse} from "../dto/custom-http-response";

@Component({
  selector: 'app-active',
  templateUrl: './active.component.html',
  styleUrls: ['./active.component.css']
})
export class ActiveComponent  implements OnInit, OnDestroy {

  private subscriptions: Subscription[] = [];
  public phoneRepairAnswerDTO: Array<PhoneRepairAnswerDTO> = new Array<PhoneRepairAnswerDTO>();
  public flag: boolean = false;

  constructor(private notificationService: NotificationService,
              private route: ActivatedRoute,
              private router: Router,
              private authenticationService: AuthenticationService,
              private userService: UserService) { }

  ngOnInit(): void {
    if(this.authenticationService.getRole() == "ROLE_USER") this.getActive()
    if(this.authenticationService.getRole() == "ROLE_ENGINEER") this.getActiveForEngineer()
  }

  private getActive(){
    this.route.params.subscribe((params: Params) => {
      this.subscriptions.push(
        this.userService.getActive(this.authenticationService.getUsername()).subscribe(
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

  private getActiveForEngineer(){
    this.flag = true
    this.route.params.subscribe((params: Params) => {
      this.subscriptions.push(
        this.userService.getActiveForEngineer(this.authenticationService.getUsername()).subscribe(
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

  ready(idApp: string) {
    console.log("Pavel")
    const username = this.authenticationService.getUsername()
    const phoneRepairDTO: PhoneRepairDTO = new PhoneRepairDTO(username, idApp);
    this.route.params.subscribe((params: Params) => {
      this.subscriptions.push(
        this.userService.ready(phoneRepairDTO).subscribe(
          (response: CustomHttpResponse) => {
            this.router.navigate(['/user/active']);
          },
          (errorResponse: HttpErrorResponse) => {
            this.sendNotification(NotificationType.ERROR, errorResponse.error.message);
          }
        )
      );
    });
  }
}
