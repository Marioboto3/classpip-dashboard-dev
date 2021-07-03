import { AuthService } from './../../servicios/auth.service';
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
  savePass: boolean;
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
    private comServer: ComServerService,
    private authService: AuthService){}

  ngOnInit() {
    // this.profesor = undefined;
    // // envio un profesor undefined para que se notifique al componente navbar y desaparezca la barra
    // // de navegación
    // this.sesion.EnviaProfesor(this.profesor);
    if(localStorage.getItem('ACCESS_TOKEN') != null){
      let token = localStorage.getItem('ACCESS_TOKEN');
      this.authService.getUserIdByToken(token).subscribe((data: any) => {
        if(data.userId != null){
          this.authService.getProfesor(data.userId).subscribe((res) => {
            this.profesor = res[0];
            this.sesion.EnviaProfesor(this.profesor);
            this.comServer.Conectar(this.profesor.id);
            this.route.navigate (['/inicio/' + this.profesor.id]);
          }, (error) => {
            this.profesor = undefined;
            this.sesion.EnviaProfesor(this.profesor);
          })
        }
      }, (error) => {
        this.profesor = undefined;
        this.sesion.EnviaProfesor(this.profesor);
      })
    } else {
      this.profesor = undefined;
      // envio un profesor undefined para que se notifique al componente navbar y desaparezca la barra
      // de navegación
      this.sesion.EnviaProfesor(this.profesor);
    }
  }
  iniciarSesion(){
     this.varRoute = false;
     console.log (this.nombre + ' ' + this.pass);

     let credentials = {
      "username": this.nombre,
      "password": this.pass
    }
    this.authService.login(credentials).subscribe((token) => {
      console.log('login response: ', token);
      if(this.savePass){
        this.authService.setLocalAccessToken(token.id);
      } else {
        this.authService.setAccessToken(token.id);
      }
      this.authService.getProfesor(token.userId).subscribe((res) => {
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
        }
      }, (err) => {
        console.log(err);
        Swal.fire('Error', 'Fallo en la conexion con la base de datos', 'error');
      })
    }, (err) => {
      console.log(err);
      Swal.fire('Error', 'Credenciales incorrectas', 'error');
    }); 
  }

  goToRegistro(){ 
    this.mostrarInicioSesion = false;
  }

  ValidaEmail(email) {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  }

  Registrar(){
    if (!this.ValidaEmail(this.email)) {
      Swal.fire('Error', 'El email no es correcto', 'error');
    } else {
      this.authService.checkUsername(this.username).subscribe((username: any) => {
        if(username.length == 0){
          this.authService.checkEmail(this.email).subscribe((email: any) => {
            if(email.length == 0){
              // creamos un identificador aleatorio de 5 digitos
              const identificador = Math.random().toString().substr(2, 5);
              const newProf = new Profesor (
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
              console.log('new prof: ', newProf);
              this.authService.register(newProf).subscribe(() => {
                let credentials = {
                  "username": this.username,
                  "password": this.contrasena
                }
                this.authService.login(credentials).subscribe((token) => {
                  this.authService.setAccessToken(token.id);
                  this.authService.getProfesor(token.userId).subscribe((res) => {
                    if (res[0] !== undefined) {
                      console.log ('autenticado correctamente');
                      this.nombre = undefined;
                      this.contrasena = undefined;
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
                    }
                  }, (err) => {
                    console.log(err);
                    Swal.fire('Error', 'Fallo en la conexion con la base de datos', 'error');
                  })
                }, (err) => {
                  console.log(err);
                  Swal.fire('Error', 'Fallo en la conexion con la base de datos', 'error');
                })
              }, (err) => {
                console.log(err);
                Swal.fire('Error', 'Fallo en el registro, prueba de nuevo más tarde', 'error');
              });
            } else {
              Swal.fire('Error', 'Este email ya está registrado', 'error');
            }
          });
        } else {
          Swal.fire('Error', 'Ya existe un profesor con este nombre de usuario', 'error');
        }
      }, (error) => {
        Swal.fire('Error', 'Fallo en la conexion con la base de datos', 'error');
      })
    }
  }
}
