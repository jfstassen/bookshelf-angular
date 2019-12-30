import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Apollo} from 'apollo-angular';
import gql from 'graphql-tag';
import { environment } from '../../environments/environment';

const getBooks = gql`{ books(all: true) {
  nodes{
    isbn
    title
    author
    editor
    cover
    format
    }
  }
}`;
const getBookInfo = gql`query book($isbn: ID!) {
  book(isbn: $isbn){
    isbn
    title
    author
    editor
    cover
  }
}`
const loginWithBasic = gql`mutation loginWithBasic($login: String!, $pass: String!, $useCookie: Boolean) {
  loginWithBasic(login: $login, pass: $pass, useCookie: $useCookie){
    token
    connected
    headers
  }
}`;
// const createUser_M = gql`mutation updateQueries($name: String!, $email: String!, $password: String!) {
//   addUser_M(name:$name, email:$email, password:$password){
//     email
//   }
// }`;
const registerwithbasic = gql`mutation registerWithBasic($login: String!, $pass: String!, $email: String!){
	registerWithBasic(
    target: 
    {
      collection:JUNIOR,
      email:$email},
		login: $login,
    pass: $pass
  )
}`;

const updateUser_M = gql`mutation updateQueries($name: String!, $email: String!, $password: String!) {
  updateUser_M(name:$name, email:$email, password:$password){
    name
    email
  }
}`;

@Injectable({
  providedIn: 'root'
})

export class BackendService {
  // getBooks(formData: any) {
  //   throw new Error("Method not implemented.");
  // }

  constructor(private _http: HttpClient, private _apollo: Apollo) { }

  getConfig() {
    return environment.social;
  }

  getBooks(){
    return this._apollo.watchQuery({query: getBooks});
  }
  getBookInfo(isbn){
    return this._apollo.watchQuery({query: getBookInfo,
    variables: {
      isbn: isbn
    }});
  }
  
  loginUser(formData){
    return this._apollo.mutate({mutation: loginWithBasic,
      variables: {
        login : formData.username,
        pass: formData.password
      }});
  }
  registerwithbasic(formData){
    console.log(formData)
    return this._apollo.mutate({mutation: registerwithbasic,
      variables: {
        login : formData.username,
        email : formData.email,
        pass : formData.password
      }});
  }
  updateUser(formData){
    return this._apollo.mutate({mutation: updateUser_M,
      variables: {
        name : formData.name,
        email : formData.email,
        password : formData.password
      }});
  }

  // function to send emails using a PHP API
  // sendEmail(messageData) {
  //   const httpOptions = {
  //     headers: new HttpHeaders({ 'Content-Type': 'application/X-www-form-urlencoded' })
  //   };
  //   return this._http.post(environment.emailAPI, messageData, httpOptions);
  // }
}