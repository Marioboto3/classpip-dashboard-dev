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
import { ElementosComponent } from 'src/app/elementos/elementos.component';
import { ObjetoGlobalEscape } from 'src/app/clases/ObjetoGlobalEscape';


@Component({
  selector: 'app-mis-objetos-escape-room',
  templateUrl: './mis-objetos-escape-room.component.html',
  styleUrls: ['./mis-objetos-escape-room.component.scss']
})
export class MisObjetosEscapeRoomComponent implements OnInit {

  profesorId: number;
  varTitulo: string;
  colorIcon: string;
  profesor: Profesor;
  varTituloColumnaTabla: string;

  objetosGlobales: ObjetoGlobalEscape [] = [];
  objetosGlobalesProfesor: boolean = false;

  dataSource;


  displayedColumns: string[] = ['nombre', 'tipo','ver', 'delete'];

  mensaje: string = 'Estás seguro/a de que quieres eliminar el escenario llamado: ';

  constructor(private route: ActivatedRoute,
    public dialog: MatDialog,
    public sesion: SesionService,
    public peticionesAPI: PeticionesAPIService,
    private http: Http
  ) { }

  ngOnInit() {

    this.profesorId = this.sesion.DameProfesor().id;
    this.profesor = this.sesion.DameProfesor();
    console.log(this.profesorId);
    this.varTitulo = "titulo" + this.profesor.estacion;
    this.varTituloColumnaTabla = "tituloColumnaTabla" + this.profesor.estacion;
    this.colorIcon = this.profesor.estacion;

    this.TraeObjetosProfesor();

  }

  TraeObjetosProfesor() {

    this.peticionesAPI.DameObjetosGlobalesDelProfesorEscapeRoom(this.profesorId).subscribe(objetos => {
      objetos.forEach(elemento => {
      
          this.objetosGlobales.push(elemento);
      });
  
      if (this.objetosGlobales[0] != undefined) {
        this.objetosGlobalesProfesor = true;
        this.dataSource = new MatTableDataSource(this.objetosGlobales);
      } 
    });
    
  }

  verObjeto(objeto: ObjetoGlobalEscape) {

    Swal.fire({
      title: objeto.nombre,
      imageUrl: '../../../assets/' + objeto.imagen,
      imageWidth: 400,
      imageHeight: 200,
      confirmButtonText: 'Volver',
    }).then((result) => { });
   
  }

  applyFilter(filterValue: string, number: number) {

      this.dataSource.filter = filterValue.trim().toLowerCase();

  }

  BorrarObjetoGlobal(objetoGlobal: ObjetoGlobalEscape) {

    console.log("OBJETO en BORRAR: ", objetoGlobal);

    console.log ('Vamos a eliminar el objeto');
    this.peticionesAPI.BorrarObjetoGlobal(objetoGlobal.id, objetoGlobal.profesorId)
    .subscribe(res =>{
      console.log("res: ", res);
    });

    console.log ('La saco de la lista: ', this.objetosGlobales);
    this.objetosGlobales = this.objetosGlobales.filter(res => res.id !== objetoGlobal.id);
  }

  AbrirDialogoConfirmacionBorrarObjeto(objetoGlobal: ObjetoGlobalEscape): void {

    console.log("OBJETO: ", objetoGlobal);

    const dialogRef = this.dialog.open(DialogoConfirmacionComponent, {
      height: '150px',
      data: {
        mensaje: this.mensaje,
        nombre: objetoGlobal.nombre,
      }
    });

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.BorrarObjetoGlobal(objetoGlobal);
        Swal.fire('Eliminado', objetoGlobal.nombre + ' eliminado correctamente', 'success');
        this.objetosGlobales.slice(this.objetosGlobales.indexOf(objetoGlobal), 1);
        this.dataSource = new MatTableDataSource(this.objetosGlobales);
      }
    });
  }

 
}
