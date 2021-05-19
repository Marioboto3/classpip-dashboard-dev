import { Component, OnInit } from '@angular/core';
import { ResponseContentType, Http, Response } from '@angular/http';

// Clases
import { Cromo, Coleccion, AlbumDelAlumno, Alumno, ParaAlbum } from '../../../../../clases/index';


import { Location } from '@angular/common';

// Servicios
import { SesionService, PeticionesAPIService } from '../../../../../servicios/index';


import * as URL from '../../../../../URLs/urls';

@Component({
  selector: 'app-album-del-alumno',
  templateUrl: './album-del-alumno.component.html',
  styleUrls: ['./album-del-alumno.component.scss']
})
export class AlbumDelAlumnoComponent implements OnInit {

  coleccion: Coleccion;
  cromosColeccion: Cromo[];

  imagenCromoDelante: string[] = [];
  imagenCromoDetras: string[] = [];

  cromo: Cromo;

  cromosAlumno: Cromo[];

  AlbumDelAlumno: ParaAlbum[] = [];
  alumno: Alumno;
  voltear = false;

  // Numero de columnas para mostrar el album del alumno
  ncol = 3;

  constructor(
                private sesion: SesionService,
                private peticionesAPI: PeticionesAPIService,
                private location: Location,
                private http: Http) { }

  ngOnInit() {
    this.coleccion = this.sesion.DameColeccion();
    this.cromosAlumno = this.sesion.DameCromos();
    this.alumno = this.sesion.DameAlumno();
    this.CromosDeLaColeccion(this.coleccion);
  }

  // Le pasamos la coleccion y buscamos la imagen que tiene y sus cromos
  CromosDeLaColeccion(coleccion: Coleccion) {

    // Una vez tenemos el logo del equipo seleccionado, buscamos sus alumnos
    console.log('voy a mostrar los cromos de la coleccion ' + coleccion.id);

    // Busca los cromos dela coleccion en la base de datos
    this.peticionesAPI.DameCromosColeccion(coleccion.id)
    .subscribe(res => {
      if (res[0] !== undefined) {
        this.cromosColeccion = res;
        this.cromosColeccion.sort((a, b) => a.nombre.localeCompare(b.nombre));
        this.GET_ImagenesCromos();
        this.PreparaAlbum();
        console.log(res);
      } else {
        console.log('No hay cromos en esta coleccion');
        // Mensaje usuario
        this.cromosColeccion = undefined;
      }
    });
  }

  // Busca la imagen que tiene el nombre del cromo.Imagen y lo carga en imagenCromo
  GET_ImagenesCromos() {

    console.log ('Vamos a por las imagenes');
    console.log (this.cromosColeccion);
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.cromosColeccion.length; i++) {

      let cromo: Cromo;
      cromo = this.cromosColeccion[i];


      if (cromo.imagenDelante !== undefined ) {
        this.imagenCromoDelante[i] = URL.ImagenesCromo + cromo.imagenDelante;
        // Busca en la base de datos la imágen con el nombre registrado en equipo.FotoEquipo y la recupera
        // this.peticionesAPI.DameImagenCromo (cromo.ImagenDelante)
        // .subscribe(response => {
        //   console.log ('Tengo imagen');
        //   const blob = new Blob([response.blob()], { type: 'image/jpg'});

        //   const reader = new FileReader();
        //   reader.addEventListener('load', () => {
        //     console.log ('imagen leida');
        //     this.imagenCromoDelante[i] = reader.result.toString();
        //   }, false);

        //   if (blob) {
        //     reader.readAsDataURL(blob);
        //   }
        // });
      }

      if (cromo.imagenDetras !== undefined ) {
        this.imagenCromoDetras[i] = URL.ImagenesCromo + cromo.imagenDetras;
        console.log ('vamos a por las imagenes de detras');
        // Busca en la base de datos la imágen con el nombre registrado en equipo.FotoEquipo y la recupera
        // this.peticionesAPI.DameImagenCromo (cromo.ImagenDetras)
        // .subscribe(response => {
        //   const blob = new Blob([response.blob()], { type: 'image/jpg'});

        //   const reader = new FileReader();
        //   reader.addEventListener('load', () => {
        //     this.imagenCromoDetras[i] = reader.result.toString();
        //   }, false);

        //   if (blob) {
        //     reader.readAsDataURL(blob);
        //   }
        // });
      }
    }
  }

  PreparaAlbum() {

    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.cromosColeccion.length; i++) {

      this.cromo = this.cromosAlumno.filter(res => res.id === this.cromosColeccion[i].id)[0];


      if (this.cromo !== undefined) {
        console.log('Tengo ' + this.cromo.nombre);
        this.AlbumDelAlumno[i] = new ParaAlbum(this.cromosColeccion[i].nombre,
          // tslint:disable-next-line:max-line-length
          this.cromosColeccion[i].probabilidad, this.cromosColeccion[i].nivel, true, this.cromosColeccion[i].imagenDelante, this.cromosColeccion[i].imagenDetras);

      } else {
        console.log('No tengo ' + this.cromosColeccion[i].nombre);
        this.AlbumDelAlumno[i] = new ParaAlbum(this.cromosColeccion[i].nombre,
          // tslint:disable-next-line:max-line-length
          this.cromosColeccion[i].probabilidad, this.cromosColeccion[i].nivel, false, this.cromosColeccion[i].imagenDelante, this.cromosColeccion[i].imagenDetras);
      }
    }
  }

  Voltear() {
    this.voltear = !this.voltear;
  }
  goBack() {
    this.location.back();
  }

}
