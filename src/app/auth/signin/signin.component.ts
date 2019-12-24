import { Component, OnInit, HostBinding } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { BackendService } from '../../services/backend-service';
import { Observable } from "rxjs";

@Component({
  selector: 'app-signin',
  templateUrl: 'signin.component.html',
  styleUrls: ['./signin.component.scss']
})

export class SigninComponent implements OnInit  {
  socialAuth: boolean = false; // show Google and FB Sign in only when social auth is enabled
  error: any;
  dataLoading: boolean = false;
  brokenNetwork = false;
  user: boolean = false;
  data: Observable<any>;

  constructor(private _router: Router, private _backendService: BackendService) { }

  ngOnInit() {
    if(environment.socialAuthEnabled) {
      this.socialAuth = true; // show Google and FB Sign in only when social auth is enabled
    }
    if(localStorage.getItem("token")) {
      this.user = true;
      console.log(localStorage)
    }
}

  login(formData) {
    this._backendService.loginUser(formData).subscribe(res => {
      this.dataLoading = false;
      if(res.data["loginWithBasic"].token != "") {
        window.localStorage.setItem("token",res.data["loginWithBasic"].token);
        this.user = true;
      } else {
        this.error = "UserID/Password don't match.";
      }
    },
    (error) => {
      this.error = error;
      this.brokenNetwork = true;
    },
    () => {
      this.error = false;
      this.dataLoading = false;
      this.brokenNetwork = false;
    }
    );
    }

    logout() {
      window.localStorage.removeItem("token");
      this.user = false;
    }
  }