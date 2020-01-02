import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignupComponent } from './auth/signup/signup.component';

import { SigninComponent } from './auth/signin/signin.component';

import { AuthGuard } from './services/auth-guard.service';
import { BooksComponent } from './books/books.component';
import { BookDetailsComponent } from './book-details/book-details.component';


const routes: Routes = [
  { path: 'auth/signup', component: SignupComponent},
  
  { path: 'auth/signin', component: SigninComponent},
  { path: 'books', component: BooksComponent, canActivate: [AuthGuard]},
  { path: 'books/:isbn', component: BookDetailsComponent, canActivate: [AuthGuard]},
  { path: '', component: BooksComponent, canActivate: [AuthGuard]},
  { path: '**', component: BooksComponent, canActivate: [AuthGuard], pathMatch: 'full' }



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
