export class SesionClase {
  dia: string;
  hora: string;
  descripcion: string;
  id: number;
  grupoId: number;
  asistencia: any[];
  observaciones: string[];

  constructor(Dia?: string, Hora?: string,  Descripcion?: string, Asistencia?: any[]) {

    this.dia = Dia;
    this.hora = Hora;
    this.descripcion = Descripcion;
    this.asistencia = Asistencia;
    this.observaciones = [];
  }

}
