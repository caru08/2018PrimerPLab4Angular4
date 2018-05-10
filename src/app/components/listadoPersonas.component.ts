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

  constructor(private personasService: PersonasService,
              private loginService: LoginService,
              private snackBarMessage: SnackMessage,
              private router: Router){
    this.showForm = false;
  }

  ngOnInit() {
    if(this.loginService.isLogged()){
      this.getPersonas();
    }else{
      this.logoutClick();
    }    
  }

  editarPersona(persona, event) {
    this.personaSeleccionada = persona;
    this.personaSeleccionada['showForm'] = event.checked;
  }

  borrarPersona(persona) {
    this.personasService.borrarPersona(persona.id).subscribe((response) => {
     this.snackBarMessage.ShowSuccesSnack("Se borro correctamente");
     this.getPersonas();
    }, (error) => {
      this.snackBarMessage.ShowSuccesSnack("Error al borrar la persona: " + persona.name);
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
    this.personasService.getPersonas().subscribe((response)=> {
      this.listadoPersonas = response.data;
    }, (error) => {
      this.snackBarMessage.ShowSuccesSnack("Error al consultar las personas");
      console.log("error al pedir las personas", error);
    });
  }
}
