import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { GLOBAL } from './GLOBAL';

@Injectable()
export class LoginService {

  public url: string;
  private headers: Headers = new Headers();

  constructor(public _http: Http) {
    this.url = GLOBAL.url;

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
    return this._http.get(this.url + '/check-login', { params: {token: token} })
      .map(
        res => this.saveToken(res)
      );
  }

  saveToken(res){
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

  getAuthorizationToken(){
    return localStorage.getItem('userToken');
  }

  setAuthorizationToken(token){
    localStorage.setItem('userToken', token);
    this.headers.append('Authorization', token);
  }


}
