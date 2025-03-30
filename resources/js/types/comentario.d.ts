import { User } from ".";

export interface Comentario {
    id: number;
    comentario: string;
    fecha: string;
}

export interface ComentarioWithRelations extends Comentario {
    user: User;
}
