export class JuegoDeGeocachingPregunta {
  id: number;
  juegoDeGeocachingId: number;
  preguntaId: number;

  constructor(JuegoDeGeocachingId?: number, preguntaId?: number) {

    this.juegoDeGeocachingId = JuegoDeGeocachingId;
    this.preguntaId = preguntaId;
  }
}
