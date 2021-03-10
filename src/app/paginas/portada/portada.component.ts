import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

import { Pregunta, Profesor } from 'src/app/clases';
import Swal from 'sweetalert2';
import { PeticionesAPIService, SesionService, CalculosService, ComServerService} from './../../servicios';

@Component({
  selector: 'app-portada',
  templateUrl: './portada.component.html',
  styleUrls: ['./portada.component.scss']
})
export class PortadaComponent implements OnInit {

  @Output() public sidenavToggle = new EventEmitter();

  mostrarInicioSesion = true;
  varRoute = true;
  profesor: Profesor;
  nombre: string;
  pass: string;
  universidad: string;
  primerApellido: string;
  segundoApellido: string;
  username: string;
  email: string;
  contrasena: string;
  contrasenaRepetida: string;
  mostrarLogin = true;
  constructor(  private route: Router,
    
    private peticionesAPI: PeticionesAPIService,
    private sesion: SesionService,
    private comServer: ComServerService){}

  ngOnInit() {
    this.profesor = undefined;
    // envio un profesor undefined para que se notifique al componente navbar y desaparezca la barra
    // de navegación
    this.sesion.EnviaProfesor(this.profesor);
  }
  iniciarSesion(){
     this.varRoute = false;
     console.log (this.nombre + ' ' + this.pass);

    this.peticionesAPI.DameProfesor(this.nombre, this.pass)
    .subscribe(
      (res) => {
        if (res[0] !== undefined) {
          console.log ('autenticado correctamente');
          this.profesor = res[0]; // Si es diferente de null, el profesor existe y lo meto dentro de profesor
          // Notifico el nuevo profesor al componente navbar
          console.log(this.profesor);
          this.sesion.EnviaProfesor(this.profesor);
          this.comServer.Conectar(this.profesor.id);

          // En principio, no seria necesario enviar el id del profesor porque ya
          // tengo el profesor en la sesión y puedo recuperarlo cuando quiera.
          // Pero si quitamos el id hay que cambiar las rutas en app-routing
          // De momento lo dejamos asi.
          console.log ('vamos inicio');
          this.route.navigate (['/inicio/' + this.profesor.id]);
        } else {
          // Aqui habría que mostrar alguna alerta al usuario
          console.log('profe no existe');
          Swal.fire('Cuidado', 'Usuario o contraseña incorrectos', 'warning');
        }
      },
      (err) => {
        console.log ('ERROR');
        Swal.fire('Error', 'Fallo en la conexion con la base de datos', 'error');
      }
    );   
  }
  goToRegistro(){ 
    this.mostrarInicioSesion = false;
  }
  ValidaEmail(email) {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  }

  Registrar(){
    this.peticionesAPI.BuscaNombreUsuario (this.username)
    .subscribe ( res => {
      if (res[0] !== undefined) {
        Swal.fire('Error', 'Ya existe alguien con el mismo nombre de usuario en Classpip', 'error');

      } else {
        if (this.contrasena !== this.contrasenaRepetida) {
          Swal.fire('Error', 'No coincide la contraseña con la contraseña repetida', 'error');
        } else if (!this.ValidaEmail (this.email)) {
          Swal.fire('Error', 'El email no es correcto', 'error');
        } else {
          // creamos un identificador aleatorio de 5 digitos
          const identificador = Math.random().toString().substr(2, 5);
          const profesor = new Profesor (
          this.nombre,
          this.primerApellido,
          this.segundoApellido,
          this.username,
          "summer",
          this.email,
          this.contrasena,
          null,
          identificador
          );
          this.peticionesAPI.RegistraProfesor (profesor)
          .subscribe (
              // tslint:disable-next-line:no-shadowed-variable
              (res) => Swal.fire('OK', 'Registro completado con éxito', 'success'),
              (err) => Swal.fire('Error', 'Fallo en la conexion con la base de datos', 'error')
          );
        }
        this.nombre = undefined;
        this.contrasena = undefined;
        this.mostrarLogin = true;
      }

    });
  }
}
