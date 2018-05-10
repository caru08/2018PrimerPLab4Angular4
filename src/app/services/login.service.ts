import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { GLOBAL } from './GLOBAL';
import { MatSnackBar } from '@angular/material';
import { SnackMessage } from './snackmessage.service';


@Injectable()
export class LoginService {

  public url: string;
  private headers: Headers = new Headers();
  private isLogin:boolean;

  constructor(public _http: Http,
              private snackMessage: SnackMessage) {
    this.url = GLOBAL.url;
    this.isLogin = false;
  }

  login(user, pass){
    let params = { user: user, pass: pass };
    return this._http.get(this.url + '/login', { params: params, headers: this.headers })
      .map(
        res => this.saveToken(res)
      );
  }

  checkLogin(){
    let token = this.getAuthorizationToken();
    return this._http.get(this.url + '/login/check', { params: {token: token} })
      .map(
        res => this.saveToken(res)
      );
  }

  logout(){
    this.clearAuthorizationToken();
  }

  getAuthorizationToken(){
    return localStorage.getItem('userToken');
  }

  setAuthorizationToken(token){
    localStorage.setItem('userToken', token);
    this.headers.append('Authorization', token);
    this.isLogin = true;
  }

  isLogged(){
    if(this.getAuthorizationToken()){
      return true;
    }else{
      this.showErrorMessage("No estas logueado");
      return false;
    }
  }

  private saveToken(res){
    try {
      var response = res.json();
      if(response.code == 201){
        this.setAuthorizationToken(response.data);
        return response;
      }else{
        return response;
      }
    } catch (e) {
      return res;
    }
  }

  private clearAuthorizationToken(){
    localStorage.removeItem('userToken');
    this.headers.delete('Authorization');  
    this.isLogin = false;  
  }

  private showErrorMessage(message){
    this.snackMessage.ShowErrorSnack(message);
  }

}
