import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ResponseContentType, Http, Response } from '@angular/http';
import Swal from 'sweetalert2';


// Imports para abrir diálogo confirmar eliminar equipo
import { MatDialog, MatTableDataSource } from '@angular/material';
import { DialogoConfirmacionComponent } from '../COMPARTIDO/dialogo-confirmacion/dialogo-confirmacion.component';


// Servicios
import { SesionService, PeticionesAPIService } from '../../servicios/index';

// Clases

import { Escenario, Profesor } from 'src/app/clases';
import { EscenarioEscapeRoom } from 'src/app/clases/EscenarioEscapeRoom';
import { ObjetoEscape } from 'src/app/clases/objetoEscape';
import { ObjetoEnigma } from 'src/app/clases/ObjetoEnigma';


@Component({
  selector: 'app-mis-objetos-escape-room',
  templateUrl: './mis-objetos-escape-room.component.html',
  styleUrls: ['./mis-objetos-escape-room.component.scss']
})
export class MisObjetosEscapeRoomComponent implements OnInit {

  profesorId: number;
  varTitulo: string;
  profesor: Profesor;
  objetosEscapeProfesor: ObjetoEscape[];
  objetosEnigmaProfesor: ObjetoEnigma[];
  objetos: string [] = [];
  varTituloColumnaTabla: string;
  nombresObjetos = new Array<string>();
  

  dataSource;

  displayedColumns: string[] = ['nombre', 'ver'];

  mensaje: string = 'Estás seguro/a de que quieres eliminar el escenario llamado: ';

  constructor(private route: ActivatedRoute,
    public dialog: MatDialog,
    public sesion: SesionService,
    public peticionesAPI: PeticionesAPIService,
    private http: Http
  )  { }

  ngOnInit() {

    this.profesorId = this.sesion.DameProfesor().id;
    this.profesor = this.sesion.DameProfesor();
    console.log(this.profesorId);
    this.varTitulo = "titulo" + this.profesor.estacion;
    this.varTituloColumnaTabla = "tituloColumnaTabla" + this.profesor.estacion;
    this.TraeObjetosProfesor();

  }

  TraeObjetosProfesor(){
    
    
    this.peticionesAPI.DameObjetosEscapeDelProfesorEscapeRoom(this.profesorId)
    .subscribe(objetos => {

      objetos.forEach(elemento =>{
        this.nombresObjetos.push(elemento.nombre);
      })
 
      console.log("Objetos: ",this.nombresObjetos);

      this.peticionesAPI.DameObjetosEnigmaDelProfesorEscapeRoom(this.profesorId)
      .subscribe(objetosEnigma => {
        objetosEnigma.forEach(elemento =>{
          this.nombresObjetos.push(elemento.nombre);
        })
      });

      if (this.nombresObjetos[0] != undefined) {
        console.log('Voy a dar la lista de objetos');
        this.objetos = this.nombresObjetos;
        console.log("This.objetos que pasa: ", this.objetos);
        this.dataSource = new MatTableDataSource(this.objetos);
        console.log(this.objetos);
      } else {
        this.objetos = undefined;
      }
    });
  }

  verObjeto(nombre){
    Swal.fire({
      title: nombre,
      imageUrl: '../../../assets/'+ nombre + '.png',
      imageWidth: 400,
      imageHeight: 200,
      showCancelButton: true,
      confirmButtonText: 'Asignar',
      cancelButtonText: 'Volver'
    }).then((result) => {});
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
