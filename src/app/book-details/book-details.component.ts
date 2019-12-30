import { Component, OnInit } from '@angular/core';
import { BackendService } from '../services/backend-service';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { Observable } from "rxjs";


@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss']
})
export class BookDetailsComponent implements OnInit {

  data: Observable<any>;
  book= [];
  error: any;
  dataLoading: boolean = false;
  brokenNetwork = false;
  user: boolean = false;
constructor(private _router: Router, private _backendService: BackendService, private route: ActivatedRoute) { }

ngOnInit() {
    
  this.route.paramMap.subscribe(params => {

    var isbn = params.get('isbn');
    this.retrievebookInfo(isbn);
    console.log(isbn);
  });

}
retrievebookInfo(isbn) {
  this.dataLoading = true;
  this._backendService.getBookInfo(isbn).valueChanges.subscribe(res => {
    this.dataLoading = false;
    // this.book = res.data["book"];
    // console.log(this.book)
    this.book.push(res.data["book"]);
    console.log(this.book)
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
