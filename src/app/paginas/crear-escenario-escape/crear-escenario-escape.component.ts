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

  dataSource;

  pos: number[] = [1, 2, 3, 4, 5];
  posicionNoEscogida: boolean = true;

  objetoEscogido: ObjetoGlobalEscape;

  objetosGlobalesProfesor: ObjetoGlobalEscape[] = [];
  objetosGlobalesEscogidos: ObjetoGlobalEscape[] = [];
  varTitulo: string;
  profesor: Profesor;
  profesorId: number;
  escenarioYaCreado: Boolean = false;
  objetosProfesor: boolean = false;
  imagenesProfesor: ImagenEscenario[];
  imagenes: boolean = false;
  imagenesTest: ImagenEscenario[];

  countEscape: number = 3;
  countEnigma: number = 2;

  imagen1: ImagenEscenario;
  imagen2: ImagenEscenario;
  imagenEscogida: ImagenEscenario;

  displayedColumns: string[] = ['nombre', 'escoger'];
  displayedColumnsObjetos: string[] = ['nombre', 'tipoDeObjeto', 'posicion', 'añadir'];
  displayedColumnsPosiciones: string[] = ['posicion', 'asignar'];


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

    console.log("pos: ", this.pos);

    this.myForm = this.formBuilder.group({
      nombreEscenario: ['', Validators.required],
      descripcionEscenario: ['', Validators.required]
    });
    this.myForm2 = this.formBuilder.group({
      posicion: ['', Validators.required]
    });

  }

  escogerImagenBase(imagen) {
    console.log("Imagen");
    this.imagenEscogida = imagen;
  }
  escogerObjetoEscapeRoom(objeto) {
    if (objeto.tipoDeObjeto == "objetoEscape") {
      if (this.countEscape == 0) {
        Swal.fire('No puedes añadir más objetos escape', '', 'info');
      } else {
        this.objetosGlobalesEscogidos.push(objeto);
        this.countEscape = this.countEscape - 1;
      }
    }
    else {
      if (this.countEnigma == 0) {
        Swal.fire('No puedes añadir más objetos enigma', '', 'info');
      } else {
        this.objetosGlobalesEscogidos.push(objeto);
        this.countEnigma = this.countEnigma - 1;
      }
    }
  }
  escogerPosicion(number) {
    let count = 0;

    console.log("objetoEscogido: ", this.objetoEscogido);
    if (this.objetosGlobalesEscogidos.length != 0) {
      this.objetosGlobalesEscogidos.forEach(elemento => {
        if (elemento.nombre == this.objetoEscogido.nombre) {
          if (this.objetoEscogido.tipoDeObjeto == "objetoEscape") {
              if (number <= 3) {
                elemento.posicion = number;
                this.pos.forEach((value, index) => {
                  if (value == number) {
                    this.pos.splice(index, 1);
                    elemento.posicion = number;
                    count = 1;
                  }
                });
              }else Swal.fire('Para un objeto escape solo puedes asignar del 1 al 3', '', 'info');
          }
          else {
              if (number >= 3) {
                elemento.posicion = number;
                this.pos.forEach((value, index) => {
                  if (value == number) {
                    this.pos.splice(index, 1);
                    elemento.posicion = number;
                    count = 1;
                  }
                });
              }else Swal.fire('Para un objeto escape solo puedes asignar del 4 al 5', '', 'info');
          }
        }
      });
    } else {
      Swal.fire('Tienes que clicar primero el objeto', '', 'info')
    }
    console.log("Objetos globales post posicion: ", this.objetosGlobalesEscogidos);
  }
  verImagenes(contenido) {
    this.modal.open(contenido, { centered: true, size: "lg" });

    console.log('Voy a dar la lista de imagenes');

    this.imagen1 = new ImagenEscenario("habitacion");
    this.imagen2 = new ImagenEscenario("cocina");

    var img: ImagenEscenario[] = [this.imagen1, this.imagen2];

    this.imagenesProfesor = img;
    this.imagenes = true;
    this.dataSource = new MatTableDataSource(this.imagenesProfesor);

  }
  verObjetos(contenido) {
    console.log("contador escape:", this.countEscape);
    this.modal.open(contenido, { centered: true, size: "lg" });
    this.peticionesAPI.DameObjetosDelProfesorEscapeRoom(this.profesorId)
      .subscribe(objetos => {
        if (objetos[0] !== undefined) {
          console.log('Voy a dar la lista de objetos');
          this.objetosGlobalesProfesor = objetos;
          this.objetosProfesor = true;
          this.dataSource = new MatTableDataSource(this.objetosGlobalesProfesor);
          console.log(this.objetosGlobalesProfesor);
        } else {
          this.objetosGlobalesProfesor = undefined;
        }
      });
  }
  crearEscenario() {
    let nombreEscenario: string;
    let descripcionEscenario: string;

    nombreEscenario = this.myForm.value.nombreEscenario;
    descripcionEscenario = this.myForm.value.descripcionEscenario;

    this.peticionesAPI.CreaEscenarioEscapeRoom(new EscenarioEscapeRoom(nombreEscenario, descripcionEscenario, this.objetosGlobalesEscogidos, this.imagenEscogida), this.profesorId)
      .subscribe((res) => {
        if (res != null) {
          console.log('ESCENARIO CREADO: ' + res.id);
          console.log(res);
          this.escenarioYaCreado = true;
          this.escenarioCreado = res;


        } else {
          console.log('Fallo en la creación');
        }
      });
  }
  finalizar() {

    this.router.navigate(['/inicio']);

  }
  openModal(contenido, objeto) {
    
    this.objetoEscogido = objeto;
    this.modal.open(contenido, { centered: true, size: "lg" });
    this.dataSource = new MatTableDataSource(this.pos);
    console.log("contenido", contenido);

  }
  atras() {
  }

 /* @ViewChild('posiciones', { static: true }) posiciones: ModalContainerComponent; */
  closeModal(){
    this.modal.dismissAll();
    
  }

}
