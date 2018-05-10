import { Component } from '@angular/core';
import {  Router } from '@angular/router';
import { LoginService } from './services/login.service';
import { SnackMessage } from './services/snackmessage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private router: Router,
              private loginService: LoginService,
              private snackMessage: SnackMessage){
    this.checkLogin();
  }

  private checkLogin() {
    this.loginService.checkLogin().subscribe((response) => {
      if(response.code == 201){
        this.router.navigate(['./Listado' ]);
      }else{
        this.router.navigate(['./Login' ]);
        console.log("ocurrio un error", response.message);
      }
      console.log(response);
    }, (error) => {
      this.router.navigate(['./Login' ]);
      console.log("ocurrio un error", error);      
    });
  }
}
