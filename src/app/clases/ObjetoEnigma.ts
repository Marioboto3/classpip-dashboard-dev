export class ObjetoEnigma {

    nombre: string;
    pregunta: string;
    respuesta: string;
    resuelta: boolean;
    profesorId: number;
    id: number;
    objetoId: number;
  
    constructor(nombre?: string, pregunta?: string,  respuesta?: string, resuelta?: boolean, profesorId?: number, objetoId?: number) {
  
      this.nombre = nombre;
      this.pregunta = pregunta;
      this.respuesta = respuesta;
      this.resuelta = resuelta;
      this.profesorId = profesorId;
      this.objetoId = objetoId;
  
    }
  }