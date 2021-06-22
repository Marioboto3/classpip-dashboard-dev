export class ObjetoEscape {

  nombre: string;
  usable: boolean;
  profesorId: number;
  id: number;
  objetoId: number;
  escenario: string;
  peso: number;

  constructor(nombre?: string, usable?: boolean, profesorId?: number, objetoId?: number, escenario?: string, peso?: number) {

    this.nombre = nombre;
    this.usable = usable;
    this.profesorId = profesorId;
    this.objetoId = objetoId;
    this.escenario = escenario;
    this.peso = peso;

  }
}
