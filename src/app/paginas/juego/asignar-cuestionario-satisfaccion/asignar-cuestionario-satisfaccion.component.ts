import { Component, OnInit, Output, EventEmitter  } from '@angular/core';
import { SesionService, PeticionesAPIService } from '../../../servicios/index';
import { CuestionarioSatisfaccion, Profesor} from 'src/app/clases/index';
import { MatTableDataSource } from '@angular/material/table';
import {SelectionModel} from '@angular/cdk/collections';

@Component({
  selector: 'app-asignar-cuestionario-satisfaccion',
  templateUrl: './asignar-cuestionario-satisfaccion.component.html',
  styleUrls: ['./asignar-cuestionario-satisfaccion.component.scss']
})
export class AsignarCuestionarioSatisfaccionComponent implements OnInit {

  // Para comunicar el cuestionario de satisfaccion elegido al componente padre
  @Output() emisorCuestionarioSatisfaccionElegido = new EventEmitter <number []>();

  profesorId: number;
  misCuestionarios: CuestionarioSatisfaccion[];
  cuestionariosPublicos: CuestionarioSatisfaccion[];
  dataSource;
  varTituloColumnaTabla: string;


  displayedColumns: string[] = ['select', 'titulo', 'descripcion'];
  selection = new SelectionModel<any>(true, []);
  // Para que al hacer click se quede la fila marcada
  selectedRowIndex = -1;
  muestroPublicos = false;
  profesor: Profesor;


  constructor(
                private sesion: SesionService,
                private peticionesAPI: PeticionesAPIService,
  ) { }

  ngOnInit() {
    this.profesorId = this.sesion.DameProfesor().id;
    this.profesor = this.sesion.DameProfesor();
    this.TraeCuestionariosSatisfaccion();
    this.varTituloColumnaTabla = "tituloColumnaTabla" + this.profesor.estacion;

  }

  // Para que al hacer click se quede la fila marcada
  highlight(row) {
    this.selectedRowIndex = row.id;
  }


  TraeCuestionariosSatisfaccion() {
    this.peticionesAPI.DameTodosMisCuestionariosSatisfaccion(this.profesorId)
    .subscribe(cuestionarios => {
      if (cuestionarios !== undefined) {
        this.misCuestionarios = cuestionarios;
        console.log ('ya tengo mis cuestionarios de satisfaccion');
        console.log (this.misCuestionarios);
        this.dataSource = new MatTableDataSource(this.misCuestionarios);
      }
    });
    this.peticionesAPI.DameCuestionariosSatisfaccionPublicos()
    .subscribe (publicos => {
      // me quedo con los públicos de los demás
      const publicosDeOtros = publicos.filter (cuestionario => cuestionario.profesorId !== Number(this.profesorId));
      // traigo los profesores para añadir a los publicos el nombre del propietario
      this.peticionesAPI.DameProfesores ()
      .subscribe (profesores => {
        publicosDeOtros.forEach (publico => {
          const propietario = profesores.filter (profesor => profesor.id === publico.profesorId)[0];
          publico.titulo = publico.titulo + '(' + propietario.nombre + ' ' + propietario.primerApellido + ')';
        });
        this.cuestionariosPublicos = publicosDeOtros;
        console.log ('ya tengo los cuestionarios de satisfaccion publicos');
        console.log (this.cuestionariosPublicos);
      });
    });
  }

  Seleccionar (row) {
    this.selection.clear();
    this.selection.select(row);

  }

  /* Para averiguar si todas las filas están seleccionadas */
  // IsAllSelected() {
  //   const numSelected = this.selection.selected.length;
  //   const numRows = this.dataSource.data.length;
  //   return numSelected === numRows;
  // }

  /* Cuando se clica en el checkbox de cabecera hay que ver si todos los
    * checkbox estan acivados, en cuyo caso se desactivan todos, o si hay alguno
    * desactivado, en cuyo caso se activan todos */

  // MasterToggle() {
  //   if (this.IsAllSelected()) {
  //     this.selection.clear(); // Desactivamos todos
  //   } else {
  //     // activamos todos
  //     this.dataSource.data.forEach(row => this.selection.select(row));
  //   }
  // }

  AcabarSeleccion() {
    console.log ('voy a cogerlo');
    const cuestionario = this.dataSource.data.filter (row => this.selection.isSelected(row))[0];
    console.log (cuestionario);
    this.emisorCuestionarioSatisfaccionElegido.emit (cuestionario);
  }
  MostrarPublicos() {
    this.muestroPublicos = true;
    this.dataSource = new MatTableDataSource(this.misCuestionarios.concat (this.cuestionariosPublicos));
  }

  QuitarPublicos() {
    this.muestroPublicos = false;
    this.dataSource = new MatTableDataSource(this.misCuestionarios);
  }

}
