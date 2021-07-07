import { Injectable } from '@angular/core';
import {Observable, Subject , of } from 'rxjs';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { ResponseContentType, Http} from '@angular/http';


import { Profesor, Grupo, Alumno, Matricula, Juego, Punto, Nivel, AlumnoJuegoDePuntos,
        Equipo, AsignacionEquipo, AsignacionPuntosJuego, EquipoJuegoDePuntos, Coleccion,
        AlumnoJuegoDeColeccion, EquipoJuegoDeColeccion, Cromo, HistorialPuntosAlumno, HistorialPuntosEquipo,
        Album, AlbumEquipo, Insignia, AlumnoJuegoDeCompeticionLiga, EquipoJuegoDeCompeticionLiga,
        Jornada, EnfrentamientoLiga, Pregunta,  PreguntaDelCuestionario, Cuestionario, AlumnoJuegoDeCompeticionFormulaUno,
        EquipoJuegoDeCompeticionFormulaUno, SesionClase, AsistenciaClase, FamiliaAvatares, JuegoDeAvatar,
        AlumnoJuegoDeAvatar, JuegoDeCuestionario, AlumnoJuegoDeCuestionario,
        RespuestaJuegoDeCuestionario, JuegoDeVotacionUnoATodos, AlumnoJuegoDeVotacionUnoATodos, Rubrica,
        JuegoDeVotacionTodosAUno, AlumnoJuegoDeVotacionTodosAUno, FamiliaDeImagenesDePerfil,
        CuestionarioSatisfaccion, JuegoDeCuestionarioSatisfaccion, AlumnoJuegoDeCuestionarioSatisfaccion,
        JuegoDeEncuestaRapida, JuegoDeVotacionRapida, JuegoDeCuestionarioRapido, JuegoDeCogerTurnoRapido, JuegoDePuntos} from '../clases/index';

import { Escenario } from '../clases/Escenario';
import { PuntoGeolocalizable } from '../clases/PuntoGeolocalizable';
import { JuegoDeGeocaching } from '../clases/JuegoDeGeocaching';
import { AlumnoJuegoDeGeocaching } from '../clases/AlumnoJuegoDeGeocaching';
import {JuegoDeEvaluacion} from '../clases/JuegoDeEvaluacion';
import {EquipoJuegoEvaluado} from '../clases/EquipoJuegoEvaluado';
import {AlumnoJuegoEvaluado} from '../clases/AlumnoJuegoEvaluado';
// import {host} from '../URLs/urls';
import * as URL from '../URLs/urls';
import { JuegoDeEscapeRoom } from '../clases/JuegoDeEscapeRoom';
import { AlumnoJuegoEscapeRoom } from '../clases/AlumnoJuegoEscapeRoom';
import { EscenarioEscapeRoom } from '../clases/EscenarioEscapeRoom';
import { ObjetoEscape } from '../clases/objetoEscape';
import { MisObjetosEscapeRoomComponent } from '../paginas/mis-objetos-escape-room/mis-objetos-escape-room.component';
import { ObjetoEnigma } from '../clases/ObjetoEnigma';
import { ObjetoGlobalEscape } from '../clases/ObjetoGlobalEscape';
import { ObjetoJuego } from '../clases/ObjetoJuego';
import { ImagenEscenario } from '../clases/ImagenEscenario';
import { PartidaEscape } from '../clases/PartidaEscape';
import { EscenaDeJuego } from '../clases/EscenaDeJuego';

@Injectable({
  providedIn: 'root'
})
export class PeticionesAPIService {



  // private host = 'http://localhost';
  private host = URL.host;

  private APIUrlAlbum = this.host + ':3000/api/Albumes';
  private APIUrlAlbumEquipo = this.host + ':3000/api/AlbumesEquipo';
  private APIUrlAlumnos = this.host + ':3000/api/Alumnos';
  private APIUrlAlumnoJuegoDeAvatar = this.host + ':3000/api/AlumnosJuegoDeAvatar';
  private APIUrlAlumnoJuegoDeColeccion = this.host + ':3000/api/AlumnosJuegoDeColeccion';
  private APIUrlAlumnoJuegoDeCompeticionFormulaUno = this.host + ':3000/api/AlumnosJuegoDeCompeticionFormulaUno';
  private APIUrlAlumnoJuegoDeCompeticionLiga = this.host + ':3000/api/AlumnosJuegoDeCompeticionLiga';
  private APIUrlAlumnoJuegoDeCuestionario = this.host + ':3000/api/AlumnosJuegoDeCuestionario';
  private APIUrlAlumnoJuegoDeCuestionarioSatisfaccion = this.host + ':3000/api/AlumnosJuegoDeCuestionarioSatisfaccion';
  private APIUrlAlumnoJuegoDeEscapeRoom = this.host + ':3000/api/AlumnosJuegoDeEscapeRoom';
  private APIURLAlumnoJuegoEvaluado = this.host + ':3000/api/alumnosJuegoEvaluado'; //Alumno Juego De Evaluacion ???
  private APIUrlAlumnoJuegoDeGeocaching = this.host + ':3000/api/AlumnosJuegoDeGeocaching';
  private APIUrlAlumnoJuegoDePuntos = this.host + ':3000/api/AlumnosJuegosDePuntos';
  private APIUrlAlumnoJuegoDeVotacionTodosAUno = this.host + ':3000/api/AlumnosJuegoDeVotacionTodosAUno';
  private APIUrlAlumnoJuegoDeVotacionUnoATodos = this.host + ':3000/api/AlumnosJuegoDeVotacionUnoATodos';
  //AsignacionEquipo
  private APIUrlPuntosJuego = this.host + ':3000/api/AsignacionesPuntoJuego';
  private APIUrlAsistenciasClase = this.host + ':3000/api/AsistenciasClase';
  private APIUrlColecciones = this.host + ':3000/api/Colecciones';
  private APIUrlCromos = this.host + ':3000/api/Cromos';
  private APIUrlCuestionarios = this.host + ':3000/api/Cuestionarios';
  private APIUrlEnfrentamientosLiga = this.host + ':3000/api/EnfrentamientosLiga';
  private APIUrlEquipos = this.host + ':3000/api/Equipos';
  private APIUrlEquipoJuegoDeColeccion = this.host + ':3000/api/EquiposJuegoDeColeccion';
  private APIUrlEquipoJuegoDeCompeticionFormulaUno = this.host + ':3000/api/EquiposJuegoDeCompeticionFormulaUno';
  private APIUrlEquipoJuegoDeCompeticionLiga = this.host + ':3000/api/EquiposJuegoDeCompeticionLiga';
  private APIUrlEquipoJuegoDePuntos = this.host + ':3000/api/EquiposJuegoDePuntos';
  //EquipoJuegoDeVotacionUnoATodos
  //Escena
  private APIUrlEscenarios = this.host + ':3000/api/Escenarios';
  private APIUrlFamiliarAvatares = this.host + ':3000/api/FamiliasAvatares';
  //FamiliaImagenesPerfil
  //Frame
  private APIUrlGrupos = this.host + ':3000/api/Grupos';
  private APIUrlHistorialPuntosAlumno = this.host + ':3000/api/HistorialesPuntosAlumno';
  private APIUrlHistorialPuntosEquipo = this.host + ':3000/api/HistorialesPuntosEquipo';
  private APIUrlImagenInsignia = this.host + ':3000/api/imagenes/Insignias';
  //Jornada
  private APIUrlJornadasJuegoDeCompeticionFormulaUno = this.host + ':3000/api/JornadasDeCompeticionFormulaUno';
  private APIUrlJornadasJuegoDeCompeticionLiga = this.host + ':3000/api/JornadasDeCompeticionLiga';
  private APIUrlJuegoDeAvatar = this.host + ':3000/api/JuegosDeAvatar';
  private APIUrlJuegoDeCogerTurnoRapido = this.host + ':3000/api/JuegosDeCogerTurnoRapido';
  private APIUrlJuegoDeColeccion = this.host + ':3000/api/JuegosDeColeccion';
  private APIUrlJuegoDeCompeticionFormulaUno = this.host + ':3000/api/JuegosDeCompeticionFormulaUno';
  private APIUrlJuegoDeCompeticionLiga = this.host + ':3000/api/JuegosDeCompeticionLiga';
  private APIUrlJuegoDeCuestionario = this.host + ':3000/api/JuegosDeCuestionario';
  private APIUrlJuegoDeCuestionarioRapido = this.host + ':3000/api/JuegosDeCuestionarioRapido';
  private APIUrlJuegoDeCuestionarioSatisfaccion = this.host + ':3000/api/JuegosDeCuestionarioSatisfaccion';
  private APIUrlJuegoDeEncuestaRapida = this.host + ':3000/api/JuegosDeEncuestaRapida';
  private APIURLJuegoDeEvaluacion = this.host + ':3000/api/JuegosDeEvaluacion';
  private APIUrlJuegoDeGeocaching = this.host + ':3000/api/JuegosDeGeocaching';
  //JuegoDeGeocachingPregunta
  //JuegosDeLibro
  private APIUrlJuegoDePuntos = this.host + ':3000/api/JuegosDePuntos';
  private APIUrlJuegoDeVotacionRapida = this.host + ':3000/api/juegosDeVotacionRapida';
  private APIUrlJuegoDeVotacionTodosAUno = this.host + ':3000/api/JuegosDeVotacionTodosAUno';
  private APIUrlJuegoDeVotacionUnoATodos = this.host + ':3000/api/JuegosDeVotacionUnoATodos';
  //JuegoLibroConcurso
  //Libro
  //Liga
  private APIUrlMatriculas = this.host + ':3000/api/Matriculas';
  private APIUrlNiveles = this.host + ':3000/api/Niveles';
  //Partidos
  private APIUrlPreguntas = this.host + ':3000/api/Preguntas';
  private APIUrlPreguntaDelCuestionario = this.host + ':3000/api/PreguntasDelCuestionario';
  private APIUrlProfesores = this.host + ':3000/api/Profesores';
  //Prueba
  //Punto
  private APIUrlPuntosGeolocalizables = this.host + ':3000/api/PuntosGeolocalizables';
  //RecursosJuegoLibro
  //RecursosLibro
  //ReglaAutomaticaColeccion
  //ReglaAutomaticaCompetion
  //ReglaManualColeccion
  //ReglaManualCompeticion
  private APIUrlRespuestasJuegoDeCuestionario = this.host + ':3000/api/RespuestasJuegoDeCuestionario';
  //Rubrica
  private APIUrlSesionesClase = this.host + ':3000/api/SesionesClase';
  private APIUrlObjetosEnigma = this.host + ':3000/api/ObjetosEnigma/';
  private APIUrlPartidasEscape = this.host + ':3000/api/PartidasEscape/';
  private APIUrlEscenasDeJuego = this.host + ':3000/api/EscenasDeJuego/';
  private APIUrlObjetosJuego = this.host + ':3000/api/ObjetosJuego/';
  private APIUrlObjetosGlobal = this.host + ':3000/api/ObjetosGlobalEscape/';





  //OTRAS

  // Para cargar y descargar imagenes
  private APIUrlImagenAlumno = this.host + ':3000/api/Imagenes/imagenAlumno';
  private APIUrlImagenColeccion = this.host + ':3000/api/Imagenes/ImagenColeccion';
  private APIUrlImagenCromo = this.host + ':3000/api/Imagenes/ImagenCromo';
  private APIUrlImagenNivel = this.host + ':3000/api/Imagenes/imagenNivel';
  private APIUrlLogosEquipos = this.host + ':3000/api/Imagenes/LogosEquipos';

  private APIUrlImagenesAvatares = this.host + ':3000/api/Imagenes/ImagenesAvatares';
  private APIUrlAudiosAvatares = this.host + ':3000/api/Imagenes/AudiosAvatares';

  private APIUrlImagenesObjetoEscapeRoom = this.host + ':3000/api/Imagenes/ImagenObjetoGlobalEscape';

  private APIURLEquiposJuegoEvaluado = this.host + ':3000/api/equiposJuegoEvaluado';



  private APIUrlFamiliasDeImagenesDePerfil = this.host + ':3000/api/familiasImagenesPerfil';

  private APIUrlImagenesPerfil = this.host + ':3000/api/Imagenes/ImagenesPerfil';

  private APIUrlCuestionariosSatisfaccion = this.host + ':3000/api/cuestionariosSatisfaccion';

  private APIUrlImagenesPreguntas = this.host + ':3000/api/Imagenes/ImagenesPreguntas';


  constructor(
    private http: HttpClient,
    private httpImagenes: Http
  ) {
  }

  /* Las funciones estar agrupadas en los bloques siquientes:

    GESTION DE PROFESORES Y ALUNNOS
    GESTIÓN DE GRUPOS
    GESTION DE EQUIIPOS
    GESTION DE SESIONES DE CLASE
    GESTION DE TIPOS DE PUNTOS E INSIGNIAS
    GESTION DE COLECCIONES
    GESTION JUEGO DE PUNTOS
    GESTION JUEGO DE PUNTOS INDIVIDUAL
    GESTION JUEGO DE PUNTOS POR EQUIPOS
    GESTION DE JUEGO DE COLECCION
    GESTION DE JUEGO DE COLECCIÓN INDIVIDUAL
    GESTION DE JUEGO DE COLECCION POR EQUIPOS
    GESTION JUEGOS DE COMPETICION
    GESTION JUEGOS DE COMPETICION TIPO LIGA
    GESTION COMPETICION LIGA INDIVIDUAL
    GESITON COMPETICION LIGA POR EQUIPOS
    GESTION JUEGO DE COMPETICION TIPO FORMULA 1
    GESTION COMPETICION FORMULA 1 INDIVIDUAL
    GESTION JUEGO COMPETICION FORMULA 1 POR EQUIPOS
    GESTION DE PREGUNTAS
    GESTION DE CUESTIONARIOS
    GESTION DE JUEGOS DE CUESTIONARIO
    GESTION DE ALUMNOS EN JUEGOS DE CUESTIONARIO
    GESTION DE ESCENARIOS
    GESTION DE JUEGOS DE GEOCACHING
    GESTION DE ALUMNOS EN JUEGOS DE GEOCACHING
    GESTION DE FAMILIAS DE AVATAES
    GESTION DE JUEGOS DE AVATARES
    GESTION DE ALUMNOS EN JUEGOS DE AVATARES
  */

/////////////////////  GESTION DE PROFESORES Y ALUNNOS ///////////////////////////////

  public DameProfesor(nombre: string, pass: string): Observable<Profesor> {
    return this.http.get<Profesor>(this.APIUrlProfesores + '?filter[where][username]=' + nombre + '&filter[where][password]=' + pass);
  }

