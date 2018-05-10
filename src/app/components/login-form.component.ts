import { SnackMessage } from './../services/snackmessage.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PersonasService } from '../services/personas.service';
import { LoginService } from '../services/login.service';
import {  Router } from '@angular/router';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html'
})

export class LoginFormComponent implements OnInit {

  public user  = {name: '', pass: ''};
  public loading:boolean;

  constructor(private router: Router,
              private loginService: LoginService,
              private snackMessage: SnackMessage ){
  }

  ngOnInit(){
  }

  loginClick() {
    this.login();
  }

  registrarse() {
    this.router.navigate(['./Persona' ]);
  }

  private login(){
    this.loading = true;
    this.loginService.login(this.user.name, this.user.pass).subscribe((response) => {
      if(response.code == 201){
        this.router.navigate(['./Listado' ]);
      }else{
        this.snackMessage.ShowErrorSnack("error al loguearse: " + response.message);
      }
      this.loading = false;
      console.log(response);
    }, (error) => {
      this.loading = false;
      this.snackMessage.ShowErrorSnack("error al loguearse: " + error);
      console.log("error al loguearse", error);
    });
  }



}
