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
  footer: string;

  constructor(
    private sesion: SesionService,
    private router: Router,
    private peticionesAPI: PeticionesAPIService,
  ) { }

  ngOnInit() {
    this.profesor = this.sesion.DameProfesor();
    this.varTitulo = 'titulo' + this.profesor.estacion;
    
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
          this.profesor.estacion = "winter";
          this.peticionesAPI.ModificaProfesor (this.profesor)
          .subscribe (  (res) => Swal.fire('OK', 'Datos modificados', 'success'),
                      (err) => {
                        Swal.fire('Error', 'Fallo en la conexion con la base de datos', 'error');
        });
        this.router.navigate(['inicio']);
        this.footer = "yes";
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
          this.profesor.estacion = "spring";
          this.peticionesAPI.ModificaProfesor (this.profesor)
          .subscribe (  (res) => Swal.fire('OK', 'Datos modificados', 'success'),
                      (err) => {
                        Swal.fire('Error', 'Fallo en la conexion con la base de datos', 'error');
        });
        this.router.navigate(['inicio']);
        this.footer = "yes";
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
          this.profesor.estacion = "summer";
          this.peticionesAPI.ModificaProfesor (this.profesor)
          .subscribe (  (res) => Swal.fire('OK', 'Datos modificados', 'success'),
                      (err) => {
                        Swal.fire('Error', 'Fallo en la conexion con la base de datos', 'error');
        });
        this.router.navigate(['inicio']);
        this.footer = "yes";
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
          this.profesor.estacion = "autumn";
          this.peticionesAPI.ModificaProfesor (this.profesor)
          .subscribe (  (res) => Swal.fire('OK', 'Datos modificados', 'success'),
                      (err) => {
                        Swal.fire('Error', 'Fallo en la conexion con la base de datos', 'error');
        });
        this.router.navigate(['inicio']);
        this.footer = "yes";
      }
    });
  }

}
