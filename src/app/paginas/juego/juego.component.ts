import { Component, OnInit, ViewChild } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MatDialog, MatTabGroup } from '@angular/material';
import { Location } from '@angular/common';
import { MatTableDataSource } from '@angular/material/table';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';


// tslint:disable-next-line:max-line-length
import {
  Nivel, Alumno, Equipo, Juego, JuegoDeCompeticion, Punto, TablaPuntosFormulaUno,

  AlumnoJuegoDePuntos, EquipoJuegoDePuntos, Grupo, AlumnoJuegoDeCompeticionLiga,
  EquipoJuegoDeCompeticionLiga, Jornada, AlumnoJuegoDeCompeticionFormulaUno,
  EquipoJuegoDeCompeticionFormulaUno, Cuestionario, JuegoDeAvatar, FamiliaAvatares,
  AlumnoJuegoDeAvatar, AsignacionPuntosJuego, Coleccion, AlumnoJuegoDeColeccion,
  EquipoJuegoDeColeccion, Escenario, JuegoDeGeocaching, AlumnoJuegoDeGeocaching, PuntoGeolocalizable,
  JuegoDeVotacionUnoATodos, AlumnoJuegoDeVotacionUnoATodos, Profesor,
  JuegoDeVotacionTodosAUno, AlumnoJuegoDeVotacionTodosAUno, CuestionarioSatisfaccion,
  JuegoDeCuestionarioSatisfaccion, AlumnoJuegoDeCuestionarioSatisfaccion, Rubrica, FamiliaDeImagenesDePerfil
} from '../../clases/index';


// Services
import { SesionService, CalculosService, PeticionesAPIService, ComServerService } from '../../servicios/index';

import { Observable, of } from 'rxjs';
import 'rxjs';

import { DialogoConfirmacionComponent } from '../COMPARTIDO/dialogo-confirmacion/dialogo-confirmacion.component';
import Swal from 'sweetalert2';

import { AsignaCuestionarioComponent } from './asigna-cuestionario/asigna-cuestionario.component';
import { JuegoDeCuestionario } from 'src/app/clases/JuegoDeCuestionario';
import { AlumnoJuegoDeCuestionario } from 'src/app/clases/AlumnoJuegoDeCuestionario';
import { Router } from '@angular/router';

import { AsignaEscenarioComponent } from './asigna-escenario/asigna-escenario.component';
import { AsignaPreguntasComponent } from './asigna-preguntas/asigna-preguntas.component';
import { JuegoDeEvaluacion } from '../../clases/JuegoDeEvaluacion';
import { log } from 'util';
import { EquipoJuegoEvaluado } from '../../clases/EquipoJuegoEvaluado';
import { AlumnoJuegoEvaluado } from '../../clases/AlumnoJuegoEvaluado';
import { JuegoDeEscapeRoom } from 'src/app/clases/JuegoDeEscapeRoom';
import { AlumnoJuegoEscapeRoom } from 'src/app/clases/AlumnoJuegoEscapeRoom';
import { stringify } from '@angular/core/src/util';
import { ObjetoEscape } from 'src/app/clases/ObjetoEscape';
import { Mochila } from 'src/app/clases/Mochila';
import { ObjetoEnigma } from 'src/app/clases/ObjetoEnigma';
import { EscenarioEscapeRoom } from 'src/app/clases/EscenarioEscapeRoom';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ObjetoGlobalEscape } from 'src/app/clases/ObjetoGlobalEscape';
import { ObjetoJuego } from 'src/app/clases/ObjetoJuego';
import { PartidaEscape } from 'src/app/clases/PartidaEscape';
import { EscenaDeJuego } from 'src/app/clases/EscenaDeJuego';
import { partialRefresh } from '@syncfusion/ej2-grids';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';


export interface OpcionSeleccionada {
  nombre: string;
  id: string;
}

export interface ChipColor {
  nombre: string;
  color: ThemePalette;
}



@Component({
  selector: 'app-juego',
  templateUrl: './juego.component.html',
  styleUrls: ['./juego.component.scss']
})

export class JuegoComponent implements OnInit {



  ///////////////////////////////////// VARIABLE GENERALES PARA EL COMPONENTE ///////////////////////////////////

  profesorId: number;
  profesor: Profesor;
  grupo: Grupo;
  alumnosGrupo: Alumno[];
  equiposGrupo: Equipo[];
  @ViewChild('stepper') stepper;
  @ViewChild('tabs') tabGroup: MatTabGroup;

  // tslint:disable-next-line:ban-types
  juegoCreado: Boolean = false;
  // Usaré esta variable para determinar si debo advertir al usuario de
  // que está abandonando el proceso de creación del juego
  creandoJuego = false;

  objetoEnigma: ObjetoEnigma;
  juego: any;
  juegoDeCuestionario: JuegoDeCuestionario;
  juegoDeCompeticion: JuegoDeCompeticion;
  juegoDeAvatar: JuegoDeAvatar;
  juegoDeGeocaching: JuegoDeGeocaching;
  escenariosSecundariosProfesor: boolean = false;
  varHelper: string;
  objeto1: ObjetoEscape;
  objeto2: ObjetoEscape;
  objetosProfesor: boolean = false;
  objetoModificadoEnigma: ObjetoEnigma;
  // Informacion para todos los juegos
  myForm: FormGroup;
  tipoDeEscenarioSeleccionado: string;
  nombreDelJuego: string;
  tipoDeJuegoSeleccionado: string;
  modoDeJuegoSeleccionado: string;
  tengoNombre = false;
  tengoTipo = false;
  tengoModo = false;
  objetoPista: ObjetoEscape;
  seleccionTipoJuego: ChipColor[] = [
    { nombre: 'Juego De Puntos', color: 'primary' },
    { nombre: 'Juego De Colección', color: 'accent' },
    { nombre: 'Juego De Competición', color: 'warn' },
    { nombre: 'Juego De Avatar', color: 'primary' },
    { nombre: 'Juego De Cuestionario', color: 'accent' },
    { nombre: 'Juego De Geocaching', color: 'warn' },
    { nombre: 'Juego De Votación', color: 'primary' },
    { nombre: 'Juego De Cuestionario de Satisfacción', color: 'accent' },
    { nombre: 'Juego De Evaluación', color: 'accent' },
    { nombre: 'Juego De Escape Room', color: 'warn' }
  ];
  seleccionModoJuego: ChipColor[] = [
    { nombre: 'Individual', color: 'primary' },
    { nombre: 'Equipos', color: 'accent' }
  ];

  seleccionEscenario: ChipColor[] = [
    { nombre: 'Habitación', color: 'primary' },
    { nombre: 'Cocina', color: 'accent' },
    { nombre: 'Baño', color: 'warn' },
  ];
  // información para crear un juego de puntos
  puntosDelJuego: Punto[] = [];
  nivelesDelJuego: Nivel[] = [];
  logosNiveles: FormData[] = [];

  // información para crear un juego de colección
  coleccionSeleccionada: Coleccion;
  tengoColeccion = false;
  modoAsignacion;

  configuradoEscenarioPrincipal: boolean = false;
  // información para crear un juego de cuestionario
  cuestionario: Cuestionario;
  tengoCuestionario = false;
  puntuacionCorrecta: number;
  puntuacionIncorrecta: number;
  modoPresentacion: string;
  tengoModoPresentacion = false;
  seleccionModoPresentacion: string[] = ['Mismo orden para todos',
    'Preguntas desordenadas',
    'Preguntas y respuestas desordenadas'];
  tiempoLimite: number;
  tipoDeJuegoDeCuestionarioSeleccionado: string;
  tengoTipoJuegoCuestionario = false;
  seleccionTipoDeJuegoDeCuestionario: ChipColor[] = [
    { nombre: 'Test clásico', color: 'primary' },
    { nombre: 'Kahoot', color: 'accent' },
  ];

  // información para crear juego de avatares
  familiasElegidas: number[];
  tengoFamilias = false;

  // Información para crear juego de evaluación
  seleccionTipoDeEvaluacion: ChipColor[] = [
    { nombre: '1 a N', color: 'primary' },
    { nombre: 'Todos con todos', color: 'warn' }
  ];
  tipoDeEvaluacionSeleccionado: string;
  tengoTipoDeEvaluacion = false;
  //
  seleccionRelacionesEvaluacion: ChipColor[] = [
    { nombre: 'A elegir', color: 'primary' },
    { nombre: 'Aleatorio', color: 'warn' }
  ];
  relacionesEvaluacionSeleccionado: string;
  tengoRelacionEvaluacion = false;
  relacionesMap = new Map();
  numeroDeMiembros = 1;
  //
  profesorEvalua = false;
  profesorEvaluaModo = 'normal';
  autoevaluacion = false;
  //
  tengoRubrica = false;
  rubricaElegida: Rubrica;
  rubricas: Rubrica[];
  //
  seleccionCriterioEvaluacion: ChipColor[] = [
    { nombre: 'Por pesos', color: 'primary' },
    { nombre: 'Por penalización', color: 'warn' }
  ];
  criterioEvaluacionSeleccionado: string;
  tengoCriterioEvaluacion = false;
  //
  pesosArray = [];
  pesosSuman100 = true;
  penalizacionArray = [];
  //
  seleccionEquiposEvaluacion: ChipColor[] = [
    { nombre: 'Individualmente', color: 'primary' },
    { nombre: 'Por Equipos', color: 'warn' }
  ];
  equiposEvaluacionSeleccionado: string;
  tengoEquipoEvaluacion = false;
  //
  relacionAlumnosEquipos = [];
  comprobacionDeN = false;
  todosTienenEvaluador = false;
  // Información para crear juego de competicion

  tipoDeCompeticionSeleccionado: string;
  seleccionTipoDeCompeticion: ChipColor[] = [
    { nombre: 'Liga', color: 'primary' },
    { nombre: 'Fórmula Uno', color: 'warn' },
    { nombre: 'Torneo', color: 'accent' }
  ];
  tengoTipoDeCompeticion = false;
  numeroDeJornadas: number;
  tengoNumeroDeJornadas = false;
  jornadasLiga: Jornada[];
  jornadasFormulaUno: Jornada[];

  objetosEnigmaModal: boolean = false;

  nuevaPuntuacion: number;
  tengoNuevaPuntuacion = false;
  Puntuacion: number[] = [];
  selection = new SelectionModel<any>(true, []);
  dataSource: any;
  TablaPuntuacion: TablaPuntosFormulaUno[];
  displayedColumnsTablaPuntuacion: string[] = ['select', 'Posicion', 'Puntos'];

  displayedColumnsEscenarioSecundario: string[] = ['mapa', 'descripcion', 'añadir'];
  displayedColumns: string[] = ['mapa', 'descripcion', 'verObjetos', 'añadir'];
  displayedColumnsObjetos: string[] = ['nombre', 'tipoDeObjeto', 'añadir', 'ver'];
  displayedColumnsObjetosEnigma: string[] = ['nombre', 'pregunta', 'respuesta', 'escoger'];
  displayedColumnsObjetosEscapePeso: string[] = ['nombre', 'peso', 'añadir']

  objetosProfesorModal: boolean = false;
  mensaje: string = 'Estás seguro/a de que quieres eliminar el escenario llamado: ';
  escenariosProfesor: EscenarioEscapeRoom[];

  objetoEnigmaModificarGlobal: ObjetoGlobalEscape;

  // Informacion para juego de geocatching

  escenario: Escenario;
  tengoEscenario = false;
  puntosgeolocalizablesEscenario: PuntoGeolocalizable[];
  numeroDePuntosGeolocalizables: number;

  idescenario: number;
  PreguntasBasicas: number[];
  PreguntasBonus: number[];
  tengoPreguntas = false;

  puntuacionCorrectaGeo: number;
  puntuacionIncorrectaGeo: number;
  puntuacionCorrectaGeoBonus: number;
  puntuacionIncorrectaGeoBonus: number;

  objetosEnigma: ObjetoEnigma[] = [];
  editarObjetoEnigmaVar: boolean = false;

  // información para crear juego de votación

  tipoDeVotacionSeleccionado: string;
  seleccionTipoDeVotacion: ChipColor[] = [
    { nombre: 'Uno A Todos', color: 'primary' },
    { nombre: 'Todos A Uno', color: 'warn' }
  ];

  modoDeRepartoSeleccionado: string;
  seleccionModoReparto: ChipColor[] = [
    { nombre: 'Reparto fijo según posición', color: 'primary' },
    { nombre: 'Reparto libre', color: 'warn' }
  ];
  tengoModoReparto = false;
  puntosARepartir = 0;

  tengoTipoDeVotacion = false;
  conceptos: string[];
  listaConceptos: any[] = [];
  dataSourceConceptos;
  nombreConcepto;
  pesoConcepto;
  pesos: number[];
  totalPesos: number;
  conceptosAsignados = false;
  displayedColumnsConceptos: string[] = ['nombreConcepto', 'pesoConcepto', ' '];
  displayedColumnsEscenarios: string[] = ['mapa', 'descripcion', 'imagenes', 'escoger'];
  displayedColumnsPosiciones: string[] = ['nombre', 'tipoDeObjeto', 'escogerPosicion'];
  displayedColumnsPos: string[] = ['posicion', 'escogerPosicion'];

