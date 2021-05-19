import { Criterio } from './';
export class Rubrica {
    nombre: string;
    descripcion: string;
    id: number;
    profesorId: number;
    criterios: Criterio[];

    constructor(nombre?: string, descripcion?: string, criterios?: Criterio[], profesorId?: number) {

      this.nombre = nombre;
      this.descripcion = descripcion;
      this.criterios = criterios;
      this.profesorId = profesorId;
    }

  }