  public BuscaNombreUsuario(username: string): Observable<Profesor> {
    return this.http.get<Profesor>(this.APIUrlProfesores + '?filter[where][username]=' + username);
  }

  public DameProfesores(): Observable<Profesor[]> {
    return this.http.get<Profesor[]>(this.APIUrlProfesores);
  }

  // Esta consulta es para cuando se ha olvidado la contraseña y solo puede darnos
  // su nombre de usuario (de momento el nombre)

  public DameContrasena(nombre: string): Observable<Profesor> {
    return this.http.get<Profesor>(this.APIUrlProfesores + '?filter[where][username]=' + nombre );
  }


  public RegistraProfesor(profesor: Profesor): Observable<Profesor> {
    return this.http.post<Profesor>(this.APIUrlProfesores, profesor);
  }

  public ModificaProfesor(profesor: Profesor): Observable<Profesor> {
    return this.http.patch<Profesor>(this.APIUrlProfesores + '/' + profesor.id, profesor);
  }


  public DameTodosMisAlumnos(profesorId: number): Observable<Alumno[]> {
    return this.http.get<Alumno[]>(this.APIUrlProfesores + '/' + profesorId + '/Alumnos');
  }

  public DameAlumno(alumnoId: number): Observable<Alumno> {
    return this.http.get<Alumno>(this.APIUrlAlumnos + '/' + alumnoId);
  }

  public DameTodosLosAlumnos(): Observable<Alumno[]> {
    return this.http.get<Alumno[]>(this.APIUrlAlumnos);
  }



  // Esta no se para que se usa habiendo DameTodosMisAlumnos
  public DameAlumnos(): Observable<Alumno[]> {
    return this.http.get<Alumno[]>(this.APIUrlAlumnos);
  }

  public DameAlumnoConcreto(alumno: Alumno, ProfesorId: number): Observable<Alumno> {
    console.log('Entro a buscar a ' + alumno.nombre + ' ' + alumno.primerApellido + ' ' + alumno.segundoApellido);
    return this.http.get<Alumno>(this.APIUrlProfesores + '/' + ProfesorId + '/Alumnos?filter[where][nombre]=' + alumno.nombre +
      '&filter[where][primerApellido]=' + alumno.primerApellido + '&filter[where][segundoApellido]=' + alumno.segundoApellido);

  }

  public DameImagenAlumno(imagen: string): Observable<any> {
    return this.httpImagenes.get(this.APIUrlImagenAlumno + '/download/' + imagen,
      {responseType: ResponseContentType.Blob});
  }

  public CreaAlumno(alumno: Alumno): Observable<Alumno> {
    return this.http.post<Alumno>(this.APIUrlAlumnos, alumno);
  }

  public BorraAlumno(alumnoId: number): Observable<any> {
    return this.http.delete<any>(this.APIUrlAlumnos + '/' + alumnoId);
  }

  public ModificaAlumno(alumno: Alumno): Observable<Alumno> {
    return this.http.put<Alumno>(this.APIUrlAlumnos + '/' + alumno.id, alumno);
  }

  public AsignaAlumnoAlProfesor(alumno: Alumno, profesorId: number): Observable<Alumno> {
    return this.http.post<Alumno>(this.APIUrlProfesores + '/' + profesorId + '/Alumnos', alumno);
  }

/////////////////////////////////////////// GESTIÓN DE GRUPOS ///////////////////////////////

  public DameGruposProfesor(profesorId: number): Observable<Grupo[]> {
    return this.http.get<Grupo[]>(this.APIUrlProfesores + '/' + profesorId + '/Grupos');
  }

  public CreaGrupo(grupo: Grupo, profesorId: number): Observable<Grupo> {
    return this.http.post<Grupo>(this.APIUrlProfesores + '/' + profesorId + '/Grupos', grupo);
  }

  public ModificaGrupo(grupo: Grupo, profesorId: number, grupoId: number): Observable<Grupo> {
    return this.http.put<Grupo>(this.APIUrlProfesores + '/' + profesorId + '/Grupos/' + grupoId, grupo);
  }

  public BorraGrupo(profesorId: number, grupoId: number): Observable<any> {
    return this.http.delete<any>(this.APIUrlProfesores + '/' + profesorId + '/Grupos/' + grupoId);
  }

  public DameAlumnosGrupo(grupoId: number): Observable<Alumno[]> {
    return this.http.get<Alumno[]>(this.APIUrlGrupos + '/' + grupoId + '/Alumnos');
  }
  
  public DameMatriculasGrupo(grupoId: number): Observable<Matricula[]> {
    return this.http.get<Matricula[]>(this.APIUrlMatriculas + '?filter[where][grupoId]=' + grupoId);
  }

  public BorraMatricula(matriculaId: number): Observable<any> {
    return this.http.delete<any>(this.APIUrlMatriculas + '/' + matriculaId);
  }

  public BorraMatriculaAlumno(alumnoId: number, grupoId: number): Observable<Matricula> {
    return this.http.delete<any>(this.APIUrlMatriculas + '?filter[where][grupoId]=' + grupoId + '&filter[where][alumnoId]=' + alumnoId);
  }

  public MatriculaAlumnoEnGrupo(matricula: Matricula): Observable<Matricula> {
    return this.http.post<Matricula>(this.APIUrlMatriculas, matricula);
  }

  public DameMatriculaAlumno(alumnoId: number, grupoId: number): Observable<Matricula> {
    return this.http.get<Matricula>(this.APIUrlMatriculas + '?filter[where][grupoId]=' + grupoId + '&filter[where][alumnoId]=' + alumnoId);
  }

///////////////////////////////////// GESTION DE EQUIIPOS ///////////////////////////////


  public DameEquipos(): Observable<Equipo[]> {
    return this.http.get<Equipo[]>(this.APIUrlEquipos);
  }

  // Falta hacer DameEquipo

  public DameEquiposDelGrupo(grupoId: number): Observable<Equipo[]> {
    return this.http.get<Equipo[]>(this.APIUrlGrupos + '/' + grupoId + '/Equipos');
  }

  public BorraEquipoDelGrupo(equipo: Equipo): Observable<any> {
    return this.http.delete<any>(this.APIUrlGrupos + '/' + equipo.grupoId + '/Equipos/' + equipo.id);
  }

  public CreaEquipo(equipo: Equipo, grupoId: number): Observable<Equipo> {
    return this.http.post<Equipo>(this.APIUrlGrupos + '/' + grupoId + '/Equipos', equipo);
  }

  public PonLogoEquipo(formData: FormData): Observable<any> {
    return this.http.post<any>(this.APIUrlLogosEquipos + '/upload', formData);
  }

  public BorraLogoEquipo(logo: string): Observable<any> {
    return this.http.delete<any>(this.APIUrlLogosEquipos + '/files/' + logo);
  }

  public DameLogoEquipo(logo: string): Observable<any> {
    return this.httpImagenes.get(this.APIUrlLogosEquipos + '/download/' + logo,
      {responseType: ResponseContentType.Blob});
  }

  // public ModificaEquipo(equipo: Equipo, grupoId: number, equipoId: number): Observable<Equipo> {
  //   return this.http.put<Equipo>(this.APIUrlGrupos + '/' + grupoId + '/equipos/' + equipoId, equipo);
  // }

  // SE USA PARA EDITAR UN EQUIPO
  public ModificaEquipo(equipo: Equipo): Observable<Equipo> {
    return this.http.put<Equipo>(this.APIUrlEquipos + '/' + equipo.id, equipo);
  }

  public DameAlumnosEquipo(equipoId: number): Observable<Alumno[]> {
    return this.http.get<Alumno[]>(this.APIUrlEquipos + '/' + equipoId + '/Alumnos');
  }

  public DameEquiposDelAlumno(alumnoId: number): Observable<Equipo[]> {
    return this.http.get<Equipo[]>(this.APIUrlAlumnos + '/' + alumnoId + '/Equipos');
  }

  public DameAsignacionesDelEquipo(equipo: Equipo): Observable<AsignacionEquipo[]> {
    // Da las asignaciones de los alumnos del equipo
    return this.http.get<AsignacionEquipo[]>(this.APIUrlGrupos + '/' + equipo.grupoId + '/asignacionEquipos?filter[where][equipoId]='
      + equipo.id);
  }

  public DameAsignacionesEquipoDelGrupo(grupoId: number): Observable<AsignacionEquipo[]> {
    // Da las asignaciones a equipos de todos los alumnos del grupo (sean del equipo que sean)
    return this.http.get<AsignacionEquipo[]>(this.APIUrlGrupos + '/' + grupoId + '/AsignacionesEquipo');
  }

  public DameAsignacionEquipoAlumno(alumnoId: number, equipoId: number, grupoId: number): Observable<AsignacionEquipo> {
    // Da la asignación a un equipo de un alumno concreto
    return this.http.get<AsignacionEquipo>(this.APIUrlGrupos + '/' + grupoId + '/AsignacionesEquipo?filter[where][equipoId]=' + equipoId +
      '&filter[where][alumnoId]=' + alumnoId);
  }

  public ModificaAsignacionEquipoAlumno(asignacionEquipo: AsignacionEquipo, grupoId: number, asignacionEquipoId: number):
    Observable<AsignacionEquipo> {
    return this.http.put<AsignacionEquipo>(this.APIUrlGrupos + '/' + grupoId + '/AsignacionesEquipo/' +
      asignacionEquipoId, asignacionEquipo);
  }

  public BorraAlumnoEquipo(asignacionEquipo: AsignacionEquipo): Observable<any> {
    return this.http.delete<any>(this.APIUrlGrupos + '/' + asignacionEquipo.grupoId + '/AsignacionesEquipo/'
      + asignacionEquipo.id);
  }

  public PonAlumnoEquipo(asignacionEquipos: AsignacionEquipo, grupoId: number): Observable<AsignacionEquipo> {
    return this.http.post<AsignacionEquipo>(this.APIUrlGrupos + '/' + grupoId + '/AsignacionesEquipo', asignacionEquipos);
  }

  ////////////////////////////////// GESTION DE SESIONES DE CLASE //////////////////////

  public CreaSesionClase(sesion: SesionClase, grupoId: number): Observable<SesionClase> {
    return this.http.post<SesionClase>(this.APIUrlGrupos + '/' + grupoId + '/SesionesClase', sesion);
  }

  public ModificaSesionClase(sesion: SesionClase): Observable<SesionClase> {
    return this.http.put<SesionClase>(this.APIUrlSesionesClase + '/' + sesion.id, sesion);
  }

  public RegistraAsistenciaAlumno(asistencia: AsistenciaClase): Observable<AsistenciaClase> {
    return this.http.post<AsistenciaClase>(this.APIUrlAsistenciasClase, asistencia);
  }

  public DameSesionesClaseGrupo(grupoId: number): Observable<SesionClase[]> {
    return this.http.get<SesionClase[]>(this.APIUrlSesionesClase + '?filter[where][grupoId]=' + grupoId);
  }

  public DameAsistenciasClase(sesionClaseId: number): Observable<AsistenciaClase[]> {
    return this.http.get<AsistenciaClase[]>(this.APIUrlAsistenciasClase + '?filter[where][sesionClaseId]=' + sesionClaseId);
  }

  public BorraSesionClase(sesionClaseId: number): Observable<any> {
    return this.http.delete<any>(this.APIUrlSesionesClase + '/' + sesionClaseId);
  }

  public BorraAsistenciaClase(asistenciaId: number): Observable<any> {
    return this.http.delete<any>(this.APIUrlAsistenciasClase + '/' + asistenciaId);
  }

  ////////////////////////////////// GESTION DE TIPOS DE PUNTOS E INSIGNIAS ////////////////////////////////////

  public CreaTipoDePunto(punto: Punto, profesorId: number): Observable<Punto> {
    return this.http.post<Punto>(this.APIUrlProfesores + '/' + profesorId + '/Puntos', punto);
  }

  public ModificaTipoDePunto(punto: Punto, profesorId: number, puntoId: number): Observable<Punto> {
    return this.http.put<Punto>(this.APIUrlProfesores + '/' + profesorId + '/Puntos/' + puntoId, punto);
  }

  public BorraTipoDePunto(puntoId: number, profesorId: number): Observable<any> {
    return this.http.delete<any>(this.APIUrlProfesores + '/' + profesorId + '/Puntos/' + puntoId);
  }

  public CreaInsignia(insignia: Insignia, profesorId: number): Observable<Insignia> {
    return this.http.post<Insignia>(this.APIUrlProfesores + '/' + profesorId + '/Insignias', insignia);
  }

  public DameInsignias(profesorId: number): Observable<Insignia[]> {
    return this.http.get<Insignia[]>(this.APIUrlProfesores + '/' + profesorId + '/Insignias');
  }

  public ModificaInsignia(insignia: Insignia, profesorId: number, insigniaId: number): Observable<Insignia> {
    return this.http.put<Insignia>(this.APIUrlProfesores + '/' + profesorId + '/Insignias/' + insigniaId, insignia);
  }

  public BorraInsignia(insigniaId: number, profesorId: number): Observable<any> {
    return this.http.delete<any>(this.APIUrlProfesores + '/' + profesorId + '/Insignias/' + insigniaId);
  }

  public PonImagenInsignia(formData: FormData): Observable<any> {
    return this.http.post<any>(this.APIUrlImagenInsignia + '/upload', formData);
  }

  public DameImagenInsignia(imagen: string): Observable<any> {
    return this.httpImagenes.get(this.APIUrlImagenInsignia + '/download/' + imagen,
      {responseType: ResponseContentType.Blob});
  }


  /////////////////////////////////////// GESTION DE COLECCIONES ////////////////////////////////////////////////////

  public CreaColeccion(coleccion: Coleccion, profesorId: number): Observable<Coleccion> {
    return this.http.post<Coleccion>(this.APIUrlProfesores + '/' + profesorId + '/Colecciones', coleccion);
  }

  public DameColeccion(coleccionId: number): Observable<Coleccion> {
    return this.http.get<Coleccion>(this.APIUrlColecciones + '/' + coleccionId);
  }

  public PonImagenColeccion(formData: FormData): Observable<any> {
    return this.http.post<any>(this.APIUrlImagenColeccion + '/upload', formData);
  }

  public DameImagenColeccion(imagen: string): Observable<any> {
    return this.httpImagenes.get(this.APIUrlImagenColeccion + '/download/' + imagen,
      {responseType: ResponseContentType.Blob});
  }

