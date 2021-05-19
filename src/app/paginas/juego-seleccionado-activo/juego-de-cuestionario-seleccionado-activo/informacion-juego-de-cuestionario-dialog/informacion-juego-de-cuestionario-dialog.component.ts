import { Component, OnInit, Inject } from '@angular/core';
import { Juego } from 'src/app/clases';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { PeticionesAPIService, SesionService } from 'src/app/servicios';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { JuegoDeCuestionario } from 'src/app/clases/JuegoDeCuestionario';

@Component({
  selector: 'app-informacion-juego-de-cuestionario-dialog',
  templateUrl: './informacion-juego-de-cuestionario-dialog.component.html',
  styleUrls: ['./informacion-juego-de-cuestionario-dialog.component.scss']
})
export class InformacionJuegoDeCuestionarioDialogComponent implements OnInit {

  juegoSeleccionado: Juego;

  // Propiedades del juego
  nombreJuego: string;
  puntuacionCorrecta: number;
  puntuacionIncorrecta: number;
  presentacion: string;
  juegoActivo: boolean;
  juegoTerminado: boolean;
  cuestionarioId: number;
  profesorId: number;
  tipo: string;
  modalidad: string;

  // Se usará para el selector de modo de asignación de ganadores
  presentaciones: string[] = ['Mismo orden para todos',
  'Preguntas desordenadas',
  'Preguntas y respuestas desordenadas'
  ];

  //Se usará para el selector de modo de asignación de modalidad
  modalidades: string[] = ['Test clásico',
  'Kahoot'
  ];

  tituloCuestionario: string;

  myForm: FormGroup;

  // PARA SABER SI TENEMOS TODOS LOS CAMPOS RELLENADOS
  // tslint:disable-next-line:ban-types
  isDisabled: Boolean = true;

  constructor(public dialog: MatDialog,
              private router: Router,
              public location: Location,
              private peticionesAPI: PeticionesAPIService,
              public sesion: SesionService,
              // tslint:disable-next-line:variable-name
              private _formBuilder: FormBuilder,
              public dialogRef: MatDialogRef<InformacionJuegoDeCuestionarioDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.juegoSeleccionado = this.sesion.DameJuego();
    this.nombreJuego = this.juegoSeleccionado.NombreJuego;
    this.tipo = this.juegoSeleccionado.Tipo;
    this.puntuacionCorrecta = this.juegoSeleccionado.PuntuacionCorrecta;
    this.puntuacionIncorrecta = this.juegoSeleccionado.PuntuacionIncorrecta;
    this.presentacion = this.juegoSeleccionado.Presentacion;
    this.juegoActivo = this.juegoSeleccionado.JuegoActivo;
    this.juegoTerminado = this.juegoSeleccionado.JuegoTerminado;
    this.cuestionarioId = this.juegoSeleccionado.cuestionarioId;
    this.profesorId = this.juegoSeleccionado.profesorId;
    this.modalidad = this.juegoSeleccionado.Modalidad;
    this.myForm = this._formBuilder.group({
      NombreJuego: ['', Validators.required],
      PuntuacionCorrecta: ['', Validators.required],
      PuntuacionIncorrecta: ['', Validators.required],
      Presentacion: ['', Validators.required],
    });

    this.peticionesAPI.DameCuestionario(this.cuestionarioId)
    .subscribe(res => {
      this.tituloCuestionario = res.titulo;
    });
  }

  // COGEMOS LOS VALORES NUEVOS Y LOS GUARDAMOS EN EL JUEGO
  GuardarCambios() {
    this.peticionesAPI.ModificaJuegoDeCuestionario(new JuegoDeCuestionario(this.nombreJuego, this.tipo, this.modalidad, this.puntuacionCorrecta,
      this.puntuacionIncorrecta, this.presentacion, this.juegoActivo, this.juegoTerminado,
      this.profesorId, this.juegoSeleccionado.grupoId, this.cuestionarioId), this.juegoSeleccionado.id, this.juegoSeleccionado.grupoId)
      .subscribe(res => {
        this.juegoSeleccionado.nombreJuego = res.nombreJuego;
        this.juegoSeleccionado.puntuacionCorrecta = res.puntuacionCorrecta;
        this.juegoSeleccionado.puntuacionIncorrecta = res.puntuacionIncorrecta;
        this.juegoSeleccionado.presentacion = res.presentacion;
        this.juegoSeleccionado.modalidad = res.modalidad;
        this.sesion.TomaJuego(this.juegoSeleccionado);
        this.goBack();
      });
  }

  // Cuando pulsamos en el boton volver
  goBack() {
    this.dialogRef.close();
  }

  Disabled() {
    // tslint:disable-next-line:max-line-length
    if (this.myForm.value.NombreJuego === '' || this.myForm.value.PuntuacionCorrecta === '' || this.myForm.value.PuntuacionIncorrecta === '' ||
    // tslint:disable-next-line:max-line-length
    (this.myForm.value.Presentacion === this.juegoSeleccionado.Presentacion && this.myForm.value.NombreJuego === this.juegoSeleccionado.NombreJuego &&
      // tslint:disable-next-line:max-line-length
      this.myForm.value.PuntuacionCorrecta.toString() === this.juegoSeleccionado.PuntuacionCorrecta.toString() && this.myForm.value.PuntuacionIncorrecta.toString() === this.juegoSeleccionado.PuntuacionIncorrecta.toString())) {
      // Si alguno de los valores es igual a nada, entonces estará desactivado
      this.isDisabled = true;
    } else {
      // Si ambos son diferentes a nulo, estará activado.
      this.isDisabled = false;
    }
  }
}
