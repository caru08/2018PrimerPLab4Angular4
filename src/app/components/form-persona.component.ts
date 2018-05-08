import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PersonasService } from '../services/personas.service';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-form-persona',
  templateUrl: './form-persona.component.html'
})

export class FormPersonaComponent implements OnInit {

  @Input() persona: any;
  @Output() closeForm: EventEmitter<any> = new EventEmitter()

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

  constructor(private personaService: PersonasService ) {
  }

  ngOnInit() {
    if (!(this.persona || this.persona.name)) {
      this.persona = {'nombre': '', 'email': '', 'sex': ''};
    }
  }

  aceptar() {
    if (this.persona.id) {
      this.editarPersona();
    } else {
      this.agregarPersona();
    }
  }

  cancelar() {
    this.closeForm.emit('cancel');
  }

  private agregarPersona() {
    this.personaService.crearPersona(this.persona).subscribe((response) => {
      alert("se guardo correctamentes");
      this.closeForm.emit();
    }, (error) => {
      console.log("error al guardar la persona", error);
    });
  }

  private editarPersona() {
    this.personaService.editarPerosna(this.persona).subscribe((response) => {
      alert("se actualizo correctamentes");
      this.closeForm.emit();
    }, (error) => {
      console.log("error al guardar la persona", error);
    });
  }


}