  public BorraColeccion(coleccionId: number, profesorId: number): Observable<any> {
    // console.log('JODER');
    return this.http.delete<any>(this.APIUrlProfesores + '/' + profesorId + '/Colecciones/' + coleccionId);
  }

  public PonCromoColeccion(cromo: Cromo, coleccionId: number): Observable<Cromo> {
    return this.http.post<Cromo>(this.APIUrlColecciones + '/' + coleccionId + '/Cromos', cromo);
  }

  public PonImagenCromo(formData: FormData): Observable<any> {
    return this.http.post<any>(this.APIUrlImagenCromo + '/upload', formData);
  }

  public DameImagenCromo(imagen: string): Observable<any> {
    return this.httpImagenes.get(this.APIUrlImagenCromo + '/download/' + imagen,
      {responseType: ResponseContentType.Blob});
  }

  public ModificaCromoColeccion(cromo: Cromo, coleccionId: number, cromoId: number): Observable<Cromo> {
    return this.http.put<Cromo>(this.APIUrlColecciones + '/' + coleccionId + '/Cromos/' + cromoId, cromo);
  }

  public BorrarCromo(cromoId: number): Observable<any> {
    return this.http.delete<any>(this.APIUrlCromos + '/' + cromoId);
  }

  public DameCromosColeccion(coleccionId: number): Observable<Cromo[]> {
    return this.http.get<Cromo[]>(this.APIUrlColecciones + '/' + coleccionId + '/Cromos');
  }

  public BorrarImagenColeccion(ImagenColeccion: string): Observable<any> {
    console.log('Voy a quitar la foto');
    return this.http.delete<any>(this.APIUrlImagenColeccion + '/Files/' + ImagenColeccion);
  }

  public BorrarImagenCromo(ImagenCromo: string): Observable<any> {
    return this.http.delete<any>(this.APIUrlImagenCromo + '/Files/' + ImagenCromo);
  }

  // SE USA PARA EDITAR LA COLECCIÓN DEL PROFESOR. AMBOS IDENTIFICADORES LOS PASAMOS COMO PARÁMETRO
  public ModificaColeccion(coleccion: Coleccion, profesorId: number, coleccionId: number): Observable<Coleccion> {
    return this.http.put<Coleccion>(this.APIUrlProfesores + '/' + profesorId + '/Colecciones/' + coleccionId, coleccion);
  }

  public DameColeccionesDelProfesor(profesorId: number): Observable<Coleccion[]> {
    return this.http.get<Coleccion[]>(this.APIUrlProfesores + '/' + profesorId + '/Colecciones');
  }

  public DameColeccionesPublicas(): Observable<Coleccion[]> {
    return this.http.get<Coleccion[]>(this.APIUrlColecciones
      + '?filter[where][publica]=true');
  }


///////////////////////////////////////////// GESTION JUEGO DE PUNTOS //////////////////////////////////////////////

  public CreaJuegoDePuntos(juego: JuegoDePuntos, grupoId: number): Observable<JuegoDePuntos> {
    return this.http.post<JuegoDePuntos>(this.APIUrlGrupos + '/' + grupoId + '/JuegosDePuntos', juego);
  }

  public AsignaPuntoJuego(asignacionPuntoJuego: AsignacionPuntosJuego) {
    return this.http.post<AsignacionPuntosJuego>(this.APIUrlPuntosJuego, asignacionPuntoJuego);
  }

  public DamePuntosJuego(juegoDePuntosId: number) {
    return this.http.get<AsignacionPuntosJuego[]>(this.APIUrlPuntosJuego + '?filter[where][juegoDePuntosId]=' + juegoDePuntosId);
  }

  public BorraPuntoJuego(puntoId: number): any {
    return this.http.delete<any>(this.APIUrlPuntosJuego + '/' + puntoId);
  }


  public DameTiposDePuntos(profesorId: number): Observable<Punto[]> {
    return this.http.get<Punto[]>(this.APIUrlProfesores + '/' + profesorId + '/Puntos');
  }

  public CreaNivel(nivel: Nivel, juegoDePuntosId: number) {
    return this.http.post<Nivel>(this.APIUrlJuegoDePuntos + '/' + juegoDePuntosId + '/Niveles', nivel);
  }

  public DameNivelesJuego(juegoDePuntosId: number): Observable<Nivel[]> {
    return this.http.get<Nivel[]>(this.APIUrlNiveles + '?filter[where][juegoDePuntosId]=' + juegoDePuntosId);
  }

  public BorraNivel(nivelId: number): any {
    return this.http.delete<any>(this.APIUrlNiveles + '/' + nivelId);
  }

  public PonImagenNivel(formData: FormData): Observable<any> {
    return this.http.post<any>(this.APIUrlImagenNivel + '/upload', formData);
  }

  public DameImagenNivel(imagen: string): Observable<any> {
    return this.httpImagenes.get(this.APIUrlImagenNivel + '/download/' + imagen,
      {responseType: ResponseContentType.Blob});
  }

  public BorraImagenNivel(imagenNivel: string): Observable<any> {
    return this.http.delete<any>(this.APIUrlImagenNivel + '/Files/' + imagenNivel);
  }

  public CambiaEstadoJuegoDePuntos(juegoDePuntos: Juego, juegoDePuntosId: number, grupoId: number): Observable<Juego> {
    return this.http.put<Juego>(this.APIUrlGrupos + '/' + grupoId + '/JuegosDePuntos/' + juegoDePuntosId, juegoDePuntos);
  }

  public BorraJuegoDePuntos(juegoDePuntosId: number): Observable<Juego> {
    return this.http.delete<Juego>(this.APIUrlJuegoDePuntos + '/' + juegoDePuntosId);
  }

/////////////////////////////////// GESTION JUEGO DE PUNTOS INDIVIDUAL ////////////////////////////////////////////////////////

  public DameJuegoDePuntosGrupo(grupoId: number): Observable<Juego[]> {
    return this.http.get<Juego[]>(this.APIUrlGrupos + '/' + grupoId + '/JuegosDePuntos');
  }

  public DameAlumnosJuegoDePuntos(juegoDePuntosId: number): Observable<Alumno[]> {
    console.log('Voy a por los alumnos');
    return this.http.get<Alumno[]>(this.APIUrlJuegoDePuntos + '/' + juegoDePuntosId + '/Alumnos');
  }

  public DamePuntosJuegoDePuntos(juegoDePuntosId: number): Observable<Punto[]> {
    return this.http.get<Punto[]>(this.APIUrlJuegoDePuntos + '/' + juegoDePuntosId + '/Puntos');
  }

  public DameNivelesJuegoDePuntos(juegoDePuntosId: number): Observable<Nivel[]> {
    return this.http.get<Nivel[]>(this.APIUrlJuegoDePuntos + '/' + juegoDePuntosId + '/Niveles');
  }

  public DameInscripcionAlumnoJuegoDePuntos(alumnoId: number, juegoDePuntosId: number): Observable<AlumnoJuegoDePuntos> {
    return this.http.get<AlumnoJuegoDePuntos>(this.APIUrlAlumnoJuegoDePuntos + '?filter[where][alumnoId]=' + alumnoId
      + '&filter[where][juegoDePuntosId]=' + juegoDePuntosId);
  }

  public BorraInscripcionAlumnoJuegoDePuntos(inscripcionId: number): any {
    return this.http.delete<any>(this.APIUrlAlumnoJuegoDePuntos + '/' + inscripcionId);
  }

  public DameInscripcionesAlumnoJuegoDePuntos(juegoDePuntosId: number): Observable<AlumnoJuegoDePuntos[]> {
    return this.http.get<AlumnoJuegoDePuntos[]>(this.APIUrlAlumnoJuegoDePuntos + '?filter[where][juegoDePuntosId]=' + juegoDePuntosId);
  }

  public InscribeAlumnoJuegoDePuntos(alumnoJuegoDePuntos: AlumnoJuegoDePuntos) {
    return this.http.post<AlumnoJuegoDePuntos>(this.APIUrlAlumnoJuegoDePuntos, alumnoJuegoDePuntos);
  }

  public BorrarPuntosAlumno(historialPuntosAlumnoId: number): Observable<HistorialPuntosAlumno[]> {
    return this.http.delete<HistorialPuntosAlumno[]>(this.APIUrlHistorialPuntosAlumno + '/' + historialPuntosAlumnoId);
  }

  public PonPuntosJuegoDePuntos(alumnoJuegoDePuntos: AlumnoJuegoDePuntos, alumnoJuegoDePuntosId: number): Observable<AlumnoJuegoDePuntos> {
    // tslint:disable-next-line:max-line-length
    return this.http.put<AlumnoJuegoDePuntos>(this.APIUrlAlumnoJuegoDePuntos + '/' + alumnoJuegoDePuntosId, alumnoJuegoDePuntos);
  }

  public DameHistorialPuntosAlumno(alumnoJuegoDePuntosId: number): Observable<HistorialPuntosAlumno[]> {
    return this.http.get<HistorialPuntosAlumno[]>(this.APIUrlHistorialPuntosAlumno + '?filter[where][alumnoJuegoDePuntosId]='
      + alumnoJuegoDePuntosId);
  }

  public PonHistorialPuntosAlumno(historial: HistorialPuntosAlumno): Observable<HistorialPuntosAlumno> {
    return this.http.post<HistorialPuntosAlumno>(this.APIUrlHistorialPuntosAlumno, historial);
  }

  public DameHistorialDeUnPunto(alumnoJuegoDePuntosId: number, puntoId: number): Observable<HistorialPuntosAlumno[]> {
    return this.http.get<HistorialPuntosAlumno[]>(this.APIUrlHistorialPuntosAlumno + '?filter[where][alumnoJuegoDePuntosId]='
      + alumnoJuegoDePuntosId + '&filter[where][puntoId]=' + puntoId);
  }


//////////////////////////////////////// GESTION JUEGO DE PUNTOS POR EQUIPOS ///////////////////////////////////////////////////
  public DameEquiposJuegoDePuntos(juegoDePuntosId: number): Observable<Equipo[]> {
    return this.http.get<Equipo[]>(this.APIUrlJuegoDePuntos + '/' + juegoDePuntosId + '/Equipos');
  }

  public InscribeEquipoJuegoDePuntos(equipoJuegoDePuntos: EquipoJuegoDePuntos) {
    return this.http.post<EquipoJuegoDePuntos>(this.APIUrlEquipoJuegoDePuntos, equipoJuegoDePuntos);
  }

  public DameInscripcionesEquipoJuegoDePuntos(juegoDePuntosId: number): Observable<EquipoJuegoDePuntos[]> {
    return this.http.get<EquipoJuegoDePuntos[]>(this.APIUrlEquipoJuegoDePuntos + '?filter[where][juegoDePuntosId]=' + juegoDePuntosId);
  }

  public BorraInscripcionEquipoJuegoDePuntos(inscripcionId: number): any {
    return this.http.delete<any>(this.APIUrlEquipoJuegoDePuntos + '/' + inscripcionId);
  }

  public DameHistorialDeUnPuntoEquipo(equipoJuegoDePuntosId: number, puntoId: number): Observable<HistorialPuntosEquipo[]> {
    return this.http.get<HistorialPuntosEquipo[]>(this.APIUrlHistorialPuntosEquipo + '?filter[where][equipoJuegoDePuntosId]='
      + equipoJuegoDePuntosId + '&filter[where][puntoId]=' + puntoId);
  }

  public DameHistorialPuntosEquipo(equipoJuegoDePuntosId: number): Observable<HistorialPuntosEquipo[]> {
    return this.http.get<HistorialPuntosEquipo[]>(this.APIUrlHistorialPuntosEquipo + '?filter[where][equipoJuegoDePuntosId]='
      + equipoJuegoDePuntosId);
  }

  // tslint:disable-next-line:max-line-length
  public PonPuntosEquiposJuegoDePuntos(equipoJuegoDePuntos: EquipoJuegoDePuntos, equipoJuegoDePuntosId: number): Observable<EquipoJuegoDePuntos> {
    // tslint:disable-next-line:max-line-length
    return this.http.put<EquipoJuegoDePuntos>(this.APIUrlEquipoJuegoDePuntos + '/' + equipoJuegoDePuntosId, equipoJuegoDePuntos);
  }

  public PonHistorialPuntosEquipo(historial: HistorialPuntosEquipo): Observable<HistorialPuntosEquipo> {
    return this.http.post<HistorialPuntosEquipo>(this.APIUrlHistorialPuntosEquipo, historial);
  }

  public BorraPuntosEquipo(historialPuntosEquipoId: number): Observable<HistorialPuntosEquipo[]> {
    return this.http.delete<HistorialPuntosEquipo[]>(this.APIUrlHistorialPuntosEquipo + '/' + historialPuntosEquipoId);
  }

///////////////////////////////////////// ESCAPE ROOM ////////////////////////////////////////////////////////////////////

  public CreaJuegoDeEscapeRoom(juego: JuegoDeEscapeRoom, grupoId: number): Observable<JuegoDeEscapeRoom> {
    return this.http.post<JuegoDeEscapeRoom>(this.APIUrlGrupos + '/' + grupoId + '/JuegosDeEscapeRoom', juego);
  }
  public CrearPartidaEscape(partida: PartidaEscape): Observable<PartidaEscape> {
    return this.http.post<PartidaEscape>(this.APIUrlPartidasEscape, partida);
  }
  public CrearObjetoJuego(objetoJuego: ObjetoJuego): Observable<ObjetoJuego> {
    return this.http.post<ObjetoJuego>(this.APIUrlObjetosJuego, objetoJuego);
  }
  public CrearEscenaEscapeRoom(escena: EscenaDeJuego): Observable<EscenaDeJuego> {
    return this.http.post<EscenaDeJuego>(this.APIUrlEscenasDeJuego, escena);
  }
  public DameEscenasEscapeConEsteEscenario(idEscenario: number, posicion: number): Observable<EscenaDeJuego> {
    return this.http.get<EscenaDeJuego>(this.APIUrlEscenasDeJuego + '?filter[where][escenarioId]='+idEscenario + '&?filter[where][posicion]=' + posicion);
  }
  public DameObjetoLlaveGlobal(llave: string): Observable<ObjetoGlobalEscape> {
    return this.http.get<ObjetoGlobalEscape>(this.APIUrlObjetosGlobal + '?filter[where][nombre]='+llave);
  }
  public DameObjetoPistaGlobal(pista: string): Observable<ObjetoGlobalEscape> {
    return this.http.get<ObjetoGlobalEscape>(this.APIUrlObjetosGlobal + '?filter[where][nombre]='+pista);
  }
  
