import { AuthGuard } from './guardas/auth.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// IMPORTAMOS LOS COMPONENTES
import { LoginComponent } from './paginas/login/login.component';
import { InicioComponent } from './paginas/inicio/inicio.component';
import { CrearGrupoComponent } from './paginas/crear-grupo/crear-grupo.component';
import { MisGruposComponent } from './paginas/mis-grupos/mis-grupos.component';
import { GrupoComponent } from './paginas/grupo/grupo.component';
import { EditarGrupoComponent } from './paginas/editar-grupo/editar-grupo.component';
import { EquiposComponent } from './paginas/equipos/equipos.component';
import { EditarEquipoComponent } from './paginas/equipos/editar-equipo/editar-equipo.component';
import { AboutClasspipComponent } from './paginas/about-classpip/about-classpip.component';
import { MisPuntosComponent } from './paginas/mis-puntos/mis-puntos.component';
import { CrearPuntoComponent } from './paginas/crear-punto/crear-punto.component';
import { JuegoComponent } from './paginas/juego/juego.component';
import { JuegoSeleccionadoActivoComponent } from './paginas/juego-seleccionado-activo/juego-seleccionado-activo.component';
//import { JuegoDeCuestionarioKahootSeleccionadoActivoComponent } from './paginas/juego-seleccionado-activo\juego-de-cuestionario-kahoot-seleccionado-activo';

// tslint:disable-next-line:max-line-length
import { AsignarPuntosComponent } from './paginas/juego-seleccionado-activo/juego-de-puntos-seleccionado-activo/asignar-puntos/asignar-puntos.component';
// tslint:disable-next-line:max-line-length
import { AlumnoSeleccionadoJuegoDePuntosComponent } from './paginas/juego-seleccionado-activo/juego-de-puntos-seleccionado-activo/alumno-seleccionado-juego-de-puntos/alumno-seleccionado-juego-de-puntos.component';
import { CrearColeccionComponent } from './paginas/crear-coleccion/crear-coleccion.component';
import { MisColeccionesComponent } from './paginas/mis-colecciones/mis-colecciones.component';
// tslint:disable-next-line:max-line-length
import { InformacionJuegoPuntosComponent } from './paginas/juego-seleccionado-activo/juego-de-puntos-seleccionado-activo/informacion-juego-puntos/informacion-juego-puntos.component';
// tslint:disable-next-line:max-line-length
import { EquipoSeleccionadoJuegoDePuntosComponent } from './paginas/juego-seleccionado-activo/juego-de-puntos-seleccionado-activo/equipo-seleccionado-juego-de-puntos/equipo-seleccionado-juego-de-puntos.component';
import { JuegoSeleccionadoInactivoComponent } from './paginas/juego-seleccionado-inactivo/juego-seleccionado-inactivo.component';
import { EditarPuntoComponent } from './paginas/mis-puntos/editar-punto/editar-punto.component';
import { EditarInsigniaComponent } from './paginas/mis-puntos/editar-insignia/editar-insignia.component';
import { EditarColeccionComponent } from './paginas/mis-colecciones/editar-coleccion/editar-coleccion.component';
import { GuardarColeccionComponent } from './paginas/mis-colecciones/guardar-coleccion/guardar-coleccion.component';
import { MostrarColeccionComponent } from './paginas/mis-colecciones/mostrar-coleccion/mostrar-coleccion.component';



// tslint:disable-next-line:max-line-length
import { AsignarCromosComponent } from './paginas/juego-seleccionado-activo/juego-de-coleccion-seleccionado-activo/asignar-cromos/asignar-cromos.component';
// tslint:disable-next-line:max-line-length
import { InformacionJuegoColeccionComponent } from './paginas/juego-seleccionado-activo/juego-de-coleccion-seleccionado-activo/informacion-juego-coleccion/informacion-juego-coleccion.component';

