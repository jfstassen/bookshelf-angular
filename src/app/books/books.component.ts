import { Component, OnInit } from '@angular/core';
import { BackendService } from '../services/backend-service';
import { Router } from '@angular/router';
import { Observable } from "rxjs";

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss']
})
export class BooksComponent implements OnInit {
    data: Observable<any>;
    books: any;
    error: any;
    dataLoading: boolean = false;
    brokenNetwork = false;
    user: boolean = false;
  constructor(private _router: Router, private _backendService: BackendService) { }

  ngOnInit() {
    this.retrievebooks();
  }
  retrievebooks() {
    this._backendService.getBooks().valueChanges.subscribe(res => {
      this.dataLoading = false;
      this.books = res.data;
      console.log(res.data)
      console.log("lol")
      // if(res.data["loginWithBasic"].token != "") {
      //   window.localStorage.setItem("token",res.data["loginWithBasic"].token);
      //   this.user = true;

      // } else {
      //   this.error = "UserID/Password don't match.";
      // }
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
}
