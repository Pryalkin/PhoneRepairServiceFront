import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {PhoneRepairRequestAnswerDTO} from "../dto/phoneRepairRequestAnswerDTO";
import {NotificationService} from "../service/notification.service";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {AuthenticationService} from "../service/authentication.service";
import {UserService} from "../service/user.service";
import {HttpErrorResponse, HttpResponse} from "@angular/common/http";
import {NotificationType} from "../enum/notification-type.enum";
import {PhoneRepairAnswerDTO} from "../dto/phoneRepairAnswerDTO";
import {PhoneRepairDTO} from "../dto/phoneRepairDTO";
import {CustomHttpResponse} from "../dto/custom-http-response";

@Component({
  selector: 'app-inactive',
  templateUrl: './inactive.component.html',
  styleUrls: ['./inactive.component.css']
})
export class InactiveComponent implements OnInit, OnDestroy {

  private subscriptions: Subscription[] = [];
  public phoneRepairRequestAnswerDTO: Array<PhoneRepairRequestAnswerDTO> = new Array<PhoneRepairRequestAnswerDTO>();
  // public phoneRepairAnswerDTO: Array<PhoneRepairAnswerDTO> = new Array<PhoneRepairAnswerDTO>();
  public flag: boolean = false

  constructor(private notificationService: NotificationService,
              private route: ActivatedRoute,
              private router: Router,
              private authenticationService: AuthenticationService,
              private userService: UserService) { }

  ngOnInit(): void {
    if(this.authenticationService.getRole() == "ROLE_USER") this.getInactive()
    if(this.authenticationService.getRole() == "ROLE_ENGINEER") this.getInactiveForEngineer()
  }

  private getInactive(){
    this.route.params.subscribe((params: Params) => {
      this.subscriptions.push(
        this.userService.getInactive().subscribe(
          (response: Array<PhoneRepairRequestAnswerDTO>) => {
            this.phoneRepairRequestAnswerDTO = response;
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

  private getInactiveForEngineer() {
    this.flag = true
    this.route.params.subscribe((params: Params) => {
      this.subscriptions.push(
        this.userService.getInactiveForEngineer().subscribe(
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

  public onTake(idApp: string){
    console.log("Hello pavel")
    const username = this.authenticationService.getUsername()
    const phoneRepairDTO: PhoneRepairDTO = new PhoneRepairDTO(username, idApp);
    this.route.params.subscribe((params: Params) => {
      this.subscriptions.push(
        this.userService.onTake(phoneRepairDTO).subscribe(
          (response: CustomHttpResponse) => {
            this.router.navigate(['/user/inactive']);
          },
          (errorResponse: HttpErrorResponse) => {
            this.sendNotification(NotificationType.ERROR, errorResponse.error.message);
          }
        )
      );
    });
  }
}
