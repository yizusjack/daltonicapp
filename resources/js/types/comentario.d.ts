import { User } from ".";


export interface Media {
    id: number;
    model_type: string;
    model_id: number;
    uuid: string;
    collection_name: string;
    name: string;
    file_name: string;
    mime_type: string;
    disk: string;
    size: number;
    manipulations: object;
    custom_properties: object;
    generated_conversions: object;
    responsive_images: object;
    order_column: number;
    created_at: string;
    updated_at: string;
    original_url: string;  // Make sure original_url is included
    preview_url: string;
}

export interface Comentario {
    id: number;
    comentario: string;
    fecha: string;
    canEliminar: boolean;
}

export interface ComentarioWithRelations extends Comentario {
    user: User;
    media: Media[];
}
