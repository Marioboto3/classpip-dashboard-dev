import { AuthService } from './../../../servicios/auth.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { Router } from '@angular/router';

// Clases
import { EnfrentamientoLiga, Profesor } from '../../../clases/index';

// Servicios
import {SesionService, ComServerService} from '../../../servicios/index';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {


  @Output() public sidenavToggle = new EventEmitter();

  navbarSchool: string;
  profesor: Profesor;
  id: number;
  rutaLogo: string;

  URLInicio: string;

  // Rutas del navbar
  URLMisGrupos: string;
  URLCrearGrupo: string;
  URLMisPuntos: string;
  URLCrearPuntos: string;
  URLMisColecciones: string;
  URLCrearColeccion: string;
  URLMisAlumnos: string;
  URLIntroducirAlumnos: string;
  URLConfiguracion: string;
  URLDesarrolladores: string;
  URLEstilos: string;
  URLMisPreguntas: string;
  URLCrearPregunta: string;
  URLMisCuestionarios: string;
  URLCrearCuestionario: string;
  URLCrearEscenario: string;
  URLMisEscenarios: string;
  URLMisFamiliasAvatares: string;
  URLCrearFamiliaAvatares: string;
  URLRecursos: string;
  URLMisJuegosRapidos: string;
  URLCrearJuegoRapido: string;
  URLCambiarEstacion: string;
  URLEscapeRoom: string;


  constructor(  private sesion: SesionService,
                private comServer: ComServerService,
                private router: Router,
                private auth: AuthService) { }

  ngOnInit() {
    
   
    this.URLInicio = this.router.url;
    this.URLMisGrupos = this.URLInicio + '/misGrupos';
    this.URLCambiarEstacion = this.URLInicio + '/cambiarEstacion';
    this.URLCrearGrupo = this.URLInicio + '/crearGrupo';
    this.URLMisPuntos = this.URLInicio + '/misPuntos';
    this.URLCrearPuntos = this.URLInicio + '/crearPuntos';
    this.URLMisColecciones = this.URLInicio + '/misColecciones';
    this.URLCrearColeccion = this.URLInicio + '/crearColeccion';
    this.URLDesarrolladores = this.URLInicio + '/desarrolladores';
    this.URLMisAlumnos = this.URLInicio + '/misAlumnos';
    this.URLIntroducirAlumnos = this.URLInicio + '/introducirAlumnos';
    this.URLEstilos = this.URLInicio + '/estilos';
    this.URLConfiguracion = this.URLInicio + '/perfil';
    this.URLMisPreguntas = this.URLInicio + '/misPreguntas';
    this.URLCrearPregunta = this.URLInicio + '/crearPregunta';
    this.URLMisCuestionarios = this.URLInicio + '/misCuestionarios';
    this.URLCrearCuestionario = this.URLInicio + '/crearCuestionario';
    this.URLCrearEscenario = this.URLInicio + '/crearEscenario';
    this.URLMisEscenarios = this.URLInicio + '/misEscenarios';
    this.URLMisFamiliasAvatares = this.URLInicio + '/misFamiliasAvatares';
    this.URLCrearFamiliaAvatares = this.URLInicio + '/crearFamiliaAvatares';
    this.URLRecursos = this.URLInicio + '/recursos';
    this.URLMisJuegosRapidos = this.URLInicio + '/misJuegosRapidos';
    this.URLCrearJuegoRapido = this.URLInicio + '/crearJuegoRapido';
    this.URLEscapeRoom = this.URLInicio + '/escapeRoom';

    console.log ('estoy en navbar');
    // Me subscribo para que cada vez que cambie el profesor pueda actualizar el navbar
    // Esto es particularmente en el caso de logout, para que reciba un profesor undefined y
    // desaparezca la barra de navegación hasta que se autentifique un nuevo profesor
    this.sesion.EnviameProfesor ()
    .subscribe ( profesor => this.profesor = profesor);
    this.rutaLogo ='./assets/logo_estandar.png';
  }

  CerrarSesion() {

    this.auth.logout().subscribe(() => {
      Swal.fire('Hecho', 'Sesión cerrada con éxito, ¡vuelve pronto!', 'success');
      this.comServer.Desonectar (this.profesor.id);
      console.log ('voy a la portada');
      this.router.navigate(['portada']);
      this.profesor = undefined;
      this.sesion.EnviaProfesor(this.profesor);
      if(sessionStorage.getItem('ACCESS_TOKEN') != null){
        sessionStorage.removeItem('ACCESS_TOKEN');
      } else localStorage.removeItem('ACCESS_TOKEN');
    }, (error) => {
      Swal.fire('Error', 'Error al cerrar sesión, prueba de nuevo más tarde.', 'error');
    });
  }

}
