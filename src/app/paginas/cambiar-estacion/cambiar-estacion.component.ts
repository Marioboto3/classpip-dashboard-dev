import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Profesor } from 'src/app/clases';
import { PeticionesAPIService, SesionService } from 'src/app/servicios';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cambiar-estacion',
  templateUrl: './cambiar-estacion.component.html',
  styleUrls: ['./cambiar-estacion.component.scss']
})
export class CambiarEstacionComponent implements OnInit {

  profesor: Profesor;
  varTitulo: string;

  constructor(
    private sesion: SesionService,
    private router: Router,
    private peticionesAPI: PeticionesAPIService,
  ) { }

  ngOnInit() {
    this.profesor = this.sesion.DameProfesor();
    this.varTitulo = 'titulo' + this.profesor.Estacion;
  }

  Volver() {
    this.router.navigate(['/inicio/' + this.profesor.id]);
  }

  GuardarInvierno(){
    Swal.fire({
      title: '¿Seguro que quieres modificar los datos?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, estoy seguro'
    }).then((result) => {
      if (result.value) {
          this.profesor.Estacion = "winter";
          this.peticionesAPI.ModificaProfesor (this.profesor)
          .subscribe (  (res) => Swal.fire('OK', 'Datos modificados', 'success'),
                      (err) => {
                        Swal.fire('Error', 'Fallo en la conexion con la base de datos', 'error');
        });
      }
    });
  }
  GuardarPrimavera(){
    Swal.fire({
      title: '¿Seguro que quieres modificar los datos?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, estoy seguro'
    }).then((result) => {
      if (result.value) {
          this.profesor.Estacion = "spring";
          this.peticionesAPI.ModificaProfesor (this.profesor)
          .subscribe (  (res) => Swal.fire('OK', 'Datos modificados', 'success'),
                      (err) => {
                        Swal.fire('Error', 'Fallo en la conexion con la base de datos', 'error');
        });
      }
    });
  }
  GuardarVerano(){
    Swal.fire({
      title: '¿Seguro que quieres modificar los datos?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, estoy seguro'
    }).then((result) => {
      if (result.value) {
          this.profesor.Estacion = "summer";
          this.peticionesAPI.ModificaProfesor (this.profesor)
          .subscribe (  (res) => Swal.fire('OK', 'Datos modificados', 'success'),
                      (err) => {
                        Swal.fire('Error', 'Fallo en la conexion con la base de datos', 'error');
        });
      }
    });
  }
  GuardarOtono(){
    Swal.fire({
      title: '¿Seguro que quieres modificar los datos?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, estoy seguro'
    }).then((result) => {
      if (result.value) {
          this.profesor.Estacion = "autumn";
          this.peticionesAPI.ModificaProfesor (this.profesor)
          .subscribe (  (res) => Swal.fire('OK', 'Datos modificados', 'success'),
                      (err) => {
                        Swal.fire('Error', 'Fallo en la conexion con la base de datos', 'error');
        });
      }
    });
  }

}
