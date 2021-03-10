import { Component, OnInit } from '@angular/core';
// Servicios
import {SesionService, PeticionesAPIService, CalculosService} from '../../../servicios/index';
import { Grupo, Profesor, Juego } from '../../../clases/index';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

 
  varSchool: string;
  varFooter: string;
  profesor: Profesor;

  constructor(private sesion: SesionService) { }

  ngOnInit() {
    this.profesor = this.sesion.DameProfesor();
    console.log("SOY FOOTER");  
    this.varFooter = "contenedorFooter" + this.profesor.Estacion;
    
  }
}
