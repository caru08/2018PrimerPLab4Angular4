import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-listado-personas',
  templateUrl: './listadoPersonas.component.html',
  styleUrls: ['./listadoPersonas.component.scss']
})
export class ListadoPersonasComponent implements OnInit {

  public listadoPersonas  = new Array<any>();
  public showForm:boolean = false;
  public personaSeleccionada:any = {};

  ngOnInit() {
    this.listadoPersonas.push({id: '1', name: 'Pepe', mail: 'pepe@gmail.com', sexo: 'masculino', password: '123456'});
    this.listadoPersonas.push({id: '2', name: 'Carla', mail: 'carla@gmail.com', sexo: 'femenino', password: '123456'});
    this.listadoPersonas.push({id: '3', name: 'Juan', mail: 'juan@gmail.com', sexo: 'masculino', password: '123456'});
    this.listadoPersonas.push({id: '4', name: 'Ponsa', mail: 'ponsa@gmail.com', sexo: 'masculino', password: '123456'});
    this.listadoPersonas.push({id: '5', name: 'Sabrina', mail: 'sabrina@gmail.com', sexo: 'femenino', password: '123456'});
  }

  editarPersona(persona, event) {
    this.personaSeleccionada = persona;
    this.personaSeleccionada['showForm'] = event.checked;
  }

  agregarNuevaPersona() {
    this.personaSeleccionada = {};
    this.personaSeleccionada['showForm'] = true;
  }

}
