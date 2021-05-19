export class AlumnoJuegoDeAvatar {
  silueta: string;
  privilegios: boolean[];
  complemento1: string;
  complemento2: string;
  complemento3: string;
  complemento4: string;
  voz: string;
  id: number;
  alumnoId: number;
  juegoDeAvatarId: number;

  constructor(alumnoId?: number, juegoDeAvatarId?: number) {
    this.alumnoId = alumnoId;
    this.juegoDeAvatarId = juegoDeAvatarId;
    this.privilegios = Array(6).fill (false);
  }
}
