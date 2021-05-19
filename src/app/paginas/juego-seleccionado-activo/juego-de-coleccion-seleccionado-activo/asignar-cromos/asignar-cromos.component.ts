import { Component, OnInit } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import { ResponseContentType, Http, Response } from '@angular/http';

// Imports para abrir diálogo y swal
import { MatDialog, MatTabChangeEvent} from '@angular/material';
import { DialogoConfirmacionComponent } from '../../../COMPARTIDO/dialogo-confirmacion/dialogo-confirmacion.component';
import Swal from 'sweetalert2';

import { Alumno, Equipo, Juego, AlumnoJuegoDeColeccion, EquipoJuegoDeColeccion,
 Album, AlbumEquipo, Coleccion, Cromo, AlumnoJuegoDePuntos } from '../../../../clases/index';


import {SesionService, PeticionesAPIService, CalculosService, ComServerService} from '../../../../servicios/index';

import { Location } from '@angular/common';

import * as URL from '../../../../URLs/urls';

@Component({
  selector: 'app-asignar-cromos',
  templateUrl: './asignar-cromos.component.html',
  styleUrls: ['./asignar-cromos.component.scss']
})
export class AsignarCromosComponent implements OnInit {

  fechaAsignacionCromo: Date;
  fechaString: string;

  juegoSeleccionado: Juego;

  datasourceAlumno;
  datasourceEquipo;
  dataSource;

  alumnosDelJuego: Alumno[];
  alumnoElegido: Alumno;
  equiposDelJuego: Equipo[];
  equipoElegido: Equipo;

  coleccion: Coleccion;
  cromosColeccion: Cromo[];

  displayedColumnsAlumno: string[] = ['select', 'nombreAlumno', 'primerApellido', 'segundoApellido', ' '];
  selection = new SelectionModel<Alumno>(true, []);

  displayedColumnsEquipos: string[] = ['select', 'nombreEquipo', 'miembros', 'info', ' '];
  selectionEquipos = new SelectionModel<Equipo>(true, []);

  seleccionados: boolean[];
  seleccionadosEquipos: boolean[];

  cromoSeleccionadoId: number;
  cromoSeleccionado: Cromo;
  imagenDelanteCromoSeleccionado: string;
  imagenDetrasCromoSeleccionado: string;

  alumnosEquipo: Alumno[];

  inscripcionesAlumnos: AlumnoJuegoDeColeccion[];

  inscripcionesEquipos: EquipoJuegoDeColeccion[];



  // tslint:disable-next-line:no-inferrable-types
  mensaje: string = 'Confirma que quieres asignar este cromo';

  // tslint:disable-next-line:no-inferrable-types
  mensajeAleatorio: string = 'Confirma que quieres asignar este sobre de cromos aleatorios';

  // tslint:disable-next-line:no-inferrable-types
  mensajeAsignacionAleatoria: string = 'Confirma que quieres asignar aleatoriamente este sobre de cromos aleatorios';
  // tslint:disable-next-line:no-inferrable-types
  mensajeAsignacionMejoresRanking: string = 'Confirma que quieres asignar cromos a los tres mejores del ranking';
  // tslint:disable-next-line:ban-types
  isDisabled: Boolean = true;


  // Para asignar cromos random
  probabilidadCromos: number[] = [];
  indexCromo: number;
  // tslint:disable-next-line:no-inferrable-types
  numeroCromosRandom: number = 1;
  botonTablaDesactivado = true;
  juegosPuntos: Juego[] = [];
  juegoPuntosSeleccionadoId: number;

  // tslint:disable-next-line:no-inferrable-types
  cromosParaPrimero: number = 3;
  // tslint:disable-next-line:no-inferrable-types
  cromosParaSegundo: number = 2;
    // tslint:disable-next-line:no-inferrable-types
  cromosParaTercero: number = 1;

  // tslint:disable-next-line:no-inferrable-types
  botonAsignacionDesactivado: boolean = true;

  primerAlumno: Alumno;
  segundoAlumno: Alumno;
  tercerAlumno: Alumno;

  primerEquipo: Equipo;
  segundoEquipo: Equipo;
  tercerEquipo: Equipo;
  mostrarLista = true;

  constructor(
               private sesion: SesionService,
               private peticionesAPI: PeticionesAPIService,
               private calculos: CalculosService,
               private comService: ComServerService,
               public dialog: MatDialog,
               private http: Http,
               public location: Location) { }

