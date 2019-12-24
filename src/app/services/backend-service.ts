import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Apollo} from 'apollo-angular';
import gql from 'graphql-tag';
import { environment } from '../../environments/environment';

const getUser_Q = gql`query userQueries {
  getUser_Q {
    name
    email
  }
}`;
const loginWithBasic = gql`mutation loginWithBasic($login: String!, $pass: String!, $useCookie: Boolean) {
  loginWithBasic(login: $login, pass: $pass, useCookie: $useCookie){
    token
    connected
    headers
  }
}`;
const createUser_M = gql`mutation updateQueries($name: String!, $email: String!, $password: String!) {
  addUser_M(name:$name, email:$email, password:$password){
    email
  }
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

  constructor(private _http: HttpClient, private _apollo: Apollo) { }

  getConfig() {
    return environment.social;
  }

  getUser(){
    return this._apollo.watchQuery({query: getUser_Q});
  }
  
  loginUser(formData){
    return this._apollo.mutate({mutation: loginWithBasic,
      variables: {
        login : formData.email,
        pass: formData.password
      }});
  }
  createUser(formData){
    return this._apollo.mutate({mutation: createUser_M,
      variables: {
        name : formData.name,
        email : formData.email,
        password : formData.password
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
  sendEmail(messageData) {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/X-www-form-urlencoded' })
    };
    return this._http.post(environment.emailAPI, messageData, httpOptions);
  }
}