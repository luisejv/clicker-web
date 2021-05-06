import { User } from './user';

export interface Incidence {
  descripcion: string;
  asunto: string;
  tipo: string;
  usuario?: any;
  foto: string;
  date: Date;
}
