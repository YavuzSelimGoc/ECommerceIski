import { User } from './../models/user';
import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Login } from '../models/login';
import { SingleResponseModel } from '../models/singleresponse';
import { TokenModel } from '../models/token';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiUrl = environment.apiUrl;

  constructor(private httpclient:HttpClient) { }
  login(loginModel:Login){
    return this.httpclient.post<TokenModel>
    (this.apiUrl+"api/auth/login",loginModel)
  }
  register(user:User){
    let newPath=this.apiUrl+"api/Auth/register";
    return this.httpclient.post(newPath,user)
   }
  
  isAuthenticated(){
    if(localStorage.getItem("token")){
      return true;
    }
    else{
      return false;
    }
  }
}
