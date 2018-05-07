import { Injectable, Injector } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { HttpClient, HttpHeaders, HttpRequest, HttpResponse, HttpInterceptor, HttpHandler, HttpEvent,
  HttpHeaderResponse, HttpErrorResponse } from "@angular/common/http";
import 'rxjs/add/operator/map';
import { Observable, ObservableInput } from 'rxjs/Observable';
import { GLOBAL } from './GLOBAL';
import { LoginService } from './login.service';


@Injectable()
export class InterceptorService {

  constructor(private injector: Injector,
              private loginService: LoginService) {

  }
  intercept(req: HttpRequest<any>,next: HttpHandler): Observable<HttpEvent<any>> {
    if(this.loginService.getAuthorizationToken()){
      req = req.clone({
        headers: req.headers.set("Authorization",this.loginService.getAuthorizationToken())
      });
    }
    return next
      .handle(req)
      .map((response: HttpHeaderResponse) => {
        if (response.headers) {
          let token: string = response.headers.get("authorization");
          this.loginService.setAuthorizationToken('Token ' + token);
        }
        return response;
      })
      // .catch((e: any, caught: Observable<any>): ObservableInput<any> => {
      //   return this.responseInterceptor(e, caught);
      // });
  }

  private responseInterceptor(response: HttpErrorResponse, caught: any) {
    // let error: any = response.error instanceof Object ? response.error.errorMsg : null;
    //  let isTokenRequest = response.url ? response.url.toLowerCase().indexOf(this.config.urls.login) >= 0 : false;
    //  let msg = error || "Unknown error";

    // if (response.status == 419 && !isTokenRequest) {
    //   this.notify("You are not logged in");
    // } else if (response.status == 401 && !isTokenRequest) {
    //   // this.loginService.setAuthorizationToken(null);
    //   this.loginService.logout();
    // } else if (response.status === 403 && !isTokenRequest) {
    //   this.notify(msg);
    // } else if (response.status === 404 && !isTokenRequest) {
    //   this.notify(msg);
    // } else if (response.status === 405 && !isTokenRequest) {
    //   this.notify(msg);
    // } else if (response.status === 409 && !isTokenRequest) {
    //   this.notify(msg);
    // } else if (response.status === 500 && !isTokenRequest) {
    //   this.notify(msg);
    // } else if (response.status === 504 && !isTokenRequest) {
    //   this.notify(msg);
    // }
    return Observable.throw(response);
  }



}
