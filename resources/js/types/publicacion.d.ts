import { User } from ".";
import { ComentarioWithRelations } from "./comentario";

export interface Publicacion {
    id: number;
    titulo?: string;
    contenido: string;
    user_id: number;
    tipo: number;
    fecha: string;
    canEditar: boolean;
    canEliminar: boolean;
    canComentar: boolean;
    imagenes: string[];
}

export interface PublicacionWithRelations extends Publicacion {
    user: User;
    comentarios: ComentarioWithRelations[];
}
