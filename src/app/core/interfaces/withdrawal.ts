import { Admin } from './admin';
import { User } from './user';

export interface Retiro {
  id?: number;
  usuario?: User;
  admin?: Admin;
  monto?: number;
  transferencia?: number;
  aceptado?: boolean;
  date?: Date;
}