  public BorraEscenarioEscape(idescenario: number, profesorId: number): Observable<any> {
    return this.http.delete<any>(this.APIUrlProfesores + '/' + profesorId + '/EscenariosEscapeRoom/' + idescenario);
  }
  public BorrarObjetoGlobal(idObjeto: number, profesorId: number): Observable<any> {
    return this.http.delete<any>(this.APIUrlProfesores + '/' + profesorId + '/ObjetosGlobalEscape/' + idObjeto);
  }
  public ModificaJuegoDeEscapeRoom(juego: JuegoDeEscapeRoom, grupoId: number): Observable<JuegoDeEscapeRoom> {
    return this.http.put<JuegoDeEscapeRoom>(this.APIUrlGrupos + '/' + grupoId + '/JuegosDeEscapeRoom/' + juego.id, juego);
  }
  public DameObjetosEscapeDelProfesorEscapeRoom(profesorId: number): Observable<ObjetoEscape[]> {
    return this.http.get<ObjetoEscape[]>(this.APIUrlProfesores + '/' + profesorId + '/ObjetosEscape');
  }
  public DameObjetosEnigmaDelProfesorEscapeRoom(profesorId: number): Observable<ObjetoEnigma[]> {
    return this.http.get<ObjetoEnigma[]>(this.APIUrlProfesores + '/' + profesorId + '/ObjetosEnigma');
  }
  public DameObjetosEscapePrincipalesDelProfesorEscapeRoom(profesorId: number): Observable<ObjetoEscape[]> {
    return this.http.get<ObjetoEscape[]>(this.APIUrlProfesores + '/' + profesorId + '/ObjetosEscape'+ '?filter[where][escenario]=Principal');
  }
  public DameObjetosGlobalesDelProfesorEscapeRoom(profesorId: number): Observable<ObjetoGlobalEscape[]> {
    return this.http.get<ObjetoGlobalEscape[]>(this.APIUrlProfesores + '/' + profesorId + '/ObjetosGlobalEscape');
  }
  public DameObjetoJuegoDelProfesorEscapeRoom(profesorId: number, objetoId: number): Observable<ObjetoJuego[]> {
    return this.http.get<ObjetoJuego[]>(this.APIUrlProfesores + '/' + profesorId + '/ObjetosEscenario'+ '?filter[where][objetoId]=' + objetoId);
  }
  public DameObjetosEnigmaPrincipalesDelProfesorEscapeRoom(profesorId: number): Observable<ObjetoEnigma[]> {
    return this.http.get<ObjetoEnigma[]>(this.APIUrlProfesores + '/' + profesorId + '/ObjetosEnigma'+ '?filter[where][escenario]=Principal');
  }
  public DameObjetoEnigmaDelProfesor(profesorId: number, idObjetoGlobal: number): Observable<ObjetoEnigma> {
    return this.http.get<ObjetoEnigma>(this.APIUrlProfesores + '/' + profesorId + '/ObjetosEnigma' + '?filter[where][objetoId]='
    + idObjetoGlobal);
  }
  public DameImagenDelEscenario(profesorId: number, imagenId: number): Observable<ImagenEscenario> {
    return this.http.get<ImagenEscenario>(this.APIUrlProfesores + '/' + profesorId + '/ImagenesEscenario/' + imagenId);
  }
  public DameImagenesEscenarioDelProfesor(profesorId: number): Observable<ImagenEscenario[]> {
    return this.http.get<ImagenEscenario[]>(this.APIUrlProfesores + '/' + profesorId + '/ImagenesEscenario');
  }
  public DameObjetoEscapeDelProfesor(profesorId: number, idObjetoGlobal: number): Observable<ObjetoEscape> {
    return this.http.get<ObjetoEscape>(this.APIUrlProfesores + '/' + profesorId + '/ObjetosEscape' + '?filter[where][objetoId]='
    + idObjetoGlobal);
  }

  //PETICIONES IMAGENES ESCAPE ROOM
  public DameImagenObjetoEscape(imgName: string){
    return this.http.get(this.APIUrlImagenesObjetoEscapeRoom + '/files/'+imgName);
  }

  public SubirImagenObjetoEscape(img: FormData){
    return this.http.post(this.APIUrlImagenesObjetoEscapeRoom + '/upload', img);
  }
  //////////////////////////////

  public DameBascula(profesorId: number): Observable<ObjetoEnigma> {
    return this.http.get<ObjetoEnigma>(this.APIUrlProfesores + '/' + profesorId + '/ObjetosEnigma' + '?filter[where][nombre]='
    + 'bascula');
  }
  public CreaEscenarioEscapeRoom(escenario: EscenarioEscapeRoom, profesorId: number): Observable<EscenarioEscapeRoom> {
    console.log('Escenario: ' + escenario);
    return this.http.post<EscenarioEscapeRoom>(this.APIUrlProfesores + '/' + profesorId + '/EscenariosEscapeRoom', escenario);
  }
  public CreaObjetoEscape(objetoEscape: ObjetoEscape, profesorId: number): Observable<ObjetoEscape> {
    return this.http.post<ObjetoEscape>(this.APIUrlProfesores + '/' + profesorId + '/ObjetosEscape', objetoEscape);
  }
  public CreaObjetoEnigma(objetoEnigma: ObjetoEnigma, profesorId: number): Observable<ObjetoEnigma> {
    return this.http.post<ObjetoEnigma>(this.APIUrlProfesores + '/' + profesorId + '/ObjetosEnigma', objetoEnigma);
  }
  public EditaObjetoEnigma(objetoEnigma: ObjetoEnigma): Observable<ObjetoEnigma> {
    return this.http.put<ObjetoEnigma>(this.APIUrlObjetosEnigma + objetoEnigma.id, objetoEnigma);
  }
  public EditaObjetosEnigma(objetosEnigma: ObjetoEnigma[], profesorId:number): Observable<ObjetoEnigma[]> {
    return this.http.put<ObjetoEnigma[]>(this.APIUrlProfesores + '/' + profesorId + '/ObjetosEnigma' , objetosEnigma);
  }
  public CreaObjetoGlobal(objetoGlobal: ObjetoGlobalEscape, profesorId: number): Observable<ObjetoGlobalEscape> {
    return this.http.post<ObjetoGlobalEscape>(this.APIUrlProfesores + '/' + profesorId + '/ObjetosGlobalEscape', objetoGlobal);
  }
  public DameEscenariosDelProfesorEscapeRoom(profesorId: number): Observable<EscenarioEscapeRoom[]> {
    return this.http.get<EscenarioEscapeRoom[]>(this.APIUrlProfesores + '/' + profesorId + '/EscenariosEscapeRoom');
  }
  public DameEscenariosSecundariosDelProfesorEscapeRoom(profesorId: number): Observable<EscenarioEscapeRoom[]> {
    return this.http.get<EscenarioEscapeRoom[]>(this.APIUrlProfesores + '/' + profesorId + '/EscenariosEscapeRoom' + '?filter[where][posicion]=Secundario');
  }
  public DameObjetosDelProfesorEscapeRoom(profesorId: number): Observable<ObjetoGlobalEscape[]> {
    return this.http.get<ObjetoGlobalEscape[]>(this.APIUrlProfesores + '/' + profesorId + '/ObjetosGlobalEscape');
  }
  public DameObjetosPrincipalesDelProfesorEscapeRoom(profesorId: number): Observable<ObjetoGlobalEscape[]> {
    return this.http.get<ObjetoGlobalEscape[]>(this.APIUrlProfesores + '/' + profesorId + '/ObjetosGlobalEscape' + '?filter[where][escenario]=Principal');
  }
  public InscribeAlumnoJuegoEscapeRoom(AlumnoJuegoEscapeRoom: AlumnoJuegoEscapeRoom) {
    return this.http.post<AlumnoJuegoEscapeRoom>(this.APIUrlAlumnoJuegoDeEscapeRoom, AlumnoJuegoEscapeRoom);
  }

  public DameJuegosDeEscapeRoom(grupoId: number): Observable<JuegoDeEscapeRoom[]> {
    return this.http.get<JuegoDeEscapeRoom[]>(this.APIUrlGrupos + '/' + grupoId + '/JuegosDeEscapeRoom');
  }
///////////////////////////////////////// GESTION DE JUEGO DE COLECCION //////////////////////////////////////////////////

  public CreaJuegoDeColeccion(juego: Juego, grupoId: number): Observable<Juego> {
    return this.http.post<Juego>(this.APIUrlGrupos + '/' + grupoId + '/JuegosDeColeccion', juego);
  }

  public CambiaEstadoJuegoDeColeccion(juegoDeColeccion: Juego, juegoDeColeccionId: number, grupoId: number): Observable<Juego> {
    return this.http.put<Juego>(this.APIUrlGrupos + '/' + grupoId + '/JuegosDeColeccion/' + juegoDeColeccionId, juegoDeColeccion);
  }

  public BorraJuegoDeColeccion(juegoDeColeccionId: number): Observable<Juego> {
    return this.http.delete<Juego>(this.APIUrlJuegoDeColeccion + '/' + juegoDeColeccionId);
  }

  public DameJuegoDeColeccionGrupo(grupoId: number): Observable<Juego[]> {
    return this.http.get<Juego[]>(this.APIUrlGrupos + '/' + grupoId + '/JuegosDeColeccion');
  }

  public CompletaJuegoDeColeccion(juego: Juego, grupoId: number, juegoId: number): Observable<Juego> {
    return this.http.put<Juego>(this.APIUrlGrupos + '/' + grupoId + '/JuegosDeColeccion/' + juegoId, juego);
  }

  public InscribeAlumnoJuegoDeColeccion(alumnoJuegoDeColeccion: AlumnoJuegoDeColeccion) {
    return this.http.post<AlumnoJuegoDeColeccion>(this.APIUrlAlumnoJuegoDeColeccion, alumnoJuegoDeColeccion);
  }

  public InscribeEquipoJuegoDeColeccion(equipoJuegoDeColeccion: EquipoJuegoDeColeccion) {
    return this.http.post<EquipoJuegoDeColeccion>(this.APIUrlEquipoJuegoDeColeccion, equipoJuegoDeColeccion);
  }

  ///////////////////////////////////////// GESTION DE JUEGO DE COLECCIÓN INDIVIDUAL //////////////////////////////////////////////////

  public DameAlumnosJuegoDeColeccion(juegoDeColeccionId: number): Observable<Alumno[]> {
    console.log('pido alumnos del juego ' + juegoDeColeccionId);
    return this.http.get<Alumno[]>(this.APIUrlJuegoDeColeccion + '/' + juegoDeColeccionId + '/Alumnos');
  }

  public DameInscripcionesAlumnoJuegoDeColeccion(juegoDeColeccionId: number): Observable<AlumnoJuegoDeColeccion[]> {
    return this.http.get<AlumnoJuegoDeColeccion[]>(this.APIUrlAlumnoJuegoDeColeccion + '?filter[where][juegoDeColeccionId]='
      + juegoDeColeccionId);
  }

  public BorraInscripcionAlumnoJuegoDeColeccion(inscripcionId: number) {
    // tslint:disable-next-line:max-line-length
    return this.http.delete(this.APIUrlAlumnoJuegoDeColeccion + '/' + inscripcionId);
  }

  public AsignarCromoAlumno(album: Album) {
    return this.http.post<Album>(this.APIUrlAlbum, album);
  }

  public DameCromosAlumno(alumnoJuegoDeColeccionId: number): Observable<Cromo[]> {
    return this.http.get<Cromo[]>(this.APIUrlAlumnoJuegoDeColeccion + '/' + alumnoJuegoDeColeccionId + '/Cromos');
  }


  // Una cosa es obtener los cromos (funcion anterior) y otra es obtener las asignacionese
  // de cromos (esta función) que retorna una lista de objetos de tipo Album (nombre muy poco
  // apropiado para esto)

  public DameAsignacionesCromosAlumno(inscripcionAlumnoId: number): Observable<Album[]> {
    return this.http.get<Album[]>(this.APIUrlAlbum + '?filter[where][alumnoJuegoDeColeccionId]='
      + inscripcionAlumnoId);
  }

  // Esta es para obtener las asignaciones de un cromo concreto
  public DameAsignacionesCromoConcretoAlumno(inscripcionAlumnoId: number, cromoId: number): Observable<Album[]> {
    return this.http.get<Album[]>(this.APIUrlAlbum + '?filter[where][alumnoJuegoDeColeccionId]='
      + inscripcionAlumnoId + '&filter[where][cromoId]=' + cromoId);
  }


  public BorrarAsignacionCromoAlumno(albumId: number) {
    // tslint:disable-next-line:max-line-length
    return this.http.delete(this.APIUrlAlbum + '/' + albumId);
  }


  ////////////////////////////////////// GESTION DE JUEGO DE COLECCION POR EQUIPOS //////////////////////////////////
  public DameEquiposJuegoDeColeccion(juegoDeColeccionId: number): Observable<Equipo[]> {
    return this.http.get<Equipo[]>(this.APIUrlJuegoDeColeccion + '/' + juegoDeColeccionId + '/Equipos');
  }

  public DameInscripcionesEquipoJuegoDeColeccion(juegoDeColeccionId: number): Observable<EquipoJuegoDeColeccion[]> {
    return this.http.get<EquipoJuegoDeColeccion[]>(this.APIUrlEquipoJuegoDeColeccion + '?filter[where][juegoDeColeccionId]='
      + juegoDeColeccionId);
  }

  public BorraInscripcionEquipoJuegoDeColeccion(inscripcionId: number) {
    // tslint:disable-next-line:max-line-length
    return this.http.delete(this.APIUrlEquipoJuegoDeColeccion + '/' + inscripcionId);
  }

  public AsignarCromoEquipo(album: AlbumEquipo) {
    return this.http.post<AlbumEquipo>(this.APIUrlAlbumEquipo, album);
  }

  public DameCromosEquipo(equipoJuegoDeColeccionId: number): Observable<Cromo[]> {
    return this.http.get<Cromo[]>(this.APIUrlEquipoJuegoDeColeccion + '/' + equipoJuegoDeColeccionId + '/Cromos');
  }

  // Una cosa es obtener los cromos (funcion anterior) y otra es obtener las asignacionese
  // de cromos (esta función) que retorna una lista de objetos de tipo AlbumEquipo (nombre muy poco
  // apropiado para esto)

  public DameAsignacionesCromosEquipo(inscripcionEquipoId: number): Observable<AlbumEquipo[]> {
    return this.http.get<AlbumEquipo[]>(this.APIUrlAlbumEquipo + '?filter[where][alumnoJuegoDeColeccionId]='
      + inscripcionEquipoId);
  }

