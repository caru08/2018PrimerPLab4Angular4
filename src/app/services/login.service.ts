import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { GLOBAL } from './GLOBAL';

@Injectable()
export class LoginService {

  public url: string;
  private headers: Headers;

  constructor(public _http: Http) {
    this.url = GLOBAL.url;
  }

  login(){
    let params = {user: 'admin', pass:'1234'};
    return this._http.get(this.url + '/login', { params: params, headers: this.headers })
      .map(
        res => this.saveToken(res)
      );
  }

  saveToken(res){
    try {
      var response = res.json();
      if(response.status = 201){
        this.setAuthorizationToken(response.data);
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