// tslint:disable-next-line:max-line-length
import { AlumnoSeleccionadoJuegoDeColeccionComponent } from './paginas/juego-seleccionado-activo/juego-de-coleccion-seleccionado-activo/alumno-seleccionado-juego-de-coleccion/alumno-seleccionado-juego-de-coleccion.component';
// tslint:disable-next-line:max-line-length
import { EquipoSeleccionadoJuegoDeColeccionComponent } from './paginas/juego-seleccionado-activo/juego-de-coleccion-seleccionado-activo/equipo-seleccionado-juego-de-coleccion/equipo-seleccionado-juego-de-coleccion.component';
import { SesionesClaseComponent } from './paginas/sesiones-clase/sesiones-clase.component';
// tslint:disable-next-line:max-line-length
import { AlbumDelAlumnoComponent } from './paginas/juego-seleccionado-activo/juego-de-coleccion-seleccionado-activo/alumno-seleccionado-juego-de-coleccion/album-del-alumno/album-del-alumno.component';
// tslint:disable-next-line:max-line-length
import { AlbumEquipoComponent } from './paginas/juego-seleccionado-activo/juego-de-coleccion-seleccionado-activo/equipo-seleccionado-juego-de-coleccion/album-equipo/album-equipo.component';
import { ConfiguracionProfesorComponent } from './paginas/COMPARTIDO/configuracion-profesor/configuracion-profesor.component';
import {MisAlumnosComponent} from './paginas/mis-alumnos/mis-alumnos.component';
import {IntroducirAlumnosComponent} from './paginas/introducir-alumnos/introducir-alumnos.component';


// JUEGO DE COMPETICIÓN
// tslint:disable-next-line:max-line-length
import { InformacionJuegoDeCompeticionComponent } from './paginas/juego-seleccionado-activo/juego-de-competicion-seleccionado-activo/informacion-juego-de-competicion/informacion-juego-de-competicion.component';
// tslint:disable-next-line:max-line-length
import { InformacionJuegoDeCompeticionInactivoComponent } from './paginas/juego-seleccionado-inactivo/juego-de-competicion-seleccionado-inactivo/informacion-juego-de-competicion-inactivo/informacion-juego-de-competicion-inactivo.component';

// tslint:disable-next-line:max-line-length
import { EditarJornadasJuegoDeCompeticionComponent } from './paginas/juego-seleccionado-activo/juego-de-competicion-seleccionado-activo/editar-jornadas-juego-de-competicion/editar-jornadas-juego-de-competicion.component';

// tslint:disable-next-line:max-line-length
import { GanadorJuegoDeCompeticionLigaComponent } from './paginas/juego-seleccionado-activo/juego-de-competicion-seleccionado-activo/ganador-juego-de-competicion-liga/ganador-juego-de-competicion-liga.component';

// tslint:disable-next-line:max-line-length
import { InformacionJuegoDeCompeticionFormulaUnoComponent } from './paginas/juego-seleccionado-activo/juego-de-competicion-formula-uno-seleccionado-activo/informacion-juego-formula-uno/informacion-juego-formula-uno.component';
// tslint:disable-next-line:max-line-length
import { GanadoresJuegoDeCompeticionFormulaUnoComponent } from './paginas/juego-seleccionado-activo/juego-de-competicion-formula-uno-seleccionado-activo/ganadores-juego-formula-uno/ganadores-juego-formula-uno.component';
// tslint:disable-next-line:max-line-length
import { EditarJornadasJuegoDeCompeticionFormulaUnoComponent } from './paginas/juego-seleccionado-activo/juego-de-competicion-formula-uno-seleccionado-activo/editar-jornadas-juego-formula-uno/editar-jornadas-juego-formula-uno.component';
// tslint:disable-next-line:max-line-length
import { EditarPuntosJuegoDeCompeticionFormulaUnoComponent } from './paginas/juego-seleccionado-activo/juego-de-competicion-formula-uno-seleccionado-activo/editar-puntos-juego-formula-uno/editar-puntos-juego-formula-uno.component';
// tslint:disable-next-line:max-line-length
import { InformacionJuegoDeCompeticionFormulaUnoInactivoComponent } from './paginas/juego-seleccionado-inactivo/juego-de-competicion-formula-uno-seleccionado-inactivo/informacion-juego-formula-uno-inactivo/informacion-juego-formula-uno-inactivo.component';
import { AppComponent } from './app.component';
import { ElementosComponent } from './elementos/elementos.component';
import { DesarrolladoresComponent } from './desarrolladores/desarrolladores.component';
import {EstilosComponent} from './estilos/estilos.component';
import { DeactivateGuardCrearGrupo } from './guardas/canExitCrearGrupo.guard';
import { DeactivateGuardCrearColeccion } from './guardas/canExitCrearColeccion.guard';
import { DeactivateGuardCrearJuego } from './guardas/canExitCrearJuego.guard';