  public DameAsignacionesCromoConcretoEquipo(inscripcionEquipoId: number, cromoId: number): Observable<AlbumEquipo[]> {
    return this.http.get<AlbumEquipo[]>(this.APIUrlAlbumEquipo + '?filter[where][equipoJuegoDeColeccionId]='
      + inscripcionEquipoId + '&filter[where][cromoId]=' + cromoId);
  }

  public BorrarAsignacionCromoEquipo(albumId: number) {
    // tslint:disable-next-line:max-line-length
    return this.http.delete(this.APIUrlAlbumEquipo + '/' + albumId);
  }


  /////////////////////////////////////// GESTION JUEGOS DE COMPETICION /////////////////////////////////

  public DameJuegoDeCompeticionGrupo(grupoId: number): Observable<Juego[]> {
    return this.http.get<Juego[]>(this.APIUrlGrupos + '/' + grupoId + '/JuegosDeCompeticion');
  }

  /////////////////////////////////////// GESTION JUEGOS DE COMPETICION TIPO LIGA /////////////////////////////////

  public CreaJuegoDeCompeticionLiga(juego: Juego, grupoId: number): Observable<Juego> {
    return this.http.post<Juego>(this.APIUrlGrupos + '/' + grupoId + '/JuegosDeCompeticionLiga', juego);
  }

  public DameJuegoDeCompeticionLigaGrupo(grupoId: number): Observable<Juego[]> {
    return this.http.get<Juego[]>(this.APIUrlGrupos + '/' + grupoId + '/JuegosDeCompeticionLiga');
  }

  public CambiaEstadoJuegoDeCompeticionLiga(JuegosDeCompeticionLiga: Juego,
                                            juegoDeCompeticionId: number,
                                            grupoId: number): Observable<Juego> {
    return this.http.put<Juego>(this.APIUrlGrupos + '/' + grupoId + '/JuegosDeCompeticionLiga/' + juegoDeCompeticionId,
      JuegosDeCompeticionLiga);
  }

  public BorraJuegoDeCompeticionLiga(juegoDeCompeticionId: number): Observable<Juego> {
    return this.http.delete<Juego>(this.APIUrlJuegoDeCompeticionLiga + '/' + juegoDeCompeticionId);
  }


  // jornadas juego de competición liga
  public CrearJornadasLiga(jornadasDeCompeticionLiga: Jornada,
                           juegoDeCompeticionID: number): Observable<Jornada> {
    return this.http.post<Jornada>(this.APIUrlJuegoDeCompeticionLiga + '/' + juegoDeCompeticionID + '/JornadasDeCompeticionLiga',
      jornadasDeCompeticionLiga);
  }

  // jornadas juego de competición liga
  public BorrarJornadaLiga(jornadaDeCompeticionLiga: Jornada): Observable<Jornada> {
    return this.http.delete<Jornada>(this.APIUrlJornadasJuegoDeCompeticionLiga + '/' + jornadaDeCompeticionLiga.id);

  }

  public ModificarJornada(JornadaNueva: Jornada, JornadaId: number): Observable<Jornada> {
    return this.http.patch<Jornada>(this.APIUrlJornadasJuegoDeCompeticionLiga + '/' + JornadaId, JornadaNueva);
  }

  public DameJornadasDeCompeticionLiga(juegoDeCompeticionLigaId: number): Observable<Jornada[]> {
    return this.http.get<Jornada[]>(this.APIUrlJornadasJuegoDeCompeticionLiga + '?filter[where][juegoDeCompeticionLigaId]='
      + juegoDeCompeticionLigaId);
  }

  public DameEnfrentamientosDeCadaJornadaLiga(jornadasDeCompeticionLigaId: number): Observable<Array<EnfrentamientoLiga>> {
    return this.http.get<Array<EnfrentamientoLiga>>(this.APIUrlJornadasJuegoDeCompeticionLiga + '/' + jornadasDeCompeticionLigaId +
      '/enfrentamientosLiga');
  }

  public CrearEnrentamientoLiga(enfrentamiento: EnfrentamientoLiga, jornadasDeCompeticionLigaId: number): Observable<EnfrentamientoLiga> {
    return this.http.post<EnfrentamientoLiga>(this.APIUrlJornadasJuegoDeCompeticionLiga + '/' + jornadasDeCompeticionLigaId +
      '/enfrentamientosLiga', enfrentamiento);
  }

  public BorraEnrentamientoLiga(enfrentamiento: EnfrentamientoLiga): Observable<EnfrentamientoLiga> {
    return this.http.delete<EnfrentamientoLiga>(this.APIUrlEnfrentamientosLiga + '/' + enfrentamiento.id);
  }

  public PonGanadorDelEnfrentamiento(enfrentamiento: EnfrentamientoLiga): Observable<EnfrentamientoLiga> {
    return this.http.put<EnfrentamientoLiga>(this.APIUrlEnfrentamientosLiga + '/' + enfrentamiento.id, enfrentamiento);
  }


  ///////////////////////////////// GESTION COMPETICION LIGA INDIVIDUAL //////////////////////////////////////////////////////////
  public DameAlumnosJuegoDeCompeticionLiga(juegoDeCompeticionLigaId: number): Observable<Alumno[]> {
    console.log('Voy a por los alumnos');
    return this.http.get<Alumno[]>(this.APIUrlJuegoDeCompeticionLiga + '/' + juegoDeCompeticionLigaId + '/Alumnos');
  }

  public InscribeAlumnoJuegoDeCompeticionLiga(alumnoJuegoDeCompeticionLiga: AlumnoJuegoDeCompeticionLiga) {
    return this.http.post<AlumnoJuegoDeCompeticionLiga>(this.APIUrlAlumnoJuegoDeCompeticionLiga, alumnoJuegoDeCompeticionLiga);
  }

  public BorraInscripcionAlumnoJuegoDeCompeticionLiga(inscripcionId: number) {
    return this.http.delete<AlumnoJuegoDeCompeticionLiga>(this.APIUrlAlumnoJuegoDeCompeticionLiga + '/' + inscripcionId);
  }

  public DameInscripcionesAlumnoJuegoDeCompeticionLiga(juegoDeCompeticionLigaId: number): Observable<AlumnoJuegoDeCompeticionLiga[]> {
    return this.http.get<AlumnoJuegoDeCompeticionLiga[]>(this.APIUrlAlumnoJuegoDeCompeticionLiga
      + '?filter[where][JuegoDeCompeticionLigaId]=' + juegoDeCompeticionLigaId);
  }

  // tslint:disable-next-line:max-line-length
  public PonPuntosAlumnoGanadorJuegoDeCompeticionLiga(alumnoGanadorJuegoDeCompeticionLiga: AlumnoJuegoDeCompeticionLiga): Observable<AlumnoJuegoDeCompeticionLiga> {
    return this.http.put<AlumnoJuegoDeCompeticionLiga>(this.APIUrlAlumnoJuegoDeCompeticionLiga + '/'
      + alumnoGanadorJuegoDeCompeticionLiga.id, alumnoGanadorJuegoDeCompeticionLiga);
  }

  //////////////////////////////////// GESITON COMPETICION LIGA POR EQUIPOS ///////////////////////////////////////////////////////
  public DameEquiposJuegoDeCompeticionLiga(juegoDeCompeticionLigaId: number): Observable<Equipo[]> {
    return this.http.get<Equipo[]>(this.APIUrlJuegoDeCompeticionLiga + '/' + juegoDeCompeticionLigaId + '/Equipos');
  }

  public DameInscripcionesEquipoJuegoDeCompeticionLiga(juegoDeCompeticionLigaId: number): Observable<EquipoJuegoDeCompeticionLiga[]> {
    return this.http.get<EquipoJuegoDeCompeticionLiga[]>(this.APIUrlEquipoJuegoDeCompeticionLiga
      + '?filter[where][juegoDeCompeticionLigaId]=' + juegoDeCompeticionLigaId);
  }


  public BorraInscripcionEquipoJuegoDeCompeticionLiga(inscripcionId: number) {
    return this.http.delete<EquipoJuegoDeCompeticionLiga>(this.APIUrlEquipoJuegoDeCompeticionLiga + '/' + inscripcionId);
  }

  public InscribeEquipoJuegoDeCompeticionLiga(equipoJuegoDeCompeticionLiga: EquipoJuegoDeCompeticionLiga) {
    return this.http.post<EquipoJuegoDeCompeticionLiga>(this.APIUrlEquipoJuegoDeCompeticionLiga, equipoJuegoDeCompeticionLiga);
  }

  // tslint:disable-next-line:max-line-length
  public PonPuntosEquipoGanadorJuegoDeCompeticionLiga(ganadorJuegoDeCompeticionLiga: EquipoJuegoDeCompeticionLiga): Observable<EquipoJuegoDeCompeticionLiga> {
    // tslint:disable-next-line:max-line-length
    return this.http.put<EquipoJuegoDeCompeticionLiga>(this.APIUrlEquipoJuegoDeCompeticionLiga + '/' + ganadorJuegoDeCompeticionLiga.id, ganadorJuegoDeCompeticionLiga);
  }

/////////////////////////// GESTION JUEGO DE COMPETICION TIPO FORMULA 1 ////////////////////////////

//ME HE QUEDADO AQUI

  public CreaJuegoDeCompeticionFormulaUno(juego: Juego, grupoId: number): Observable<Juego> {
    return this.http.post<Juego>(this.APIUrlGrupos + '/' + grupoId + '/JuegosDeCompeticionFormulaUno', juego);
  }

  public DameJuegoDeCompeticionFormulaUnoGrupo(grupoId: number): Observable<Juego[]> {
    return this.http.get<Juego[]>(this.APIUrlGrupos + '/' + grupoId + '/JuegosDeCompeticionFormulaUno');
  }

  public BorraJuegoDeCompeticionFormulaUno(juegoDeCompeticionId: number): Observable<Juego> {
    return this.http.delete<Juego>(this.APIUrlJuegoDeCompeticionFormulaUno + '/' + juegoDeCompeticionId);
  }

  public ModificaJuegoDeCompeticionFormulaUno(juego: Juego, grupoId: number): Observable<Juego> {
    return this.http.patch<Juego>(this.APIUrlJuegoDeCompeticionFormulaUno + '/' + grupoId, juego);
  }

  public CambiaEstadoJuegoDeCompeticionFormulaUno(JuegosDeCompeticionF1: Juego,
                                                  juegoDeCompeticionId: number,
                                                  grupoId: number): Observable<Juego> {
    // tslint:disable-next-line:max-line-length
    return this.http.put<Juego>(this.APIUrlGrupos + '/' + grupoId + '/JuegosDeCompeticionFormulaUno/' + juegoDeCompeticionId, JuegosDeCompeticionF1);
  }

  public CrearJornadasFormulaUno(JornadasDeCompeticionFormulaUno: Jornada, juegoDeCompeticionID: number): Observable<Jornada> {
    // tslint:disable-next-line:max-line-length
    return this.http.post<Jornada>(this.APIUrlJuegoDeCompeticionFormulaUno + '/' + juegoDeCompeticionID + '/JornadasDeCompeticionFormulaUno',
      JornadasDeCompeticionFormulaUno);

  }

  public ModificarJornadaFormulaUno(JornadaNueva: Jornada, JornadaId: number): Observable<Jornada> {
    return this.http.patch<Jornada>(this.APIUrlJornadasJuegoDeCompeticionFormulaUno + '/' + JornadaId, JornadaNueva);
  }


  public DameJornadasDeCompeticionFormulaUno(juegoDeCompeticionId: number): Observable<Jornada[]> {
    return this.http.get<Jornada[]>(this.APIUrlJuegoDeCompeticionFormulaUno + '/' + juegoDeCompeticionId
      + '/jornadasDeCompeticionFormulaUno');
  }

  public ActualizaGanadoresJornadasDeCompeticionFormulaUno(juegoDeCompeticionFormulaUnoId: number): Observable<Jornada[]> {
    return this.http.get<Jornada[]>(this.APIUrlJuegoDeCompeticionFormulaUno + '/' + juegoDeCompeticionFormulaUnoId
      + '/jornadasDeCompeticionFormulaUno');
  }

  public PonGanadoresJornadasDeCompeticionFormulaUno(jornada: Jornada): Observable<Jornada> {
    return this.http.put<Jornada>(this.APIUrlJornadasJuegoDeCompeticionFormulaUno + '/' + jornada.id, jornada);
  }

  public BorrarJornadaFormulaUno(jornadaDeCompeticionFormulaUno: Jornada): Observable<Jornada> {
    return this.http.delete<Jornada>(this.APIUrlJornadasJuegoDeCompeticionFormulaUno + '/' + jornadaDeCompeticionFormulaUno.id);

  }

  ////////////////////////////////// GESTION COMPETICION FORMULA 1 INDIVIDUAL /////////////////////////////////////////////////////////

  public DameAlumnosJuegoDeCompeticionFormulaUno(juegoDeCompeticionFormulaUnoId: number): Observable<Alumno[]> {
    console.log('Voy a por los alumnos');
    return this.http.get<Alumno[]>(this.APIUrlJuegoDeCompeticionFormulaUno + '/' + juegoDeCompeticionFormulaUnoId + '/Alumnos');
  }

  public InscribeAlumnoJuegoDeCompeticionFormulaUno(alumnoJuegoDeCompeticionFormulaUno: AlumnoJuegoDeCompeticionFormulaUno) {
    return this.http.post<AlumnoJuegoDeCompeticionFormulaUno>(this.APIUrlAlumnoJuegoDeCompeticionFormulaUno,
      alumnoJuegoDeCompeticionFormulaUno);
  }


  // tslint:disable-next-line:max-line-length
  public DameInscripcionesAlumnoJuegoDeCompeticionFormulaUno(juegoDeCompeticionFormulaUnoId: number): Observable<AlumnoJuegoDeCompeticionFormulaUno[]> {
    return this.http.get<AlumnoJuegoDeCompeticionFormulaUno[]>(this.APIUrlAlumnoJuegoDeCompeticionFormulaUno
      + '?filter[where][juegoDeCompeticionFormulaUnoId]=' + juegoDeCompeticionFormulaUnoId);
  }

  public BorraInscripcionAlumnoJuegoDeCompeticionFormulaUno(alumnoJuegoDeCompeticionFormulaUnoId: number) {
    // tslint:disable-next-line:max-line-length
    return this.http.delete<AlumnoJuegoDeCompeticionFormulaUno>(this.APIUrlAlumnoJuegoDeCompeticionFormulaUno + '/' + alumnoJuegoDeCompeticionFormulaUnoId);
  }


