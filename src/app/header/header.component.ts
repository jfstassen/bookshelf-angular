import {Component, OnInit, NgModule} from '@angular/core';
import { SigninComponent } from '../auth/signin/signin.component';
import { Router } from '@angular/router';


@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {

  constructor(
    private signincomponent: SigninComponent,
    private _router: Router
  ) {
    
  }


  ngOnInit() {
   
  }




  logout() {
    window.localStorage.removeItem("token");
    this.signincomponent.user = false;
    this._router.navigate(["/"])
  }
}
