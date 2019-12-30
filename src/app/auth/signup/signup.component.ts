import { Component, OnInit } from '@angular/core';
import { BackendService } from 'src/app/services/backend-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  state: string = '';
  idtaken = false;
  error: any;
  dataLoading: boolean = false;
  brokenNetwork = false;
  savedChanges = false;
  data;
  private querySubscription;

  constructor(private _backendService: BackendService, private router: Router) {
  }
  ngOnInit(): void {
  }

  routeLoginPage() {
    this.router.navigate(['../auth/login']);
  }

  onSubmit(formData) {
    console.log(formData)
    this.querySubscription = this._backendService.registerwithbasic(formData).subscribe(res => {
      console.log(res.data)
      if(res.data["registerwithbasic"]) {
        this.idtaken = false;
        this.savedChanges = true;
        this.dataLoading = false;
      } else {
        this.idtaken = true;
        this.dataLoading = false;
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

  ngOnDestroy() {
    // this is not needed when mydata observable is used, in this case, we are registering user on subscription, this is why it's called
    if (this.querySubscription) {
      this.querySubscription.unsubscribe();
    }
  }
}