// Importamos componentes modulo cuestionario
import { PreguntaComponent } from './paginas/pregunta/pregunta.component';
import { CrearCuestionarioComponent } from './paginas/crear-cuestionario/crear-cuestionario.component';
import { MisPreguntasComponent } from './paginas/mis-preguntas/mis-preguntas.component';
import { MisCuestionariosComponent } from './paginas/mis-cuestionarios/mis-cuestionarios.component';
import { DeactivateGuardCrearCuestionario } from './guardas/canExitCrearCuestionario.guard';
import { EditarCuestionarioComponent } from './paginas/editar-cuestionario/editar-cuestionario.component';
import { JuegoSeleccionadoPreparadoComponent } from './paginas/juego-seleccionado-preparado/juego-seleccionado-preparado.component';



// componentes para avatares

import { CrearFamiliaAvataresComponent } from './paginas/crear-familia-avatares/crear-familia-avatares.component';

import { MisFamiliasAvataresComponent } from './paginas/mis-familias-avatares/mis-familias-avatares.component';

// tslint:disable-next-line:max-line-length
import { MostrarAvatarAlumnoComponent } from './paginas/juego-seleccionado-activo/juego-de-avatar-seleccionado-activo/mostrar-avatar-alumno/mostrar-avatar-alumno.component';
import {VerTodosComponent} from './paginas/juego-seleccionado-activo/juego-de-avatar-seleccionado-activo/ver-todos/ver-todos.component';
// tslint:disable-next-line:max-line-length
import { InformacionJuegoAvatarComponent } from './paginas/juego-seleccionado-activo/juego-de-avatar-seleccionado-activo/informacion-juego-avatar/informacion-juego-avatar.component';

import {GuardarFamiliaComponent} from './paginas/mis-familias-avatares/guardar-familia/guardar-familia.component';
import { MostrarFamiliaComponent } from './paginas/mis-familias-avatares/mostrar-familia/mostrar-familia.component';
import { DeactivateGuardCrearEscenario } from './guardas/canExitCrearEscenario.guard';
import { CrearEscenarioComponent } from './paginas/crear-escenario/crear-escenario.component';
import { EditarEscenarioComponent } from './paginas/mis-escenarios/editar-escenario/editar-escenario.component';
import { MisEscenariosComponent } from './paginas/mis-escenarios/mis-escenarios.component';
import {MenuRecursosComponent} from './paginas/menu-recursos/menu-recursos.component';

import {CrearRubricaComponent } from './paginas/crear-rubrica/crear-rubrica.component';
import { MisRubricasComponent } from './paginas/mis-rubricas/mis-rubricas.component';

import {MisObjetosEscapeRoomComponent} from './paginas/mis-objetos-escape-room/mis-objetos-escape-room.component';

import {CrearFamiliaImagenesPerfilComponent} from './paginas/crear-familia-imagenes-perfil/crear-familia-imagenes-perfil.component';
import {MisFamiliasImagenesPerfilComponent} from './paginas/mis-familias-imagenes-perfil/mis-familias-imagenes-perfil.component';

// tslint:disable-next-line:max-line-length
import { CrearCuestionarioSatisfaccionComponent } from './paginas/crear-cuestionario-satisfaccion/crear-cuestionario-satisfaccion.component';
import {MisCuestionariosSatisfaccionComponent} from './paginas/mis-cuestionarios-satisfaccion/mis-cuestionarios-satisfaccion.component';

import {MisJuegosRapidosComponent} from './paginas/mis-juegos-rapidos/mis-juegos-rapidos.component';

import {CrearJuegoRapidoComponent} from './paginas/crear-juego-rapido/crear-juego-rapido.component';

import {JuegoDeEncuestaRapidaComponent} from './paginas/mis-juegos-rapidos/juego-de-encuesta-rapida/juego-de-encuesta-rapida.component';
import {JuegoDeVotacionRapidaComponent} from './paginas/mis-juegos-rapidos/juego-de-votacion-rapida/juego-de-votacion-rapida.component';
// tslint:disable-next-line:max-line-length
import {JuegoDeCuestionarioRapidoComponent} from './paginas/mis-juegos-rapidos/juego-de-cuestionario-rapido/juego-de-cuestionario-rapido.component';

