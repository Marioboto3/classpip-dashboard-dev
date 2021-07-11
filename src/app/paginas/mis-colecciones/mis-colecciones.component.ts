import { saveAs } from 'file-saver';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ResponseContentType, Http, Response } from '@angular/http';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import * as JSZip from 'jszip';


// Imports para abrir diálogo confirmar eliminar equipo
import { MatDialog, MatTabGroup } from '@angular/material';
import { DialogoConfirmacionComponent } from '../COMPARTIDO/dialogo-confirmacion/dialogo-confirmacion.component';




// Servicios
import { SesionService, PeticionesAPIService } from '../../servicios/index';

// Clases
import { Coleccion, Cromo, Profesor } from '../../clases/index';

import * as URL from '../../URLs/urls';
import { MatTableDataSource } from '@angular/material';
import { Subscriber } from 'rxjs';

@Component({
  selector: 'app-mis-colecciones',
  templateUrl: './mis-colecciones.component.html',
  styleUrls: ['./mis-colecciones.component.scss']
})
export class MisColeccionesComponent implements OnInit {

  profesorId: number;
  varTitulo: string;
  profesor: Profesor;
  varTituloColumnaTabla: string;
  coleccionesProfesor: Coleccion[] = [];
  coleccionesPublicas: Coleccion[];
  cromosColeccion: Cromo[];
  imagenColeccion: string;

  numeroDeCromos: number;

  file: File;
  imagenColeccionFile: File;
  dataSource;
  dataSourcePublicas;
  propietarios: string[];

  // PARA DIÁLOGO DE CONFIRMACIÓN
  // tslint:disable-next-line:no-inferrable-types
  mensaje: string = 'Estás seguro/a de que quieres eliminar el equipo llamado: ';
  displayedColumns: string[] = ['nombre', 'iconos'];
  //displayedColumns: string[] = ['nombre', 'edit', 'delete', 'copy', 'publica'];
  displayedColumnsPublica: string[] = ['nombre', 'copy'];

  constructor(
    private router: Router,
    public dialog: MatDialog,
    public sesion: SesionService,
    public peticionesAPI: PeticionesAPIService,
    private http: Http
  ) { }

  ngOnInit() {

    // REALMENTE LA APP FUNCIONARÁ COGIENDO AL PROFESOR DEL SERVICIO, NO OBSTANTE AHORA LO RECOGEMOS DE LA URL
    // this.profesorId = this.profesorService.RecibirProfesorIdDelServicio();
    this.profesorId = this.sesion.DameProfesor().id;
    this.profesor = this.sesion.DameProfesor();
    console.log(this.profesorId);
    this.varTitulo = "titulo" + this.profesor.estacion;
    this.varTituloColumnaTabla = "tituloColumnaTabla" + this.profesor.estacion;
    this.TraeColeccionesDelProfesor();
    this.DameTodasLasColeccionesPublicas();



  }

  // Obtenemos todas las colecciones del profesor
  TraeColeccionesDelProfesor() {

    this.peticionesAPI.DameColeccionesDelProfesor(this.profesorId)
    .subscribe(coleccion => {
      if (coleccion[0] !== undefined) {
        console.log('Voy a dar la lista');
        this.coleccionesProfesor = coleccion;
        console.log(this.coleccionesProfesor);
        this.dataSource = new MatTableDataSource(this.coleccionesProfesor);
        // this.profesorService.EnviarProfesorIdAlServicio(this.profesorId);
      } else {
        this.coleccionesProfesor = undefined;
      }

    });
  }


  DameTodasLasColeccionesPublicas() {
    // traigo todos los publicos excepto los del profesor
    this.peticionesAPI.DameColeccionesPublicas()
    .subscribe ( res => {
      console.log ('coleccioens publicas');
      console.log (res);

      if (res[0] !== undefined) {
        this.coleccionesPublicas = res.filter (coleccion => coleccion.profesorId !== this.profesorId);
        if (this.coleccionesPublicas.length === 0) {
          this.coleccionesPublicas = undefined;

        } else {
          this.dataSourcePublicas = new MatTableDataSource(this.coleccionesPublicas);
          this.propietarios = [];
          // Traigo profesores para preparar los nombres de los propietarios
          this.peticionesAPI.DameProfesores()
          .subscribe ( profesores => {
            this.coleccionesPublicas.forEach (coleccion => {
              const propietario = profesores.filter (p => p.id === coleccion.profesorId)[0];
              this.propietarios.push (propietario.nombre + ' ' + propietario.primerApellido);
            });
          });
        }
      }
    });
  }



 EditarColeccion(coleccion: Coleccion) {

  // Busca los cromos dela coleccion en la base de datos
  this.peticionesAPI.DameCromosColeccion(coleccion.id)
  .subscribe(res => {
      this.cromosColeccion = res;
      this.sesion.TomaColeccion(coleccion);
      console.log ('voy a entregar los cromos');
      console.log (this.cromosColeccion);
      this.sesion.TomaCromos (this.cromosColeccion);
      this.router.navigate(['/inicio/' + this.profesorId + '/misColecciones/editarColeccion']);

  });
  }



