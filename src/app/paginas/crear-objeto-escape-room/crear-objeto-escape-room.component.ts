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

  tipoObjetoEnigma: boolean = false;
  tipoObjetoEscape: boolean = false;

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
      pregunta: ['', Validators.required],
      respuesta: ['', Validators.required],
      imagen: ['', Validators.required]
    });
  }

  escogerNombreObjeto() {

    this.objetoGlobalEscape = new ObjetoGlobalEscape(this.myForm.value.nombreObjeto, this.profesorId, this.myForm.value.tipoObjeto);

    if (this.objetoGlobalEscape.tipoDeObjeto == "objetoEnigma") {
      this.tipoObjetoEnigma = true;
    } else {
      this.tipoObjetoEscape = true;
    }

  }

  finalizar() {

    this.router.navigate(['/inicio']);

  }

  atras() {
    this.tipoObjetoEnigma = false;
    this.tipoObjetoEscape = false;
  }

  crearObjeto() {

    this.peticionesAPI.CreaObjetoGlobal(new ObjetoGlobalEscape(this.objetoGlobalEscape.nombre, this.profesorId, this.objetoGlobalEscape.tipoDeObjeto, 1), this.profesorId)
      .subscribe((res) => {
        if (res != null) {
          console.log(res);
          this.objetoYaCreado = true;
          this.objetoCreadoGlobal = res;

          if (this.objetoGlobalEscape.tipoDeObjeto == "objetoEnigma") {
            this.peticionesAPI.CreaObjetoEnigma(new ObjetoEnigma(this.objetoGlobalEscape.nombre, this.myForm2.value.pregunta,  this.myForm2.value.respuesta, false, this.profesorId, false, this.objetoCreadoGlobal.id), this.profesorId)
              .subscribe((res) => {
                if (res != null) {
                  console.log(res);
                  this.objetoYaCreado = true;
                  this.objetoCreadoEnigma = res;
                } else {
                  console.log('Fallo en la creación');
                }
              });
          }
          if (this.objetoGlobalEscape.tipoDeObjeto == "objetoEscape") {
            this.peticionesAPI.CreaObjetoEscape(new ObjetoEscape(this.objetoGlobalEscape.nombre, true, false, 1, this.objetoCreadoGlobal.id), 1)
              .subscribe((res) => {
                if (res != null) {
                  console.log(res);
                  this.objetoYaCreado = true;
                  this.objetoCreadoEscape = res;
                } else {
                  console.log('Fallo en la creación');
                }
              });
          }
        }
      });
  }
}