  // tslint:disable-next-line:max-line-length
  public PonPuntosAlumnoGanadorJornadasDeCompeticionFormulaUno(alumno: AlumnoJuegoDeCompeticionFormulaUno): Observable<AlumnoJuegoDeCompeticionFormulaUno> {
    // tslint:disable-next-line:max-line-length
    return this.http.put<AlumnoJuegoDeCompeticionFormulaUno>(this.APIUrlAlumnoJuegoDeCompeticionFormulaUno + '/' + alumno.id, alumno);
  }

  //////////////////////////////////////// GESTION JUEGO COMPETICION FORMULA 1 POR EQUIPOS ///////////////////////////////////////

  public DameEquiposJuegoDeCompeticionFormulaUno(juegoDeCompeticionLigaId: number): Observable<Equipo[]> {
    return this.http.get<Equipo[]>(this.APIUrlJuegoDeCompeticionFormulaUno + '/' + juegoDeCompeticionLigaId + '/Equipos');
  }

  public InscribeEquipoJuegoDeCompeticionFormulaUno(equipoJuegoDeCompeticionFormulaUno: EquipoJuegoDeCompeticionFormulaUno) {
    return this.http.post<EquipoJuegoDeCompeticionFormulaUno>(this.APIUrlEquipoJuegoDeCompeticionFormulaUno,
      equipoJuegoDeCompeticionFormulaUno);
  }

// tslint:disable-next-line:max-line-length
  public DameInscripcionesEquipoJuegoDeCompeticionFormulaUno(juegoDeCompeticionFormulaUnoId: number): Observable<EquipoJuegoDeCompeticionFormulaUno[]> {
    return this.http.get<EquipoJuegoDeCompeticionFormulaUno[]>(this.APIUrlEquipoJuegoDeCompeticionFormulaUno
      + '?filter[where][juegoDeCompeticionFormulaUnoId]=' + juegoDeCompeticionFormulaUnoId);
  }

  public BorraInscripcionEquipoJuegoDeCompeticionFormulaUno(equipoJuegoDeCompeticionFormulaUnoId: number) {
    // tslint:disable-next-line:max-line-length
    return this.http.delete<EquipoJuegoDeCompeticionLiga>(this.APIUrlEquipoJuegoDeCompeticionFormulaUno + '/' + equipoJuegoDeCompeticionFormulaUnoId);
  }

  // tslint:disable-next-line:max-line-length
  public PonPuntosEquipoGanadorJornadasDeCompeticionFormulaUno(equipo: EquipoJuegoDeCompeticionFormulaUno): Observable<EquipoJuegoDeCompeticionFormulaUno> {
    // tslint:disable-next-line:max-line-length
    return this.http.put<EquipoJuegoDeCompeticionFormulaUno>(this.APIUrlEquipoJuegoDeCompeticionFormulaUno + '/' + equipo.id, equipo);
  }


/////////////////////////////// GESTION DE PREGUNTAS /////////////////////////////

  public CreaPregunta(pregunta: Pregunta, profesorId: number): Observable<Pregunta> {
    console.log(pregunta, profesorId);
    return this.http.post<Pregunta>(this.APIUrlProfesores + '/' + profesorId + '/Preguntas', pregunta);
  }

  public DameTodasMisPreguntas(profesorId: number): Observable<Pregunta[]> {
    return this.http.get<Pregunta[]>(this.APIUrlProfesores + '/' + profesorId + '/Preguntas');
  }

  public BorrarPregunta(preguntaId: number): Observable<any> {
    return this.http.delete<any>(this.APIUrlPreguntas + '/' + preguntaId);
  }

  public ModificaPregunta(pregunta: Pregunta, profesorId: number, preguntaId: number): Observable<Pregunta> {
    return this.http.put<Pregunta>(this.APIUrlProfesores + '/' + profesorId + '/Preguntas/' + preguntaId, pregunta);
  }

  public PonImagenPregunta(formData: FormData): Observable<any> {
    return this.http.post<any>(this.APIUrlImagenesPreguntas + '/upload', formData);
  }

  public BorrarImagenPregunta(imagen: string): Observable<any> {
    return this.http.delete<any>(this.APIUrlImagenesPreguntas + '/Files/' + imagen);
  }

  public DameImagenPregunta(imagen: string): Observable<any> {
    return this.httpImagenes.get(this.APIUrlImagenesPreguntas + '/download/' + imagen,
      { responseType: ResponseContentType.Blob });
  }


  //////////////////////////// GESTION DE CUESTIONARIOS /////////////////////////////
  public CreaCuestionario(cuestionario: Cuestionario, profesorId: number): Observable<Cuestionario> {
    console.log('Cuestionario: ' + cuestionario);
    return this.http.post<Cuestionario>(this.APIUrlProfesores + '/' + profesorId + '/Cuestionarios', cuestionario);
  }

  public DameCuestionario(cuestionarioId: number): Observable<Cuestionario> {
    return this.http.get<Cuestionario>(this.APIUrlCuestionarios + '/' + cuestionarioId);
  }

  public ModificaCuestionario(cuestionario: Cuestionario, profesorId: number, cuestionarioId: number): Observable<Cuestionario> {
    return this.http.put<Cuestionario>(this.APIUrlProfesores + '/' + profesorId + '/Cuestionarios/' + cuestionarioId, cuestionario);
  }

  public DameTodosMisCuestionarios(profesorId: number): Observable<Cuestionario[]> {
    return this.http.get<Cuestionario[]>(this.APIUrlProfesores + '/' + profesorId + '/Cuestionarios');
  }

  public DameCuestionariosPublicos(): Observable<Cuestionario[]> {
    return this.http.get<Cuestionario[]>(this.APIUrlCuestionarios
      + '?filter[where][Publico]=true');
  }

  public BorraCuestionario(profesorId: number, cuestionarioId: number): Observable<any> {
    return this.http.delete<any>(this.APIUrlProfesores + '/' + profesorId + '/Cuestionarios/' + cuestionarioId);
  }

  public DamePreguntasCuestionario(cuestionarioId: number): Observable<Pregunta[]> {
    return this.http.get<Pregunta[]>(this.APIUrlCuestionarios + '/' + cuestionarioId + '/Preguntas');
  }

  public PreguntasEnCuestionario(preguntaDelCuestionario: PreguntaDelCuestionario): Observable<PreguntaDelCuestionario> {
    return this.http.post<PreguntaDelCuestionario>(this.APIUrlPreguntaDelCuestionario, preguntaDelCuestionario);
  }

  public DamePreguntaDelCuestionario(preguntaId: number, cuestionarioId: number): Observable<PreguntaDelCuestionario> {
    // tslint:disable-next-line:max-line-length
    return this.http.get<PreguntaDelCuestionario>(this.APIUrlPreguntaDelCuestionario + '?filter[where][cuestionarioId]=' + cuestionarioId + '&filter[where][preguntaId]=' + preguntaId);
  }

  public BorraPreguntaDelCuestionario(preguntaDelCuestionatioId: number): Observable<any> {
    return this.http.delete<any>(this.APIUrlPreguntaDelCuestionario + '/' + preguntaDelCuestionatioId);
  }

  public DameAsignacionesPreguntasACuestionario(cuestionarioId: number): Observable<PreguntaDelCuestionario[]> {
    // tslint:disable-next-line:max-line-length
    return this.http.get<PreguntaDelCuestionario[]>(this.APIUrlPreguntaDelCuestionario + '?filter[where][cuestionarioId]=' + cuestionarioId);
  }

  public DameCuestionariosConPregunta(preguntaId: number): Observable<PreguntaDelCuestionario[]> {
    return this.http.get<PreguntaDelCuestionario[]>(this.APIUrlPreguntaDelCuestionario + '?filter[where][preguntaId]=' + preguntaId);
  }

  //////////////////////////////// GESTION DE JUEGOS DE CUESTIONARIO/////////////////
  public CreaJuegoDeCuestionario(juegoDeCuestionario: JuegoDeCuestionario, grupoId: number): Observable<JuegoDeCuestionario> {
    return this.http.post<JuegoDeCuestionario>(this.APIUrlGrupos + '/' + grupoId + '/JuegosDeCuestionario', juegoDeCuestionario);
  }

  public DameJuegoDeCuestionario(grupoId: number): Observable<Juego[]> {
    return this.http.get<Juego[]>(this.APIUrlGrupos + '/' + grupoId + '/JuegosDeCuestionario');
  }

  public ModificaJuegoDeCuestionario(JuegosDeCuestionario: JuegoDeCuestionario,
                                     juegoDeCuestionarioId: number, grupoId: number): Observable<JuegoDeCuestionario> {
    return this.http.put<JuegoDeCuestionario>(this.APIUrlGrupos + '/' + grupoId + '/JuegosDeCuestionario/' + juegoDeCuestionarioId,
      JuegosDeCuestionario);
  }

  public BorrarJuegoDeCuestionario(juegoDeCuestionarioId: number): Observable<any> {
    return this.http.delete<any>(this.APIUrlJuegoDeCuestionario + '/' + juegoDeCuestionarioId);
  }

  //////////////////////////////// GESTION DE ALUMNOS EN JUEGOS DE CUESTIONARIO/////////////////

  public InscribeAlumnoJuegoDeCuestionario(alumnoJuegoDeCuestionario: AlumnoJuegoDeCuestionario) {
    return this.http.post<AlumnoJuegoDeCuestionario>(this.APIUrlAlumnoJuegoDeCuestionario, alumnoJuegoDeCuestionario);
  }

  public DameAlumnosJuegoDeCuestionario(juegoDeCuestionario: number): Observable<Alumno[]> {
    return this.http.get<Alumno[]>(this.APIUrlJuegoDeCuestionario + '/' + juegoDeCuestionario + '/Alumnos');
  }

  public DameInscripcionesAlumnoJuegoDeCuestionario(juegoDeCuestionarioId: number): Observable<AlumnoJuegoDeCuestionario[]> {
    return this.http.get<AlumnoJuegoDeCuestionario[]>(this.APIUrlAlumnoJuegoDeCuestionario
      + '?filter[where][juegoDeCuestionarioId]=' + juegoDeCuestionarioId);
  }

  public DameRespuestasAlumnoJuegoDeCuestionario(alumnoJuegoDeCuestionarioId: number): Observable<RespuestaJuegoDeCuestionario[]> {
    return this.http.get<RespuestaJuegoDeCuestionario[]>(this.APIUrlRespuestasJuegoDeCuestionario
      + '?filter[where][alumnoJuegoDeCuestionarioId]=' + alumnoJuegoDeCuestionarioId);
  }

  public BorraRespuestaAlumnoDelJuegoDeCuestionario(respuestaId: number) {
    return this.http.delete<any>(this.APIUrlRespuestasJuegoDeCuestionario + '/' + respuestaId);
  }

  public BorraAlumnoDelJuegoDeCuestionario(alumnoJuegoDeCuestionarioId: number): Observable<any> {
    return this.http.delete<any>(this.APIUrlAlumnoJuegoDeCuestionario + '/' + alumnoJuegoDeCuestionarioId);
  }


  /////////////////////////////////////// GESTION DE ESCENARIOS ////////////////////////

  public CreaEscenario(escenario: Escenario, profesorId: number): Observable<Escenario> {
    console.log('Escenario: ' + escenario);
    return this.http.post<Escenario>(this.APIUrlProfesores + '/' + profesorId + '/Escenarios', escenario);
  }

  public ModificaEscenario(escenario: Escenario, profesorId: number, idescenario: number): Observable<Escenario> {
    return this.http.put<Escenario>(this.APIUrlProfesores + '/' + profesorId + '/Escenarios/' + idescenario, escenario);
  }

  // public DameTodosMisEscenarios(profesorId: number): Observable<Escenario[]> {
  //   return this.http.get<Escenario[]>(this.APIUrlProfesores + '/' + profesorId + '/escenarios');
  // }

  public DameEscenariosDelProfesor(profesorId: number): Observable<Escenario[]> {
    return this.http.get<Escenario[]>(this.APIUrlProfesores + '/' + profesorId + '/Escenarios');
  }

  public BorraEscenario(idescenario: number, profesorId: number): Observable<any> {
    return this.http.delete<any>(this.APIUrlProfesores + '/' + profesorId + '/Escenarios/' + idescenario);
  }

  public PonPuntoGeolocalizableEscenario(puntogeolocalizable: PuntoGeolocalizable, idescenario: number): Observable<PuntoGeolocalizable> {
    return this.http.post<PuntoGeolocalizable>(this.APIUrlEscenarios + '/' + idescenario + '/PuntosGeolocalizables', puntogeolocalizable);
  }

  public BorrarPuntoGeolocalizable(idpuntogeolocalizable: number, idescenario: number): Observable<any> {
    return this.http.delete<any>(this.APIUrlEscenarios + '/' + idescenario + '/PuntosGeolocalizables/' + idpuntogeolocalizable);
  }

  public DameEscenario(idescenario: number): Observable<Escenario> {
    return this.http.get<Escenario>(this.APIUrlEscenarios + '/' + idescenario);
  }


  public DamePuntosGeolocalizablesEscenario(idescenario: number): Observable<PuntoGeolocalizable[]> {
    return this.http.get<PuntoGeolocalizable[]>(this.APIUrlEscenarios + '/' + idescenario + '/PuntosGeolocalizables');
  }

  // tslint:disable-next-line:max-line-length
  public ModificaPuntoGeolocalizableEscenario(puntogeolocalizable: PuntoGeolocalizable, idescenario: number, idpuntogeolocalizable: number): Observable<PuntoGeolocalizable> {
    // tslint:disable-next-line:max-line-length
    return this.http.put<PuntoGeolocalizable>(this.APIUrlEscenarios + '/' + idescenario + '/PuntosGeolocalizables/' + idpuntogeolocalizable, puntogeolocalizable);
  }

  ////////////////////////////// GESTION DE JUEGOS DE GEOCACHING ////////////////////////////////////////

  public CreaJuegoDeGeocaching(juegoDeGeocaching: JuegoDeGeocaching, grupoId: number): Observable<JuegoDeGeocaching> {
    return this.http.post<JuegoDeGeocaching>(this.APIUrlGrupos + '/' + grupoId + '/JuegosDeGeocaching', juegoDeGeocaching);
  }

  public ModificaJuegoDeGeocaching(JuegosDeGeocaching: JuegoDeGeocaching,
                                   juegoDeGeocachingId: number, grupoId: number): Observable<JuegoDeGeocaching> {
    return this.http.put<JuegoDeGeocaching>(this.APIUrlGrupos + '/' + grupoId + '/JuegosDeGeocaching/' + juegoDeGeocachingId,
      JuegosDeGeocaching);
  }

