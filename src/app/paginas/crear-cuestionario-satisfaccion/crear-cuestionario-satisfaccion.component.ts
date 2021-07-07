import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { CuestionarioSatisfaccion, Profesor } from 'src/app/clases';
import { SesionService, PeticionesAPIService } from 'src/app/servicios';
import {  Router } from '@angular/router';

@Component({
  selector: 'app-crear-cuestionario-satisfaccion',
  templateUrl: './crear-cuestionario-satisfaccion.component.html',
  styleUrls: ['./crear-cuestionario-satisfaccion.component.scss']
})
export class CrearCuestionarioSatisfaccionComponent implements OnInit {

  ficheroCargado = false;
  cuestionario: CuestionarioSatisfaccion;
  advertencia = true;
  profesorId: number;
  profesor: Profesor;
  varTitulo: string;
  varTituloColumnaTabla: string;

  constructor(
    private router: Router,
    public sesion: SesionService,
    public peticionesAPI: PeticionesAPIService,
  ) { }

  ngOnInit() {
    this.profesor = this.sesion.DameProfesor();
    this.profesorId = this.sesion.DameProfesor().id;
    this.varTitulo = "titulo" + this.profesor.estacion;
    this.varTituloColumnaTabla = "tituloColumnaTabla" + this.profesor.estacion;
  }

  // Activa la función SeleccionarFicheroPreguntas
  ActivarInputInfo() {
    console.log('Activar input');
    document.getElementById('inputInfo').click();
  }


   // Par abuscar el fichero JSON que contiene la info de la colección que se va
  // a cargar desde ficheros
  SeleccionarFicheroCuestionario($event) {
    const fileInfo = $event.target.files[0];
    const reader = new FileReader();
    reader.readAsText(fileInfo, 'ISO-8859-1');
    reader.onload = () => {
      try {
        this.cuestionario = JSON.parse(reader.result.toString());
        console.log ('Ya tengo el cuestionario');
        console.log (this.cuestionario);
        Swal.fire('El cuestionario de satisfacción se ha cargado correctamente', '', 'success');
        this.ficheroCargado = true;
      } catch (e) {
        Swal.fire('Error en el formato del fichero', '', 'error');
      }
    };
  }

  RegistrarCuestionario() {
    this.cuestionario.profesorId = this.profesorId;
    this.peticionesAPI.CreaCuestionarioSatisfaccion(this.cuestionario, this.profesorId)
    .subscribe((res) => {
        if (res != null) {
            Swal.fire('Cuestionario de satisfaccion registrado correctamente', '', 'success');
            this.goBack();
        } else {
          Swal.fire('Error en el registro del cuestionario de satisfacion', '', 'error');
        }
      });
  }

  goBack() {
    this.router.navigate(['/inicio/' + this.profesorId]);
  }

}
