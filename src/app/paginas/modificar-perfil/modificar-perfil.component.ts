import { Component, OnInit } from '@angular/core';
import { Profesor } from 'src/app/clases';
import {SesionService, PeticionesAPIService, CalculosService, ComServerService} from '../../servicios/index';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modificar-perfil',
  templateUrl: './modificar-perfil.component.html',
  styleUrls: ['./modificar-perfil.component.scss']
})
export class ModificarPerfilComponent implements OnInit {

  varTitulo: string;
  profesor: Profesor;
  nombre: string;
  primerApellido: string;
  segundoApellido: string;
  username: string;
  email: string;
  contrasena: string; 
  contrasenaRepetida: string;
  cambio = false;
  cambioPass = false;
  identificador: string;
  imagenPerfil: string;


  constructor(
    private sesion: SesionService,
    private router: Router,
    private peticionesAPI: PeticionesAPIService,
  ) { }

  ngOnInit() {
    this.profesor = this.sesion.DameProfesor();
    this.varTitulo = 'titulo' + this.profesor.estacion;
    this.nombre = this.profesor.nombre;
    this.primerApellido = this.profesor.primerApellido;
    this.segundoApellido = this.profesor.segundoApellido;
    this.username = this.profesor.nombreUsuario;
    this.email = this.profesor.email;
    this.contrasena = this.profesor.password;
    this.identificador = this.profesor.identificador;
    this.imagenPerfil = this.profesor.imagenPerfil;
  }
  Volver() {
    this.router.navigate(['/inicio/' + this.profesor.id]);

  }
  ValidaEmail(email) {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  }


  Registrar() {
      if (this.cambioPass && (this.contrasena !== this.contrasenaRepetida)) {
      Swal.fire('Error', 'No coincide la contraseña con la contraseña repetida', 'error');
    } else if (!this.ValidaEmail (this.email)) {
      Swal.fire('Error', 'El email no es correcto', 'error');
    } else {

        Swal.fire({
          title: '¿Seguro que quieres modificar los datos?',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Si, estoy seguro'
        }).then((result) => {
          if (result.value) {
              this.profesor.nombre = this.nombre,
              this.profesor.primerApellido = this.primerApellido,
              this.profesor.segundoApellido = this.segundoApellido,
              this.profesor.nombreUsuario = this.username,
              this.profesor.email = this.email,
              this.profesor.password = this.contrasena,
              this.profesor.identificador = this.identificador,
              this.profesor.imagenPerfil = this.imagenPerfil,
              console.log ('voy a modificar profesor');
              console.log (this.profesor);

              this.peticionesAPI.ModificaProfesor (this.profesor)
              .subscribe (  (res) => Swal.fire('OK', 'Datos modificados', 'success'),
                          (err) => {
                            Swal.fire('Error', 'Fallo en la conexion con la base de datos', 'error');
            });
          }
        });
    }

  }

}
