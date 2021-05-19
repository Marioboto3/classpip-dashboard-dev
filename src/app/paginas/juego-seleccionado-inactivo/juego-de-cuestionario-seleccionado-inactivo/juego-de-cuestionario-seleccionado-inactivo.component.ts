import { Component, OnInit } from '@angular/core';
import { Juego, Alumno } from 'src/app/clases';
import { AlumnoJuegoDeCuestionario } from 'src/app/clases/AlumnoJuegoDeCuestionario';
import { MatDialog, MatTableDataSource } from '@angular/material';
import { SesionService, PeticionesAPIService, CalculosService } from 'src/app/servicios';
import { Location } from '@angular/common';
import { JuegoDeCuestionario } from 'src/app/clases/JuegoDeCuestionario';
import Swal from 'sweetalert2';
import { DialogoConfirmacionComponent } from '../../COMPARTIDO/dialogo-confirmacion/dialogo-confirmacion.component';
import { TablaAlumnoJuegoDeCuestionario } from 'src/app/clases/TablaAlumnoJuegoDeCuestionario';
// tslint:disable-next-line:max-line-length
import { InformacionJuegoDeCuestionarioDialogComponent } from '../../juego-seleccionado-activo/juego-de-cuestionario-seleccionado-activo/informacion-juego-de-cuestionario-dialog/informacion-juego-de-cuestionario-dialog.component';
// tslint:disable-next-line:max-line-length
import {InformacionRespuestasJuegoDeCuestionarioDialogComponent } from './informacion-respuestas-juego-de-cuestionario-dialog/informacion-respuestas-juego-de-cuestionario-dialog.component';
// tslint:disable-next-line:max-line-length
import {RespuestasAlumnoJuegoDeCuestionarioComponent} from './respuestas-alumno-juego-de-cuestionario/respuestas-alumno-juego-de-cuestionario.component';


@Component({
  selector: 'app-juego-de-cuestionario-seleccionado-inactivo',
  templateUrl: './juego-de-cuestionario-seleccionado-inactivo.component.html',
  styleUrls: ['./juego-de-cuestionario-seleccionado-inactivo.component.scss']
})
export class JuegoDeCuestionarioSeleccionadoInactivoComponent implements OnInit {

  // Juego de Cuestionario saleccionado
  juegoSeleccionado: Juego;

  // Recuperamos la informacion del juego
  alumnosDelJuego: Alumno[];

  // Lista de los alumnos ordenada segun su nota
  listaAlumnosOrdenadaPorNota: AlumnoJuegoDeCuestionario[];
  rankingAlumnosPorNota: TablaAlumnoJuegoDeCuestionario[];

  // tslint:disable-next-line:no-inferrable-types
  mensajeEliminar: string = 'Estas segura/o de que quieres eliminar: ';

  // Orden conlumnas de la tabla
  displayedColumnsAlumnos: string[] = ['nombreAlumno', 'primerApellido', 'segundoApellido', 'nota', ' '];

  dataSourceAlumno;

  constructor(  public dialog: MatDialog,
                public sesion: SesionService,
                public peticionesAPI: PeticionesAPIService,
                public calculos: CalculosService,
                private location: Location) { }

  ngOnInit() {
    this.juegoSeleccionado = this.sesion.DameJuego();
    this.AlumnosDelJuego();
  }

  AlumnosDelJuego() {
    this.peticionesAPI.DameAlumnosJuegoDeCuestionario(this.juegoSeleccionado.id)
    .subscribe(alumnosJuego => {
      this.alumnosDelJuego = alumnosJuego;
      this.RecuperarInscripcionesAlumnoJuego();
    });
  }

  RecuperarInscripcionesAlumnoJuego() {
    this.peticionesAPI.DameInscripcionesAlumnoJuegoDeCuestionario(this.juegoSeleccionado.id)
    .subscribe(inscripciones => {
      this.listaAlumnosOrdenadaPorNota = inscripciones;
      // tslint:disable-next-line:only-arrow-functions
      this.listaAlumnosOrdenadaPorNota = this.listaAlumnosOrdenadaPorNota.sort(function(a, b) {
        if (b.nota !== a.nota) {
          return b.nota - a.nota;
        } else {
          // en caso de empate en la nota, gana el que empleó menos tiempo
          return a.tiempoEmpleado - b.tiempoEmpleado;
        }
      });
      this.TablaClasificacionTotal();
    });
  }

  TablaClasificacionTotal() {
    this.rankingAlumnosPorNota = this.calculos.PrepararTablaRankingCuestionario(this.listaAlumnosOrdenadaPorNota,
      this.alumnosDelJuego);
    this.dataSourceAlumno = new MatTableDataSource(this.rankingAlumnosPorNota);
  }


  EliminarJuego() {
    this.calculos.EliminarJuegoDeCuestionario()
      .subscribe(() => {
        this.location.back();
      });
  }

  AbrirDialogoConfirmacionEliminar(): void {

    Swal.fire({
      title: 'Confirma que quieres eliminar el juego <b>' + this.juegoSeleccionado.NombreJuego + '</b>',
      showCancelButton: true,
      confirmButtonText: 'Confirmar',
    }).then((result) => {
      if (result.value) {
        this.EliminarJuego();
        Swal.fire('Juego eliminado correctamente', ' ', 'success');
      }
    });
  }

  AbrirDialogoInformacionJuego(): void {
    const dialogRef = this.dialog.open(InformacionJuegoDeCuestionarioDialogComponent, {
      width: '45%',
      height: '60%',
      position: {
        top: '0%'
      }
    });
  }

  AbrirDialogoAnalisisRespuestas(): void {
    const dialogRef = this.dialog.open(InformacionRespuestasJuegoDeCuestionarioDialogComponent, {
      width: '60%',
      height: '80%',
      position: {
        top: '0%'
      }
    });
  }

  MostrarRespuestasAlumno(alumno: TablaAlumnoJuegoDeCuestionario): void {
    this.sesion.TomaJuego (this.juegoSeleccionado);
    console.log ('voy a guardar alumno');
    console.log (alumno);
    this.sesion.TomaAlumnoJuegoDeCuestionario (alumno);
    const inscripcion = this.listaAlumnosOrdenadaPorNota.filter (al => al.alumnoId === alumno.id)[0];
    this.sesion.TomaInscripcionAlumnoJuegoDeCuestionario (inscripcion);
    const dialogRef = this.dialog.open(RespuestasAlumnoJuegoDeCuestionarioComponent, {
      width: '60%',
      height: '80%',
      position: {
        top: '0%'
      }
    });
  }


  applyFilter(filterValue: string) {
    this.dataSourceAlumno.filter = filterValue.trim().toLowerCase();
  }



}
