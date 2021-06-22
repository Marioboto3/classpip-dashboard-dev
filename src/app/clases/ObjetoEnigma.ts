export class ObjetoEnigma {

    nombre: string;
    pregunta: string;
    respuesta: string;
    profesorId: number;
    principal: boolean;
    id: number;
    objetoId: number;
    escenario: string;
  
    constructor(nombre?: string, pregunta?: string,  respuesta?: string, profesorId?: number, principal?: boolean, objetoId?: number, escenario?: string) {
  
      this.nombre = nombre;
      this.pregunta = pregunta;
      this.respuesta = respuesta;
      this.profesorId = profesorId;
      this.objetoId = objetoId;
      this.principal = principal;
      this.escenario = escenario;
  
    }
  }