  ngOnInit() {
    this.coleccion = this.sesion.DameColeccion();
    this.juegoSeleccionado = this.sesion.DameJuego();
    console.log ('Ya estamos ' + this.coleccion);
    this.CromosColeccion();
    if (this.juegoSeleccionado.Modo === 'Individual') {
      this.alumnosDelJuego = this.sesion.DameAlumnosDelJuego();
      this.RecuperarInscripcionesAlumnoJuego();
      this.dataSource = new MatTableDataSource(this.alumnosDelJuego);
    } else if (this.juegoSeleccionado.Modo === 'Equipos') {
      this.equiposDelJuego = this.sesion.DameEquiposDelJuego();
      this.RecuperarInscripcionesEquiposJuego();
      if (this.juegoSeleccionado.Asignacion === 'Individual') {
        this.alumnosDelJuego = this.sesion.DameAlumnosDelJuego();
        this.dataSource = new MatTableDataSource(this.alumnosDelJuego);
      } else {
        this.dataSource = new MatTableDataSource(this.equiposDelJuego);
      }
    }
    // Necesitaré los juegos de puntos de este grupo por si quiere
    // asignar cromos segun los puntos
    this.DameJuegosPuntos ();
  }


  HayQueMostrarAlumnos(): boolean {
    // tslint:disable-next-line:max-line-length
    const res = ((this.juegoSeleccionado.Modo === 'Individual') || (this.juegoSeleccionado.Asignacion === 'Individual')) && (this.alumnosDelJuego !== undefined);
    return res;
  }
  HayQueMostrarEquipos(): boolean {
    const res = (this.juegoSeleccionado.Asignacion === 'Equipo') && this.equiposDelJuego !== undefined;
    return res;
  }


  CambioTab(event: MatTabChangeEvent) {
    // Se ejecuta cuando cambio de tab
    console.log ('Cambio a tab ' + event.index);
    this.mostrarLista = true;
    this.primerAlumno = undefined;
    this.segundoAlumno = undefined;
    this.tercerAlumno = undefined;
    this.primerEquipo = undefined;
    this.segundoEquipo = undefined;
    this.tercerEquipo = undefined;
    this.alumnoElegido = undefined;
    this.equipoElegido = undefined;
    if (event.index === 2) {
      console.log ('Entro');
      console.log (this.juegosPuntos.length);
      // En el caso de que no esté habilitada la opción de asignar cromos
      // según ranking de puntos entonces no muestro la lista de jugadores
      if (this.juegosPuntos.length === 0) {
        this.mostrarLista = false;
        console.log ('No mostrare la lista');
      }

    }


  }
  /* Para averiguar si todas las filas están seleccionadas */
  IsAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /* Cuando se clica en el checkbox de cabecera hay que ver si todos los
    * checkbox estan acivados, en cuyo caso se desactivan todos, o si hay alguno
    * desactivado, en cuyo caso se activan todos */

  MasterToggle() {
    if (this.IsAllSelected()) {
      this.selection.clear(); // Desactivamos todos
    } else {
      // activamos todos
      this.dataSource.data.forEach(row => this.selection.select(row));
    }
  }

  // Me traigo los juegos de puntos, pero seleccion solo los que tienen el mismo modo
  // (individual o equipos)
  DameJuegosPuntos() {
    this.peticionesAPI.DameJuegoDePuntosGrupo (this.sesion.DameGrupo().id)
    .subscribe ( juegos => {
      this.juegosPuntos = [];
      console.log ('juegos de puntos');
      console.log (juegos);
      juegos.forEach (juego => {
        if ((juego.Modo === 'Individual') && juego.JuegoActivo) {
          console.log ('juego individual');
          if ((this.juegoSeleccionado.Modo === 'Individual') || (this.juegoSeleccionado.Asignacion === 'Individual')) {
            this.juegosPuntos.push (juego);
          }
        } else if ((juego.Modo === 'Equipos') && juego.JuegoActivo) {
          console.log ('juego equipos');
          if ((this.juegoSeleccionado.Modo === 'Equipos') && (this.juegoSeleccionado.Asignacion === 'Equipo')) {
            this.juegosPuntos.push (juego);
          }
        }
      });


      console.log ('juegos seleccionados');
      console.log (this.juegosPuntos);
      console.log ('mi juego es');
      console.log (this.juegoSeleccionado);

    });
  }

