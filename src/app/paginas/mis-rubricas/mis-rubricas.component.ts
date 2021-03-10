import { Component, OnInit } from '@angular/core';
import { SesionService, CalculosService, PeticionesAPIService } from '../../servicios';
import { Router } from '@angular/router';
import { Profesor, Rubrica } from 'src/app/clases';
import { Location } from '@angular/common';

@Component({
  selector: 'app-mis-rubricas',
  templateUrl: './mis-rubricas.component.html',
  styleUrls: ['./mis-rubricas.component.scss']
})
export class MisRubricasComponent implements OnInit {

  listaRubricas: Rubrica[];
  rubricaElegida: Rubrica;
  rubricaId: number;
  varTitulo: string;
  profesor: Profesor;
  constructor(
                private peticionesAPI: PeticionesAPIService,
                private sesion: SesionService,   private location: Location,
                private router: Router
  ) { }

  ngOnInit() {
    this.peticionesAPI.DameRubricasProfesor (this.sesion.DameProfesor().id)
    .subscribe (lista => {
      this.listaRubricas = lista;
      console.log ('Rubrias');
      console.log (this.listaRubricas);
    });
    this.profesor = this.sesion.DameProfesor();
    this.varTitulo = "titulo" + this.profesor.Estacion;
  }
  MuestraRubrica() {
    this.rubricaElegida = this.listaRubricas.filter (rubrica => rubrica.id === Number(this.rubricaId))[0]

  }

}