// tslint:disable-next-line:max-line-length
import {JuegoDeCogerTurnoRapidoComponent} from './paginas/mis-juegos-rapidos/juego-de-coger-turno-rapido/juego-de-coger-turno-rapido.component';


// tslint:disable-next-line:max-line-length
import { EditarCuestionarioSatisfaccionComponent } from './paginas/editar-cuestionario-satisfaccion/editar-cuestionario-satisfaccion.component';

import { DeactivateGuardEncuestaRapida } from './guardas/canExitEncuestaRapida.guard';
import { DeactivateGuardCogerTurnoRapido } from './guardas/canExitCogerTurnoRapido.guard';
import { DeactivateGuardCuestionarioRapido } from './guardas/canExitCuestionarioRapido.guard';
import { DeactivateGuardVotacionRapida } from './guardas/canExitVotacionRapida.guard';
import { ModificarPerfilComponent } from './paginas/modificar-perfil/modificar-perfil.component';
import { GestionPreguntaKahootComponent } from './paginas/juego-seleccionado-activo/juego-de-cuestionario-kahoot-seleccionado-activo/gestion-pregunta-kahoot/gestion-pregunta-kahoot.component';
import { MostrarCuestionarioComponent } from './paginas/mis-cuestionarios/mostrar-cuestionario/mostrar-cuestionario.component';
import { MostrarCuestionarioSatisfaccionComponent } from './paginas/mis-cuestionarios-satisfaccion/mostrar-cuestionario-satisfaccion/mostrar-cuestionario-satisfaccion.component';
import { PortadaComponent } from './paginas/portada/portada.component';
import { CambiarEstacionComponent } from './paginas/cambiar-estacion/cambiar-estacion.component';
import { MisEscenariosEscapeRoomComponent } from './paginas/mis-escenarios-escape-room/mis-escenarios-escape-room.component';
import { CrearEscenarioEscapeComponent } from './paginas/crear-escenario-escape/crear-escenario-escape.component';
import { CrearObjetoEscapeRoomComponent } from './paginas/crear-objeto-escape-room/crear-objeto-escape-room.component';

