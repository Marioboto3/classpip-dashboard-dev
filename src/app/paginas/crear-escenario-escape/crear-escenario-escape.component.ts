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

@Component({
  selector: 'app-crear-escenario-escape',
  templateUrl: './crear-escenario-escape.component.html',
  styleUrls: ['./crear-escenario-escape.component.scss']
})
export class CrearEscenarioEscapeComponent implements OnInit {

  myForm: FormGroup;
  myForm2: FormGroup;
  
  nombreEscenario: string;
  descripcionEscenario: string;

  varTitulo: string;
  profesor: Profesor;
  profesorId: number;
  escenarioYaCreado: Boolean = false;

  escenarioCreado: EscenarioEscapeRoom;

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
    console.log(this.sesion.DameProfesor());
    this.profesorId = this.sesion.DameProfesor().id;
    this.profesor = this.sesion.DameProfesor();
    this.varTitulo = "titulo" + this.profesor.estacion;

    this.myForm = this.formBuilder.group({
      nombreEscenario: ['', Validators.required],
      descripcionEscenario: ['', Validators.required]
     });
     this.myForm2 = this.formBuilder.group({
      });
    
      this.objeto1 = new ObjetoEscape ("botella", false, true, "objeto1");
      this.objeto2 = new ObjetoEscape ("vasoDeAgua", false, true, "objeto2");
      this.objetoPista = new ObjetoEscape ("llave", false, true, "objetoPista");
      this.objetoEnigma = new ObjetoEnigma("cajaFuerte","1+1","2",false);
      
  }

  crearEscenario(){
    let nombreEscenario: string;
    let descripcionEscenario: string;

    nombreEscenario = this.myForm.value.nombreEscenario;
    descripcionEscenario = this.myForm.value.descripcionEscenario;

    this.peticionesAPI.CreaEscenarioEscapeRoom (new EscenarioEscapeRoom(nombreEscenario, descripcionEscenario,this.objeto1,this.objeto2,this.objetoEnigma, this.objetoPista), this.profesorId)
    .subscribe((res) => {
      if (res != null) {
        console.log ('ESCENARIO CREADO: ' + res.id );
        console.log(res);
        this.escenarioYaCreado = true;
        this.escenarioCreado = res;


      } else {
        console.log('Fallo en la creación');
      }
    });
  }
}
