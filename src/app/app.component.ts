import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from "./service/authentication.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  name: string = '';
  flag: boolean = false;

  constructor(private router: Router, private authenticationService: AuthenticationService) {}

  ngOnInit(): void {
    if(this.authenticationService.isUserLoggedIn()){
      this.name = this.authenticationService.getUserFromLocalCache().username;
      this.flag = true;
    } else {
      this.flag = false;
    }
  }

  logOut(){
    this.authenticationService.logout();
    document.location.replace("/");
  }

}
