import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { SesionService} from '../../servicios/index';
import { Alumno, Profesor } from '../../clases/index';


@Component({
  selector: 'app-menu-recursos',
  templateUrl: './menu-recursos.component.html',
  styleUrls: ['./menu-recursos.component.scss']
})
export class MenuRecursosComponent implements OnInit {

  profesor: Profesor;
  varTitulo: string;

  constructor(
    private router: Router,
    private sesion: SesionService
  ) {
  }

  ngOnInit() {
    this.profesor = this.sesion.DameProfesor();
    this.varTitulo = 'titulo' + this.profesor.Estacion;
  }

  NavegarA(destino) {
    this.router.navigate(['/inicio/' + this.profesor.id + destino]);
  }
}
