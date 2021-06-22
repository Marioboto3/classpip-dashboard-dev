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
import { ObjetoGlobalEscape } from 'src/app/clases/ObjetoGlobalEscape';
import { ImagenEscenario } from 'src/app/clases/ImagenEscenario';



@Component({
  selector: 'app-mis-escenarios-escape-room',
  templateUrl: './mis-escenarios-escape-room.component.html',
  styleUrls: ['./mis-escenarios-escape-room.component.scss']
})
export class MisEscenariosEscapeRoomComponent implements OnInit {

  profesorId: number;
  varTitulo: string;
  profesor: Profesor;
  escenariosProfesor: EscenarioEscapeRoom[];
  varTituloColumnaTabla: string;

  listaObjetos: ObjetoGlobalEscape[] = [];
  lista: string [] = [];
  dataSource;

  imagenes: ImagenEscenario [] = [];

  varHelp: boolean = false;
  displayedColumns: string[] = ['mapa', 'descripcion', 'ver', 'delete'];

  mensaje: string = 'Estás seguro/a de que quieres eliminar el escenario llamado: ';

  constructor(private route: ActivatedRoute,
    public dialog: MatDialog,
    public sesion: SesionService,
    public peticionesAPI: PeticionesAPIService,
    private http: Http
  )  { }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  ngOnInit() {
    this.profesorId = this.sesion.DameProfesor().id;
    this.profesor = this.sesion.DameProfesor();
    console.log(this.profesorId);
    this.varTitulo = "titulo" + this.profesor.estacion;
    this.varTituloColumnaTabla = "tituloColumnaTabla" + this.profesor.estacion;
    this.TraeEscenariosDelProfesor();
    console.log(this.escenariosProfesor);
  }

  reload(){
    this.ngOnInit();
  }
  TraeEscenariosDelProfesor() {

    this.peticionesAPI.DameEscenariosDelProfesorEscapeRoom(this.profesorId)
    .subscribe(escenario => {
      console.log("Escenarios: ", escenario);
      if (escenario[0] !== undefined) {
        console.log('Voy a dar la lista de escenarios');
        this.escenariosProfesor = escenario;
        this.dataSource = new MatTableDataSource(this.escenariosProfesor);
        console.log(this.escenariosProfesor);
        this.escenariosProfesor.forEach(esc => {
            console.log("esc: ", esc);
            this.peticionesAPI.DameImagenDelEscenario(this.profesorId, esc.imagenId).subscribe(imagen =>{
              console.log("imagen", imagen);
              this.imagenes.push(imagen)
            });
        })
      } else {
        this.escenariosProfesor = undefined;
      }
    });

  }
  GuardarEscenario(escenario: Escenario) {
    this.sesion.TomaEscenario(escenario);
  }

  BorrarEscenario(escenario: Escenario) {

    console.log ('Vamos a eliminar el escenario');
    this.peticionesAPI.BorraEscenarioEscape(escenario.id, escenario.profesorId)
    .subscribe();

    console.log ('La saco de la lista');
    this.escenariosProfesor = this.escenariosProfesor.filter(res => res.id !== escenario.id);
  }

  AbrirDialogoConfirmacionBorrarEscenario(escenario: Escenario): void {

    const dialogRef = this.dialog.open(DialogoConfirmacionComponent, {
      height: '150px',
      data: {
        mensaje: this.mensaje,
        nombre: escenario.mapa,
      }
    });

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.BorrarEscenario(escenario);
        Swal.fire('Eliminado', escenario.mapa + ' eliminado correctamente', 'success');
        this.reload();
      }
    });
  }


  verEscenario(escenario: EscenarioEscapeRoom){

    let imagenEsc: ImagenEscenario;
    this.imagenes.forEach(imagen => {
      console.log("imagen: ", imagen);
      if(imagen.id == escenario.imagenId){
        imagenEsc = imagen;
      }
    });

    Swal.fire({
      title: escenario.mapa,
      text:'La imagen se llama: ' + imagenEsc.nombre,
      imageUrl: '../../../assets/' + imagenEsc.nombreDelFichero,
      imageWidth: 400,
      imageHeight: 200,
      confirmButtonText: 'Volver',
    }).then((result) => { });
  }
  
}
