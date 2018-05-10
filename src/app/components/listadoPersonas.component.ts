import { Component, OnInit } from '@angular/core';
import { PersonasService } from '../services/personas.service';
import { LoginService } from '../services/login.service';
import { SnackMessage } from './../services/snackmessage.service';

import {  Router } from '@angular/router';


@Component({
  selector: 'app-listado-personas',
  templateUrl: './listadoPersonas.component.html',
  styleUrls: ['./listadoPersonas.component.scss']
})
export class ListadoPersonasComponent implements OnInit {

  public listadoPersonas  = new Array<any>();
  public showForm: boolean;
  public personaSeleccionada: any = {};
  public loading:boolean;
  constructor(private personasService: PersonasService,
              private loginService: LoginService,
              private snackBarMessage: SnackMessage,
              private router: Router){
    this.showForm = false;
  }

  ngOnInit() {
    this.loginService.checkLogin().subscribe((response) => {
      if(response.code == 201){
        this.getPersonas();
      }else{
        this.logoutClick();
        console.log("ocurrio un error", response.message);
        this.loading = false;
      }
      console.log(response);
    }, (error) => {
      this.loading = false;
      this.logoutClick();
      console.log("ocurrio un error", error);      
    });      
  }

  editarPersona(persona, event) {
    this.personaSeleccionada = persona;
    this.personaSeleccionada['showForm'] = event.checked;
  }

  borrarPersona(persona) {
    this.loading = true;
    this.personasService.borrarPersona(persona.id).subscribe((response) => {
     this.snackBarMessage.ShowSuccesSnack("Se borro correctamente");
     this.getPersonas();
    }, (error) => {
      this.snackBarMessage.ShowErrorSnack("Error al borrar la persona: " + persona.name);
      this.loading = false;
    });
  }

  logoutClick(){
    this.loginService.logout();
    this.router.navigate(['./Login' ]);
  }

  close(action) {
    if (action !== 'cancel') {
      this.getPersonas();
    }
    this.personaSeleccionada = {};
    this.personaSeleccionada['showForm'] = false;
  }

  agregarNuevaPersona() {
    this.personaSeleccionada = {};
    this.personaSeleccionada['showForm'] = true;
  }

  private getPersonas() {
    this.loading = true;
    this.personasService.getPersonas().subscribe((response)=> {
      this.listadoPersonas = response.data;
      this.loading = false;
    }, (error) => {
      this.snackBarMessage.ShowErrorSnack("Error al consultar las personas");
      console.log("error al pedir las personas", error);
      this.loading = false;
    });
  }
}