  /* Esta función decide si el boton debe estar activo (si hay al menos
  una fila seleccionada) o si debe estar desactivado (si no hay ninguna fila seleccionada) */
  ActualizarBotonTabla() {
    if (this.selection.selected.length === 0) {
      this.botonTablaDesactivado = true;
    } else {
      this.botonTablaDesactivado = false;
    }
  }



  applyFilter(filterValue: string) {

    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  applyFilterEquipo(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  CromosColeccion() {
    // Busca los cromos dela coleccion en la base de datos
    this.peticionesAPI.DameCromosColeccion(this.coleccion.id)
    .subscribe(res => {
      if (res[0] !== undefined) {
        this.cromosColeccion = res;
        this.cromoSeleccionadoId = this.cromosColeccion[0].id;
        this.cromoSeleccionado = this.cromosColeccion[0];
        this.GET_ImagenCromo();

        // tslint:disable-next-line:prefer-for-of
        for (let i = 0; i < this.cromosColeccion.length; i ++) {
          if (this.cromosColeccion[i].probabilidad === 'Muy Baja') {
            this.probabilidadCromos[i] = 3;

          } else if (this.cromosColeccion[i].probabilidad === 'Baja') {

            this.probabilidadCromos[i] = 7;

          } else if (this.cromosColeccion[i].probabilidad === 'Media') {

            this.probabilidadCromos[i] = 20;

          } else if (this.cromosColeccion[i].probabilidad === 'Alta') {

            this.probabilidadCromos[i] = 30;

          } else {

            this.probabilidadCromos[i] = 40;

          }
        }

        console.log(res);
      } else {
        console.log('No hay cromos en esta coleccion');
        this.cromosColeccion = undefined;
      }
    });
  }

  TraeCromo() {
    // Cuando el usuario selecciona el cromo a asignar llamamos a esta función
    console.log(this.cromoSeleccionadoId);
    this.cromoSeleccionado = this.cromosColeccion.filter(res => res.id === Number(this.cromoSeleccionadoId))[0];
    console.log(this.cromosColeccion.filter(res => res.id === Number(this.cromoSeleccionadoId))[0]);
    this.GET_ImagenCromo();
  }

  // Recupera las inscripciones de los alumnos en el juego y los puntos que tienen y los ordena de mayor a menor valor
  RecuperarInscripcionesAlumnoJuego() {
    this.peticionesAPI.DameInscripcionesAlumnoJuegoDeColeccion(this.juegoSeleccionado.id)
    .subscribe(inscripciones => {
      this.inscripcionesAlumnos = inscripciones;
    });
  }

      // Recupera las inscripciones de los equipos en el juego y los puntos que tienen y los ordena de mayor a menor valor
  RecuperarInscripcionesEquiposJuego() {

    this.peticionesAPI.DameInscripcionesEquipoJuegoDeColeccion(this.juegoSeleccionado.id)
    .subscribe(inscripciones => {
      this.inscripcionesEquipos = inscripciones;
    });
  }

  AsignarCromo() {

    if (this.juegoSeleccionado.Modo === 'Individual') {
      this.AsignarCromoAlumnos(this.cromoSeleccionadoId);

    } else if (this.juegoSeleccionado.Asignacion === 'Equipo') {
      this.AsignarCromoEquipos(this.cromoSeleccionadoId);
    } else {
      this.AsignarCromoEquiposDeAlumnosElegidos (this.cromoSeleccionadoId);
    }


  }


  AsignarCromoAlumnos(cromoSeleccionado) {

    this.dataSource.data.forEach
    (row => {
                    if (this.selection.isSelected(row))  {
                      let alumno: Alumno;
                      alumno = row;
                      console.log(alumno.nombre + ' seleccionado');

                      let alumnoJuegoDeColeccion: AlumnoJuegoDeColeccion;
                      alumnoJuegoDeColeccion = this.inscripcionesAlumnos.filter(res => res.alumnoId === alumno.id)[0];
                      console.log(alumnoJuegoDeColeccion);

                      this.peticionesAPI.AsignarCromoAlumno(new Album (alumnoJuegoDeColeccion.id, cromoSeleccionado))
                      .subscribe(res => {

                        console.log(res);

                      });
                      // Notificación para el alumno
                      console.log ('envio notificación al alumno')
                      this.comService.EnviarNotificacionIndividual (
                        alumnoJuegoDeColeccion.alumnoId,
                        'Tienes nuevos cromos en el juego ' + this.juegoSeleccionado.NombreJuego);
                    }
            }
    );
    Swal.fire('OK', 'Cromo asignado a los alumnos elegidos', 'success');
  }


  AsignarCromoEquipos(cromoSeleccionado) {

    this.dataSource.data.forEach
    (row => {
                if (this.selection.isSelected(row))  {

                        let equipo: Equipo;
                        equipo = row;
                        console.log(equipo.nombre + ' seleccionado');

                        let equipoJuegoDeColeccion: EquipoJuegoDeColeccion;
                        equipoJuegoDeColeccion = this.inscripcionesEquipos.filter(res => res.equipoId === equipo.id)[0];
                        console.log(equipoJuegoDeColeccion);

                        this.peticionesAPI.AsignarCromoEquipo(new AlbumEquipo (equipoJuegoDeColeccion.id, cromoSeleccionado))
                        .subscribe(res => {

                          console.log(res);
                        });
                        // Notificación para los miembros del equipo
                        console.log ('envio notificación los miembros del equipo');
                        this.comService.EnviarNotificacionEquipo (
                            equipo.id,
                            'Tienes nuevos cromos en el juego ' + this.juegoSeleccionado.NombreJuego
                        );
                }
            }
    );
    Swal.fire('OK', 'Cromo asignado a los equipos elegidos', 'success');

  }


  AsignarCromoEquiposDeAlumnosElegidos(cromoSeleccionado) {

    this.dataSource.data.forEach
    (row => {
                if (this.selection.isSelected(row))  {
                        let alumno: Alumno;
                        alumno = row;
                        // Buscamos el equipo del juego al que pertenece el alumno
                        this.peticionesAPI.DameEquiposDelAlumno (alumno.id)
                        .subscribe (equiposDelAlumno => {
                          // Busco el equipo que esta tanto en la lista de equipos del juego como en la lista de equipso del
                          // alumno
                          const equipo = equiposDelAlumno.filter(e => this.equiposDelJuego.some(a => a.id === e.id))[0];
                          let equipoJuegoDeColeccion: EquipoJuegoDeColeccion;
                          equipoJuegoDeColeccion = this.inscripcionesEquipos.filter(res => res.equipoId === equipo.id)[0];
                          console.log(equipoJuegoDeColeccion);

                          this.peticionesAPI.AsignarCromoEquipo(new AlbumEquipo (equipoJuegoDeColeccion.id, cromoSeleccionado))
                          .subscribe(res => {

                            console.log(res);
                          });
                          // Notificación para los miembros del equipo
                          console.log ('envio notificación los miembros del equipo');
                          this.comService.EnviarNotificacionEquipo (
                              equipo.id,
                              'Tienes nuevos cromos en el juego ' + this.juegoSeleccionado.NombreJuego
                          );
                        });
                }
            }
    );
    Swal.fire('OK', 'Cromo asignado a los equipos de los alumnos elegidos', 'success');

  }


  AsignarCromosAleatorios() {

    if (this.juegoSeleccionado.Modo === 'Individual') {
      this.AsignarCromosAleatoriosAlumno();

    } else if (this.juegoSeleccionado.Asignacion === 'Equipo') {
      this.AsignarCromosAleatoriosEquipo();
    } else {
      this.AsignarCromosAleatoriosEquiposDeAlumnosElegidos ();
    }
  }

  AsignarCromosAleatoriosAlumno() {
    this.dataSource.data.forEach
    (row =>  {  if (this.selection.isSelected(row))  {
                const alumno: Alumno = row;
                this.calculos.AsignarCromosAleatoriosAlumno (
                  alumno, this.inscripcionesAlumnos, this.numeroCromosRandom, this.probabilidadCromos, this.cromosColeccion
                );
                  // Notificación para el alumno
                console.log ('envio notificación al alumno');
                this.comService.EnviarNotificacionIndividual (
                      alumno.id,
                      'Tienes nuevos cromos en el juego ' + this.juegoSeleccionado.NombreJuego);
                }
    });
    Swal.fire('OK', 'Cromos aleatorios asignados a los alumnos elegidos', 'success');
  }
  AsignarCromosAleatoriosEquipo() {

    this.dataSource.data.forEach
    (row => {
              if (this.selection.isSelected(row))  {
                const equipo: Equipo = row;
                // tslint:disable-next-line:max-line-length
                this.calculos.AsignarCromosAleatoriosEquipo (equipo, this.inscripcionesEquipos, this.numeroCromosRandom, this.probabilidadCromos, this.cromosColeccion);
                console.log ('envio notificación los miembros del equipo');
                this.comService.EnviarNotificacionEquipo (
                    equipo.id,
                    'Tienes nuevos cromos en el juego ' + this.juegoSeleccionado.NombreJuego
                );
              }
    });
    Swal.fire('OK', 'Cromos aleatorios asignados a los equipos elegidos', 'success');
  }

  AsignarCromosAleatoriosEquiposDeAlumnosElegidos() {
    this.dataSource.data.forEach
    (row =>  {
            if (this.selection.isSelected(row))  {
                  let alumno: Alumno;
                  alumno = row;
                  // Buscamos el equipo del juego al que pertenece el alumno
                  this.peticionesAPI.DameEquiposDelAlumno (alumno.id)
                  .subscribe (equiposDelAlumno => {
                    // Busco el equipo que esta tanto en la lista de equipos del juego como en la lista de equipso del
                    // alumno
                    const equipo = equiposDelAlumno.filter(e => this.equiposDelJuego.some(a => a.id === e.id))[0];
                    let equipoJuegoDeColeccion: EquipoJuegoDeColeccion;
                    equipoJuegoDeColeccion = this.inscripcionesEquipos.filter(res => res.equipoId === equipo.id)[0];

                    // tslint:disable-next-line:max-line-length
                    this.calculos.AsignarCromosAleatoriosEquipo (equipo, this.inscripcionesEquipos, this.numeroCromosRandom, this.probabilidadCromos, this.cromosColeccion);
                    // Notificación para los miembros del equipo
                    console.log ('envio notificación los miembros del equipo');
                    this.comService.EnviarNotificacionEquipo (
                        equipo.id,
                        'Tienes nuevos cromos en el juego ' + this.juegoSeleccionado.NombreJuego
                    );
                  });
            }
    });
    Swal.fire('OK', 'Cromos aleatorios asignados a los equipos de los alumnos elegidos', 'success');
  }

  AsignarAleatoriamenteCromosAleatorios() {

    if (this.juegoSeleccionado.Modo === 'Individual') {
      this.AsignarCromosAleatoriosAlumnoAleatorio();

    } else if (this.juegoSeleccionado.Asignacion === 'Equipo') {
      this.AsignarCromosAleatoriosEquipoAleatorio();
    } else {
      this.AsignarCromosAleatoriosEquipoDeAlumnoAleatorio ();
    }
  }

  AsignarCromosAleatoriosAlumnoAleatorio() {
    const numeroAlumnos = this.alumnosDelJuego.length;
    const elegido = Math.floor(Math.random() * numeroAlumnos);
    this.alumnoElegido = this.alumnosDelJuego[elegido];
    this.calculos.AsignarCromosAleatoriosAlumno (
            this.alumnoElegido, this.inscripcionesAlumnos, this.numeroCromosRandom, this.probabilidadCromos, this.cromosColeccion
    );
    // Notificación para el alumno
    console.log ('envio notificación al alumno');
    this.comService.EnviarNotificacionIndividual (
            this.alumnoElegido.id,
            'Tienes nuevos cromos en el juego ' + this.juegoSeleccionado.NombreJuego);
    Swal.fire('OK', 'Cromos aleatorios asignados a: ' + this.alumnoElegido.nombre, 'success');
  }

  AsignarCromosAleatoriosEquipoAleatorio() {
    const numeroEquipos = this.equiposDelJuego.length;
    const elegido = Math.floor(Math.random() * numeroEquipos);
    this.equipoElegido = this.equiposDelJuego[elegido];
    this.calculos.AsignarCromosAleatoriosEquipo (
            this.equipoElegido, this.inscripcionesEquipos, this.numeroCromosRandom, this.probabilidadCromos, this.cromosColeccion
    );
    console.log ('envio notificación los miembros del equipo');
    this.comService.EnviarNotificacionEquipo (
        this.equipoElegido.id,
        'Tienes nuevos cromos en el juego ' + this.juegoSeleccionado.NombreJuego
    );
    Swal.fire('OK', 'Cromos aleatorios asignados al equipo: ' + this.equipoElegido.nombre, 'success');
  }

  AsignarCromosAleatoriosEquipoDeAlumnoAleatorio() {
    const numeroAlumnos = this.alumnosDelJuego.length;
    const elegido = Math.floor(Math.random() * numeroAlumnos);
    const alumno = this.alumnosDelJuego[elegido];

    // Buscamos el equipo del juego al que pertenece el alumno
    this.peticionesAPI.DameEquiposDelAlumno (alumno.id)
                  .subscribe (equiposDelAlumno => {
                    // Busco el equipo que esta tanto en la lista de equipos del juego como en la lista de equipso del
                    // alumno
                    const equipo = equiposDelAlumno.filter(e => this.equiposDelJuego.some(a => a.id === e.id))[0];
                    let equipoJuegoDeColeccion: EquipoJuegoDeColeccion;
                    equipoJuegoDeColeccion = this.inscripcionesEquipos.filter(res => res.equipoId === equipo.id)[0];
                    this.calculos.AsignarCromosAleatoriosEquipo (
                      equipo, this.inscripcionesEquipos, this.numeroCromosRandom, this.probabilidadCromos, this.cromosColeccion
                    );
                    Swal.fire('OK', 'Cromos aleatorios asignados al equipo de: ' + alumno.nombre, 'success');
                    console.log ('envio notificación los miembros del equipo');
                    this.comService.EnviarNotificacionEquipo (
                        equipo.id,
                        'Tienes nuevos cromos en el juego ' + this.juegoSeleccionado.NombreJuego
                    );
                  });
  }



  AlumnosDelEquipo(equipo: Equipo) {
    console.log(equipo);

    this.peticionesAPI.DameAlumnosEquipo(equipo.id)
    .subscribe(res => {
      if (res[0] !== undefined) {
        this.alumnosEquipo = res;
        console.log(res);
      } else {
        console.log('No hay alumnos en este equipo');
        this.alumnosEquipo = undefined;
      }
    });
  }

  AsignarCromosMejoresRanking() {
    if (this.juegoSeleccionado.Modo === 'Individual') {
      this.peticionesAPI.DameInscripcionesAlumnoJuegoDePuntos(this.juegoPuntosSeleccionadoId)
      .subscribe(inscripciones => {
        // tslint:disable-next-line:only-arrow-functions
        const ranking = inscripciones.sort(function(obj1, obj2) {
          return obj2.puntosTotalesAlumno - obj1.puntosTotalesAlumno;
        });
        // Obtengo los tres primeros alumnos del ranking (atención porque el ranking solo
        // tiene los identificadores de los alumnos y a partir de ellos tengo que conseguir los alumnos)
        this.primerAlumno = this.alumnosDelJuego.filter (a => a.id === ranking[0].alumnoId)[0];
        this.segundoAlumno = this.alumnosDelJuego.filter (a => a.id === ranking[1].alumnoId)[0];
        this.tercerAlumno = this.alumnosDelJuego.filter (a => a.id === ranking[2].alumnoId)[0];

        this.calculos.AsignarCromosAleatoriosAlumno (
          this.primerAlumno, this.inscripcionesAlumnos, this.cromosParaPrimero, this.probabilidadCromos, this.cromosColeccion
        );
        console.log ('envio notificación al alumno');
        this.comService.EnviarNotificacionIndividual (
                this.primerAlumno.id,
                'Tienes nuevos cromos en el juego ' + this.juegoSeleccionado.NombreJuego);

        this.calculos.AsignarCromosAleatoriosAlumno (
          this.segundoAlumno, this.inscripcionesAlumnos, this.cromosParaSegundo, this.probabilidadCromos, this.cromosColeccion
        );
        this.comService.EnviarNotificacionIndividual (
                this.segundoAlumno.id,
                'Tienes nuevos cromos en el juego ' + this.juegoSeleccionado.NombreJuego);
        this.calculos.AsignarCromosAleatoriosAlumno (
          this.tercerAlumno, this.inscripcionesAlumnos, this.cromosParaTercero, this.probabilidadCromos, this.cromosColeccion
        );
        this.comService.EnviarNotificacionIndividual (
          this.tercerAlumno.id,
          'Tienes nuevos cromos en el juego ' + this.juegoSeleccionado.NombreJuego);
        Swal.fire('OK', 'Cromos aleatorios asignados a los tres mejores alumnos en el juego de puntos elegido: ', 'success');

      });

    } else if (this.juegoSeleccionado.Asignacion === 'Equipo') {
      this.peticionesAPI.DameInscripcionesEquipoJuegoDePuntos(this.juegoPuntosSeleccionadoId)
      .subscribe(inscripciones => {
        // tslint:disable-next-line:only-arrow-functions
        const ranking = inscripciones.sort(function(obj1, obj2) {
          return obj2.puntosTotalesEquipo - obj1.puntosTotalesEquipo;
        });
        // Obtengo los tres primeros equipos del ranking (atención porque el ranking solo
        // tiene los identificadores de los equipos y a partir de ellos tengo que conseguir los equipos)
        this.primerEquipo = this.equiposDelJuego.filter (a => a.id === ranking[0].equipoId)[0];
        this.segundoEquipo = this.equiposDelJuego.filter (a => a.id === ranking[1].equipoId)[0];
        this.tercerEquipo = this.equiposDelJuego.filter (a => a.id === ranking[2].equipoId)[0];

        this.calculos.AsignarCromosAleatoriosEquipo (
          this.primerEquipo, this.inscripcionesEquipos, this.cromosParaPrimero, this.probabilidadCromos, this.cromosColeccion
        );
        this.comService.EnviarNotificacionEquipo (
          this.primerEquipo.id,
          'Tienes nuevos cromos en el juego ' + this.juegoSeleccionado.NombreJuego
        );
        this.calculos.AsignarCromosAleatoriosEquipo (
          this.segundoEquipo, this.inscripcionesEquipos, this.cromosParaSegundo, this.probabilidadCromos, this.cromosColeccion
        );
        this.comService.EnviarNotificacionEquipo (
          this.segundoEquipo.id,
          'Tienes nuevos cromos en el juego ' + this.juegoSeleccionado.NombreJuego
        );
        this.calculos.AsignarCromosAleatoriosEquipo (
          this.tercerEquipo, this.inscripcionesEquipos, this.cromosParaTercero, this.probabilidadCromos, this.cromosColeccion
        );
        this.comService.EnviarNotificacionEquipo (
          this.tercerEquipo.id,
          'Tienes nuevos cromos en el juego ' + this.juegoSeleccionado.NombreJuego
        );
        Swal.fire('OK', 'Cromos aleatorios asignados a los tres mejores equipos en el juego de puntos elegido: ', 'success');

      });


    } else {
    // el juego es de equipo pero con asignación individual
    this.peticionesAPI.DameInscripcionesAlumnoJuegoDePuntos(this.juegoPuntosSeleccionadoId)
    .subscribe(inscripciones => {
      // tslint:disable-next-line:only-arrow-functions
      const ranking = inscripciones.sort(function(obj1, obj2) {
        return obj2.puntosTotalesAlumno - obj1.puntosTotalesAlumno;
      });
      // Obtengo los tres primeros alumnos del ranking (atención porque el ranking solo
      // tiene los identificadores de los alumnos y a partir de ellos tengo que conseguir los alumnos)
      this.primerAlumno = this.alumnosDelJuego.filter (a => a.id === ranking[0].alumnoId)[0];
      this.segundoAlumno = this.alumnosDelJuego.filter (a => a.id === ranking[1].alumnoId)[0];
      this.tercerAlumno = this.alumnosDelJuego.filter (a => a.id === ranking[2].alumnoId)[0];

      // Buscamos el equipo del juego al que pertenece cada uno de los alumnos para asignarle los cromos
      this.peticionesAPI.DameEquiposDelAlumno (this.primerAlumno.id)
      .subscribe (equiposDelAlumno => {
        // Busco el equipo que esta tanto en la lista de equipos del juego como en la lista de equipso de alumno
        const equipoPrimerAlumno = equiposDelAlumno.filter(e => this.equiposDelJuego.some(a => a.id === e.id))[0];
        this.calculos.AsignarCromosAleatoriosEquipo (
          equipoPrimerAlumno, this.inscripcionesEquipos, this.cromosParaSegundo, this.probabilidadCromos, this.cromosColeccion
        );
        this.comService.EnviarNotificacionEquipo (
          equipoPrimerAlumno.id,
          'Tienes nuevos cromos en el juego ' + this.juegoSeleccionado.NombreJuego
        );
      });

      this.peticionesAPI.DameEquiposDelAlumno (this.segundoAlumno.id)
      .subscribe (equiposDelAlumno => {
        // Busco el equipo que esta tanto en la lista de equipos del juego como en la lista de equipso de alumno
        const equipoSegundoAlumno = equiposDelAlumno.filter(e => this.equiposDelJuego.some(a => a.id === e.id))[0];
        this.calculos.AsignarCromosAleatoriosEquipo (
          equipoSegundoAlumno, this.inscripcionesEquipos, this.cromosParaSegundo, this.probabilidadCromos, this.cromosColeccion
        );
        this.comService.EnviarNotificacionEquipo (
          equipoSegundoAlumno.id,
          'Tienes nuevos cromos en el juego ' + this.juegoSeleccionado.NombreJuego
        );
      });

      this.peticionesAPI.DameEquiposDelAlumno (this.tercerAlumno.id)
      .subscribe (equiposDelAlumno => {
        // Busco el equipo que esta tanto en la lista de equipos del juego como en la lista de equipso de alumno
        const equipoTercerAlumno = equiposDelAlumno.filter(e => this.equiposDelJuego.some(a => a.id === e.id))[0];
        this.calculos.AsignarCromosAleatoriosEquipo (
          equipoTercerAlumno, this.inscripcionesEquipos, this.cromosParaSegundo, this.probabilidadCromos, this.cromosColeccion
        );
        this.comService.EnviarNotificacionEquipo (
          equipoTercerAlumno.id,
          'Tienes nuevos cromos en el juego ' + this.juegoSeleccionado.NombreJuego
        );
      });
      Swal.fire('OK', 'Cromos aleatorios asignados a los  equipos de los tres mejores alumnos en el juego de puntos elegido: ', 'success');
    });

    }

  }

  AbrirDialogoConfirmacionAsignarCromo(): void {

    let cromo: Cromo;
    cromo = this.cromosColeccion.filter(res => res.id === Number(this.cromoSeleccionadoId))[0];
    const dialogRef = this.dialog.open(DialogoConfirmacionComponent, {
      height: '150px',

      data: {
        mensaje: this.mensaje,
        nombre: cromo.nombre
      }
    });

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.AsignarCromo();
      }
    });
  }

  AbrirDialogoConfirmacionAsignarCromosAleatorios(): void {

    const dialogRef = this.dialog.open(DialogoConfirmacionComponent, {
      height: '150px',
      data: {
        mensaje: this.mensajeAleatorio,
        nombre: ''
      }
    });

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.AsignarCromosAleatorios();
      }
    });
  }

  AbrirDialogoConfirmacionAsignarCromosAlumnoAleatorio(): void {

    const dialogRef = this.dialog.open(DialogoConfirmacionComponent, {
      height: '150px',
      data: {
        mensaje: this.mensajeAsignacionAleatoria,
        nombre: ''
      }
    });

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.AsignarAleatoriamenteCromosAleatorios();
      }
    });
  }

  AbrirDialogoConfirmacionAsignarCromosMejoresRanking() {
    const dialogRef = this.dialog.open(DialogoConfirmacionComponent, {
      height: '150px',
      data: {
        mensaje: this.mensajeAsignacionMejoresRanking,
        nombre: ''
      }
    });

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.AsignarCromosMejoresRanking();
      }
    });

  }

    // Busca la imagen que tiene el nombre del cromo.Imagen y lo carga en imagenCromo
    GET_ImagenCromo() {

      if (this.cromoSeleccionado.imagenDelante !== undefined ) {
        this.imagenDelanteCromoSeleccionado = URL.ImagenesCromo + this.cromoSeleccionado.imagenDelante;

      }

      if (this.cromoSeleccionado.imagenDetras !== undefined ) {
        this.imagenDetrasCromoSeleccionado = URL.ImagenesCromo + this.cromoSeleccionado.imagenDetras;

      }
  }
  goBack() {
    this.location.back();
  }

}
