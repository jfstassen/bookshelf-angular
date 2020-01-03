import { SigninComponent } from "./../auth/signin/signin.component";
import { Component, OnInit, NgModule } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"]
})
export class HeaderComponent implements OnInit {
  constructor(
    private signincomponent: SigninComponent,
    private _router: Router
  ) {}

  ngOnInit() {
    this.signincomponent.user = true;
  }

  logout() {
    window.localStorage.removeItem("token");
    this.signincomponent.user = false;
    this._router.navigate(["/"]);
  }
}