  public BorrarJuegoDeGeocaching(juegoDeGeocachingId: number): Observable<any> {
    return this.http.delete<any>(this.APIUrlJuegoDeGeocaching + '/' + juegoDeGeocachingId);
  }

  public DameJuegoDeGeocaching(grupoId: number): Observable<Juego[]> {
    return this.http.get<Juego[]>(this.APIUrlGrupos + '/' + grupoId + '/JuegosDeGeocaching');
  }

/////////////////////////////// GESTION DE ALUMNOS EN JUEGOS DE GEOCACHING //////////////////

  public DameAlumnosDelJuegoDeGeocaching(juegoDeGeocachingId: number): Observable<AlumnoJuegoDeGeocaching[]> {
    // tslint:disable-next-line:max-line-length
    return this.http.get<AlumnoJuegoDeGeocaching[]>(this.APIUrlAlumnoJuegoDeGeocaching + '?filter[where][juegoDeGeocachingId]=' + juegoDeGeocachingId);
  }

  public BorraAlumnoDelJuegoDeGeocaching(alumnoJuegoDeGeocachingId: number): Observable<any> {
    return this.http.delete<any>(this.APIUrlAlumnoJuegoDeGeocaching + '/' + alumnoJuegoDeGeocachingId);
  }

  public InscribeAlumnoJuegoDeGeocaching(alumnoJuegoDeGeocaching: AlumnoJuegoDeGeocaching) {
    return this.http.post<AlumnoJuegoDeGeocaching>(this.APIUrlAlumnoJuegoDeGeocaching, alumnoJuegoDeGeocaching);
  }

  public DameAlumnosJuegoDeGeocaching(juegoDeGeocaching: number): Observable<Alumno[]> {
    return this.http.get<Alumno[]>(this.APIUrlJuegoDeGeocaching + '/' + juegoDeGeocaching + '/Alumnos');
  }

  public DameInscripcionesAlumnoJuegoDeGeocaching(juegoDeGeocachingId: number): Observable<AlumnoJuegoDeGeocaching[]> {
    return this.http.get<AlumnoJuegoDeGeocaching[]>(this.APIUrlAlumnoJuegoDeGeocaching
      + '?filter[where][juegoDeGeocachingId]=' + juegoDeGeocachingId);
  }


  ////////////////////////////// GESTION FAMILIAS DE AVATARES ////////////////////////////////////


  public CreaFamiliaAvatares(familia: FamiliaAvatares, profesorId: number): Observable<FamiliaAvatares> {
    return this.http.post<FamiliaAvatares>(this.APIUrlProfesores + '/' + profesorId + '/FamiliasAvatares', familia);
  }

  public DameFamiliasAvataresProfesor(profesorId: number): Observable<FamiliaAvatares[]> {
    return this.http.get<FamiliaAvatares[]>(this.APIUrlProfesores + '/' + profesorId + '/FamiliasAvatares');
  }


  public DameFamiliasAvataresPublicas(): Observable<FamiliaAvatares[]> {
    return this.http.get<FamiliaAvatares[]>(this.APIUrlFamiliarAvatares
      + '?filter[where][publica]=true');
  }


  public DameFamilia(familiaId: number): Observable<FamiliaAvatares> {
    return this.http.get<FamiliaAvatares>(this.APIUrlFamiliarAvatares + '/' + familiaId);
  }

  public ModificaFamiliaAvatares(familia: FamiliaAvatares): Observable<FamiliaAvatares> {
    return this.http.put<FamiliaAvatares>(this.APIUrlFamiliarAvatares + '/' + familia.id, familia);
  }

  public BorraFamiliaAvatares(familiaId: number): Observable<any> {
    return this.http.delete<any>(this.APIUrlFamiliarAvatares + '/' + familiaId);
  }

  public PonImagenAvatar(formData: FormData): Observable<any> {
    return this.http.post<any>(this.APIUrlImagenesAvatares + '/upload', formData);
  }

  public DameImagenAvatar(imagen: string): Observable<any> {
    return this.httpImagenes.get(this.APIUrlImagenesAvatares + '/download/' + imagen,
      {responseType: ResponseContentType.Blob});
  }


  public BorrarImagenAvatar(imagen: string): Observable<any> {
    return this.http.delete<any>(this.APIUrlImagenesAvatares + '/Files/' + imagen);
  }

  ////////////////////////////// GESTION JUEGO DE AVATARES ////////////////////////////////////

  public CreaJuegoDeAvatar(juego: JuegoDeAvatar, grupoId: number): Observable<JuegoDeAvatar> {
    return this.http.post<JuegoDeAvatar>(this.APIUrlGrupos + '/' + grupoId + '/JuegosDeAvatar', juego);
  }

  public BorraJuegoDeAvatar(juegoDeAvatarId: number): Observable<JuegoDeAvatar> {
    return this.http.delete<JuegoDeAvatar>(this.APIUrlJuegoDeAvatar + '/' + juegoDeAvatarId);
  }

  public ModificaJuegoDeAvatar(juego: Juego): Observable<Juego> {
    return this.http.put<Juego>(this.APIUrlJuegoDeAvatar + '/' + juego.id, juego);
  }

  public DameJuegoDeAvatarGrupo(grupoId: number): Observable<Juego[]> {
    return this.http.get<Juego[]>(this.APIUrlGrupos + '/' + grupoId + '/JuegosDeAvatar');
  }


  public CambiaEstadoJuegoDeAvatar(juego: Juego): Observable<Juego> {
    // tslint:disable-next-line:max-line-length
    return this.http.put<Juego>(this.APIUrlGrupos + '/' + juego.grupoId + '/JuegosDeAvatar/' + juego.id, juego);
  }


  //////////////////////////////// GESTION DE ALUMNOS EN JUEGO DE AVATAR //////////////

  public InscribeAlumnoJuegoDeAvatar(alumnoJuegoDeAvatar: AlumnoJuegoDeAvatar) {
    return this.http.post<AlumnoJuegoDeAvatar>(this.APIUrlAlumnoJuegoDeAvatar,
      alumnoJuegoDeAvatar);
  }

  public DameAlumnosJuegoDeAvatar(juegoDeAvatarId: number): Observable<Alumno[]> {
    console.log('Voy a por los alumnos');
    return this.http.get<Alumno[]>(this.APIUrlJuegoDeAvatar + '/' + juegoDeAvatarId + '/Alumnos');
  }

  // tslint:disable-next-line:max-line-length
  public DameInscripcionesAlumnoJuegoDeAvatar(juegoDeAvatarId: number): Observable<AlumnoJuegoDeAvatar[]> {
    return this.http.get<AlumnoJuegoDeAvatar[]>(this.APIUrlAlumnoJuegoDeAvatar
      + '?filter[where][juegoDeAvatarId]=' + juegoDeAvatarId);
  }

  public BorraInscripcionAlumnoJuegoDeAvatar(inscripcionId: number) {
    // tslint:disable-next-line:max-line-length
    return this.http.delete<AlumnoJuegoDeAvatar>(this.APIUrlAlumnoJuegoDeAvatar + '/' + inscripcionId);
  }

  public BorraAudioAvatar(audio: string): Observable<any> {
    return this.http.delete<any>(this.APIUrlAudiosAvatares + '/Files/' + audio);
  }

  public ModificaInscripcionAlumnoJuegoDeAvatar(inscripcion: AlumnoJuegoDeAvatar): Observable<AlumnoJuegoDeAvatar> {
    return this.http.put<AlumnoJuegoDeAvatar>(this.APIUrlAlumnoJuegoDeAvatar + '/' + inscripcion.id, inscripcion);
  }

  //////////////////////////////// GESTION DE EQUIPOS EN JUEGO DE AVATAR /////////////////


  /////////////////////////////////////// GESTION JUEGOS DE VOTACION: UNO A TODOS /////////////////////////////////

  public CreaJuegoDeVotacionUnoATodos(juego: JuegoDeVotacionUnoATodos, grupoId: number): Observable<JuegoDeVotacionUnoATodos> {
    return this.http.post<JuegoDeVotacionUnoATodos>(this.APIUrlGrupos + '/' + grupoId + '/JuegosDeVotacionUnoATodos', juego);
  }

  public DameJuegosDeVotacionUnoATodos(grupoId: number): Observable<JuegoDeVotacionUnoATodos[]> {
    return this.http.get<JuegoDeVotacionUnoATodos[]>(this.APIUrlGrupos + '/' + grupoId + '/JuegosDeVotacionUnoATodos');
  }

  public BorraJuegoDeVotacionUnoATodos(juegoId: number): Observable<JuegoDeVotacionUnoATodos> {
    return this.http.delete<JuegoDeVotacionUnoATodos>(this.APIUrlJuegoDeVotacionUnoATodos + '/' + juegoId);
  }

  public CambiaEstadoJuegoDeVotacionUnaATodos(juego: JuegoDeVotacionUnoATodos): Observable<JuegoDeVotacionUnoATodos> {
    // tslint:disable-next-line:max-line-length
    return this.http.put<JuegoDeVotacionUnoATodos>(this.APIUrlGrupos + '/' + juego.grupoId + '/JuegosDeVotacionUnoATodos/' + juego.id, juego);
  }

  ////////////////////////////////// GESTION VOTACION UNO A TODOS INDIVIDUAL /////////////////////////////////////////////////////////

  public DameAlumnosJuegoDeVotacionUnoATodos(juegoId: number): Observable<Alumno[]> {
    return this.http.get<Alumno[]>(this.APIUrlJuegoDeVotacionUnoATodos + '/' + juegoId + '/Alumnos');
  }

  public InscribeAlumnoJuegoDeVotacionUnoATodos(alumnoJuegoDeVotacionUnoATodos: AlumnoJuegoDeVotacionUnoATodos) {
    return this.http.post<AlumnoJuegoDeVotacionUnoATodos>(this.APIUrlAlumnoJuegoDeVotacionUnoATodos,
      alumnoJuegoDeVotacionUnoATodos);
  }


  // tslint:disable-next-line:max-line-length
  public DameInscripcionesAlumnoJuegoDeVotacionUnoATodos(juegoId: number): Observable<AlumnoJuegoDeVotacionUnoATodos[]> {
    return this.http.get<AlumnoJuegoDeVotacionUnoATodos[]>(this.APIUrlAlumnoJuegoDeVotacionUnoATodos
      + '?filter[where][juegoDeVotacionUnoATodosId]=' + juegoId);
  }

  public BorraInscripcionAlumnoJuegoDeVotacionUnoATodos(alumnoJuegoDeVotacionUnoATodosId: number) {
    // tslint:disable-next-line:max-line-length
    return this.http.delete<AlumnoJuegoDeVotacionUnoATodos>(this.APIUrlAlumnoJuegoDeVotacionUnoATodos + '/' + alumnoJuegoDeVotacionUnoATodosId);
  }


  // tslint:disable-next-line:max-line-length
  public ModificaInscripcionAlumnoJuegoDeVotacionUnoATodos(inscripcion: AlumnoJuegoDeVotacionUnoATodos): Observable<AlumnoJuegoDeVotacionUnoATodos> {
    return this.http.put<AlumnoJuegoDeVotacionUnoATodos>(this.APIUrlAlumnoJuegoDeVotacionUnoATodos + '/' + inscripcion.id, inscripcion);
  }


  /////////////////////////////////////// GESTION JUEGOS DE VOTACION: TODOS A UNO  /////////////////////////////////

  public CreaJuegoDeVotacionTodosAUno(juego: JuegoDeVotacionTodosAUno, grupoId: number): Observable<JuegoDeVotacionTodosAUno> {
    return this.http.post<JuegoDeVotacionTodosAUno>(this.APIUrlGrupos + '/' + grupoId + '/JuegosDeVotacionTodosAUno', juego);
  }

  public DameJuegosDeVotacionTodosAUno(grupoId: number): Observable<JuegoDeVotacionTodosAUno[]> {
    return this.http.get<JuegoDeVotacionTodosAUno[]>(this.APIUrlGrupos + '/' + grupoId + '/JuegosDeVotacionTodosAUno');
  }

  public BorraJuegoDeVotacionTodosAUno(juegoId: number): Observable<JuegoDeVotacionTodosAUno> {
    return this.http.delete<JuegoDeVotacionTodosAUno>(this.APIUrlJuegoDeVotacionTodosAUno + '/' + juegoId);
  }

  public CambiaEstadoJuegoDeVotacionTodosAUno(juego: JuegoDeVotacionTodosAUno): Observable<JuegoDeVotacionTodosAUno> {
    // tslint:disable-next-line:max-line-length
    return this.http.put<JuegoDeVotacionTodosAUno>(this.APIUrlGrupos + '/' + juego.grupoId + '/JuegosDeVotacionTodosAUno/' + juego.id, juego);
  }

  ////////////////////////////////// GESTION VOTACION UNO A TODOS INDIVIDUAL /////////////////////////////////////////////////////////

  public DameAlumnosJuegoDeVotacionTodosAUno(juegoId: number): Observable<Alumno[]> {
    return this.http.get<Alumno[]>(this.APIUrlJuegoDeVotacionTodosAUno + '/' + juegoId + '/Alumnos');
  }

  public InscribeAlumnoJuegoDeVotacionTodosAUno(alumnoJuegoDeVotacionTodosAUno: AlumnoJuegoDeVotacionTodosAUno) {
    return this.http.post<AlumnoJuegoDeVotacionTodosAUno>(this.APIUrlAlumnoJuegoDeVotacionTodosAUno,
      alumnoJuegoDeVotacionTodosAUno);
  }


  // tslint:disable-next-line:max-line-length
  public DameInscripcionesAlumnoJuegoDeVotacionTodosAUno(juegoId: number): Observable<AlumnoJuegoDeVotacionTodosAUno[]> {
    return this.http.get<AlumnoJuegoDeVotacionTodosAUno[]>(this.APIUrlAlumnoJuegoDeVotacionTodosAUno
      + '?filter[where][juegoDeVotacionTodosAUnoId]=' + juegoId);
  }

  public BorraInscripcionAlumnoJuegoDeVotacionTodosAUno(alumnoJuegoDeVotacionTodosAUnoId: number) {
    // tslint:disable-next-line:max-line-length
    return this.http.delete<AlumnoJuegoDeVotacionTodosAUno>(this.APIUrlAlumnoJuegoDeVotacionTodosAUno + '/' + alumnoJuegoDeVotacionTodosAUnoId);
  }