  objetosEscapePeso: ObjetoEscape[] = [];
  // Información para el juego de cuestionario de satisfacción
  cuestionarioSatisfaccion: CuestionarioSatisfaccion;
  tengoCuestionarioSatisfaccion = false;
  descripcionCuestionarioSatisfaccion: string;

  tituloObjetoEnigma: string;

  final = false;

  // HACEMOS DOS LISTAS CON LOS JUEGOS ACTIVOS, INACTIVOS Y PREPARADOS
  // Lo logico seria que fuesen listas de tipo Juego, pero meteremos objetos
  // de varios tipos (por ejemplo, de tipo Juego y de tipo JuegoDeCuestionario)
  juegosActivos: any[];
  juegosInactivos: any[];
  juegosPreparados: any[];

  varTitulo: string;
  varLineaDivisoria: string;
  // tslint:disable-next-line:no-inferrable-types
  opcionSeleccionada: string = 'todosLosJuegos';

  escenarioEscapeRoom: EscenarioEscapeRoom;
  escenarioSecundarioEscapeRoom: EscenarioEscapeRoom;
  escogidoEscenarioSecundario: boolean = false;

  objetosEscapePrimerEscenario: ObjetoEscape[] = [];
  objetosEscapePrimerEscenarioVar: boolean = false;

  varBool: boolean = false;
  // criterioComplemento1: string;

  //////////////////////////////////// PARÁMETROS PARA PÁGINA DE CREAR JUEGO //////////////////////////////////////

  editObject: FormGroup;
  editPista: FormGroup;
  escenaYaescogida: boolean = false;
  juegoEscape: JuegoDeEscapeRoom;
  numeroDeEscenasSeleccionadas: number;
  objetosJuego: ObjetoJuego[] = [];
  objetosGlobal: ObjetoGlobalEscape[] = [];
  objetosEscogidos: ObjetoGlobalEscape[] = [];
  objetosEscogidosModal: boolean = false;
  objetosJuegoEscogidos: ObjetoJuego[] = [];
  countEscape: number = 0;
  countEnigma: number = 0;
  objetoGlobalEscogido: ObjetoGlobalEscape;
  posicionesEscape: number[] = [1, 2, 3];
  posicionesEnigma: number[] = [4, 5];
  dataSourcePosicion;
  posicionesVar2: boolean = false;
  numeroEscena: number = 1;
  partidasEscape: PartidaEscape[] = [];
  escenasEscape: Map<number, EscenaDeJuego> = new Map<number, EscenaDeJuego>();
  listaEscenasEscape: EscenaDeJuego[] = [];
  mapEscenaPorPosicion: Map<number, number> = new Map<number, number>();
  objetosEnigmaEscogidos: ObjetoJuego[] = [];
  objetosEnigmaEscogidosGlobal: ObjetoGlobalEscape[] = [];
  objetosEnigmaEscogidosModal: boolean = false;
  displayedColumnsEnigmaPrincipal: string[] = ['nombre', 'escogerPrincipal', 'modificarObjeto'];
  objetosRequisitadosModal: boolean = false;
  displayedColumnsRequisitos: string[] = ['nombre', 'escoger'];
  objetosRequisitos: ObjetoGlobalEscape[] = [];
  objetosSinRequisitos: ObjetoGlobalEscape[] = [];
  mapRequisitosEscena: Map<number, ObjetoGlobalEscape> = new Map<number, ObjetoGlobalEscape>();
  pista: ObjetoJuego;

  constructor(
    public dialog: MatDialog,
    private calculos: CalculosService,
    private sesion: SesionService,
    private comService: ComServerService,
    private location: Location,
    private peticionesAPI: PeticionesAPIService,
    // tslint:disable-next-line:variable-name
    private _formBuilder: FormBuilder,
    private router: Router,
    private modal: NgbModal
  ) { }


  ngOnInit() {
    this.grupo = this.sesion.DameGrupo();
    console.log(' Grupo ' + this.grupo);
    this.alumnosGrupo = this.sesion.DameAlumnosGrupo();
    this.profesor = this.sesion.DameProfesor();
    this.profesorId = this.sesion.DameProfesor().id;
    this.varTitulo = 'titulo' + this.profesor.estacion;
    this.varLineaDivisoria = 'lineaDivisoria' + this.profesor.estacion;
    console.log("this.lineaDiv: ", this.varLineaDivisoria);

    this.editPista = this._formBuilder.group({
      texto: ['', Validators.required]
    });

    this.editObject = this._formBuilder.group({
      pregunta: ['', Validators.required],
      respuesta: ['', Validators.required],
      imagen: ['', Validators.required]
    });

    // La lista de equipos del grupo no esta en el servicio sesión. Asi que hay que
    // ir a buscarla
    this.peticionesAPI.DameEquiposDelGrupo(this.grupo.id)
      .subscribe(equipos => {
        if (equipos[0] !== undefined) {
          console.log('Hay equipos', equipos[0]);
          this.equiposGrupo = equipos;
          console.log(this.equiposGrupo);
          for (const equipo of equipos) {
            this.peticionesAPI.DameAlumnosEquipo(equipo.id).subscribe((alumnos: Alumno[]) => {
              this.relacionAlumnosEquipos.push({ equipoId: equipo.id, alumnos });
              console.log('relacion alumnos equipos', this.relacionAlumnosEquipos);
            });
          }
        } else {
          // mensaje al usuario
          console.log('Este grupo aun no tiene equipos');
          this.equiposGrupo = undefined;
        }
      });

    // Ahora traemos la lista de juegos
    // esta operacion es complicada. Por eso está en calculos
    this.calculos.DameListaJuegos(this.grupo.id)
      .subscribe(listas => {
        console.log('He recibido los juegos');
        console.log(listas);
        this.juegosActivos = listas.activos;
        // Si la lista aun esta vacia la dejo como indefinida para que me
        // salga el mensaje de que aun no hay juegos
        if (listas.activos[0] === undefined) {
          this.juegosActivos = undefined;
          console.log('No hay inactivos');
        } else {
          this.juegosActivos = listas.activos;
          console.log('hay activos');
        }
        if (listas.inactivos[0] === undefined) {
          this.juegosInactivos = undefined;
          console.log('No hay inactivos');
        } else {
          this.juegosInactivos = listas.inactivos;
          console.log('hay inactivos');
        }
        if (listas.preparados[0] === undefined) {
          this.juegosPreparados = undefined;
        } else {
          this.juegosPreparados = listas.preparados;
        }

      });
    // Peticion API Juego de Evaluacion
    this.peticionesAPI.DameRubricasProfesor(this.profesorId).subscribe(rubricas => {
      console.log('Tengo rubricas', rubricas);
      this.rubricas = rubricas;
    });
    // Fin Peticion API Juego de Evaluacion
    //
    // Es este formulario recogeremos la información que vaya introduciendo
    // el usuario segun el tipo de juego
    this.myForm = this._formBuilder.group({
      NombreDelJuego: ['', Validators.required],
      PuntuacionCorrecta: ['', Validators.required],
      PuntuacionIncorrecta: ['', Validators.required],
      NumeroDeJornadas: ['', Validators.required],
      criterioPrivilegioComplemento1: ['', Validators.required],
      criterioPrivilegioComplemento2: ['', Validators.required],
      criterioPrivilegioComplemento3: ['', Validators.required],
      criterioPrivilegioComplemento4: ['', Validators.required],
      criterioPrivilegioVoz: ['', Validators.required],
      criterioPrivilegioVerTodos: ['', Validators.required],
      NuevaPuntuacion: ['', Validators.required],
      PuntuacionCorrectaGeo: ['', Validators.required],
      PuntuacionIncorrectaGeo: ['', Validators.required],
      PuntuacionCorrectaGeoBonus: ['', Validators.required],
      PuntuacionIncorrectaGeoBonus: ['', Validators.required],
      NombreDelConcepto: ['', Validators.required],
      PesoDelConcepto: ['', Validators.required],
      TiempoLimite: ['', Validators.required],
      EscenasDelJuego: ['', Validators.required]
    });

    this.TablaPuntuacion = [];
    this.TablaPuntuacion[0] = new TablaPuntosFormulaUno(1, 10);
    this.dataSource = new MatTableDataSource(this.TablaPuntuacion);
    this.Puntuacion[0] = 10;

    this.listaConceptos = [];
    this.totalPesos = 0;

    console.log("variable TipoDeEscenarioSeleccionado: ", this.tipoDeEscenarioSeleccionado);
    this.tipoDeEscenarioSeleccionado = null;
  }

  //// ESCAPE ROOM

