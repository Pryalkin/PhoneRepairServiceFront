import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {Router} from "@angular/router";
import {AuthenticationService} from "../service/authentication.service";
import {NotificationService} from "../service/notification.service";
import {HttpErrorResponse, HttpResponse} from "@angular/common/http";
import {NotificationType} from "../enum/notification-type.enum";
import {NgForm} from "@angular/forms";
import {UserService} from "../service/user.service";
import {CustomHttpResponse} from "../dto/custom-http-response";

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit, OnDestroy {
  showLoading: boolean = false;
  private subscriptions: Subscription[] = [];

  private iFile: number = 0;
  file2: boolean = true;
  file3: boolean = true;
  photo1!: File;
  photo2!: File;
  photo3!: File;
  ImageName1!: string;
  ImageName2!: string;
  ImageName3!: string;
  photos: File[] = new Array<File>();

  constructor(private router: Router, private authenticationService: AuthenticationService,
              private notificationService: NotificationService,
              private userService: UserService) { }

  ngOnInit(): void {


  }

  public onAddNewOverview(form: NgForm): void {
    const phoneNumber = form.form.value.phoneNumber;
    const causeOfFailure = form.form.value.causeOfFailure;
    this.photos.push(this.photo1);
    this.photos.push(this.photo2);
    this.photos.push(this.photo3);
    const username = this.authenticationService.getUsername();
    const formData = this.userService.createFormData(phoneNumber, causeOfFailure, this.photos, username);
    this.subscriptions.push(
      this.userService.registration(formData).subscribe(
        (response: CustomHttpResponse) => {
          document.getElementById('new-overview-close')?.click();
          this.photos.splice(0, this.photos.length);
          form.reset();
          this.showLoading = false;
          this.sendNotification(NotificationType.SUCCESS, response.message);
        },
        (errorResponse: HttpErrorResponse) => {
          this.sendErrorNotification(NotificationType.ERROR, errorResponse.error.message);
          this.showLoading = false;
        }
      )
    );
  }

  private sendErrorNotification(notificationType: NotificationType, message: string): void {
    if (message) {
      this.notificationService.notify(notificationType, message);
    } else {
      this.notificationService.notify(notificationType, 'An error occured. Please try again.');
    }
  }

  public onImage(event: any, i: number): void{
    if (i == 1) {
      this.photo1 = event.target.files[0];
      this.ImageName1 = event.target.files[0].name;
    } else if (i == 2){
      this.photo2 = event.target.files[0];
      this.ImageName2 = event.target.files[0].name;
    } else if (i == 3){
      this.photo3 = event.target.files[0];
      this.ImageName3 = event.target.files[0].name;
    }
  }

  public addFile(){
    if (this.iFile < 2 && this.file2){
      this.iFile++;
      this.file2 = false;
    } else if (this.iFile < 2 && this.file3){
      this.iFile++;
      this.file3 = false;
    } else {
      this.notificationService.notify(NotificationType.WARNING, 'You can use maximum 3 images');
    }
  }

  public deleteFile(i: number) {
    if (i == 2){
      this.file2 = true;
      this.iFile--;
    } else if (i == 3){
      this.file3 = true;
      this.iFile--;
    }
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
