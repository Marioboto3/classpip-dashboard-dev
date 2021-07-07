import { AuthService } from './../../servicios/auth.service';
import { Component, OnInit } from '@angular/core';
import { Profesor } from 'src/app/clases';
import {SesionService, PeticionesAPIService, CalculosService, ComServerService} from '../../servicios/index';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

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
  password: string;
  oldPassword: string; 
  newPassword: string;
  repeatPassword: string;
  cambio = false;
  cambioPass = false;
  identificador: string;
  imagenPerfil: string;

  usernameOriginal: string;

  constructor(
    private sesion: SesionService,
    private router: Router,
    private peticionesAPI: PeticionesAPIService,
    private auth: AuthService,
    private modal: NgbModal
  ) { }

  ngOnInit() {
    this.profesor = this.sesion.DameProfesor();
    this.varTitulo = 'titulo' + this.profesor.estacion;
    this.nombre = this.profesor.nombre;
    this.primerApellido = this.profesor.primerApellido;
    this.segundoApellido = this.profesor.segundoApellido;
    this.username = this.profesor.username;
    this.usernameOriginal = this.username;
    this.email = this.profesor.email;
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

  CambiarContrasena(){
    this.cambioPass = true;
  }

  ActualizarContrasena(){
    if(this.newPassword == '' || this.oldPassword == '' || this.repeatPassword == ''){
      Swal.fire('Error', 'Rellena todos los campos', 'error');
    }
    else if(this.newPassword !== this.repeatPassword){
      Swal.fire('Error', 'La nueva contraseña no coincide con la repetida', 'error');
    } else {
      let user = {
        "username": this.usernameOriginal,
        "password": this.oldPassword
      }
      this.auth.login(user).subscribe((data) => {
        this.auth.setAccessToken(data.id);
        this.auth.changePassword(this.oldPassword, this.newPassword).subscribe(() => {
          Swal.fire('Success', 'Contraseña cambiada con éxito', 'success').then(() => {
            this.cambioPass = false;
            document.forms["pswdData"].reset();
          })
        });      
      }, (error) => {
        console.log(error);
        Swal.fire('Error', 'La contraseña actual es incorrecta', 'error');
      })
    }
  }

  openModal(contenido){
    this.modal.open(contenido);
  }

  Registrar() {
    if (!this.ValidaEmail (this.email)) {
      Swal.fire('Error', 'El email no es correcto', 'error');
    } else {
      this.auth.checkUsername(this.username).subscribe((data: any) => {
        if(data.length != 0 && data[0].id != this.profesor.id) Swal.fire('Error', 'El nombre de usuario ya existe', 'error'); 
        else {
          this.auth.checkEmail(this.email).subscribe((data: any) => {
            if(data.length != 0 && data[0].id != this.profesor.id) Swal.fire('Error', 'El correo ya existe', 'error'); 
            else {
              let user = {
                "username":this.usernameOriginal,
                "password":this.password
              };
              this.auth.login(user).subscribe((data) => {
                this.auth.setAccessToken(data.id);

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
                      this.profesor.username = this.username,
                      this.profesor.email = this.email,
                      this.profesor.password = this.password,
                      this.profesor.identificador = this.identificador,
                      this.profesor.imagenPerfil = this.imagenPerfil,
                      console.log ('voy a modificar profesor');
                      console.log (this.profesor);
        
                      this.peticionesAPI.ModificaProfesor (this.profesor)
                      .subscribe ((res) => {
                        Swal.fire('OK', 'Datos modificados', 'success');
                        this.usernameOriginal = this.username;
                        this.cambio = false;
                        this.password = null;
                      },
                        (err) => {
                          Swal.fire('Error', 'Fallo en la conexion con la base de datos', 'error');
                    });
                  }
                });

              }, (error) => {
                console.log(error);
                Swal.fire('Error', 'Contraseña incorrecta', 'error');
              });
            }
          })
        }
      });
    }   
  }
}
