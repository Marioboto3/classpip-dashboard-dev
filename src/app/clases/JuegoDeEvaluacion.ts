export class JuegoDeEvaluacion {

    id: number;
    nombreJuego: string;
    tipo: string;
    modo: string;
    juegoActivo: boolean;
    juegoTerminado: boolean;
    profesorEvalua: boolean;
    notaProfesorNormal: boolean;
    autoEvaluacion: boolean;
    evaluadores: number;
    pesos: any[];
    metodoSubcriterios: boolean;
    penalizacion: any[];
    rubricaId: number;
    profesorId: number;
    grupoId: number;


  // tslint:disable-next-line:max-line-length
  constructor(id: number, NombreJuego: string, Tipo: string, Modo: string, JuegoActivo: boolean, JuegoTerminado: boolean, profesorEvalua: boolean, notaProfesorNormal: boolean, autoEvaluacion: boolean, Evaluadores: number, Pesos: any[], metodoSubcriterios: boolean, Penalizacion: any[], rubricaId: number, profesorId: number, grupoId: number) {
    this.id = id;
    this.nombreJuego = NombreJuego;
    this.tipo = Tipo;
    this.modo = Modo;
    this.juegoActivo = JuegoActivo;
    this.juegoTerminado = JuegoTerminado;
    this.profesorEvalua = profesorEvalua;
    this.notaProfesorNormal = notaProfesorNormal;
    this.autoEvaluacion = autoEvaluacion;
    this.evaluadores = Evaluadores;
    this.pesos = Pesos;
    this.metodoSubcriterios = metodoSubcriterios;
    this.penalizacion = Penalizacion;
    this.rubricaId = rubricaId;
    this.profesorId = profesorId;
    this.grupoId = grupoId;
  }
}
