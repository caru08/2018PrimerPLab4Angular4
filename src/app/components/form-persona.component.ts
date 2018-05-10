import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PersonasService } from '../services/personas.service';
import { LoginService } from '../services/login.service';
import { SnackMessage } from './../services/snackmessage.service';
import {  Router } from '@angular/router';

@Component({
  selector: 'app-form-persona',
  templateUrl: './form-persona.component.html'
})

export class FormPersonaComponent implements OnInit {

  @Input() persona: any;
  @Output() closeForm: EventEmitter<any> = new EventEmitter()
  public loading:boolean;

  public listaSexos = [
    {
      name: 'FEMENINO',
      value: 'femenino'
    },
    {
      name: 'MASCULINO',
      value: 'masculino'
    }
  ];

  constructor(private personaService: PersonasService,
              private loginService: LoginService,
              private snackMessage: SnackMessage,
              private router: Router ) {
  }

  ngOnInit() {
    if (!(this.persona && this.persona.name)) {
      this.persona = {'name': '', 'email': '', 'sex': ''};
    }
  }

  aceptar() {
    this.loading = true;  
    if (this.persona.id) {
      this.editarPersona();
    } else {
      this.agregarPersona();
    }
  }

  cancelar() {
    if(this.loginService.isLogged()){
      this.closeForm.emit('cancel');
    }else{
      this.router.navigate(['./Login' ]);
    }    
  }

  private agregarPersona() {
    this.personaService.crearPersona(this.persona).subscribe((response) => {
      this.snackMessage.ShowSuccesSnack("Se agrego correctamente");
      this.closeForm.emit();
      this.router.navigate(['./Listado' ]);
      this.loading = false;  
    }, (error) => {
      this.loading = false;  
      this.snackMessage.ShowSuccesSnack("Error al agregar la persona");
      console.log("error al guardar la persona", error);
    });
  }

  private editarPersona() {
    this.personaService.editarPerosna(this.persona).subscribe((response) => {
      this.snackMessage.ShowSuccesSnack("Se edito correctamente");
      this.closeForm.emit();
      this.loading = false;  
    }, (error) => {
      this.snackMessage.ShowSuccesSnack("Error al editar la persona");
      console.log("error al guardar la persona", error);
      this.loading = false;  
    });
  }


}