  openModal(contenido, number: number) {
    if (number == 1) {
      this.modal.open(contenido, { centered: true, size: "lg" });
      this.TraeEscenariosDelProfesor();
    } if (number == 2) {
      this.verObjetos(contenido);
    } if (number == 3) {
      this.verObjetosEscogidos(contenido);
    } if (number == 4) {
      this.verObjetosEnigmaEscogidos(contenido);
    } if (number == 5) {
      this.verObjetosRequisito(contenido);
    } if (number == 6) {
      this.verPistaParaCrear(contenido);
    }
  }
  escogerNumeroEscenas() {
    console.clear();
    let number: Number;
    this.juegoEscape = new JuegoDeEscapeRoom(this.modoDeJuegoSeleccionado, this.grupo.id, this.myForm.value.NombreDelJuego, true, "Juego De Escape Room");
    this.numeroDeEscenasSeleccionadas = this.myForm.value.EscenasDelJuego;
    this.escenaYaescogida = true;
    console.log("Número de escenas:", this.numeroDeEscenasSeleccionadas);


    // number = Number(this.myForm.value.NombreDelJuego);

    // //NO ENTIENDO POR QUE
    // if (number == NaN) {
    //   Swal.fire("¡Tienes que escribir un número!", "", "error");
    // } else {
    //   this.numeroDeEscenasSeleccionadas = this.myForm.value.EscenasDelJuego;
    //   this.escenaYaescogida = true;
    // }

  }
  TraeEscenariosDelProfesor() {

    this.peticionesAPI.DameEscenariosDelProfesorEscapeRoom(this.profesorId)
      .subscribe(escenarios => {
        if (escenarios[0] != undefined) {
          console.log('Voy a dar la lista de escenarios');
          this.escenariosProfesor = escenarios;
          this.dataSource = new MatTableDataSource(this.escenariosProfesor);
          console.log(this.escenariosProfesor);
        } else {
          Swal.fire("No tienes escenarios!", "", "error");
          this.escenariosProfesor = undefined;
        }
      });
  }
  escogerEscenarioEscape(escenario: EscenarioEscapeRoom) {
    Swal.fire({
      title: escenario.mapa,
      text: '¿Estás seguro que quieres escoger este escenario?',
      confirmButtonText: 'Sí',
      showCancelButton: true,
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.value == true) {
        this.escenarioEscapeRoom = escenario;
      }
    });
  }
  verObjetos(objetos) {
    this.objetosProfesorModal = true;

    this.peticionesAPI.DameObjetosGlobalesDelProfesorEscapeRoom(this.profesor.id).subscribe(objetosGlobales => {
      if (objetosGlobales != null && objetosGlobales != undefined) {
        this.objetosGlobal = objetosGlobales;
        this.dataSource = new MatTableDataSource(this.objetosGlobal);
      } else {
        Swal.fire("¡No tienes objetos guardados!", "", "error");
      }
    });
    this.modal.open(objetos, { centered: true, size: "lg" });
  }
  anadirObjeto(objeto: ObjetoGlobalEscape) {
    let bool: boolean = false;
    this.objetosJuegoEscogidos.forEach(obj => {
      if (obj.objetoId == objeto.id) {
        Swal.fire("¡Ya has usado este objeto, no se puede repetir!", "", "error");
        bool = true;
      }
    });
    if (!bool) {
      if (this.countEscape <= 3 && objeto.tipo == "objetoEscape") {
        this.objetosEscogidos.push(objeto);
        this.objetosSinRequisitos.push(objeto);
      } if (this.countEnigma <= 2 && objeto.tipo == "objetoEnigma") {
        this.objetosEscogidos.push(objeto);
      }
    }
  }
  verObjetosEscogidos(objetos) {
    this.objetosEscogidosModal = true;
    this.dataSource = new MatTableDataSource(this.objetosEscogidos);
    this.modal.open(objetos, { centered: true, size: "lg" });
  }
  verObjetosEnigmaEscogidos(objetos) {
    this.objetosEnigmaEscogidosModal = true;
    this.dataSource = new MatTableDataSource(this.objetosEnigmaEscogidosGlobal);
    this.modal.open(objetos, { centered: true, size: "lg" });
  }
  verPosiciones(objeto: ObjetoGlobalEscape, contenido) {

    this.objetoGlobalEscogido = objeto;
    this.posicionesVar2 = true;
    if (objeto.tipo == "objetoEscape") {
      this.dataSourcePosicion = new MatTableDataSource(this.posicionesEscape);
    }
    if (objeto.tipo == "objetoEnigma") {
      this.dataSourcePosicion = new MatTableDataSource(this.posicionesEnigma);
    }
    this.modal.open(contenido, { centered: true, size: "lg" });

  }
  escogerPosicion(posicion: number) {

    let objetoJuego;
    if (this.objetoGlobalEscogido.tipo == "objetoEscape") {
      objetoJuego = new ObjetoJuego(this.objetoGlobalEscogido.id, this.escenarioEscapeRoom.id, "string", "string", false, false, false, posicion, this.juegoEscape.id, this.numeroEscena, false, false, 1);
      this.objetosJuegoEscogidos.push(objetoJuego);
      this.posicionesEscape.forEach((value, index) => {
        if (value == posicion) {
          this.posicionesEscape.splice(index, 1);
        }
      });

    } else {
      this.objetosEnigmaEscogidosGlobal.push(this.objetoGlobalEscogido);
      objetoJuego = new ObjetoJuego(this.objetoGlobalEscogido.id, this.escenarioEscapeRoom.id, "string", "string", false, false, false, posicion, this.juegoEscape.id, this.numeroEscena, false, false, 1);
      this.objetosJuegoEscogidos.push(objetoJuego);
      this.objetosEnigmaEscogidos.push(objetoJuego);
      this.posicionesEnigma.forEach((value, index) => {
        if (value == posicion) {
          this.posicionesEnigma.splice(index, 1);
        }
      });
    }
    Swal.fire("¡Listo!", "", 'success');

  }
  escogerPrincipal(objeto: ObjetoGlobalEscape) {
    let objetoJu: ObjetoJuego;
    this.objetosEnigmaEscogidos.forEach(objetoJuego => {
      if (objetoJuego.objetoId == objeto.id) {
        objetoJuego.principal = true;
        objetoJu = objetoJuego;
      }
    });
    this.objetosJuegoEscogidos.forEach(objetoJuegoEscogido => {
      if (objetoJuegoEscogido.objetoId == objetoJu.objetoId && objetoJuegoEscogido.escenaId == objetoJu.escenaId) {
        objetoJuegoEscogido.principal = true;
      }
    });
    Swal.fire("Has escogido el objeto " + objeto.nombre + " como principal.", "", "success");
    this.objetosEnigmaEscogidos = [];
  }
  editarEnigma(objeto: ObjetoGlobalEscape, objetoModal) {

    this.tituloObjetoEnigma = objeto.nombre;
    this.objetoEnigmaModificarGlobal = objeto;

    if (objeto.tipo == "objetoEscape") {
      Swal.fire("No se puede editar un objeto escape", "", "info");
    } else {
      this.editarObjetoEnigmaVar = true;
      this.modal.open(objetoModal, { centered: true, size: "lg" });
    }
  }
  modificarObjeto() {

    Swal.fire({
      title: this.objetoEnigmaModificarGlobal.nombre,
      text: '¿Estás seguro de la configuración del objeto?',
      confirmButtonText: 'Sí',
      showCancelButton: true,
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.value == true) {
        this.objetosJuegoEscogidos.forEach(objeto => {
          if (objeto.objetoId == this.objetoEnigmaModificarGlobal.id) {
            objeto.pregunta = this.editObject.value.pregunta;
            objeto.respuesta = this.editObject.value.respuesta;
          }
        });
      }
    });

  }
  verObjetosRequisito(objetos) {
    this.objetosRequisitadosModal = true;
    this.dataSource = new MatTableDataSource(this.objetosSinRequisitos);
    this.modal.open(objetos, { centered: true, size: "lg" });
  }
  escogerObjetoRequisito(objeto: ObjetoGlobalEscape) {
    let bool: boolean = false;
    this.objetosSinRequisitos.forEach((value, index) => {
      if (value == objeto) {
        this.objetosSinRequisitos.splice(index, 1);
        bool = true;
      }
    });
    if (!bool) {
      Swal.fire("Este objeto ya esta escogido.", "", "warning");
    } else {
      Swal.fire({
        title: objeto.nombre,
        text: '¿Estás seguro de la configuración del objeto?',
        confirmButtonText: 'Sí',
        showCancelButton: true,
        cancelButtonText: 'No'
      }).then((result) => {
        if (result.value == true) {
          this.objetosJuegoEscogidos.forEach(objetoJ => {
            if (objetoJ.objetoId == objeto.id) {
              objetoJ.requerido = true;
              objetoJ.requeridoEscenaId = this.numeroEscena;
            }
          });
        }
      });

    }
  }
  verPistaParaCrear(objetoModal) {
    this.modal.open(objetoModal, { centered: true, size: "lg" });
  }
  crearPista() {
    this.pista = new ObjetoJuego(1, 1, this.editPista.value.texto, "string", false, false, false, 1, 1, 1, false, true, 1);
    Swal.fire("¡Creada!", "", "success");
  }
  crearJuegoDeEscapeRoom() {

    Swal.fire({
      title: "Escena " + this.numeroEscena,
      text: '¿Estás seguro de la configuración de la escena?',
      confirmButtonText: 'Sí',
      showCancelButton: true,
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.value == true) {

        let escenaEscape: EscenaDeJuego;

        //  console.clear();
        escenaEscape = new EscenaDeJuego(this.escenarioEscapeRoom.id, this.numeroEscena);

        console.log("Numero de escena: ", this.numeroEscena);
        console.log("Escena: ", escenaEscape);
        console.log("ObjetosJuego para esta escena: ", this.objetosJuegoEscogidos);
        this.listaEscenasEscape.push(escenaEscape);

        if (this.numeroEscena < this.numeroDeEscenasSeleccionadas) {

          this.posicionesEscape = [1, 2, 3];
          this.posicionesEnigma = [4, 5];

          this.objetosEscogidos = [];
          this.objetosEnigmaEscogidosGlobal = [];

          this.numeroEscena = this.numeroEscena + 1;
          Swal.fire("Escena configurada!", "", "success");
        }
        else {

          //CREAR ESCAPE ROOM

          this.peticionesAPI.CreaJuegoDeEscapeRoom(this.juegoEscape, this.grupo.id).subscribe({

            next: data => {
              this.juegoEscape = data;
              console.log("This.juego: ", this.juegoEscape);

              // CREAR ALUMNO
              this.alumnosGrupo.forEach(alumno => {
                let alumnoEscape: AlumnoJuegoEscapeRoom = new AlumnoJuegoEscapeRoom(alumno.id, "Sin escoger", this.juegoEscape.id, 1);
                this.peticionesAPI.InscribeAlumnoJuegoEscapeRoom(alumnoEscape).subscribe({
                  next: data => {
                    console.log("Bien!", data);
                  },
                  error: error => {
                    console.log("Error!", error);
                  }
                });

              });

              let partidaEscape: PartidaEscape;

              console.log("Lista escenas: ", this.listaEscenasEscape);

              //CREAR ESCENAS
              this.listaEscenasEscape.forEach(escena => {

                console.log("Escena: ", escena);

                //PEDIR SI YA HAY UNA ESCENA CON ESA POSICION Y ESE ESCENARIO
                this.peticionesAPI.DameEscenasEscapeConEsteEscenario(escena.escenarioId, escena.posicion).subscribe({

                  next: data => {
                    let escenaEscapeDevuelto: EscenaDeJuego = new EscenaDeJuego();
                    escenaEscapeDevuelto = data;

                    console.log("Escena devuelta: ", escenaEscapeDevuelto);

                    //CASO AFIRMATIVO
                    if (escenaEscapeDevuelto[0] != undefined && escenaEscapeDevuelto[0] != null) {

                      //CREAR PARTIDA POR ESTA ESCENA
                      partidaEscape = new PartidaEscape(this.juegoEscape.id, escenaEscapeDevuelto[0].id, escenaEscapeDevuelto[0].posicion);
                      this.peticionesAPI.CrearPartidaEscape(partidaEscape).subscribe({
                        next: data => {
                          console.log("Partida creada correctamente (Partida): ", data);
                        },
                        error: error => {
                          console.log("Error al crear partida: ", error);
                          Swal.fire("¡Error al crear la partida!", "", "error");
                        }
                      });

                      //PEDIR OBEJETO GLOBAL LLAVE PARA PODER CREARLA
                      this.peticionesAPI.DameObjetoLlaveGlobal("Llave").subscribe({
                        next: data => {
                          console.log("Llave devuelta 1: ", data);
                          let llave: ObjetoJuego = new ObjetoJuego(data[0].id, escenaEscapeDevuelto[0].escenarioId, "string", "string", false, false, false,1, this.juegoEscape.id, escenaEscapeDevuelto[0].id, false, true, escenaEscapeDevuelto[0].id);

                          //CREAR LLAVE
                          console.log("LLAVE: ", llave);
                          this.peticionesAPI.CrearObjetoJuego(llave).subscribe({
                            next: data => {
                              console.log("Llave creada: ", data);
                              //DAME PISTA GLOBAL PARA PODER CREARLA
                              this.peticionesAPI.DameObjetoPistaGlobal("Pista").subscribe({
                                next: data => {
                                  let pistaDevueltaGlobal: ObjetoJuego;
                                  pistaDevueltaGlobal = data[0];
                                  console.log("Pista devuelta: ", pistaDevueltaGlobal);

                                  let pista: ObjetoJuego = new ObjetoJuego(pistaDevueltaGlobal.id, escenaEscapeDevuelto[0].escenarioId, this.pista.pregunta, "string", false, false, false, 1, this.juegoEscape.id, escenaEscapeDevuelto[0].id, false, true, escenaEscapeDevuelto[0].id);

                                  //CREAR PISTA
                                  console.log("PISTA: ", pista);
                                  this.peticionesAPI.CrearObjetoJuego(pista).subscribe({
                                    next: data => {
                                      console.log("Pista creada: ", data);
                                      //UNA VEZ CREADA LA PISTA Y LA LLAVE, CREAMOS OBJETOS GLOBALES
                                      this.objetosJuegoEscogidos.forEach(objeto => {
                                        console.log("Objeto dentro de los objetos juego escogidos: ", objeto);
                                        if (objeto.escenaId == escenaEscapeDevuelto[0].id) {
                                          objeto.juegoDeEscapeRoomId = this.juegoEscape.id;
                                          console.log("Objeto con el juego: ", objeto);
                                          this.peticionesAPI.CrearObjetoJuego(objeto).subscribe({
                                            next: data => {
                                              console.log("Creado correctamente el objeto: ", data);

                                            }, error: error => {
                                              console.log("Error al crear objeto: ", error);
                                              Swal.fire("Error al crear objeto.", "", "error");
                                            }
                                          });
                                        }
                                      });
                                    },
                                    error: error => {
                                      console.log("Error al crear pista: ", error);
                                      Swal.fire("Error al crear pista.", "", error);
                                    }


                                  });
                                },
                                error: error => {
                                  console.log("Error al coger llave: ", error);
                                  Swal.fire("Error al coger objeto pista.", "", "error");
                                }
                              });
                            },
                            error: error => {
                              console.log("Error al crear lleva: ", error);
                              Swal.fire("¡Error al crear objeto llave!", "", "error");
                            }

                          });
                        },
                        error: error => {
                          console.log("Error al coger la llave: ", error);
                          Swal.fire("Error al coger la llave.", "", "error");
                        }
                      });

                    }
                    else {

                      //CREAR ESCENA ESCAPE CUANDO NO HAY UNA IGUAL
                      this.peticionesAPI.CrearEscenaEscapeRoom(escena).subscribe({

                        next: data => {

                          let escenaDevuelta: EscenaDeJuego;

                          escenaDevuelta = data;

                          console.log("Escena devuelta cuando la creas: ", escenaDevuelta);

                          //CREAR PARTIDA
                          partidaEscape = new PartidaEscape(this.juegoEscape.id, escenaDevuelta.id, escenaDevuelta.posicion);
                          this.peticionesAPI.CrearPartidaEscape(partidaEscape).subscribe({
                            next: data => {
                              console.log("Data al crear partida: ", data);
                            },
                            error: error => {
                              console.log("Error al crear partida: ", error);
                              Swal.fire("Error al crear partida.", "", "error");
                            }
                          });

                          //PEDIR LLAVE
                          this.peticionesAPI.DameObjetoLlaveGlobal("Llave").subscribe({

                            next: data => {
                              console.log("Llave devuelta: ", data[0]);
                              let llaveDevueltaGlobal: ObjetoGlobalEscape;

                              llaveDevueltaGlobal = data[0];
                              //CREAR LLAVE
                              let llave: ObjetoJuego = new ObjetoJuego(llaveDevueltaGlobal.id, escenaDevuelta.escenarioId, "string", "string", false, false, false, 1, this.juegoEscape.id, escenaDevuelta.id, false, true, escenaDevuelta.id);
                              console.log("Llavee: ", llave);

                              this.peticionesAPI.CrearObjetoJuego(llave).subscribe({

                                next: data => {

                                  console.log("Data: ", data);

                                  //PEDIR PISTA
                                  this.peticionesAPI.DameObjetoPistaGlobal("Pista").subscribe({

                                  next: data => {
                                    console.log("Data pista: ", data[0]);
                                    let pistaDevueltaGlobal: ObjetoGlobalEscape;

                                    pistaDevueltaGlobal = data[0];

                                    let pista: ObjetoJuego = new ObjetoJuego(pistaDevueltaGlobal.id, escenaDevuelta.escenarioId, "Estate atento a todo tu alrededor.", "string", false, false, false, 1, this.juegoEscape.id, escenaDevuelta.id, false, true, escenaDevuelta.id);

                                    //CREAR PISTA
                                    console.log("Pistaa: ", pista);
                                    this.peticionesAPI.CrearObjetoJuego(pista).subscribe({
                                      
                                      next: data =>{

                                      console.log("Data en crear pista: ", data);
                                            //CREAR OBJETOS JUEGO
                                      this.objetosJuegoEscogidos.forEach(objeto => {
                                        if (objeto.escenaId == escenaDevuelta.id) {
                                          objeto.juegoDeEscapeRoomId = this.juegoEscape.id;
                                          this.peticionesAPI.CrearObjetoJuego(objeto).subscribe({
                                            next: data => {
                                              console.log("Creado objeto correctamente: ", data);
                                            }, error: error => {
                                              console.log("Error al crear objeto: ", error);
                                              Swal.fire("Error al crear objeto.", "", "error");
                                            }
                                          });
                                        }
                                      });
                                      }, error: error => {
                                        console.log("Error crear pista: ", error),
                                        Swal.fire("Error al crear pista,","","error");
                                      }
                                    });
                                  }, error: error => {
                                    console.log("Error al coger pista.", error);
                                    Swal.fire("Error al coger pista!", "", "error");
                                  }
                                  });
                                },
                                error: error => {
                                  console.log("Error al crear objeto llave.", error);
                                  Swal.fire("Error al crear objeto llave.", "", "error");
                                }

                              });
                            }, error: error => {
                              console.log("Error al coger llave: ", error);
                              Swal.fire("Error al coger la llave: ", "", "error");
                            }


                          });


                        },
                        error: error => {
                          console.log("Error al crear escena: ", error);
                          Swal.fire("Error al crear escena.", "", "error");
                        }

                      });
                      Swal.fire("Juego creado correctamente!", "", "success");
                    }
                  },
                  error: error => {
                    console.log("Error escena: ", error);
                    Swal.fire("Error a la función DameEscena()", "", "error");
                  }
                });
              });
            },
            error: error => {
              console.log("Error juego: ", error);
              Swal.fire("Error al crear el juego.", "", "error");
            }
          });
        }
      }
    });



  }

  verImagen(escenario: EscenarioEscapeRoom) {
    //pedir imagen a la API
    Swal.fire({
      title: escenario.mapa,
      text: 'La imagen se llama: ' + escenario.imagenId,
      imageUrl: '../../../assets/' + escenario.imagenId,
      imageWidth: 400,
      imageHeight: 200,
      confirmButtonText: 'Volver',
    }).then((result) => { });
  }

  //
  //

  escogerObjetoPrincipalModal(objetosEnigma) {
    this.objetosEnigmaModal = true;
    console.log("this.objetosEnigma: ", this.objetosEnigma);
    this.modal.open(objetosEnigma, { centered: true, size: "lg" });
    this.dataSource = new MatTableDataSource(this.objetosEnigma);
  }
  escogerObjetoPrincipal(objetoEnigma: ObjetoEnigma) {

    let objetosEnigmaVariable: ObjetoEnigma[] = [];
    let objetoEnigmaVariable: ObjetoEnigma;

    console.log("ObjetoEnigma: ", objetoEnigma);
    this.objetosEnigma.forEach(elemento => {
      if (elemento[0].id == objetoEnigma[0].id) {
        elemento[0].principal = true;
        objetoEnigmaVariable = new ObjetoEnigma(elemento[0].nombre, elemento[0].pregunta, elemento[0].respuesta, elemento[0].profesorId, elemento[0].principal, elemento[0].objetoId, "Principal");
        objetoEnigmaVariable.id = elemento[0].id;
        objetosEnigmaVariable.push(objetoEnigmaVariable);
        console.log("objeto que envio: ", objetoEnigmaVariable);
        this.peticionesAPI.EditaObjetoEnigma(objetoEnigmaVariable).subscribe(res => {
          console.log("res: ", res);
          Swal.fire("Perfect", "", "success");
        });
      }
      else {
        elemento[0].principal = false;
        objetoEnigmaVariable = new ObjetoEnigma(elemento[0].nombre, elemento[0].pregunta, elemento[0].respuesta, elemento[0].profesorId, elemento[0].principal, elemento[0].objetoId, "Principal");
        objetosEnigmaVariable.push(objetoEnigmaVariable);
        objetoEnigmaVariable.id = elemento[0].id;
        this.peticionesAPI.EditaObjetoEnigma(objetoEnigmaVariable).subscribe(res => {
          console.log("res: ", res);
          Swal.fire("Perfect", "", "success");
        });
      }
    });
    console.log("objetosEnigma: ", objetosEnigmaVariable);
    this.configuradoEscenarioPrincipal = true;
    this.escenariosSecundariosProfesor = true;
  }
  verObj(objeto: ObjetoGlobalEscape) {
    if (objeto.tipo == "objetoEscape") {
      Swal.fire({
        title: objeto.nombre,
        imageUrl: '../../../assets/' + objeto.nombre + '.png',
        imageWidth: 400,
        imageHeight: 200,
        confirmButtonText: 'Volver'
      }).then((result) => { });
    }
    else {
      console.log("emtra");
      this.objetosEnigma.forEach(elemento => {
        if (elemento[0].objetoId == objeto.id) {
          Swal.fire({
            title: objeto.nombre,
            imageUrl: '../../../assets/' + objeto.nombre + '.png',
            imageWidth: 400,
            imageHeight: 200,
            html: 'Pregunta: ' + elemento[0].pregunta + ' y la respuesta es: ' + elemento[0].respuesta,
            confirmButtonText: 'Volver',
          }).then((result) => { });
        }
      })
    }
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  verEscenario(imagen) {
    console.log("imagen: ", imagen);
    if (imagen == "Habitación") {
      this.varHelper = "habitacion";
    }
    if (imagen == "Cocina") {
      this.varHelper = "cocina";
    }
    if (imagen == "Baño") {
      this.varHelper = "baño";
    }

    //test
    this.varHelper = "imagenBase";
    imagen = "imagenBase";
    Swal.fire({
      title: imagen,
      imageUrl: '../../../assets/' + this.varHelper + '.jpg',
      imageWidth: 400,
      imageHeight: 200,
      showCancelButton: true,
      confirmButtonText: 'Asignar',
      cancelButtonText: 'Volver'
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */

      if (result.value == true) {

        if (this.tipoDeEscenarioSeleccionado != null) {

          if (this.tipoDeEscenarioSeleccionado == imagen) {
            Swal.fire({
              title: 'Ya tiene seleccionado este escenario',
              confirmButtonText: 'Volver'
            })
          } else {
            Swal.fire({
              title: 'Ya hay un escenario seleccionado, ¿Desea cambiarlo?',
              showCancelButton: true,
              confirmButtonText: 'Sí',
              cancelButtonText: 'Volver'
            }).then((result) => {
              if (result.value == true) {
                this.TipoDeEscenarioSeleccionado2(imagen);
                console.log("SELECCIONADO: ", this.tipoDeEscenarioSeleccionado);
                Swal.fire('Guardado!', '', 'success');
              } else if (result.value == undefined) {
                Swal.fire('No se han guardado los cambios', '', 'info')
              }
            })
          }
        }
        else if (this.tipoDeEscenarioSeleccionado == null) {
          this.TipoDeEscenarioSeleccionado2(imagen);
          console.log("SELECCIONADO: ", this.tipoDeEscenarioSeleccionado);
          Swal.fire('Guardado!', '', 'success');
        }
      } else if (result.value == undefined) {
        Swal.fire('No se han guardado los cambios', '', 'info')
      }
    });
  }

  TipoDeEscenarioSeleccionado2(tipo: string) {
    this.tipoDeEscenarioSeleccionado = tipo;
  }
  TipoDeEscenarioSeleccionado(tipo: ChipColor) {
    this.tipoDeEscenarioSeleccionado = tipo.nombre;
  }
  //////////////////////////////////////// FUNCIONES PARA LISTAR JUEGOS ///////////////////////////////////////////////


  // Busca la lista de juego de puntos y la clasifica entre activo e inactivo, y activa la función ListaJuegosDeColeccion

  // Función que usaremos para clicar en un juego y entrar en él,
  // Enviamos juego a la sesión
  JuegoSeleccionado(juego: Juego) {
    console.log('**************guardo juego en la sesion');
    console.log(juego);
    this.sesion.TomaJuego(juego);
    // if (juego.Tipo === 'Juego De Geocaching') {
    //   this.router.navigateByUrl ('juegoSeleccionadoPreparado');
    // }
  }


  ///////////////////////////////////////// FUNCIONES PARA CREAR JUEGO ///////////////////////////////////////////////

  // RECUPERA LOS EQUIPOS DEL GRUPO
  TraeEquiposDelGrupo() {
    this.peticionesAPI.DameEquiposDelGrupo(this.grupo.id)
      .subscribe(equipos => {
        if (equipos[0] !== undefined) {
          console.log('Hay equipos');
          this.equiposGrupo = equipos;
          console.log(this.equiposGrupo);
        } else {
          // mensaje al usuario
          console.log('Este grupo aun no tiene equipos');
        }

      });
  }

  GuardaNombreDelJuego() {
    this.nombreDelJuego = this.myForm.value.NombreDelJuego;
    console.log('Entro en guardar nombre');
    console.log(this.nombreDelJuego);
    if (this.nombreDelJuego === undefined) {
      this.tengoNombre = false;
    } else {
      this.tengoNombre = true;
      this.creandoJuego = true; // empiezo el proceso de creacion del juego
      console.log('tengo nombre ' + this.nombreDelJuego);
    }
  }


  TipoDeJuegoSeleccionado(tipo: ChipColor) {
    this.tipoDeJuegoSeleccionado = tipo.nombre;
    console.log(' tengo tipo ' + this.tipoDeJuegoSeleccionado);
    this.tengoTipo = true;
    // if (this.tipoDeJuegoSeleccionado === 'Juego De Competición') {
    //     this.NumeroDeVueltas();
    // }
  }

  // Recoge el modo de juego seleccionado y lo mete en la variable (modoDeJuegoSeleccionado), la cual se usará después
  // para el POST del juego
  ModoDeJuegoSeleccionado(modo: ChipColor) {
    this.modoDeJuegoSeleccionado = modo.nombre;
    console.log(' tengo modo ' + this.modoDeJuegoSeleccionado);
    console.log(' tengo tipo ' + this.tipoDeJuegoSeleccionado);
    if ((this.tipoDeJuegoSeleccionado === 'Juego De Cuestionario') && (this.modoDeJuegoSeleccionado === 'Equipos')) {
      Swal.fire('Alerta', 'Aún no es posible el juego de cuestionario en equipo', 'warning');
    } else if ((this.tipoDeJuegoSeleccionado === 'Juego De Avatar') && (this.modoDeJuegoSeleccionado === 'Equipos')) {
      Swal.fire('Alerta', 'Aún no es posible el juego de avatares en equipo', 'warning');
    } else if ((this.tipoDeJuegoSeleccionado === 'Juego De Geocaching') && (this.modoDeJuegoSeleccionado === 'Equipos')) {
      Swal.fire('Alerta', 'Aún no es posible el juego de geocaching en equipo', 'warning');
    } else if ((this.tipoDeJuegoSeleccionado === 'Juego De Votación') && (this.modoDeJuegoSeleccionado === 'Equipos')) {
      Swal.fire('Alerta', 'Aún no es posible el juego de votación en equipo', 'warning');
    } else if ((this.tipoDeJuegoSeleccionado === 'Juego De Cuestionario de Satisfacción') && (this.modoDeJuegoSeleccionado === 'Equipos')) {
      Swal.fire('Alerta', 'No existe el juego de cuestionario de satisfacción en equipo', 'warning');
    } else {
      if (this.modoDeJuegoSeleccionado === 'Individual') {
        if (this.alumnosGrupo === undefined) {
          Swal.fire('Alerta', 'No hay ningún alumno en este grupo', 'warning');
          console.log('No Hay alumnos, no puedo crear el juego');
        } else {
          console.log('Hay alumnos, puedo crear');
          this.tengoModo = true;
        }

      } else {
        if (this.equiposGrupo === undefined) {
          Swal.fire('Alerta', 'No hay ningún equipo en este grupo', 'warning');
          console.log('No se puede crear juego pq no hay equipos');
        } else {
          this.tengoModo = true;
          console.log('Hay equipos, puedo crear');
        }
      }
    }
  }

  // FUNCIONES PARA LA CREACION DE JUEGO DE EVALUACION
  TipoDeEvaluacionSeleccionado(tipoEvaluacion: ChipColor) {
    this.tipoDeEvaluacionSeleccionado = tipoEvaluacion.nombre;
    if (this.tipoDeEvaluacionSeleccionado === 'Todos con todos') {
      this.numeroDeMiembros = this.DameMaxSlider();
      this.HacerRelaciones(true);
    }
    this.tengoTipoDeEvaluacion = true;
  }

  RelacionDeEvaluacionSeleccionado(relacionEvaluacion: ChipColor) {
    this.relacionesEvaluacionSeleccionado = relacionEvaluacion.nombre;
    if (relacionEvaluacion.nombre === 'Aleatorio') {
      this.HacerRelaciones(true);
    } else {
      this.HacerRelaciones(false);
    }
    this.tengoRelacionEvaluacion = true;
  }
  Shuffle(a) {
    let j, x, i;
    for (i = a.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      x = a[i];
      a[i] = a[j];
      a[j] = x;
    }
    return a;
  }
  HacerRelaciones(fill: boolean) {
    const evaluados = this.DameEvaluados().map(item => item.id);
    this.relacionesMap = new Map();
    do {
      for (let i = 0; i < evaluados.length; i++) {
        if (!fill) {
          this.relacionesMap.set(evaluados[i], []);
        } else {
          let evaluadores = [];
          if (this.modoDeJuegoSeleccionado === 'Equipos' && this.equiposEvaluacionSeleccionado === 'Individualmente') {
            for (const equipo of this.relacionAlumnosEquipos) {
              if (equipo.equipoId === evaluados[i]) {
                evaluadores = this.DameEvaluadores()
                  .filter(({ id: id1 }) => !equipo.alumnos.some(({ id: id2 }) => id1 === id2))
                  .map(item => item.id);
              }
            }
          } else {
            evaluadores = this.DameEvaluadores().filter(item => item.id !== evaluados[i]).map(item => item.id);
          }
          evaluadores = this.Shuffle(evaluadores);
          if (this.modoDeJuegoSeleccionado === 'Equipos'
            && this.equiposEvaluacionSeleccionado === 'Individualmente'
            && this.tipoDeEvaluacionSeleccionado === 'Todos con todos') {
            evaluadores.length = this.alumnosGrupo.length;
          } else {
            evaluadores.length = this.numeroDeMiembros;
          }
          this.relacionesMap.set(evaluados[i], evaluadores.filter(item => !isNaN(item)));
        }
      }
    } while (this.ComprobarSiTodosTienenEvaluadores() === false && fill === true);
    console.log('Relaciones object', this.relacionesMap);
    console.log('Todos tienen evaluadores', this.todosTienenEvaluador);
  }
  RelacionChanged(id: number, value: string[]) {
    console.log('Relaciones changed', id, value);
    this.relacionesMap.set(id, value);
    console.log('Relaciones object', this.relacionesMap);
    this.ComprobarSiTodosTienenEvaluadores();
  }
  ComprobarSiTodosTienenEvaluadores() {
    let encontrado1 = false;
    let encontrado2 = false;
    if (this.modoDeJuegoSeleccionado === 'Equipos' && this.equiposEvaluacionSeleccionado === 'Individualmente') {
      this.relacionesMap.forEach((value, key) => {
        if (value.length < this.numeroDeMiembros) {
          this.comprobacionDeN = false;
          encontrado2 = true;
        }
        value.forEach(item => {
          if (this.ContarEvaluadores(item) === 0) {
            this.todosTienenEvaluador = false;
            encontrado1 = true;
          }
        });
      });
    } else {
      this.relacionesMap.forEach((value, key) => {
        if (this.ContarEvaluadores(key) === 0) {
          this.todosTienenEvaluador = false;
          encontrado1 = true;
        }
        if (value.length < this.numeroDeMiembros) {
          this.comprobacionDeN = false;
          encontrado2 = true;
        }
      });
    }
    if (!encontrado1) {
      this.todosTienenEvaluador = true;
    }
    if (!encontrado2) {
      this.comprobacionDeN = true;
    }
    return this.todosTienenEvaluador;
  }
  ContarEvaluadores(idEvaluado: number): number {
    let suma = 0;
    this.relacionesMap.forEach((value, key) => {
      if (value.includes(idEvaluado)) {
        suma++;
      }
    });
    return suma;
  }
  CriterioDeEvaluacionSeleccionado(criterioEvaluacion: ChipColor) {
    this.criterioEvaluacionSeleccionado = criterioEvaluacion.nombre;
    this.tengoCriterioEvaluacion = true;
    if (this.criterioEvaluacionSeleccionado === 'Por pesos') {
      this.pesosArray = [];
      for (let i = 0; i < this.rubricaElegida.criterios.length; i++) {
        this.pesosArray.push([]);
        this.pesosArray[i].push(this.PesoPorDefecto(this.rubricaElegida.criterios.length));
        for (let j = 0; j < this.rubricaElegida.criterios[i].elementos.length; j++) {
          this.pesosArray[i].push(this.PesoPorDefecto(this.rubricaElegida.criterios[i].elementos.length));
        }
      }
      console.log('pesos array', this.pesosArray);
    } else {
      this.penalizacionArray = [];
      for (let i = 0; i < this.rubricaElegida.criterios.length; i++) {
        this.penalizacionArray.push([]);
        if (this.rubricaElegida.criterios[i].elementos.length >= 1) {
          this.penalizacionArray[i].push({ num: 1, p: 75 });
        }
        if (this.rubricaElegida.criterios[i].elementos.length >= 2) {
          this.penalizacionArray[i].push({ num: 2, p: 50 });
        }
        if (this.rubricaElegida.criterios[i].elementos.length >= 3) {
          this.penalizacionArray[i].push({ num: 3, p: 0 });
        }
      }
      console.log('penalizacion array', this.penalizacionArray);
    }
  }
  EquipoDeEvaluacionSeleccionado(equipoEvaluacion: ChipColor) {
    this.equiposEvaluacionSeleccionado = equipoEvaluacion.nombre;
    this.tengoEquipoEvaluacion = true;
  }
  AutoevaluacionChange(isChecked: boolean) {
    this.autoevaluacion = isChecked;
  }
  ProfesorEvaluaChange(isChecked: boolean) {
    this.profesorEvalua = isChecked;
  }
  ProfesorEvaluaModoChange(value: string) {
    this.profesorEvaluaModo = value;
  }
  DameMaxSlider(): number {
    if (this.modoDeJuegoSeleccionado === 'Individual') {
      return this.alumnosGrupo.length - 1;
    } else if (this.modoDeJuegoSeleccionado === 'Equipos') {
      if (this.equiposEvaluacionSeleccionado === 'Por Equipos') {
        return this.equiposGrupo.length - 1;
      } else if (this.equiposEvaluacionSeleccionado === 'Individualmente') {
        let min = this.alumnosGrupo.length;
        for (let i = 0; i < this.relacionAlumnosEquipos.length; i++) {
          if (this.relacionAlumnosEquipos[i].alumnos.length < min) {
            min = this.relacionAlumnosEquipos[i].alumnos.length;
          }
        }
        return min;
      }
    }
  }
  DameEvaluados(): any {
    if (this.modoDeJuegoSeleccionado === 'Individual') {
      return this.alumnosGrupo;
    } else {
      return this.equiposGrupo;
    }
  }
  DameEvaluadores(): any {
    if (this.equiposEvaluacionSeleccionado === 'Por Equipos') {
      return this.equiposGrupo;
    } else {
      return this.alumnosGrupo;
    }
  }
  public DameRelacionesAlumnoEquipos() {
    return this.relacionAlumnosEquipos;
  }
  SliderChanged(value: number) {
    console.log('Slider changed to', value);
    this.numeroDeMiembros = value;
  }
  RubricaSeleccionChange(index: number) {
    console.log('Rubrica seleccionada', this.rubricas[index]);
    this.rubricaElegida = this.rubricas[index];
    this.tengoRubrica = true;
  }
  PesoPorDefecto(total: number): number {
    return parseFloat((100 / total).toFixed(2));
  }
  PesosChanged(name: string, value: string): void {
    console.log('Pesos changed', name, value);
    const criterio = name.split('-')[0];
    const elemento = name.split('-')[1];
    this.pesosArray[criterio][elemento] = parseFloat(value);
    console.log('pesos array changed', this.pesosArray);
    this.pesosSuman100 = this.PesosSuman100();
  }
  PesosParentChanged(name: string, value: string): void {
    console.log('Pesos parent changed', name, value);
    this.pesosArray[name][0] = parseFloat(value);
    console.log('pesos array changed', this.pesosArray);
    this.pesosSuman100 = this.PesosSuman100();
  }
  PesosSuman100(): boolean {
    let c = 0;
    for (let i = 0; i < this.pesosArray.length; i++) {
      let p = 0;
      for (let j = 0; j < this.pesosArray[i].length; j++) {
        if (j === 0) {
          c += this.pesosArray[i][j];
        } else {
          p += this.pesosArray[i][j];
        }
      }
      if (Math.round((p + Number.EPSILON) * 10) / 10 !== 100) {
        return false;
      }
    }
    return Math.round((c + Number.EPSILON) * 10) / 10 === 100;
  }
  PenalizacionChanged(name: string, value: string): void {
    console.log('Penalizacion changed', name, value);
    const criterio = name.split('-')[0];
    const elemento = name.split('-')[1];
    const tipo = name.split('-')[2];
    if (tipo === 'num') {
      const tmp = this.penalizacionArray[criterio][elemento].p;
      this.penalizacionArray[criterio][elemento] = { num: parseInt(value, 10), p: tmp };
    } else if (tipo === 'p') {
      const tmp = this.penalizacionArray[criterio][elemento].num;
      this.penalizacionArray[criterio][elemento] = { num: tmp, p: parseInt(value, 10) };
    }
    console.log('penalizacion array', this.penalizacionArray);
  }
  CrearJuegoEvaluacion() {
    let evaluadores: number;
    if (this.tipoDeEvaluacionSeleccionado === 'Todos con todos') {
      evaluadores = 0;
    } else {
      evaluadores = this.numeroDeMiembros;
    }
    const juego: JuegoDeEvaluacion = new JuegoDeEvaluacion(
      null,
      this.nombreDelJuego,
      'Evaluacion',
      this.modoDeJuegoSeleccionado,
      true,
      false,
      this.profesorEvalua,
      this.profesorEvaluaModo === 'normal',
      this.autoevaluacion,
      evaluadores,
      this.pesosArray,
      this.criterioEvaluacionSeleccionado === 'Por pesos',
      this.penalizacionArray,
      this.rubricaElegida.id,
      this.profesorId,
      this.grupo.id
    );
    console.log('Creando Juego de Evaluacion', juego);
    this.peticionesAPI.CrearJuegoDeEvaluacion(juego).subscribe(res => {
      console.log('JuegoDeEvaluacionCreado', res);
      Swal.fire('Juego de Evaluación creado correctamente', ' ', 'success');
      this.juego = res;
      this.sesion.TomaJuego(this.juego);
      this.juegoCreado = true;
      this.relacionesMap.forEach((value: number[], key: number) => {
        if (this.modoDeJuegoSeleccionado === 'Equipos' && this.equiposEvaluacionSeleccionado === 'Por Equipos') {
          const equipo: EquipoJuegoEvaluado = new EquipoJuegoEvaluado(
            null,
            res.id,
            key,
            value,
            null,
            null
          );
          this.peticionesAPI.CrearEquipoJuegoDeEvaluacion(equipo).subscribe(equipores => console.log('EquipoJuegoEvaluado', equipores));
        } else if (this.modoDeJuegoSeleccionado === 'Equipos' && this.equiposEvaluacionSeleccionado === 'Individualmente') {
          const equipo: EquipoJuegoEvaluado = new EquipoJuegoEvaluado(
            null,
            res.id,
            key,
            null,
            value,
            null
          );
          this.peticionesAPI.CrearEquipoJuegoDeEvaluacion(equipo).subscribe(equipores => console.log('EquipoJuegoEvaluado', equipores));
        } else if (this.modoDeJuegoSeleccionado === 'Individual') {
          const alumno: AlumnoJuegoEvaluado = new AlumnoJuegoEvaluado(
            null,
            res.id,
            key,
            value,
            null
          );
          this.peticionesAPI.CrearAlumnoJuegoDeEvaluacion(alumno).subscribe(alumnosres => console.log('AlumnoJuegoEvaluado', alumnosres));
        }
      });

      // El juego se ha creado como activo. Lo añadimos a la lista correspondiente
      if (this.juegosActivos === undefined) {
        // Si la lista aun no se ha creado no podre hacer el push
        this.juegosActivos = [];
      }
      this.juegosActivos.push(this.juego);
      this.Limpiar();
      // Regresamos a la lista de equipos (mat-tab con índice 0)
      this.tabGroup.selectedIndex = 0;
    });
  }

  // FUNCIONES PARA LA CREACION DE JUEGO DE PUNTOS
  RecibeTiposDePuntos($event) {
    this.puntosDelJuego = $event;
    console.log('ya tengo los puntos');
    console.log(this.puntosDelJuego);
  }
  RecibeNivel($event) {
    this.nivelesDelJuego.push($event.n);
    if ($event.l !== undefined) {
      this.logosNiveles.push($event.l);
    }
    console.log('ya tengo los niveles');
    console.log(this.nivelesDelJuego);
    console.log(this.logosNiveles);
  }

  // Función que usaremos para crear un juego de puntos.
  CrearJuegoDePuntos() {
    // primero creamos el juego
    this.peticionesAPI.CreaJuegoDePuntos(new Juego(this.tipoDeJuegoSeleccionado, this.modoDeJuegoSeleccionado,
      undefined, undefined, undefined, undefined, undefined, undefined, undefined, this.nombreDelJuego), this.grupo.id)
      .subscribe(juegoCreado => {
        this.juego = juegoCreado;
        this.sesion.TomaJuego(this.juego);
        this.juegoCreado = true;
        // Ahora asignamos los puntos
        // tslint:disable-next-line:max-line-length
        this.puntosDelJuego.forEach(punto =>
          this.peticionesAPI.AsignaPuntoJuego(new AsignacionPuntosJuego(punto.id, this.juego.id))
            .subscribe()
        );
        // asignamos los niveles
        if (this.nivelesDelJuego !== undefined) {
          this.nivelesDelJuego.forEach(nivel =>
            this.peticionesAPI.CreaNivel(nivel, this.juego.id)
              .subscribe()
          );
          // Guardamos los logos de los niveles
          this.logosNiveles.forEach(logo =>
            this.peticionesAPI.PonImagenNivel(logo)
              .subscribe()
          );
        }

        // Inscribo los participantes en el juego
        if (this.modoDeJuegoSeleccionado === 'Individual') {
          console.log('Voy a inscribir a los alumnos del grupo 1');

          // tslint:disable-next-line:prefer-for-of
          for (let i = 0; i < this.alumnosGrupo.length; i++) {
            console.log(this.alumnosGrupo[i]);
            this.peticionesAPI.InscribeAlumnoJuegoDePuntos(new AlumnoJuegoDePuntos(this.alumnosGrupo[i].id, this.juego.id))
              .subscribe();
          }
        } else {
          console.log('Voy a inscribir los equipos del grupo');

          // tslint:disable-next-line:prefer-for-of
          for (let i = 0; i < this.equiposGrupo.length; i++) {
            console.log(this.equiposGrupo[i]);
            this.peticionesAPI.InscribeEquipoJuegoDePuntos(new EquipoJuegoDePuntos(this.equiposGrupo[i].id, this.juego.id))
              .subscribe();
          }
        }
        Swal.fire('Juego de puntos creado correctamente', ' ', 'success');

        // El juego se ha creado como activo. Lo añadimos a la lista correspondiente
        if (this.juegosActivos === undefined) {
          // Si la lista aun no se ha creado no podre hacer el push
          this.juegosActivos = [];
        }
        this.juegosActivos.push(this.juego);
        this.Limpiar();
        // Regresamos a la lista de equipos (mat-tab con índice 0)
        this.tabGroup.selectedIndex = 0;
      });
  }

  /// FUNCIONES PARA LA CREACION DE JUEGO DE COLECCIÓN

  // Recibo el nombre de la colección elegida en el componente hijo
  RecibeColeccion($event) {
    this.coleccionSeleccionada = $event;
    this.tengoColeccion = true;
  }
  CrearJuegoDeColeccion() {
    this.peticionesAPI.CreaJuegoDeColeccion(new Juego(this.tipoDeJuegoSeleccionado, this.modoDeJuegoSeleccionado, this.modoAsignacion,
      this.coleccionSeleccionada.id, undefined, undefined, undefined, undefined, undefined, this.nombreDelJuego), this.grupo.id)
      .subscribe(juegoCreado => {
        this.juego = juegoCreado;
        console.log(juegoCreado);
        console.log('Juego creado correctamente');
        this.sesion.TomaJuego(this.juego);
        this.juegoCreado = true;
        // Asignamos a los participantes en el juego
        if (this.modoDeJuegoSeleccionado === 'Individual') {
          // tslint:disable-next-line:prefer-for-of
          for (let i = 0; i < this.alumnosGrupo.length; i++) {
            this.peticionesAPI.InscribeAlumnoJuegoDeColeccion(new AlumnoJuegoDeColeccion(this.alumnosGrupo[i].id, this.juego.id))
              .subscribe();
          }
        } else {
          // tslint:disable-next-line:prefer-for-of
          for (let i = 0; i < this.equiposGrupo.length; i++) {
            this.peticionesAPI.InscribeEquipoJuegoDeColeccion(new EquipoJuegoDeColeccion(this.equiposGrupo[i].id, this.juego.id))
              .subscribe();
          }
        }
        Swal.fire('Juego de colección creado correctamente', ' ', 'success');

        // El juego se ha creado como activo. Lo añadimos a la lista correspondiente
        if (this.juegosActivos === undefined) {
          // Si la lista aun no se ha creado no podre hacer el push
          this.juegosActivos = [];
        }
        this.juegosActivos.push(this.juego);
        this.Limpiar();
        // Regresamos a la lista de equipos (mat-tab con índice 0)
        this.tabGroup.selectedIndex = 0;
        // Notificación para los miembros del grupo
        // console.log ('envio notificación los miembros del grupo');
        // this.comService.EnviarNotificacionGrupo (
        //      this.grupo.id,
        //      'Nuevo juego de colección para el grupo ' + this.grupo.Nombre
        // );
        console.log('envio notificación los miembros del grupo');
        this.comService.EnviarNotificacionGrupo(
          this.grupo.id,
          'Nuevo juego de colección para el grupo ' + this.grupo.nombre
        );

      });
  }

  escogerEnigma() {

    this.objetoEnigma = new ObjetoEnigma("cajaFuerte", "", "");
    Swal.fire({
      title: "Pregunta",
      text: "¿Cual es la pregunta que tiene que responder el alumno para obtener el código?",
      input: "text",
      inputAttributes: {
        autocapitalize: 'off'
      },
      showCancelButton: true,
      confirmButtonText: 'Asignar',
      showLoaderOnConfirm: true,
      cancelButtonText: 'Volver'
    }).then((result) => {
      if (result.value != undefined) {
        this.objetoEnigma.pregunta = result.value;

        Swal.fire({
          title: "Respuesta",
          text: "¿Cual es la respuesta correcta que tiene que dar el alumno para obtener el enigma?",
          input: "text",
          inputAttributes: {
            autocapitalize: 'off'
          },
          showCancelButton: true,
          confirmButtonText: 'Asignar',
          showLoaderOnConfirm: true,
          cancelButtonText: 'Volver'
        }).then((result) => {
          if (result.value != undefined) {
            this.objetoEnigma.respuesta = result.value;

            Swal.fire('Enigma creado correctamente', ' ', 'success');
          } else {
            Swal.fire('No se ha creado el enigma', ' ', 'info');
          }
        });
      } else {
        Swal.fire('No se ha creado el enigma', ' ', 'info');
      }
    });
    this.sesion.TomaObjetoEnigma(this.objetoEnigma);
    console.log("Dame objeto enigma: ", this.sesion.DameObjetoEnigma());
  }


  //// FUNCIONES PARA LA CREACION DE JUEGO DE CUESTIONARIO
  AbrirDialogoAgregarCuestionario(): void {
    const dialogRef = this.dialog.open(AsignaCuestionarioComponent, {
      width: '70%',
      height: '80%',
      position: {
        top: '0%'
      },
      // Pasamos los parametros necesarios
      data: {
        profesorId: this.profesorId
      }
    });
    dialogRef.afterClosed().subscribe(() => {
      this.cuestionario = this.sesion.DameCuestionario();
      this.tengoCuestionario = true;
      console.log('CUESTIONARIO SELECCIONADO --->' + this.cuestionario.titulo);
    });
  }

  // Para habilitar el boton de guardar puntuaciones
  TengoPuntuaciones() {
    if (this.myForm.value.PuntuacionCorrecta === '' || this.myForm.value.PuntuacionIncorrecta === '') {
      return false;
    } else {
      return true;
    }
  }
  GuardarPuntuacion() {
    this.puntuacionCorrecta = this.myForm.value.PuntuacionCorrecta;
    this.puntuacionIncorrecta = this.myForm.value.PuntuacionIncorrecta;
  }
  GuardarModoPresentacion(modoPresentacion) {
    this.modoPresentacion = modoPresentacion;
    this.tengoModoPresentacion = true;
  }
  GuardarTiempoLimite() {
    this.tiempoLimite = this.myForm.value.TiempoLimite;
    if (this.tiempoLimite === undefined) {
      this.tiempoLimite = 0;
    }
  }
  TipoDeJuegoDeCuestionarioSeleccionado(tipoJuegoCuestionario: ChipColor) {
    this.tipoDeJuegoDeCuestionarioSeleccionado = tipoJuegoCuestionario.nombre;
    this.tengoTipoJuegoCuestionario = true;
  }
  CrearJuegoDeCuestionario() {

    // Tengo que crear un juego de tipo JuegoDeCuestionario y no uno de tipo Juego, como en los casos
    // anteriores. La razón es que no están bien organizado el tema de que los modelos de los diferentes juegos
    // tomen como base el modelo Juego genérico. De momento se queda así.


    // tslint:disable-next-line:max-line-length
    this.peticionesAPI.CreaJuegoDeCuestionario(new JuegoDeCuestionario(this.nombreDelJuego, this.tipoDeJuegoSeleccionado, this.tipoDeJuegoDeCuestionarioSeleccionado, this.puntuacionCorrecta,
      this.puntuacionIncorrecta, this.modoPresentacion,
      false, false, this.profesorId, this.grupo.id, this.cuestionario.id, this.tiempoLimite), this.grupo.id)
      .subscribe(juegoCreado => {
        this.juegoDeCuestionario = juegoCreado;
        // Inscribimos a los alumnos (de momento no hay juego de cuestionario por equipos)
        // tslint:disable-next-line:prefer-for-of
        for (let i = 0; i < this.alumnosGrupo.length; i++) {
          // tslint:disable-next-line:max-line-length
          this.peticionesAPI.InscribeAlumnoJuegoDeCuestionario(new AlumnoJuegoDeCuestionario(0, false, this.juegoDeCuestionario.id, this.alumnosGrupo[i].id))
            .subscribe();
        }
        Swal.fire('Juego de cuestionario creado correctamente', ' ', 'success');

        // El juego se ha creado como activo. Lo añadimos a la lista correspondiente
        if (this.juegosPreparados === undefined) {
          // Si la lista aun no se ha creado no podre hacer el push
          this.juegosPreparados = [];
        }
        this.juegosPreparados.push(this.juegoDeCuestionario);
        this.Limpiar();
        // Regresamos a la lista de equipos (mat-tab con índice 0)
        this.tabGroup.selectedIndex = 0;

      });
  }

  //// FUNCIONES PARA LA CREACION DE UN JUEGO DE AVATARES
  RecibeFamiliasElegidas($event) {
    this.familiasElegidas = $event;
    this.tengoFamilias = true;
  }
  CrearJuegoDeAvatar() {

    const juego = new JuegoDeAvatar(this.nombreDelJuego,
      this.tipoDeJuegoSeleccionado,
      this.modoDeJuegoSeleccionado,
      true);
    juego.familias = this.familiasElegidas;
    juego.criteriosPrivilegioComplemento1 = this.myForm.value.criterioPrivilegioComplemento1;
    juego.criteriosPrivilegioComplemento2 = this.myForm.value.criterioPrivilegioComplemento2;
    juego.criteriosPrivilegioComplemento3 = this.myForm.value.criterioPrivilegioComplemento3;
    juego.criteriosPrivilegioComplemento4 = this.myForm.value.criterioPrivilegioComplemento4;
    juego.criteriosPrivilegioVoz = this.myForm.value.criterioPrivilegioVoz;
    juego.criteriosPrivilegioVerTodos = this.myForm.value.criterioPrivilegioVerTodos;
    this.peticionesAPI.CreaJuegoDeAvatar(juego, this.grupo.id)
      .subscribe(nuevoJuego => {
        this.juegoDeAvatar = nuevoJuego;
        // Ahora inscribimos en el juego a los participantes
        if (this.modoDeJuegoSeleccionado === 'Individual') {

          console.log('Voy a inscribir a los alumnos del grupo');
          // tslint:disable-next-line:max-line-length
          if (this.modoDeJuegoSeleccionado === 'Individual') {
            console.log('Voy a inscribir a los alumnos del grupo');
            // tslint:disable-next-line:prefer-for-of
            for (let i = 0; i < this.alumnosGrupo.length; i++) {
              // tslint:disable-next-line:max-line-length
              console.log('inscribo');
              this.peticionesAPI.InscribeAlumnoJuegoDeAvatar(new AlumnoJuegoDeAvatar(this.alumnosGrupo[i].id, this.juegoDeAvatar.id))
                .subscribe();
            }
          } else {
            // Inscribo a los equipos
          }
          Swal.fire('Juego de avatares creado correctamente', ' ', 'success');

          // El juego se ha creado como activo. Lo añadimos a la lista correspondiente
          if (this.juegosActivos === undefined) {
            // Si la lista aun no se ha creado no podre hacer el push
            this.juegosActivos = [];
          }
          this.juegosActivos.push(this.juegoDeAvatar);
          this.Limpiar();
          // Regresamos a la lista de equipos (mat-tab con índice 0)
          this.tabGroup.selectedIndex = 0;
        }
      });
  }

  // FUNCIONES PARA CREAR JUEGO DE COMPETICION
  TipoDeCompeticionSeleccionado(tipoCompeticion: ChipColor) {
    this.tipoDeCompeticionSeleccionado = tipoCompeticion.nombre;
    this.tengoTipoDeCompeticion = true;
  }
  GuardarNumeroDeJornadas() {
    this.numeroDeJornadas = this.myForm.value.NumeroDeJornadas;
    if (this.numeroDeJornadas === undefined || isNaN(this.numeroDeJornadas)) {
      this.tengoNumeroDeJornadas = false;
      Swal.fire('Introduzca un número de jornadas válido', 'Le recordamos que debe ser un número', 'error');
    } else {
      console.log('tengo numero');
      this.tengoNumeroDeJornadas = true;
    }
  }
  GuardarNuevaPuntuacion() {
    this.nuevaPuntuacion = this.myForm.value.NuevaPuntuacion;
    console.log('tengo nueva puntuacion ' + this.nuevaPuntuacion);
    this.tengoNuevaPuntuacion = true;
  }
  Preparado() {
    if ((this.tengoNuevaPuntuacion) && (this.selection.selected.length > 0)) {
      return true;
    } else {
      return false;
    }
  }
  AnadirPuntos() {
    console.log('nueva puntuiacion');
    console.log(this.nuevaPuntuacion);
    if (!isNaN(this.nuevaPuntuacion)) {
      for (let i = 0; i < this.dataSource.data.length; i++) {
        // Buscamos los alumnos que hemos seleccionado
        if (this.selection.isSelected(this.dataSource.data[i])) {
          this.Puntuacion[i] = this.nuevaPuntuacion;
          this.TablaPuntuacion[i].puntuacion = this.nuevaPuntuacion;
        }
      }
    } else {
      Swal.fire('Introduzca una puntuación válida', 'Le recordamos que debe ser un Número', 'error');
    }
    this.dataSource = new MatTableDataSource(this.TablaPuntuacion);
    this.selection.clear();
    this.tengoNuevaPuntuacion = false;
  }
  AnadirFila() {

    let i: number;
    let NumeroParticipantes: number;
    i = this.Puntuacion.length;
    console.log(i);
    console.log(this.Puntuacion);
    if (this.modoDeJuegoSeleccionado === 'Individual') {
      NumeroParticipantes = this.alumnosGrupo.length;
    } else {
      NumeroParticipantes = this.equiposGrupo.length;
    }

    if (i < NumeroParticipantes) {
      this.TablaPuntuacion[i] = new TablaPuntosFormulaUno(i + 1, 1);
      this.Puntuacion[i] = this.TablaPuntuacion[i].puntuacion;
      console.log(this.TablaPuntuacion[i]);

      this.dataSource = new MatTableDataSource(this.TablaPuntuacion);
    } else {
      Swal.fire('No es posible añadir otra fila', 'Ya puntuan todos los participantes', 'error');
    }

  }
  EliminarFila() {

    let i: number;
    i = this.Puntuacion.length;
    console.log(i);
    console.log(this.Puntuacion);
    if (i > 1) {
      this.TablaPuntuacion = this.TablaPuntuacion.splice(0, i - 1);
      this.Puntuacion = this.Puntuacion.slice(0, i - 1);
      console.log(this.TablaPuntuacion);
      console.log(this.Puntuacion);

      this.dataSource = new MatTableDataSource(this.TablaPuntuacion);
    } else {
      Swal.fire('No es posible eliminar otra fila', 'Como mínimo debe puntuar un participante', 'error');
    }

  }
  CrearJuegoDeCompeticionLiga() {

    // tslint:disable-next-line:max-line-lengtholean)
    this.peticionesAPI.CreaJuegoDeCompeticionLiga(new Juego(this.tipoDeJuegoSeleccionado + ' ' + this.tipoDeCompeticionSeleccionado,
      this.modoDeJuegoSeleccionado, undefined, undefined, true, this.numeroDeJornadas,
      this.tipoDeCompeticionSeleccionado,
      undefined, undefined, this.nombreDelJuego), this.grupo.id)
      .subscribe(juegoCreado => {
        this.juego = juegoCreado;
        this.sesion.TomaJuego(this.juego);
        this.juegoCreado = true;
        // Creamos las jornadas
        console.log('voy a crear jornadas');
        this.calculos.CrearJornadasLiga(this.numeroDeJornadas, this.juego.id)
          .subscribe(jornadas => {
            this.jornadasLiga = jornadas;
            console.log('Jornadas creadas correctamente');
            console.log(this.jornadasLiga);
            console.log(this.jornadasLiga.length);

            if (this.modoDeJuegoSeleccionado === 'Individual') {
              // tslint:disable-next-line:max-line-length
              this.calculos.calcularLiga(this.alumnosGrupo.length, this.jornadasLiga.length, this.alumnosGrupo, this.grupo.id, this.jornadasLiga);
              // tslint:disable-next-line:prefer-for-of
              for (let i = 0; i < this.alumnosGrupo.length; i++) {
                // tslint:disable-next-line:max-line-length
                this.peticionesAPI.InscribeAlumnoJuegoDeCompeticionLiga(new AlumnoJuegoDeCompeticionLiga(this.alumnosGrupo[i].id, this.juego.id))
                  .subscribe();
              }
            } else {

              // tslint:disable-next-line:max-line-length
              this.calculos.calcularLiga(this.equiposGrupo.length, this.jornadasLiga.length, this.equiposGrupo, this.grupo.id, this.jornadasLiga);

              // tslint:disable-next-line:prefer-for-of
              for (let i = 0; i < this.equiposGrupo.length; i++) {
                // tslint:disable-next-line:max-line-length
                this.peticionesAPI.InscribeEquipoJuegoDeCompeticionLiga(new EquipoJuegoDeCompeticionLiga(this.equiposGrupo[i].id, this.juego.id))
                  .subscribe();
              }
            }
            Swal.fire('Juego de competición tipo liga creado correctamente', ' ', 'success');
            // El juego se ha creado como activo. Lo añadimos a la lista correspondiente
            if (this.juegosActivos === undefined) {
              // Si la lista aun no se ha creado no podre hacer el push
              this.juegosActivos = [];
            }
            this.juegosActivos.push(this.juego);
            this.Limpiar();
            // Regresamos a la lista de equipos (mat-tab con índice 0)
            this.tabGroup.selectedIndex = 0;
          });
      });
  }
  CrearJuegoDeCompeticionFormulaUno() {
    // tslint:disable-next-line:max-line-length
    this.peticionesAPI.CreaJuegoDeCompeticionFormulaUno(new Juego(this.tipoDeJuegoSeleccionado + ' ' + this.tipoDeCompeticionSeleccionado,
      this.modoDeJuegoSeleccionado, undefined, undefined, true, this.numeroDeJornadas,
      undefined, this.Puntuacion.length,
      this.Puntuacion, this.nombreDelJuego), this.grupo.id)
      .subscribe(juegoCreado => {
        this.juego = juegoCreado;
        this.sesion.TomaJuego(this.juego);
        this.juegoCreado = true;
        this.calculos.CrearJornadasFormulaUno(this.numeroDeJornadas, this.juego.id)
          .subscribe(jornadas => {
            this.jornadasFormulaUno = jornadas;
            this.sesion.TomaDatosJornadasJuegoComponent(this.jornadasFormulaUno);

            // inscribo a los participantes
            if (this.modoDeJuegoSeleccionado === 'Individual') {

              // tslint:disable-next-line:prefer-for-of
              for (let i = 0; i < this.alumnosGrupo.length; i++) {
                // tslint:disable-next-line:max-line-length
                this.peticionesAPI.InscribeAlumnoJuegoDeCompeticionFormulaUno(new AlumnoJuegoDeCompeticionFormulaUno(this.alumnosGrupo[i].id, this.juego.id))
                  .subscribe();
              }
            } else {
              // tslint:disable-next-line:prefer-for-of
              for (let i = 0; i < this.equiposGrupo.length; i++) {
                // tslint:disable-next-line:max-line-length
                this.peticionesAPI.InscribeEquipoJuegoDeCompeticionFormulaUno(new EquipoJuegoDeCompeticionFormulaUno(this.equiposGrupo[i].id, this.juego.id))
                  .subscribe();
              }
            }
            Swal.fire('Juego de competición tipo fórmula uno creado correctamente', ' ', 'success');

            // El juego se ha creado como activo. Lo añadimos a la lista correspondiente
            if (this.juegosActivos === undefined) {
              // Si la lista aun no se ha creado no podre hacer el push
              this.juegosActivos = [];
            }
            this.juegosActivos.push(this.juego);
            // Al darle al botón de finalizar limpiamos el formulario y reseteamos el stepper
            this.Limpiar();
            // Regresamos a la lista de equipos (mat-tab con índice 0)
            this.tabGroup.selectedIndex = 0;

          });
      });
  }

  /// Funciones para craar juego de Geocatching
  // Geocaching
  AbrirDialogoAgregarEscenario(): void {
    const dialogRef = this.dialog.open(AsignaEscenarioComponent, {
      width: '70%',
      height: '80%',
      position: {
        top: '0%'
      },
      // Pasamos los parametros necesarios
      data: {
        profesorId: this.profesorId
      }
    });
    dialogRef.afterClosed().subscribe(() => {
      this.escenario = this.sesion.DameEscenario();

      console.log('ESCENARIO SELECCIONADO --->' + this.escenario.mapa);
      this.DamePuntosGeolocalizablesDelEscenario(this.escenario);
      console.log(this.numeroDePuntosGeolocalizables);
      console.log(this.puntosgeolocalizablesEscenario);
    });
  }
  DamePuntosGeolocalizablesDelEscenario(escenario: Escenario) {

    console.log('voy a mostrar los puntosgeolocalizables del escenario ' + escenario.id);
    this.peticionesAPI.DamePuntosGeolocalizablesEscenario(escenario.id)
      .subscribe(res => {
        if (res[0] !== undefined) {
          this.puntosgeolocalizablesEscenario = res;
          console.log(res);
          this.numeroDePuntosGeolocalizables = this.puntosgeolocalizablesEscenario.length;
          console.log(this.numeroDePuntosGeolocalizables);
          this.tengoEscenario = true;
        } else {
          console.log('No hay puntosgeolocalizables en el escenario');
          this.puntosgeolocalizablesEscenario = undefined;
          this.numeroDePuntosGeolocalizables = 0;
        }
      });
  }
  AbrirDialogoAgregarPreguntas(): void {
    const dialogRef = this.dialog.open(AsignaPreguntasComponent, {
      width: '70%',
      height: '80%',
      position: {
        top: '0%'
      },
      // Pasamos los parametros necesarios
      data: {
        profesorId: this.profesorId,
        numeroDePuntosGeolocalizables: this.numeroDePuntosGeolocalizables

      }
    });
    dialogRef.afterClosed().subscribe(() => {
      this.PreguntasBasicas = this.sesion.DameIdPreguntasBasicas();
      this.PreguntasBonus = this.sesion.DameIdPreguntasBonus();
      this.tengoPreguntas = true;
      console.log('comprobacion de que se reciben los id de las preguntas');
      console.log(this.PreguntasBasicas);
      console.log(this.PreguntasBonus);

    });
  }

  // Para habilitar el boton de guardar puntuaciones
  TengoPuntuacionesGeocatching() {
    if (this.myForm.value.PuntuacionCorrectaGeo === '' ||
      this.myForm.value.PuntuacionIncorrectaGeo === '' ||
      this.myForm.value.PuntuacionCorrectaGeoBonus === '' ||
      this.myForm.value.PuntuacionIncorrectaGeoBonus === '') {
      return false;
    } else {
      return true;
    }
  }
  GuardarPuntuacionGeocaching() {
    this.puntuacionCorrectaGeo = this.myForm.value.PuntuacionCorrectaGeo;
    this.puntuacionIncorrectaGeo = this.myForm.value.PuntuacionIncorrectaGeo;
    this.puntuacionCorrectaGeoBonus = this.myForm.value.PuntuacionCorrectaGeoBonus;
    this.puntuacionIncorrectaGeoBonus = this.myForm.value.PuntuacionIncorrectaGeoBonus;
  }
  CrearJuegoDeGeocaching() {
    // tslint:disable-next-line:max-line-length
    this.peticionesAPI.CreaJuegoDeGeocaching(new JuegoDeGeocaching(this.nombreDelJuego, this.tipoDeJuegoSeleccionado, this.puntuacionCorrectaGeo, this.puntuacionIncorrectaGeo, this.puntuacionCorrectaGeoBonus, this.puntuacionIncorrectaGeoBonus, this.PreguntasBasicas, this.PreguntasBonus,
      false, false, this.profesorId, this.grupo.id, this.escenario.id), this.grupo.id)
      .subscribe(juegoCreado => {
        this.juegoDeGeocaching = juegoCreado;
        this.juegoCreado = true;
        // Inscribimos a los alumnos en el juego
        // tslint:disable-next-line:prefer-for-of
        for (let i = 0; i < this.alumnosGrupo.length; i++) {
          // tslint:disable-next-line:max-line-length
          this.peticionesAPI.InscribeAlumnoJuegoDeGeocaching(new AlumnoJuegoDeGeocaching(0, 0, this.alumnosGrupo[i].id, this.juegoDeGeocaching.id))
            .subscribe();
        }
        Swal.fire('Juego de geocaching creado correctamente', ' ', 'success');

        // El juego se ha creado como activo. Lo añadimos a la lista correspondiente
        if (this.juegosPreparados === undefined) {
          // Si la lista aun no se ha creado no podre hacer el push
          this.juegosPreparados = [];
        }
        this.juegosPreparados.push(this.juegoDeGeocaching);
        // Al darle al botón de finalizar limpiamos el formulario y reseteamos el stepper
        this.Limpiar();
        // Regresamos a la lista de equipos (mat-tab con índice 0)
        this.tabGroup.selectedIndex = 0;
      });
  }

  // Funciones para crear juego de votación
  // Para crear el juego de votación de tipo Uno A Todos se usa la tabla
  // de asignación de puntuaciones que ya se usa en la competición de Formula Uno
  // junto con las funciones asociadas, porque lo que hay que hacer es exactamente lo mismo

  TipoDeVotacionSeleccionado(tipoVotacion: ChipColor) {
    this.tipoDeVotacionSeleccionado = tipoVotacion.nombre;
    this.tengoTipoDeVotacion = true;
  }
  ModoDeRepartoSeleccionado(modoReparto: ChipColor) {
    this.modoDeRepartoSeleccionado = modoReparto.nombre;
    this.tengoModoReparto = true;
  }
  // formatLabel(value: number) {
  //   // if (value >= 1000) {
  //   //   return Math.round(value / 1000) + 'k';
  //   // }

  //   this.puntosARepartir = value;
  //   console.log ('aaaa: ' + value);
  //   console.log ('bbb: ' + this.puntosARepartir);
  //   return value;
  // }
  GuardaValor(event) {
    this.puntosARepartir = event.value;
    this.Puntuacion[0] = this.puntosARepartir;
  }
  CrearJuegoDeVotacionUnoATodos() {
    const juegoDeVotacion = new JuegoDeVotacionUnoATodos(
      this.tipoDeJuegoSeleccionado + ' ' + this.tipoDeVotacionSeleccionado,
      this.modoDeJuegoSeleccionado,
      this.modoDeRepartoSeleccionado,
      true,
      this.Puntuacion,
      this.nombreDelJuego,
      false,
      this.grupo.id);
    this.peticionesAPI.CreaJuegoDeVotacionUnoATodos(juegoDeVotacion, this.grupo.id)
      .subscribe(juegoCreado => {
        this.juego = juegoCreado;
        this.sesion.TomaJuego(this.juego);
        this.juegoCreado = true;

        if (this.modoDeJuegoSeleccionado === 'Individual') {

          // tslint:disable-next-line:prefer-for-of
          for (let i = 0; i < this.alumnosGrupo.length; i++) {
            // tslint:disable-next-line:max-line-length
            this.peticionesAPI.InscribeAlumnoJuegoDeVotacionUnoATodos(
              // tslint:disable-next-line:indent
              new AlumnoJuegoDeVotacionUnoATodos(this.alumnosGrupo[i].id, this.juego.id))
              .subscribe();
          }
        }

        Swal.fire('Juego de votación tipo Uno A Todos creado correctamente', ' ', 'success');

        // El juego se ha creado como activo. Lo añadimos a la lista correspondiente
        if (this.juegosActivos === undefined) {
          // Si la lista aun no se ha creado no podre hacer el push
          this.juegosActivos = [];
        }
        this.juegosActivos.push(this.juego);
        // Al darle al botón de finalizar limpiamos el formulario y reseteamos el stepper
        this.Limpiar();
        // Regresamos a la lista de equipos (mat-tab con índice 0)
        this.tabGroup.selectedIndex = 0;

      });

  }

  PonConcepto() {

    this.listaConceptos.push({ nombre: this.myForm.value.NombreDelConcepto, peso: this.myForm.value.PesoDelConcepto });
    this.dataSourceConceptos = new MatTableDataSource(this.listaConceptos);
    let peso: number;
    peso = Number(this.myForm.value.PesoDelConcepto);
    this.totalPesos = this.totalPesos + peso;
    console.log('total ' + this.totalPesos);

    this.myForm.reset();

  }


  BorraConcepto(nombre) {
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.listaConceptos.length; i++) {
      if (this.listaConceptos[i]['nombre'] === nombre) {
        this.totalPesos = this.totalPesos - this.listaConceptos[i]['peso'];
        this.listaConceptos.splice(i, 1);
      }
    }
    this.dataSourceConceptos = new MatTableDataSource(this.listaConceptos);

  }

  AsignarConceptos() {
    this.conceptos = [];
    this.pesos = [];


    if (this.totalPesos !== 100) {
      Swal.fire('Los pesos no suman el 100%', ' ', 'error');
    } else {
      this.listaConceptos.forEach(concepto => {
        this.conceptos.push(concepto['nombre']);
        this.pesos.push(concepto['peso']);
      });
      this.conceptosAsignados = true;
    }
  }

  CrearJuegoDeVotacionTodosAUno() {
    const juegoDeVotacion = new JuegoDeVotacionTodosAUno(
      this.tipoDeJuegoSeleccionado + ' ' + this.tipoDeVotacionSeleccionado,
      this.modoDeJuegoSeleccionado,
      true,
      this.conceptos,
      this.pesos,
      this.nombreDelJuego,
      false,
      this.grupo.id);
    console.log('voy a crear juego');
    console.log(juegoDeVotacion);
    this.peticionesAPI.CreaJuegoDeVotacionTodosAUno(juegoDeVotacion, this.grupo.id)
      .subscribe(juegoCreado => {
        this.juego = juegoCreado;
        this.sesion.TomaJuego(this.juego);
        this.juegoCreado = true;

        if (this.modoDeJuegoSeleccionado === 'Individual') {

          // tslint:disable-next-line:prefer-for-of
          for (let i = 0; i < this.alumnosGrupo.length; i++) {
            // tslint:disable-next-line:max-line-length
            this.peticionesAPI.InscribeAlumnoJuegoDeVotacionTodosAUno(
              new AlumnoJuegoDeVotacionTodosAUno(this.alumnosGrupo[i].id, this.juego.id))
              .subscribe();
          }
        }

        Swal.fire('Juego de votación tipo Todos A Uno creado correctamente', ' ', 'success');

        // El juego se ha creado como activo. Lo añadimos a la lista correspondiente
        if (this.juegosActivos === undefined) {
          // Si la lista aun no se ha creado no podre hacer el push
          this.juegosActivos = [];
        }
        this.juegosActivos.push(this.juego);
        // Al darle al botón de finalizar limpiamos el formulario y reseteamos el stepper
        this.Limpiar();
        // Regresamos a la lista de equipos (mat-tab con índice 0)
        this.tabGroup.selectedIndex = 0;

      });
  }


  ///////////////// FUNCIONES PARA CREAR JUEGO DE CUESTIONARIO DE SATISFACCION /////////////

  RecibeCuestionarioSatisfaccionElegido($event) {
    this.cuestionarioSatisfaccion = $event;
    this.tengoCuestionarioSatisfaccion = true;
    console.log('tengo cuestionario: ' + this.cuestionarioSatisfaccion.titulo);
  }
  GuardaDescripcionCuestionarioSatisfaccion(ev) {
    this.cuestionarioSatisfaccion.descripcion = ev.target.value;
  }

  CrearJuegoDeCuestionarioDeSatisfaccion() {
    console.log('voy a crear el juego');
    console.log('cuestionario: ' + this.cuestionarioSatisfaccion.titulo);
    console.log('Descripcion: ' + this.cuestionarioSatisfaccion.descripcion);
    const juegoDeCuestionarioSatisfaccion = new JuegoDeCuestionarioSatisfaccion(
      this.nombreDelJuego,
      this.tipoDeJuegoSeleccionado,
      this.cuestionarioSatisfaccion.descripcion,
      true,
      false,
      this.profesorId,
      this.grupo.id,
      this.cuestionarioSatisfaccion.id);

    console.log('voy a crear juego');
    console.log(juegoDeCuestionarioSatisfaccion);
    this.peticionesAPI.CreaJuegoDeCuestionarioSatisfaccion(juegoDeCuestionarioSatisfaccion, this.grupo.id)
      .subscribe(juegoCreado => {
        this.juego = juegoCreado;
        this.sesion.TomaJuego(this.juego);
        this.juegoCreado = true;

        if (this.modoDeJuegoSeleccionado === 'Individual') {

          // tslint:disable-next-line:prefer-for-of
          for (let i = 0; i < this.alumnosGrupo.length; i++) {
            // tslint:disable-next-line:max-line-length
            this.peticionesAPI.InscribeAlumnoJuegoDeCuestionarioSatisfaccion(
              new AlumnoJuegoDeCuestionarioSatisfaccion(false, this.juego.id, this.alumnosGrupo[i].id))
              .subscribe();
          }
        }

        Swal.fire('Juego de cuestionario de satisfacción creado correctamente', ' ', 'success');

        // El juego se ha creado como activo. Lo añadimos a la lista correspondiente
        if (this.juegosActivos === undefined) {
          // Si la lista aun no se ha creado no podre hacer el push
          this.juegosActivos = [];
        }
        this.juegosActivos.push(this.juego);
        // Al darle al botón de finalizar limpiamos el formulario y reseteamos el stepper
        this.Limpiar();
        // Regresamos a la lista de equipos (mat-tab con índice 0)
        this.tabGroup.selectedIndex = 0;

      });

  }

  goBack() {
    this.location.back();
  }

  canExit(): Observable<boolean> {
    console.log('voy a salir');
    console.log(this.creandoJuego);
    if (!this.creandoJuego) {
      return of(true);
    } else {
      const confirmacionObservable = new Observable<boolean>(obs => {
        const dialogRef = this.dialog.open(DialogoConfirmacionComponent, {
          height: '150px',
          data: {
            mensaje: 'Confirma que quieres abandonar el proceso de creación del juego',
          }
        });

        dialogRef.afterClosed().subscribe((confirmed: boolean) => {
          if (confirmed) {
            this.Limpiar();
          }
          obs.next(confirmed);
        });
      });
      return confirmacionObservable;
    }
  }

  // Funciones Para creacion de Competicion Formula Uno
  // Para averiguar si todas las filas están seleccionadas */
  IsAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /* Cuando se clica en el checkbox de cabecera hay que ver si todos los
    * checkbox estan acivados, en cuyo caso se desactivan todos, o si hay alguno
    * desactivado, en cuyo caso se activan todos */

  MasterToggle() {
    if (this.IsAllSelected()) {
      this.selection.clear(); // Desactivamos todos
    } else {
      // activamos todos
      this.dataSource.data.forEach(row => this.selection.select(row));
    }
  }

  Limpiar() {
    // Al darle al botón de finalizar limpiamos el formulario y reseteamos el stepper
    this.stepper.reset();
    this.myForm.reset();
    this.tengoNombre = false;
    this.tengoTipo = false;
    this.tengoModo = false;

    this.puntosDelJuego = [];
    this.nivelesDelJuego = [];
    this.logosNiveles = [];


    this.coleccionSeleccionada = undefined;
    this.tengoColeccion = false;

    this.creandoJuego = false;
    this.juegoCreado = false;

    this.modoPresentacion = undefined;
    this.puntuacionCorrecta = undefined;
    this.puntuacionIncorrecta = undefined;
    this.cuestionario = undefined;
    this.tengoCuestionario = false;
    this.tengoModoPresentacion = false;

    this.familiasElegidas = undefined;
    this.tengoFamilias = false;



    this.tengoNumeroDeJornadas = false;
    this.tengoTipoDeCompeticion = false;
    this.tengoNuevaPuntuacion = false;

    this.puntuacionCorrectaGeo = undefined;
    this.puntuacionIncorrectaGeo = undefined;
    this.puntuacionCorrectaGeoBonus = undefined;
    this.puntuacionIncorrectaGeoBonus = undefined;
    this.escenario = undefined;
    this.tengoEscenario = false;

    this.puntosgeolocalizablesEscenario = undefined;
    this.PreguntasBasicas = undefined;
    this.PreguntasBonus = undefined;
    this.tengoPreguntas = false;

    this.conceptosAsignados = false;
    this.listaConceptos = [];
    this.totalPesos = 0;
    this.tengoModoReparto = true;

  }
}
