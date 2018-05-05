import { Component, OnInit } from '@angular/core';
import { PersonasService } from '../services/personas.service';

@Component({
  selector: 'app-listado-personas',
  templateUrl: './listadoPersonas.component.html',
  styleUrls: ['./listadoPersonas.component.scss']
})
export class ListadoPersonasComponent implements OnInit {

  public listadoPersonas  = new Array<any>();
  public showForm: boolean;
  public personaSeleccionada: any = {};

  constructor(private personasService: PersonasService){
    this.showForm = false;
  }

  ngOnInit() {
    this.getProductos();
  }

  editarPersona(persona, event) {
    this.personaSeleccionada = persona;
    this.personaSeleccionada['showForm'] = event.checked;
  }

  borrarPersona(persona) {
    this.personasService.borrarPersona(persona.id).subscribe((response) => {
      alert('se borro correctamente');
    }, (error) => {
      console.log('error al borrar la persona' + persona.name);
    });
  }

  close(action) {
    if (action !== 'cancel') {
      this.getProductos();
    }
    this.personaSeleccionada = {};
    this.personaSeleccionada['showForm'] = false;
  }

  agregarNuevaPersona() {
    this.personaSeleccionada = {};
    this.personaSeleccionada['showForm'] = true;
  }


  private getProductos() {
    this.personasService.getPersonas().subscribe((response)=> {
      this.listadoPersonas = response.data;
    }, (error) => {
      console.log("error al pedir las personas", error);
    });
  }
}
