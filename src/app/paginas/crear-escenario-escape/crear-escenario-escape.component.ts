import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatTabGroup, MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
import { Profesor } from 'src/app/clases';
import { PeticionesAPIService, SesionService } from 'src/app/servicios';
import { Location } from '@angular/common';
import { EscenarioEscapeRoom } from 'src/app/clases/EscenarioEscapeRoom';
import { ObjetoEscape } from 'src/app/clases/objetoEscape';
import { ObjetoEnigma } from 'src/app/clases/ObjetoEnigma';
import { ObjetoGlobalEscape } from 'src/app/clases/ObjetoGlobalEscape';
import { ImagenEscenario } from 'src/app/clases/ImagenEscenario';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { element } from 'protractor';
import { JuegoEscenarioEscape } from 'src/app/clases/JuegoEscenarioEscape';

@Component({
  selector: 'app-crear-escenario-escape',
  templateUrl: './crear-escenario-escape.component.html',
  styleUrls: ['./crear-escenario-escape.component.scss']
})
export class CrearEscenarioEscapeComponent implements OnInit {

  myForm: FormGroup;

  nombreEscenario: string;
  descripcionEscenario: string;

  listaImagenes: ImagenEscenario [] = [];

  dataSource;

  varTitulo: string;
  profesor: Profesor;
  profesorId: number;
  escenarioYaCreado: Boolean = false;
  objetosProfesor: boolean = false;

  imagenes: boolean = false;

  imagenEscogida: ImagenEscenario;

  displayedColumns: string[] = ['nombre', 'escoger'];

  escenarioCreado: EscenarioEscapeRoom;

  @ViewChild('stepper') stepper;
  @ViewChild('tabs') tabGroup: MatTabGroup;

  constructor(
    private router: Router,
    public dialog: MatDialog,
    public sesion: SesionService,
    public peticionesAPI: PeticionesAPIService,
    public location: Location,
    private formBuilder: FormBuilder,
    private modal: NgbModal) { }

  ngOnInit() {
    this.profesorId = this.sesion.DameProfesor().id;
    this.profesor = this.sesion.DameProfesor();
    this.varTitulo = "titulo" + this.profesor.estacion;

    this.myForm = this.formBuilder.group({
      nombreEscenario: ['', Validators.required],
      descripcionEscenario: ['', Validators.required]
    });
  }

  escogerImagenBase(imagen) {
    console.log("Imagen");
    this.imagenEscogida = imagen;
  }
  verImagenes(contenido) {
    this.modal.open(contenido, { centered: true, size: "lg" });

   this.peticionesAPI.DameImagenesEscenarioDelProfesor(this.profesorId).subscribe(imagenesEscenario => {
     console.log("Imagenes del profesor: ", imagenesEscenario);
     this.listaImagenes = imagenesEscenario;
     if(this.listaImagenes[0] != undefined){
      this.imagenes = true;
      this.dataSource = new MatTableDataSource(this.listaImagenes);
     }
   });
  }
  crearEscenario() {
    let nombreEscenario: string;
    let descripcionEscenario: string;

    nombreEscenario = this.myForm.value.nombreEscenario;
    descripcionEscenario = this.myForm.value.descripcionEscenario;

    if(nombreEscenario != undefined && descripcionEscenario != undefined && this.imagenEscogida != undefined){
    this.peticionesAPI.CreaEscenarioEscapeRoom(new EscenarioEscapeRoom(nombreEscenario, descripcionEscenario, this.profesorId, this.imagenEscogida.id), this.profesorId)
      .subscribe((res) => {
        if (res != null) {
          this.escenarioYaCreado = true;
          this.escenarioCreado = res;
          Swal.fire("¡Escenario creado correctamente!", "", "success").then(res=>{
            this.router.navigate(['/inicio/'+ this.profesorId + '/misEscenariosEscapeRoom']);
          });
        } else {
          console.log('Fallo en la creación');
        }
      });
    }else{
      Swal.fire("¡Tienes que rellenar todos los campos y escoger una fotografía!", "", "info");
    }
  }
  finalizar() {

    this.router.navigate(['/inicio']);

  }
  atras() {
  }
  /* @ViewChild('posiciones', { static: true }) posiciones: ModalContainerComponent; */
  closeModal() {
    this.modal.dismissAll();

  }

}
