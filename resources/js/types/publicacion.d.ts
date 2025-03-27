import { User } from ".";

export interface Publicacion {
    id: number;
    titulo?: string;
    contenido: string;
    user_id: number;
    tipo: number;
    fecha: string;
}

export interface PublicacionWithRelations extends Publicacion {
    user: User;
}