  // tslint:disable-next-line:max-line-length
  public ModificaInscripcionAlumnoJuegoDeVotacionTodosAUno(inscripcion: AlumnoJuegoDeVotacionTodosAUno): Observable<AlumnoJuegoDeVotacionTodosAUno> {
    return this.http.put<AlumnoJuegoDeVotacionTodosAUno>(this.APIUrlAlumnoJuegoDeVotacionTodosAUno + '/' + inscripcion.id, inscripcion);
  }


  // Gestion de rubricas
  public CreaRubrica(rubrica: Rubrica, profesorId: number): Observable<Rubrica> {
    return this.http.post<Rubrica>(this.APIUrlProfesores + '/' + profesorId + '/rubricas', rubrica);
  }

  public DameRubricasProfesor(profesorId: number): Observable<Rubrica[]> {
    return this.http.get<Rubrica[]>(this.APIUrlProfesores + '/' + profesorId + '/rubricas');
  }


  // Imagenes de perfil

  public PonImagenPerfil(formData: FormData): Observable<any> {
    return this.http.post<any>(this.APIUrlImagenesPerfil + '/upload', formData);
  }


  public BorraImagenPerfil(ImagenPerfil: string): Observable<any> {
    console.log('Voy a quitar la foto');
    return this.http.delete<any>(this.APIUrlImagenesPerfil + '/Files/' + ImagenPerfil);
  }


  public DameFamiliasDeImagenesDePerfilProfesor(profesorId: number): Observable<FamiliaDeImagenesDePerfil[]> {
    return this.http.get<FamiliaDeImagenesDePerfil[]>(this.APIUrlProfesores + '/' + profesorId + '/FamiliasImagenesDePerfil');
  }


  public DameFamiliasDeImagenesDePerfilPublicas(): Observable<FamiliaDeImagenesDePerfil[]> {
    return this.http.get<FamiliaDeImagenesDePerfil[]>(this.APIUrlFamiliasDeImagenesDePerfil
      + '?filter[where][publica]=true');
  }


  public CreaFamiliaDeImagenesDePerfil(familia: FamiliaDeImagenesDePerfil, profesorId: number): Observable<FamiliaDeImagenesDePerfil> {
    // tslint:disable-next-line:max-line-length
    return this.http.post<FamiliaDeImagenesDePerfil>(this.APIUrlProfesores + '/' + profesorId + '/FamiliasImagenesDePerfil', familia);
  }

  public BorrarFamiliaDeImagenesDePerfil(familiaId: number) {
    // tslint:disable-next-line:max-line-length
    return this.http.delete(this.APIUrlFamiliasDeImagenesDePerfil + '/' + familiaId);
  }

  public ModificaFamiliaDeImagenesDePerfil(familia: FamiliaDeImagenesDePerfil): Observable<FamiliaDeImagenesDePerfil> {
    return this.http.put<FamiliaDeImagenesDePerfil>(this.APIUrlFamiliasDeImagenesDePerfil + '/' + familia.id, familia);
  }


  //////////////////////////// GESTION DE CUESTIONARIOS DE SATISFACCION /////////////////////////////
  public CreaCuestionarioSatisfaccion(cuestionario: CuestionarioSatisfaccion, profesorId: number): Observable<CuestionarioSatisfaccion> {
    return this.http.post<CuestionarioSatisfaccion>(this.APIUrlProfesores + '/' + profesorId + '/CuestionariosSatisfaccion', cuestionario);
  }

  public DameCuestionarioSatisfaccion(cuestionarioId: number): Observable<CuestionarioSatisfaccion> {
    return this.http.get<CuestionarioSatisfaccion>(this.APIUrlCuestionariosSatisfaccion + '/' + cuestionarioId);
  }

  public ModificaCuestionarioSatisfaccion(cuestionario: CuestionarioSatisfaccion): Observable<CuestionarioSatisfaccion> {
    return this.http.put<CuestionarioSatisfaccion>(this.APIUrlCuestionariosSatisfaccion + '/' + cuestionario.id, cuestionario);
  }

  public DameTodosMisCuestionariosSatisfaccion(profesorId: number): Observable<CuestionarioSatisfaccion[]> {
    return this.http.get<CuestionarioSatisfaccion[]>(this.APIUrlProfesores + '/' + profesorId + '/CuestionariosSatisfaccion');
  }

  public BorraCuestionarioSatisfaccion(cuestionarioId: number): Observable<any> {
    return this.http.delete<any>(this.APIUrlCuestionariosSatisfaccion + '/' + cuestionarioId);
  }

  public DameCuestionariosSatisfaccionPublicos(): Observable<CuestionarioSatisfaccion[]> {
    return this.http.get<CuestionarioSatisfaccion[]>(this.APIUrlCuestionariosSatisfaccion
      + '?filter[where][Publico]=true');
  }


  /////////////////////////////////////// GESTION JUEGOS DE CUESTIONARIO DE SATISFACCION  /////////////////////////////////

  // tslint:disable-next-line:max-line-length
  public CreaJuegoDeCuestionarioSatisfaccion(juego: JuegoDeCuestionarioSatisfaccion, grupoId: number): Observable<JuegoDeCuestionarioSatisfaccion> {
    return this.http.post<JuegoDeCuestionarioSatisfaccion>(this.APIUrlGrupos + '/' + grupoId + '/JuegosDeCuestionarioSatisfaccion', juego);
  }

  public DameJuegosDeCuestionarioSatisfaccion(grupoId: number): Observable<JuegoDeCuestionarioSatisfaccion[]> {
    return this.http.get<JuegoDeCuestionarioSatisfaccion[]>(this.APIUrlGrupos + '/' + grupoId + '/JuegosDeCuestionarioSatisfaccion');
  }

  public BorraJuegoDeCuestionarioSatisfaccion(juegoId: number): Observable<JuegoDeCuestionarioSatisfaccion> {
    return this.http.delete<JuegoDeCuestionarioSatisfaccion>(this.APIUrlJuegoDeCuestionarioSatisfaccion + '/' + juegoId);
  }


  public CambiaEstadoJuegoDeCuestionarioSatisfaccion(juego: JuegoDeCuestionarioSatisfaccion): Observable<JuegoDeCuestionarioSatisfaccion> {
    // tslint:disable-next-line:max-line-length
    return this.http.put<JuegoDeCuestionarioSatisfaccion>(this.APIUrlGrupos + '/' + juego.grupoId + '/JuegosDeCuestionarioSatisfaccion/' + juego.id, juego);
  }


  ////////////////////////// GESTION JUEGO DE CUESTIONARIO SASTISFACCION INDIVIDUAL ///////////////////////////////

  public DameAlumnosJuegoDeCuestionarioSatisfaccion(juegoId: number): Observable<Alumno[]> {
    return this.http.get<Alumno[]>(this.APIUrlJuegoDeCuestionarioSatisfaccion + '/' + juegoId + '/Alumnos');
  }

  public InscribeAlumnoJuegoDeCuestionarioSatisfaccion(alumno: AlumnoJuegoDeCuestionarioSatisfaccion) {
    return this.http.post<AlumnoJuegoDeCuestionarioSatisfaccion>(this.APIUrlAlumnoJuegoDeCuestionarioSatisfaccion,
      alumno);
  }


  // tslint:disable-next-line:max-line-length
  public DameInscripcionesAlumnoJuegoDeCuestionarioSatisfaccion(juegoId: number): Observable<AlumnoJuegoDeCuestionarioSatisfaccion[]> {
    return this.http.get<AlumnoJuegoDeCuestionarioSatisfaccion[]>(this.APIUrlAlumnoJuegoDeCuestionarioSatisfaccion
      + '?filter[where][juegoDeCuestionarioSatisfaccionId]=' + juegoId);
  }

  public BorraInscripcionAlumnoJuegoDeCuestionarioSatisfaccion(alumnoId: number) {
    // tslint:disable-next-line:max-line-length
    return this.http.delete<AlumnoJuegoDeCuestionarioSatisfaccion>(this.APIUrlAlumnoJuegoDeCuestionarioSatisfaccion + '/' + alumnoId);
  }


  // tslint:disable-next-line:max-line-length
  public ModificaInscripcionAlumnoJuegoDeCuestionarioSatisfaccion(inscripcion: AlumnoJuegoDeCuestionarioSatisfaccion): Observable<AlumnoJuegoDeCuestionarioSatisfaccion> {
    // tslint:disable-next-line:max-line-length
    return this.http.put<AlumnoJuegoDeCuestionarioSatisfaccion>(this.APIUrlAlumnoJuegoDeCuestionarioSatisfaccion + '/' + inscripcion.id, inscripcion);
  }


  public CreaJuegoDeEncuestaRapida(juego: JuegoDeEncuestaRapida): Observable<JuegoDeEncuestaRapida> {
    return this.http.post<JuegoDeEncuestaRapida>(this.APIUrlProfesores + '/' + juego.profesorId + '/JuegosDeEncuestaRapida', juego);
  }

  public DameJuegosDeEncuestaRapida(profesorId: number): Observable<JuegoDeEncuestaRapida[]> {
    console.log(this.APIUrlProfesores + '/' + profesorId + '/JuegosDeEncuestaRapida');
    return this.http.get<JuegoDeEncuestaRapida[]>(this.APIUrlProfesores + '/' + profesorId + '/JuegosDeEncuestaRapida');
  }

  public BorraJuegoDeEncuestaRapida(juegoId: number): Observable<JuegoDeEncuestaRapida> {
    return this.http.delete<JuegoDeEncuestaRapida>(this.APIUrlJuegoDeEncuestaRapida + '/' + juegoId);
  }


  public ModificarJuegoDeEncuestaRapida(juego: JuegoDeEncuestaRapida): Observable<JuegoDeEncuestaRapida> {
    // tslint:disable-next-line:max-line-length
    return this.http.put<JuegoDeEncuestaRapida>(this.APIUrlJuegoDeEncuestaRapida, juego);
  }

  public CreaJuegoDeVotacionRapida(juego: JuegoDeVotacionRapida): Observable<JuegoDeVotacionRapida> {
    return this.http.post<JuegoDeVotacionRapida>(this.APIUrlProfesores + '/' + juego.profesorId + '/JuegosDeVotacionRapida', juego);
  }

  public DameJuegosDeVotacionRapida(profesorId: number): Observable<JuegoDeVotacionRapida[]> {
    return this.http.get<JuegoDeVotacionRapida[]>(this.APIUrlProfesores + '/' + profesorId + '/JuegosDeVotacionRapida');
  }

  public BorraJuegoDeVotacionRapida(juegoId: number): Observable<JuegoDeVotacionRapida> {
    return this.http.delete<JuegoDeVotacionRapida>(this.APIUrlJuegoDeVotacionRapida + '/' + juegoId);
  }

  public ModificarJuegoVotacionRapida(juego: JuegoDeVotacionRapida): Observable<JuegoDeVotacionRapida> {
    // tslint:disable-next-line:max-line-length
    return this.http.put<JuegoDeVotacionRapida>(this.APIUrlJuegoDeVotacionRapida, juego);
  }


  public CreaJuegoDeCuestionarioRapido(juego: JuegoDeCuestionarioRapido): Observable<JuegoDeCuestionarioRapido> {
    return this.http.post<JuegoDeCuestionarioRapido>(this.APIUrlProfesores + '/' + juego.profesorId + '/JuegosDeCuestionarioRapido', juego);
  }

  public DameJuegosDeCuestionarioRapido(profesorId: number): Observable<JuegoDeCuestionarioRapido[]> {
    return this.http.get<JuegoDeCuestionarioRapido[]>(this.APIUrlProfesores + '/' + profesorId + '/JuegosDeCuestionarioRapido');
  }

  public BorraJuegoDeCuestionarioRapido(juegoId: number): Observable<JuegoDeCuestionarioRapido> {
    return this.http.delete<JuegoDeCuestionarioRapido>(this.APIUrlJuegoDeCuestionarioRapido + '/' + juegoId);
  }

  public ModificarJuegoDeCuestionarioRapido(juego: JuegoDeCuestionarioRapido): Observable<JuegoDeCuestionarioRapido> {
    // tslint:disable-next-line:max-line-length
    return this.http.put<JuegoDeCuestionarioRapido>(this.APIUrlJuegoDeCuestionarioRapido, juego);
  }


  public CreaJuegoDeCogerTurnoRapido(juego: JuegoDeCogerTurnoRapido): Observable<JuegoDeCogerTurnoRapido> {
    return this.http.post<JuegoDeCogerTurnoRapido>(this.APIUrlProfesores + '/' + juego.profesorId + '/JuegosDeCogerTurnoRapido', juego);
  }

  public DameJuegosDeCogerTurnoRapido(profesorId: number): Observable<JuegoDeCogerTurnoRapido[]> {
    return this.http.get<JuegoDeCogerTurnoRapido[]>(this.APIUrlProfesores + '/' + profesorId + '/JuegosDeCogerTurnoRapido');
  }

  public BorraJuegoDeCogerTurnoRapido(juegoId: number): Observable<JuegoDeCogerTurnoRapido> {
    return this.http.delete<JuegoDeCogerTurnoRapido>(this.APIUrlJuegoDeCogerTurnoRapido + '/' + juegoId);
  }


  public ModificarJuegoDeCogerTurnoRapido(juego: JuegoDeCogerTurnoRapido): Observable<JuegoDeCogerTurnoRapido> {
    // tslint:disable-next-line:max-line-length
    return this.http.put<JuegoDeCogerTurnoRapido>(this.APIUrlJuegoDeCogerTurnoRapido, juego);
  }


  // JUEGO DE EVALUACION
  public DameJuegosDeEvaluacion(grupoId: number): Observable<JuegoDeEvaluacion[]> {
    return this.http.get<JuegoDeEvaluacion[]>(this.APIUrlGrupos + '/' + grupoId + '/JuegosDeEvaluacion');
  }

  public CrearJuegoDeEvaluacion(juego: JuegoDeEvaluacion): Observable<JuegoDeEvaluacion> {
    return this.http.post<JuegoDeEvaluacion>(this.APIURLJuegoDeEvaluacion, juego);
  }

  public CrearEquipoJuegoDeEvaluacion(equipo: EquipoJuegoEvaluado): Observable<EquipoJuegoEvaluado> {
    return this.http.post<EquipoJuegoEvaluado>(this.APIURLEquiposJuegoEvaluado, equipo);
  }

  public CrearAlumnoJuegoDeEvaluacion(alumno: AlumnoJuegoEvaluado): Observable<AlumnoJuegoEvaluado> {
    return this.http.post<AlumnoJuegoEvaluado>(this.APIURLAlumnoJuegoEvaluado, alumno);
  }
}
