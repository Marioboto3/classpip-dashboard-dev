import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatTabGroup } from '@angular/material';
import { Router } from '@angular/router';
import { Profesor } from 'src/app/clases';
import { PeticionesAPIService, SesionService } from 'src/app/servicios';
import { Location } from '@angular/common';
import { EscenarioEscapeRoom } from 'src/app/clases/EscenarioEscapeRoom';
import { ObjetoEscape } from 'src/app/clases/objetoEscape';
import { ObjetoEnigma } from 'src/app/clases/ObjetoEnigma';
import { stringify } from '@angular/core/src/util';
import { ObjetoGlobalEscape } from 'src/app/clases/ObjetoGlobalEscape';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-crear-objeto-escape-room',
  templateUrl: './crear-objeto-escape-room.component.html',
  styleUrls: ['./crear-objeto-escape-room.component.scss']
})
export class CrearObjetoEscapeRoomComponent implements OnInit {

  myForm: FormGroup;
  myForm2: FormGroup;

  nombreObjeto: string;
  tipoObjeto: string;
  imagen: FormData;
  imagenName: string;

  objetoGlobalEscape: ObjetoGlobalEscape;

  varPanel: string;
  varTitulo: string;
  profesor: Profesor;
  profesorId: number;

  objetoYaCreado: Boolean = false;

  objetoCreadoEnigma: ObjetoEnigma;
  objetoCreadoEscape: ObjetoEscape;
  objetoCreadoGlobal: ObjetoGlobalEscape;


  objeto1: ObjetoEscape;
  objeto2: ObjetoEscape;
  objetoEnigma: ObjetoEnigma;
  objetoPista: ObjetoEscape;


  @ViewChild('stepper') stepper;
  @ViewChild('tabs') tabGroup: MatTabGroup;

  constructor(
    private router: Router,
    public dialog: MatDialog,
    public sesion: SesionService,
    public peticionesAPI: PeticionesAPIService,
    public location: Location,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.profesorId = this.sesion.DameProfesor().id;
    this.profesor = this.sesion.DameProfesor();
    this.varTitulo = "titulo" + this.profesor.estacion;
    this.varPanel = "panel" + this.profesor.estacion;


    this.myForm = this.formBuilder.group({
      nombreObjeto: ['', Validators.required],
      tipoObjeto: ['', Validators.required]
    });
    this.myForm2 = this.formBuilder.group({
      imagen: ['', Validators.required]
    });
  }

  escogerNombreObjeto() {
    this.objetoGlobalEscape = new ObjetoGlobalEscape(this.myForm.value.nombreObjeto, this.profesorId, this.myForm.value.tipoObjeto);
  }

  finalizar() {
    this.router.navigate(['/inicio/'+ this.profesorId + '/misObjetosEscapeRoom']);  }

  atras() {
  }

  crearObjeto() {
    console.log(this.myForm.value.nombreObjeto, this.myForm.value.tipoObjeto, this.imagenName);
    if (this.myForm.value.nombreObjeto != undefined && this.myForm.value.tipoObjeto != undefined && this.imagenName != undefined) {
      this.peticionesAPI.CreaObjetoGlobal(new ObjetoGlobalEscape(this.objetoGlobalEscape.nombre, this.profesorId, this.objetoGlobalEscape.tipo, this.imagenName), this.profesorId)
        .subscribe((res) => {
          if (res != null) {
            this.objetoCreadoGlobal = res; 
            this.peticionesAPI.SubirImagenObjetoEscape(this.imagen).subscribe(() => {
            this.objetoYaCreado = true;
            Swal.fire("Objeto creado correctamente.", "", "success");
            }, (error) => {
              Swal.fire('Error', 'Error al subir imagen', 'error');
            })         
          }
        });
    } else {
      Swal.fire("¡Tienes que rellenar todos los campos de información para poder crear el objeto!", "", "info");
    }
  }

  getImagenObjeto($event){
    let file = $event.target.files[0];
    console.log('Fichero seleccionado: ', file);

    this.peticionesAPI.DameImagenObjetoEscape(file.name).subscribe(() => {
      Swal.fire('Error', 'El fichero ' + file.name + ' ya existe. Cambia el nombre al archivo y vuelve a intentarlo');
    }, (error) => {
      console.log('Se puede subir ', file.name);
      this.imagen = new FormData();
      this.imagen.append(file.name, file);
      this.imagenName = file.name;
    });
  }
}
