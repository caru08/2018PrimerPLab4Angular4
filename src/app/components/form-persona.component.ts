import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-form-persona',
  templateUrl: './form-persona.component.html'
})

export class FormPersonaComponent implements OnInit {

  @Input() persona: any;

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

  ngOnInit() {

  }

  aceptar() {

  }

  cancelar() {
    
  }


}
