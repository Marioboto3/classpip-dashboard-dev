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

  objetosGlobalesProfesor: ObjetoGlobalEscape [] = [];
  objetosGlobalesEscogidos: ObjetoGlobalEscape [] = [];
  varTitulo: string;
  profesor: Profesor;
  profesorId: number;
  escenarioYaCreado: Boolean = false;
  objetosProfesor: boolean = false;
  imagenesProfesor: ImagenEscenario [];
  imagenes: boolean = false;
  imagenesTest: ImagenEscenario [];

  count: number = 2;

  imagen1: ImagenEscenario;
  imagen2: ImagenEscenario;
  imagenEscogida: ImagenEscenario;

  displayedColumns: string[] = ['nombre', 'escoger'];
  displayedColumnsObjetos: string[] = ['nombre', 'tipoDeObjeto', 'posicion', 'añadir'];


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
     this.myForm2 = this.formBuilder.group({
      posicion: ['', Validators.required]
      });
      
  }

  escogerImagenBase(imagen){
    console.log("Imagen");
    this.imagenEscogida = imagen;
  }
  escogerObjetoEscapeRoom (objeto){
    if (this.count == 0){
      Swal.fire('No puedes añadir más objetos', '', 'info');
    }else{
    this.objetosGlobalesEscogidos.push(objeto);
    this.count = this.count - 1;
    }
  }
  escogerPosicion (objeto){
    let count = 0;
    console.log("Objeto para posicion: ", objeto);
    if(this.objetosGlobalesEscogidos.length != 0){
      this.objetosGlobalesEscogidos.forEach(elemento => {
        if(elemento.nombre == objeto.nombre){
          if (objeto.tipoDeObjeto == "objetoEscape"){
            elemento.posicion=1;
          }else{
            elemento.posicion=2;
          }
          count = 1;
        }
      }); 
      if(count == 0){
        Swal.fire('Tienes que clicar primero el objeto', '', 'info')
      }
    }else{
      Swal.fire('Tienes que clicar primero el objeto', '', 'info')
    }
  }
  verImagenes(contenido){
      this.modal.open(contenido,{centered: true, size:"lg"});

        console.log('Voy a dar la lista de imagenes');

        this.imagen1 = new ImagenEscenario ("habitacion");
        this.imagen2 = new ImagenEscenario ("cocina");

        var img: ImagenEscenario[] = [this.imagen1, this.imagen2];
  
        this.imagenesProfesor = img;
        this.imagenes = true;
        this.dataSource = new MatTableDataSource(this.imagenesProfesor);

  }
  verObjetos(contenido){
    this.modal.open(contenido,{centered: true, size:"lg"});
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
  crearEscenario(){
    let nombreEscenario: string;
    let descripcionEscenario: string;

    nombreEscenario = this.myForm.value.nombreEscenario;
    descripcionEscenario = this.myForm.value.descripcionEscenario;
    
    this.peticionesAPI.CreaEscenarioEscapeRoom (new EscenarioEscapeRoom(nombreEscenario, descripcionEscenario, this.objetosGlobalesEscogidos, this.imagenEscogida), this.profesorId)
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

  finalizar(){

    this.router.navigate(['/inicio']);

  }

  atras(){
  }

}
