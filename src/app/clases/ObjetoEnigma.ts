export class ObjetoEnigma {

    nombre: string;
    pregunta: string;
    respuesta: string;
    resuelta: boolean;
  
    constructor(nombre?: string, pregunta?: string,  respuesta?: string, resuelta?: boolean) {
  
      this.nombre = nombre;
      this.pregunta = pregunta;
      this.respuesta = respuesta;
      this.resuelta = resuelta;
  
    }
  }