 Descargar(coleccion) {

  // this.sesion.TomaColeccion(coleccion);
  // this.router.navigate(['/inicio/' + this.profesorId + '/misColecciones/guardarColeccion']);
  console.log('Colección a descargar: ', coleccion);
  coleccion.cromos = [];
  //Prepara el fichero ZIP a descargar
  let zip = new JSZip();
  let folder = zip.folder('imagenes');

  //Obtiene los cromos de la coleccion
  this.peticionesAPI.DameCromosColeccion(coleccion.id).subscribe(cromos => {
    //Itera los cromos para obtener sus datos
    cromos.forEach(cromo => {
      const c = {
        nombre: cromo.nombre,
        imagenDelante: cromo.imagenDelante,
        imagenDetras: cromo.imagenDetras,
        nivel: cromo.nivel,
        probabilidad: cromo.probabilidad,
      };
      //Guarda los cromos en la coleccion
      coleccion.cromos.push(c);
    });

    //Crea el fichero JSON de la coleccion y lo añade al ZIP
    const theJSON = JSON.stringify(coleccion);
    zip.file(coleccion.nombre + ".json", theJSON);

    //Descarga la imagen de la coleccion y la añade al ZIP
    this.peticionesAPI.DameImagenColeccion(coleccion.imagenColeccion).subscribe((data: any) => {
      folder.file(`${coleccion.imagenColeccion}`, data);
    });

    console.log(coleccion.cromos);
    //Obtiene los nombres de las imagenes de los cromos de la colección
    let imgNames: string[] = [];
    coleccion.cromos.forEach(cromo => {
      imgNames.push(cromo.imagenDelante);
      imgNames.push(cromo.imagenDetras);
    });

    let count: number = 0;

    //Recorre los nombres para descargar la imagen
    imgNames.forEach((name: string) => {
      this.peticionesAPI.DameImagenCromo(name).subscribe((data: any) => {
        //Añade la imagen a la carpeta
        folder.file(`${name}`, data);

        count++;

        //Crea el ZIP al haber descargado todas las fotos
        if (count == imgNames.length) {
          zip.generateAsync({ type: "blob" }).then(function (blob) {
            saveAs(blob, "Coleccion_" + coleccion.nombre + ".zip");
          }, function (err) {
            console.log(err);
            Swal.fire('Error', 'Error al descargar:( Inténtalo de nuevo más tarde', 'error')
          });
        }
      });
    })
  });
}


Mostrar(coleccion: Coleccion) {

  this.sesion.TomaColeccion(coleccion);
  this.router.navigate(['/inicio/' + this.profesorId + '/misColecciones/mostrarColeccion']);

}



   // Utilizamos esta función para eliminar una colección de la base de datos y actualiza la lista de colecciones
   BorrarColeccion(coleccion: Coleccion) {


    console.log ('Vamos a eliminar la colección');


    this.peticionesAPI.BorrarImagenColeccion(coleccion.imagenColeccion).subscribe();

    this.peticionesAPI.DameCromosColeccion(coleccion.id)
    .subscribe(res => {
      this.cromosColeccion = res;

      // Ya puedo borrar la colección
      this.peticionesAPI.BorraColeccion(coleccion.id, coleccion.profesorId)
      .subscribe();


      if (this.cromosColeccion !==  undefined) {
        for (let i = 0; i < (this.cromosColeccion.length); i++) {
          this.peticionesAPI.BorrarCromo (this.cromosColeccion[i].id).subscribe();
          this.peticionesAPI.BorrarImagenCromo(this.cromosColeccion[i].imagenDelante).subscribe();
          if (this.cromosColeccion[i].imagenDetras !== undefined) {
            this.peticionesAPI.BorrarImagenCromo(this.cromosColeccion[i].imagenDetras).subscribe();
          }
        }
      }
    });
    console.log ('La saco de la lista');
    this.coleccionesProfesor = this.coleccionesProfesor.filter(res => res.id !== coleccion.id);
    this.dataSource = new MatTableDataSource(this.coleccionesProfesor);
  }




  // Si queremos borrar un equipo, antes nos saldrá un aviso para confirmar la acción como medida de seguridad. Esto se
  // hará mediante un diálogo al cual pasaremos el mensaje y el nombre del equipo
  AbrirDialogoConfirmacionBorrarColeccion(coleccion: Coleccion): void {

    const dialogRef = this.dialog.open(DialogoConfirmacionComponent, {
      height: '150px',
      data: {
        mensaje: this.mensaje,
        nombre: coleccion.nombre,
      }
    });

    // Antes de cerrar recogeremos el resultado del diálogo: Borrar (true) o cancelar (false). Si confirmamos, borraremos
    // el punto (función BorrarPunto) y mostraremos un swal con el mensaje de que se ha eliminado correctamente.
    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.BorrarColeccion(coleccion);
        Swal.fire('Eliminado', coleccion.nombre + ' eliminado correctamente', 'success');
      }
    });
  }

  HazPublica(coleccion: Coleccion) {
    coleccion.publica = true;
    this.peticionesAPI.ModificaColeccion  (coleccion, this.profesorId, coleccion.id).subscribe();
  }


  HazPrivada(coleccion: Coleccion) {
    coleccion.publica = false;
    this.peticionesAPI.ModificaColeccion  (coleccion, this.profesorId, coleccion.id).subscribe();
  }
  TraeCromosEImagenesColeccion(coleccion: Coleccion) {
    this.peticionesAPI.DameImagenColeccion (coleccion.imagenColeccion)
    .subscribe (imagen => this.imagenColeccionFile = imagen);
    this.peticionesAPI.DameCromosColeccion (coleccion.id)
    .subscribe ( cromos => {
      this.cromosColeccion = cromos;
      // Ahora traigo las imagenes de los cromos
    });
  }

}