const routes: Routes = [

  // LOGIN
  { path: 'login', component: LoginComponent },
  //{ path: '', redirectTo: '/login', pathMatch: 'full' },

  //PORTADA
  { path: 'portada', component: PortadaComponent },
  { path: '', redirectTo: '/portada', pathMatch: 'full' },
  ////////////////////////////// RUTAS DESDE EL INICIO A LOS COMPONENTES PRINCIPALES DEL NAVBAR ////////////////////


  // CLASSPIP
  { path: 'aboutClasspip', component: AboutClasspipComponent, canActivate: [AuthGuard] },

  // INICIO
  { path: 'inicio', component: InicioComponent, canActivate: [AuthGuard] },
  { path: 'inicio/:id', component: InicioComponent, canActivate: [AuthGuard] },

  { path: 'inicio/:id/desarrolladores', component: DesarrolladoresComponent, canActivate: [AuthGuard] },
  { path: 'inicio/:id/estilos', component: EstilosComponent, canActivate: [AuthGuard] },

  { path: 'inicio/:id/recursos', component: MenuRecursosComponent, canActivate: [AuthGuard] },


  { path: 'inicio/:id/perfil', component: ModificarPerfilComponent, canActivate: [AuthGuard] },

  // GRUPOS
  //  La página de crear grupos tiene una guarda para que no pueda abandonarse
  // a menos que el usuario lo confirme
  // Hay que evitar que se abandone a medias el proceso de creación de un grupo
  { path: 'inicio/:id/crearGrupo', component: CrearGrupoComponent, canActivate: [AuthGuard], canDeactivate: [DeactivateGuardCrearGrupo] },
  // { path: 'inicio/:id/crearGrupo', component: CrearGrupoComponent},

  { path: 'inicio/:id/misGrupos', component: MisGruposComponent, canActivate: [AuthGuard] },





  // COLECCIÓN
  { path: 'inicio/:id/crearColeccion', component: CrearColeccionComponent, canActivate: [AuthGuard], canDeactivate: [DeactivateGuardCrearColeccion] },
  { path: 'inicio/:id/misColecciones', component: MisColeccionesComponent, canActivate: [AuthGuard] },

  // PUNTOS INSIGNIAS
  { path: 'inicio/:id/crearPuntos', component: CrearPuntoComponent, canActivate: [AuthGuard] },
  { path: 'inicio/:id/misPuntos', component: MisPuntosComponent, canActivate: [AuthGuard] },

   // ALUMNNOS
   { path: 'inicio/:id/misAlumnos', component: MisAlumnosComponent, canActivate: [AuthGuard] },
   { path: 'inicio/:id/introducirAlumnos', component: IntroducirAlumnosComponent, canActivate: [AuthGuard] },


  //////////////////////////// RUTAS RELACIONADAS CON COMPONENTES PRINCIPALES /////////////////////////////////////////



  // GRUPOS
  { path: 'grupo/:id', component: GrupoComponent, canActivate: [AuthGuard] },
  { path: 'grupo/:id/editarGrupo', component: EditarGrupoComponent, canActivate: [AuthGuard] },

  // GRUPOS --> SESIONES CLASE
  { path: 'grupo/:id/sesionesClase', component: SesionesClaseComponent, canActivate: [AuthGuard] },

  // GRUPOS --> EQUIPOS
  { path: 'grupo/:id/equiposGrupo', component: EquiposComponent, canActivate: [AuthGuard] },
  { path: 'grupo/:id/equiposGrupo/editarEquipo', component: EditarEquipoComponent, canActivate: [AuthGuard] },


  // GRUPOS --> JUEGOS
  { path: 'grupo/:id/juegos', component: JuegoComponent, canActivate: [AuthGuard], canDeactivate: [DeactivateGuardCrearJuego] },
  { path: 'grupo/:id/juegos/juegoSeleccionadoActivo', component: JuegoSeleccionadoActivoComponent, canActivate: [AuthGuard] },
  { path: 'grupo/:id/juegos/juegoSeleccionadoInactivo', component: JuegoSeleccionadoInactivoComponent, canActivate: [AuthGuard] },
  { path: 'grupo/:id/juegos/juegoSeleccionadoPreparado', component: JuegoSeleccionadoPreparadoComponent, canActivate: [AuthGuard]},

  // GRUPOS --> JUEGOS --> JUEGO DE PUNTOS
  { path: 'grupo/:id/juegos/juegoSeleccionadoActivo/asignarPuntos', component: AsignarPuntosComponent, canActivate: [AuthGuard] },
  { path: 'grupo/:id/juegos/juegoSeleccionadoActivo/informacionAlumnoJuego', component: AlumnoSeleccionadoJuegoDePuntosComponent, canActivate: [AuthGuard] },
  { path: 'grupo/:id/juegos/juegoSeleccionadoActivo/informacionJuego', component: InformacionJuegoPuntosComponent, canActivate: [AuthGuard] },
  { path: 'grupo/:id/juegos/juegoSeleccionadoActivo/informacionEquipoJuego', component: EquipoSeleccionadoJuegoDePuntosComponent, canActivate: [AuthGuard] },
  { path: 'grupo/:id/juegos/juegoSeleccionadoInactivo/informacionJuego', component: InformacionJuegoPuntosComponent, canActivate: [AuthGuard] },
  { path: 'grupo/:id/juegos/juegoSeleccionadoInactivo/informacionAlumnoJuego', component: AlumnoSeleccionadoJuegoDePuntosComponent, canActivate: [AuthGuard] },
  { path: 'grupo/:id/juegos/juegoSeleccionadoInactivo/informacionEquipoJuego', component: EquipoSeleccionadoJuegoDePuntosComponent, canActivate: [AuthGuard] },

  // GRUPOS --> JUEGOS --> JUEGO DE COLECCIÓN
  { path: 'grupo/:id/juegos/juegoSeleccionadoActivo/asignarCromos', component: AsignarCromosComponent, canActivate: [AuthGuard] },
  { path: 'grupo/:id/juegos/juegoSeleccionadoActivo/informacionJuegoColeccion', component: InformacionJuegoColeccionComponent, canActivate: [AuthGuard] },
  // tslint:disable-next-line:max-line-length
  { path: 'grupo/:id/juegos/juegoSeleccionadoActivo/informacionAlumnoJuegoColeccion', component: AlumnoSeleccionadoJuegoDeColeccionComponent, canActivate: [AuthGuard] },
  // tslint:disable-next-line:max-line-length
  { path: 'grupo/:id/juegos/juegoSeleccionadoActivo/informacionEquipoJuegoColeccion', component: EquipoSeleccionadoJuegoDeColeccionComponent, canActivate: [AuthGuard] },
  { path: 'grupo/:id/juegos/juegoSeleccionadoActivo/informacionAlumnoJuegoColeccion/Album', component: AlbumDelAlumnoComponent, canActivate: [AuthGuard] },
  { path: 'grupo/:id/juegos/juegoSeleccionadoActivo/informacionEquipoJuegoColeccion/AlbumEquipo', component: AlbumEquipoComponent, canActivate: [AuthGuard] },
  { path: 'grupo/:id/juegos/juegoSeleccionadoInactivo/informacionJuegoColeccion', component: InformacionJuegoColeccionComponent, canActivate: [AuthGuard] },
  // tslint:disable-next-line:max-line-length
  { path: 'grupo/:id/juegos/juegoSeleccionadoInactivo/informacionAlumnoJuegoColeccion', component: AlumnoSeleccionadoJuegoDeColeccionComponent, canActivate: [AuthGuard] },
  // tslint:disable-next-line:max-line-length
  { path: 'grupo/:id/juegos/juegoSeleccionadoInactivo/informacionEquipoJuegoColeccion', component: EquipoSeleccionadoJuegoDeColeccionComponent, canActivate: [AuthGuard] },
  { path: 'grupo/:id/juegos/juegoSeleccionadoInactivo/informacionAlumnoJuegoColeccion/Album', component: AlbumDelAlumnoComponent, canActivate: [AuthGuard]},
  { path: 'grupo/:id/juegos/juegoSeleccionadoInactivo/informacionEquipoJuegoColeccion/AlbumEquipo', component: AlbumEquipoComponent, canActivate: [AuthGuard] },


  // GRUPOS --> JUEGOS --> JUEGO DE COMPETICIÓN
  { path: 'grupo/:id/juegos/juegoSeleccionadoActivo/informacionJuegoDeCompeticion', component: InformacionJuegoDeCompeticionComponent, canActivate: [AuthGuard] },
  // tslint:disable-next-line:max-line-length
  { path: 'grupo/:id/juegos/juegoSeleccionadoActivo/editarjornadasJuegoDeCompeticion', component: EditarJornadasJuegoDeCompeticionComponent, canActivate: [AuthGuard]},
  // tslint:disable-next-line:max-line-length
  {path: 'grupo/:id/juegos/juegoSeleccionadoActivo/seleccionarGanadorJuegoDeCompeticionLiga', component: GanadorJuegoDeCompeticionLigaComponent, canActivate: [AuthGuard]},
  // tslint:disable-next-line:max-line-length
  { path: 'grupo/:id/juegos/juegoSeleccionadoInactivo/informacionJuegoDeCompeticionInactivo', component: InformacionJuegoDeCompeticionInactivoComponent, canActivate: [AuthGuard] },
  // tslint:disable-next-line:max-line-length
  { path: 'grupo/:id/juegos/juegoSeleccionadoActivo/informacionJuegoDeCompeticionFormulaUno', component: InformacionJuegoDeCompeticionFormulaUnoComponent, canActivate: [AuthGuard] },
  // tslint:disable-next-line:max-line-length
  { path: 'grupo/:id/juegos/juegoSeleccionadoActivo/ganadoresJuegoDeCompeticionFormulaUno', component: GanadoresJuegoDeCompeticionFormulaUnoComponent, canActivate: [AuthGuard] },
  // tslint:disable-next-line:max-line-length
  { path: 'grupo/:id/juegos/juegoSeleccionadoActivo/editarjornadasJuegoDeCompeticionFormulaUno', component: EditarJornadasJuegoDeCompeticionFormulaUnoComponent, canActivate: [AuthGuard] },
   // tslint:disable-next-line:max-line-length
   { path: 'grupo/:id/juegos/juegoSeleccionadoActivo/editarpuntosJuegoDeCompeticionFormulaUno', component: EditarPuntosJuegoDeCompeticionFormulaUnoComponent, canActivate: [AuthGuard] },
  // tslint:disable-next-line:max-line-length
  { path: 'grupo/:id/juegos/juegoSeleccionadoInactivo/informacionJuegoDeCompeticionFormulaUnoInactivo', component: InformacionJuegoDeCompeticionFormulaUnoInactivoComponent, canActivate: [AuthGuard] },

// GRUPOS --> JUEGOS --> JUEGO DE CUESTIONARIO
  { path: 'grupo/:id/juegos/juegoSeleccionadoActivo/gestionarPreguntaKahoot', component: GestionPreguntaKahootComponent, canActivate: [AuthGuard]},

  // COLECCIÓN
  { path: 'inicio/:id/misColecciones/editarColeccion', component: EditarColeccionComponent, canActivate: [AuthGuard] },
  { path: 'inicio/:id/misColecciones/guardarColeccion', component: GuardarColeccionComponent, canActivate: [AuthGuard] },
  { path: 'inicio/:id/misColecciones/mostrarColeccion', component: MostrarColeccionComponent, canActivate: [AuthGuard] },

  // PUNTOS E INSIGNIAS
  { path: 'inicio/:id/misPuntos/editarPunto', component: EditarPuntoComponent, canActivate: [AuthGuard] },
  { path: 'inicio/:id/misPuntos/editarInsignia', component: EditarInsigniaComponent, canActivate: [AuthGuard] },

  // CONFIGURACION
  { path: 'inicio/:id/configuracionProfesor', component: ConfiguracionProfesorComponent, canActivate: [AuthGuard] },
  {path: 'inicio/:id/cambiarEstacion', component: CambiarEstacionComponent, canActivate: [AuthGuard]},

  // PREGUNTAS
  { path: 'inicio/:id/crearPregunta', component: PreguntaComponent, canActivate: [AuthGuard]},
  { path: 'inicio/:id/misPreguntas', component: MisPreguntasComponent, canActivate: [AuthGuard]},

  // CUESTIONARIOS
  { path: 'inicio/:id/crearCuestionario', component: CrearCuestionarioComponent, canDeactivate: [DeactivateGuardCrearCuestionario], canActivate: [AuthGuard] },
  { path: 'inicio/:id/misCuestionarios', component: MisCuestionariosComponent, canActivate: [AuthGuard]},
  { path: 'inicio/:id/misCuestionarios/mostrarCuestionario', component: PortadaComponent, canActivate: [AuthGuard]},
  { path: 'inicio/:id/editarCuestionario', component: EditarCuestionarioComponent, canActivate: [AuthGuard]},
  

  // escenarios
  { path: 'inicio/:id/crearEscenario', component: CrearEscenarioComponent, canDeactivate: [DeactivateGuardCrearEscenario], canActivate: [AuthGuard] },
  { path: 'inicio/:id/misEscenarios', component: MisEscenariosComponent, canActivate: [AuthGuard] },
  { path: 'inicio/:id/misEscenarios/editarEscenario', component: EditarEscenarioComponent, canActivate: [AuthGuard] },

  //escenariosEscapeRoom
  { path: 'inicio/:id/crearEscenarioEscapeRoom', component: CrearEscenarioEscapeComponent, canActivate: [AuthGuard] },
  { path: 'inicio/:id/misEscenariosEscapeRoom', component: MisEscenariosEscapeRoomComponent, canActivate: [AuthGuard] },

  //Objetos del escape room

  { path: 'inicio/:id/misObjetosEscapeRoom', component: MisObjetosEscapeRoomComponent, canActivate: [AuthGuard]},
  { path: 'inicio/:id/crearObjetoEscapeRoom', component: CrearObjetoEscapeRoomComponent, canActivate: [AuthGuard]},

  // AVATARES
  { path: 'inicio/:id/misFamiliasAvatares', component: MisFamiliasAvataresComponent, canActivate: [AuthGuard]},
  { path: 'inicio/:id/misFamiliasAvatares/guardarFamilia', component: GuardarFamiliaComponent, canActivate: [AuthGuard]},
  { path: 'inicio/:id/misFamiliasAvatares/mostrarFamilia', component: MostrarFamiliaComponent, canActivate: [AuthGuard]},
  { path: 'inicio/:id/crearFamiliaAvatares', component: CrearFamiliaAvataresComponent, canActivate: [AuthGuard]},
  { path: 'grupo/:id/juegos/juegoSeleccionadoActivo/MostrarAvatarAlumno', component: MostrarAvatarAlumnoComponent, canActivate: [AuthGuard] },
  { path: 'grupo/:id/juegos/juegoSeleccionadoActivo/informacionJuegoAvatar', component: InformacionJuegoAvatarComponent, canActivate: [AuthGuard] },
  { path: 'grupo/:id/juegos/juegoSeleccionadoActivo/verTodos', component: VerTodosComponent, canActivate: [AuthGuard] },


  // Rubricas
  { path: 'inicio/:id/crearRubrica', component: CrearRubricaComponent, canActivate: [AuthGuard]},
  { path: 'inicio/:id/misRubricas', component: MisRubricasComponent, canActivate: [AuthGuard]},

  // Familias de imagenes de perfil
  { path: 'inicio/:id/crearFamiliaDeImagenesDePerfil', component: CrearFamiliaImagenesPerfilComponent, canActivate: [AuthGuard]},
  { path: 'inicio/:id/misFamiliasDeImagenesDePerfil', component: MisFamiliasImagenesPerfilComponent, canActivate: [AuthGuard]},

  // Cuestionarios de satisfacción
  { path: 'inicio/:id/crearCuestionarioDeSatisfaccion', component: CrearCuestionarioSatisfaccionComponent, canActivate: [AuthGuard]},
  { path: 'inicio/:id/misCuestionariosDeSatisfaccion', component: MisCuestionariosSatisfaccionComponent, canActivate: [AuthGuard]},
  { path: 'inicio/:id/editarCuestionarioDeSatisfaccion', component: EditarCuestionarioSatisfaccionComponent, canActivate: [AuthGuard]},
  { path: 'inicio/:id/misCuestionariosDeSatisfaccion/mostrarCuestionarioDeSatisfaccion', component: MostrarCuestionarioSatisfaccionComponent, canActivate: [AuthGuard]},



  // JUEGOS RAPIDOS

  { path: 'inicio/:id/misJuegosRapidos', component: MisJuegosRapidosComponent, canActivate: [AuthGuard]},
  { path: 'inicio/:id/crearJuegoRapido', component: CrearJuegoRapidoComponent, canActivate: [AuthGuard]},
  // tslint:disable-next-line:max-line-length
  { path: 'inicio/:id/misJuegosRapidos/juegoDeEncuestaRapida', component: JuegoDeEncuestaRapidaComponent, canDeactivate: [DeactivateGuardEncuestaRapida], canActivate: [AuthGuard]},
  // tslint:disable-next-line:max-line-length
  { path: 'inicio/:id/misJuegosRapidos/juegoDeVotacionRapida', component: JuegoDeVotacionRapidaComponent, canDeactivate: [DeactivateGuardVotacionRapida], canActivate: [AuthGuard]},
  // tslint:disable-next-line:max-line-length
  { path: 'inicio/:id/misJuegosRapidos/juegoDeCuestionarioRapido', component: JuegoDeCuestionarioRapidoComponent, canDeactivate: [DeactivateGuardCuestionarioRapido], canActivate: [AuthGuard]},
  // tslint:disable-next-line:max-line-length
  { path: 'inicio/:id/misJuegosRapidos/juegoDeCogerTurnoRapido', component: JuegoDeCogerTurnoRapidoComponent, canDeactivate: [DeactivateGuardCogerTurnoRapido], canActivate: [AuthGuard]}
  ,
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  // tslint:disable-next-line:max-line-length
  providers: [DeactivateGuardCrearGrupo, DeactivateGuardCrearColeccion, DeactivateGuardCrearJuego,
              DeactivateGuardCrearCuestionario, DeactivateGuardCrearEscenario, DeactivateGuardEncuestaRapida,
              DeactivateGuardCogerTurnoRapido, DeactivateGuardCuestionarioRapido, DeactivateGuardVotacionRapida, AuthGuard],
  exports: [RouterModule]
})
export class AppRoutingModule { }
