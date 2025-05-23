import AppCard from '@/Components/AppCard'
import Can from '@/Components/Auth/Can'
import ConfirmationModal from '@/Components/ConfirmationModal'
import Paginator from '@/Components/partials/Paginator'
import { Button } from '@/Components/ui/button'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/Components/ui/dialog'
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuSeparator, DropdownMenuItem } from '@/Components/ui/dropdown-menu'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/Components/ui/form'
import { Input } from '@/Components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import MainLayout from '@/Layouts/MainLayout'
import { PageProps } from '@/types'
import { ComentarioWithRelations } from '@/types/comentario'
import { Link } from '@/types/link'
import { Publicacion, PublicacionWithRelations } from '@/types/publicacion'
import { useForm } from '@inertiajs/react'
import { Dot, EllipsisVertical, ImagePlus, MessageCircleQuestion, Pencil, Trash2, MessageSquareWarning } from 'lucide-react'
import React, { useState } from 'react'
import { FormProvider, useForm as useFormContext } from 'react-hook-form'

type Media = {
    id: number;
    file_name: string;
    original_url: string;
};

export default function IndexPublicacion({
    publicaciones,
    tipo,
}: PageProps<{
    publicaciones: {
        data: (PublicacionWithRelations & { media: Media[] })[];
        links: Link[];
        current_page: number,
        last_page: number,
    };
    tipo: number;
}>) {

    const breadcrumb = [
        {
            url: 'active',
            name: 'Dudas'
        }
    ];

    //Modal para creación de dudas
    const [abrirModal, setAbrirModal] = useState(false);

    const [abrirModalConfirmacion, setAbrirModalConfirmacion] = useState(false);

    const [imagenes, setImagenes] = useState<File[]>([]);

    const [previewUrls, setPreviewUrls] = useState<string[]>([]);
    const [previewUrlComment, setPreviewUrlComment] = useState<string[]>([]);

    const [imagenSeleccionada, setImagenSeleccionada] = useState<string | null>(null);

    //Forms para la creación de publicación
    const { data, setData, post, put, processing, errors, reset } = useForm<{
        titulo?: string;
        contenido: string;
        imagenes: File[];
    }>({
        titulo: '',
        contenido: '',
        imagenes: [],
    });


    const methods = useFormContext({
        defaultValues: {
            titulo: data.titulo,
            contenido: data.contenido,
        },
    });


    //Función para guardar publicación
    function submit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const formData = new FormData();
        formData.append('titulo', data.titulo ?? '');
        formData.append('contenido', data.contenido);

        data.imagenes.forEach((imagen, index) => {
            formData.append(`imagenes[${index}]`, imagen);
        });

        post(route('publicacion.store', tipo), {
            data: formData,
            preserveScroll: true,
            forceFormData: true,
            onSuccess: () => {
                reset();
                setAbrirModal(false);
                setPreviewUrls([]);
            },
        });
    }

    //Estado para la edición/eliminación de publicaciones
    const [publicacionSeleccionada, setPublicacionSeleccionada] = useState<null | Publicacion>(null);

    //Abre la edición de una publicación
    const setEditarPublicacion = (publicacion: Publicacion) => {
        setData('titulo', publicacion.titulo);
        setData('contenido', publicacion.contenido);
        setPublicacionSeleccionada(publicacion);
    }

    //Cancela la edición de una publicación
    const cancelarEdicion = () => {
        reset();
        setPublicacionSeleccionada(null);
    }

    //Función para editar publicación
    function editarPublicacion(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        put(route('publicacion.update', publicacionSeleccionada?.id), {
            preserveScroll: true,
            onSuccess: () => {
                reset();
                setPublicacionSeleccionada(null);
            },
        });
    }

    const [publicacionAEliminar, setPublicacionAEliminar] = useState<null | Publicacion>(null);

    //Funcion para eliminar publicacion
    const eliminarPublicacion = (publicacion: Publicacion) => {
        setPublicacionAEliminar(publicacion);

        setTimeout(() => {
            setAbrirModalConfirmacion(true);
        }, 100);
    }

    const eliminar = useForm({});

    const confirmarEliminacion = () => {
        if (!publicacionAEliminar) return; // Evitar errores si es null

        let publicacion = publicacionAEliminar.id;

        eliminar.delete(route('publicacion.destroy', publicacion), {
            preserveScroll: true,
            onSuccess: () => {
                setPublicacionAEliminar(null);
                setAbrirModalConfirmacion(false);
            },
        });
    };

    //Estado para la creación de comentarios
    const [publicacionAComentar, setpublicacionAComentar] = useState<null | number>(null);

    //Estado para la eliminación de comentarios
    const [comentarioSeleccionado, setComentarioSeleccionado] = useState<null | ComentarioWithRelations>(null);

    const abrirEliminacionComentario = (comentario: ComentarioWithRelations) => {
        setComentarioSeleccionado(comentario);

        setTimeout(() => {
            setAbrirModalConfirmacion(true);
        }, 100);
    }

    const eliminarComentario = useForm({});

    const confirmarEliminacionComentario = () => {;
        eliminar.delete(route('comentario.destroy', comentarioSeleccionado?.id), {
            preserveScroll: true,
            onSuccess: () => {
                setComentarioSeleccionado(null);
                setAbrirModalConfirmacion(false);
            },
        });
    };

    //Formulario para comentarios
    const comentarioForm = useForm<{
        comentario: string;
        comentable_id?: number;
        imagen?: File | null;
    }>({
        comentario: '',
        imagen: null,
    });

    const setFormComentario = (publicacion: number) => {
        setPreviewUrls([]);
        comentarioForm.setData('comentable_id', publicacion);

        setpublicacionAComentar(publicacion);
    }

    function submitComentario(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        comentarioForm.post(route('comentario.store'), {
            preserveScroll: true,
            onSuccess: () => {
                setpublicacionAComentar(null);
                comentarioForm.reset();
                setPreviewUrlComment([]);
            },
        });
    }

    function handleRemoveImage(index: number) {
        const nuevasImagenes = [...data.imagenes];
        nuevasImagenes.splice(index, 1);
        setData('imagenes', nuevasImagenes);

        const nuevasPreviews = [...previewUrls];
        nuevasPreviews.splice(index, 1);
        setPreviewUrls(nuevasPreviews);
    }

    const opcionesReporte = [
        { label: 'El contenido es inapropiado', value: 'Inapropiado' },
        { label: 'El contenido es ofensivo para mi o alguien más', value: 'Ofensivo' },
        { label: 'El contenido  no tiene relación con el foro', value: 'NoRelacion' },
        { label: 'El contenido es publicidad engañosa', value: 'Engañoso' },
        { label: 'Quien creó este contenido está fingiendo ser alguien que no es', value: 'Catfish' },
    ];

    const reporte = useForm({
        reportable_id: 0,
        reportable_type: '',
        type: '',
        explicacion: ''
    });

    const [abrirModalReportePublicacion, setAbrirModalReportePublicacion] = useState(false);

    const [abrirModalReporteComentario, setAbrirModalReporteComentario] = useState(false);

    const abrirModalReporte = (modelo: 'Publicacion' | 'Comentario', id: number) => {
        reporte.setData('reportable_id', id);
        reporte.setData('reportable_type', modelo);

        setTimeout(() => {
            if (modelo == 'Publicacion') {
                setAbrirModalReportePublicacion(true);
            } else {
                setAbrirModalReporteComentario(true);
            };
        }, 100);

    };

    return (
        <MainLayout
            name={tipo == 1 ? "Dudas" : "Comunidad"}
            breadcrumb={breadcrumb}
        >
            <AppCard
                title={(tipo == 1 ? "Dudas" : "Comunidad") + ' - Daltonicapp'}
                description={tipo == 1 ? 'Si tienes alguna duda puedes escribirla, los administradores te responderán lo más pronto posible' : undefined}
            >
                <div className="flex justify-center md:justify-end">
                    <Button onClick={() => setAbrirModal(true)}>
                        {tipo == 1 ? 'Tengo una duda' : 'Nueva publicación'}
                        <MessageCircleQuestion />
                    </Button>
                </div>

                <div className='max-w-7xl m-auto'>
                    {
                        publicaciones.data.map((publicacion) => (
                            <div className='w-full my-4 py-4 border-b border-slate-200' key={publicacion.id}>
                                {
                                    publicacionSeleccionada?.id != publicacion.id ?
                                        (
                                            <>
                                                <div className="font-bold flex justify-between">
                                                    <div>
                                                        {publicacion.titulo}
                                                    </div>

                                                    <Can
                                                        permission={publicacion.canEditar || publicacion.canEliminar || publicacion.canReportar}
                                                    >
                                                        <div className="justify-end">
                                                            <DropdownMenu>
                                                                <DropdownMenuTrigger className='hover:bg-slate-200 rounded-md p-0.5'>
                                                                    <EllipsisVertical className='w-4 h-4' />
                                                                </DropdownMenuTrigger>
                                                                <DropdownMenuContent>
                                                                    <Can
                                                                        permission={publicacion.canEditar}
                                                                    >
                                                                        <DropdownMenuItem
                                                                            onClick={() => setEditarPublicacion(publicacion)}
                                                                        >
                                                                            <Pencil className='w-3 h-3 text-green-400' />
                                                                            Editar
                                                                        </DropdownMenuItem>

                                                                        <DropdownMenuSeparator />
                                                                    </Can>

                                                                    <Can
                                                                        permission={publicacion.canEliminar}
                                                                    >
                                                                        <DropdownMenuItem
                                                                            onClick={() => eliminarPublicacion(publicacion)}
                                                                        >
                                                                            <Trash2 className='w-3 h-3 text-red-400' />
                                                                            Eliminar
                                                                        </DropdownMenuItem>
                                                                        <DropdownMenuSeparator />
                                                                    </Can>

                                                                    <Can
                                                                        permission={publicacion.canReportar}
                                                                    >
                                                                        <DropdownMenuItem
                                                                            onClick={() => abrirModalReporte('Publicacion', publicacion.id)}
                                                                        >
                                                                            <MessageSquareWarning className='w-3 h-3 text-red-400' />
                                                                            Reportar
                                                                        </DropdownMenuItem>
                                                                    </Can>
                                                                </DropdownMenuContent>
                                                            </DropdownMenu>
                                                        </div>
                                                    </Can>
                                                </div>

                                                <div className='whitespace-pre-line'>
                                                    {publicacion.contenido}
                                                </div>

                                                <div className="flex flex-wrap gap-2 mt-4">
                                                    {publicacion.media.map((img) => (
                                                        <img
                                                            key={img.id}
                                                            src={img.original_url}
                                                            alt={img.file_name}
                                                            className="w-32 h-32 object-cover rounded-md cursor-pointer"
                                                            onClick={() => setImagenSeleccionada(img.original_url)}
                                                        />
                                                    ))}
                                                </div>

                                                {imagenSeleccionada && (
                                                    <Dialog open={imagenSeleccionada !== null} onOpenChange={() => setImagenSeleccionada(null)}>
                                                        <DialogContent className="max-w-4xl">
                                                            <img
                                                                src={imagenSeleccionada!}
                                                                alt="Imagen"
                                                                className="max-h-[90vh] object-contain m-auto"
                                                            />
                                                        </DialogContent>
                                                    </Dialog>
                                                )}

                                                <div className='flex justify-between text-xs'>
                                                    <div className='flex items-center text-cyan-900'>
                                                        {publicacion.user.name}
                                                        <Dot />
                                                        {tipo == 2 &&
                                                            <>
                                                                {publicacion.user.tipo_daltonismo}
                                                                <Dot />
                                                            </>
                                                        }
                                                        {publicacion.fecha}
                                                    </div>

                                                    {publicacionAComentar != publicacion.id &&
                                                        <Can
                                                            permission={publicacion.canComentar}
                                                        >
                                                            <div onClick={() => setFormComentario(publicacion.id)} className='text-slate-500 hover:text-slate-800 hover:underline cursor-pointer'>
                                                                Agregar un comentario
                                                            </div>
                                                        </Can>
                                                    }
                                                </div>
                                            </>
                                        ) : (
                                            <>
                                                <FormProvider {...methods}>
                                                    <form onSubmit={editarPublicacion}>
                                                        <div className='pb-4'>
                                                            <FormField
                                                                name="titulo"
                                                                render={({ field }) => (
                                                                    <FormItem>
                                                                        <FormLabel>Título</FormLabel>

                                                                        <FormControl>
                                                                            <Input
                                                                                type='text'
                                                                                name='titulo'
                                                                                value={data.titulo}
                                                                                onChange={(e) => setData('titulo', e.target.value)}
                                                                            />
                                                                        </FormControl>

                                                                        {errors.titulo && (
                                                                            <FormMessage>{errors.titulo}</FormMessage>
                                                                        )}
                                                                    </FormItem>
                                                                )}
                                                            >
                                                            </FormField>
                                                        </div>

                                                        <div className='pb-4'>
                                                            <FormField
                                                                name="contenido"
                                                                render={({ field }) => (
                                                                    <FormItem>
                                                                        <FormLabel>Contenido</FormLabel>

                                                                        <FormControl>
                                                                            <Textarea
                                                                                className='h-20'
                                                                                name='contenido'
                                                                                value={data.contenido}
                                                                                onChange={(e) => setData('contenido', e.target.value)}
                                                                            />
                                                                        </FormControl>

                                                                        {errors.contenido && (
                                                                            <FormMessage>{errors.contenido}</FormMessage>
                                                                        )}
                                                                    </FormItem>
                                                                )}
                                                            >
                                                            </FormField>
                                                        </div>

                                                        <div className="flex justify-end gap-x-4">
                                                            <Button
                                                                type='button'
                                                                variant='outline'
                                                                onClick={cancelarEdicion}
                                                            >
                                                                Cancelar
                                                            </Button>
                                                            <Button>
                                                                Enviar
                                                            </Button>
                                                        </div>
                                                    </form>
                                                </FormProvider>
                                            </>
                                        )
                                }

                                <div className="ml-8">
                                    {
                                        publicacion.comentarios.map((comentario) => (
                                            <div className='w-full my-4 py-4 border-b border-slate-100 text-xs' key={comentario.id}>
                                                <div className="flex justify-between">
                                                    <div className='flex items-center text-cyan-900'>
                                                        {comentario.user.name}
                                                        <Dot />
                                                        {tipo == 2 &&
                                                            <>
                                                                {comentario.user.tipo_daltonismo}
                                                                <Dot />
                                                            </>
                                                        }
                                                        {publicacion.fecha}
                                                    </div>

                                                    <div>
                                                        <Can
                                                            permission={comentario.canEliminar || comentario.canReportarComentario}
                                                        >
                                                            <div className="justify-end">
                                                                <DropdownMenu>
                                                                    <DropdownMenuTrigger className='hover:bg-slate-200 rounded-md p-0.5'>
                                                                        <EllipsisVertical className='w-4 h-4' />
                                                                    </DropdownMenuTrigger>
                                                                    <DropdownMenuContent>
                                                                        <Can
                                                                            permission={comentario.canEliminar}
                                                                        >
                                                                            <DropdownMenuItem
                                                                                onClick={() => abrirEliminacionComentario(comentario)}
                                                                            >
                                                                                <Trash2 className='w-3 h-3 text-red-400' />
                                                                                Eliminar
                                                                            </DropdownMenuItem>

                                                                            <DropdownMenuSeparator />
                                                                        </Can>
                                                                        <Can
                                                                            permission={comentario.canReportarComentario}
                                                                        >
                                                                            <DropdownMenuItem
                                                                                onClick={() => abrirModalReporte('Comentario', comentario.id)}
                                                                            >
                                                                                <MessageSquareWarning className='w-3 h-3 text-red-400' />
                                                                                Reportar
                                                                            </DropdownMenuItem>
                                                                        </Can>
                                                                    </DropdownMenuContent>
                                                                </DropdownMenu>
                                                            </div>
                                                        </Can>
                                                    </div>
                                                </div>

                                                <div className='whitespace-pre-line'>
                                                    {comentario.comentario}
                                                </div>

                                                {comentario.media && comentario.media.length > 0 && (
                                                    <div className="mt-4">
                                                        {comentario.media.map((image) => (
                                                            <img
                                                                key={image.id}
                                                                src={image.original_url}
                                                                alt={image.name}
                                                                className="w-16 h-16 object-cover rounded-md cursor-pointer"
                                                                onClick={() => setImagenSeleccionada(image.original_url)}
                                                            />
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        ))
                                    }
                                </div>

                                {publicacionAComentar == publicacion.id &&
                                    <form onSubmit={submitComentario}>
                                        <div className='mt-4'>
                                            <Textarea
                                                className='h-20'
                                                name='comentario'
                                                placeholder='Escribe un comentario...'
                                                onChange={(e) => comentarioForm.setData('comentario', e.target.value)}
                                            />

                                            <div className="mt-2">
                                                <Button
                                                    type="button"
                                                    onClick={() => document.getElementById('input-imagen')?.click()}
                                                    size="sm"
                                                >
                                                    <ImagePlus className='h-6 w-6' />
                                                    Agregar imagen
                                                </Button>

                                                <input
                                                    id="input-imagen"
                                                    type="file"
                                                    accept="image/*"
                                                    style={{ display: 'none' }}
                                                    onChange={(e) => {
                                                        setPreviewUrlComment([]);
                                                        if (e.target.files?.[0]) {
                                                            const filesArray = Array.from(e.target.files);

                                                            const imagenesValidas = filesArray.filter(file =>
                                                                file.type.startsWith('image/')
                                                            );

                                                            if (imagenesValidas.length !== filesArray.length) {
                                                                alert('Solo puedes subir imagenes.');
                                                            }

                                                            if (imagenesValidas.length == 1) {
                                                                const nuevosPreviews = imagenesValidas.map(file => URL.createObjectURL(file));
                                                                setPreviewUrlComment(prev => [...prev, ...nuevosPreviews]);
                                                            }

                                                            const file = e.target.files?.[0];

                                                            if (file) {
                                                                comentarioForm.setData('imagen', file);
                                                            }
                                                        }
                                                    }}
                                                />
                                                {previewUrlComment.length > 0 && (
                                                    <div className="flex flex-wrap gap-2 mt-2">
                                                        {previewUrlComment.map((url, index) => (
                                                            <div key={index} className="relative w-24 h-24">
                                                                <img
                                                                    src={url}
                                                                    alt={`Preview ${index}`}
                                                                    className="w-full h-full object-cover rounded border"
                                                                />
                                                                <button
                                                                    type="button"
                                                                    onClick={() => {
                                                                        comentarioForm.setData('imagen', null);
                                                                        setPreviewUrlComment([]);
                                                                    }}
                                                                    className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600"
                                                                >
                                                                    ×
                                                                </button>
                                                            </div>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>

                                            <div className="mt-2 flex justify-end gap-x-2">
                                                <Button
                                                    type='button'
                                                    variant='outline'
                                                    size='sm'
                                                    onClick={() => setpublicacionAComentar(null)}
                                                >
                                                    Cancelar
                                                </Button>

                                                <Button
                                                    type='submit'
                                                    size='sm'
                                                >
                                                    Comentar
                                                </Button>
                                            </div>
                                        </div>
                                    </form>
                                }
                            </div>
                        ))
                    }
                </div>

                <div className="mt-4">
                    <Paginator
                        links={publicaciones.links}
                        current_page={publicaciones.current_page}
                        last_page={publicaciones.last_page}
                        elements={3}
                    />
                </div>
            </AppCard>

            <Dialog open={abrirModal} onOpenChange={setAbrirModal}>
                <DialogContent className="max-w-2xl max-h-full">
                    <h1 className='font-semibold leading-none tracking-tight'>
                        {tipo == 1 ? 'Agregar duda' : 'Nueva publicación'}
                    </h1>
                    <FormProvider {...methods}>
                        <form onSubmit={submit}>
                            <div className='pb-4'>
                                <FormField
                                    name="titulo"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Título</FormLabel>

                                            <FormControl>
                                                <Input
                                                    type='text'
                                                    name='titulo'
                                                    onChange={(e) => setData('titulo', e.target.value)}
                                                />
                                            </FormControl>

                                            {errors.titulo && (
                                                <FormMessage>{errors.titulo}</FormMessage>
                                            )}
                                        </FormItem>
                                    )}
                                >
                                </FormField>
                            </div>

                            <div className='pb-4'>
                                <FormField
                                    name="contenido"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Contenido</FormLabel>

                                            <FormControl>
                                                <Textarea
                                                    className='h-20'
                                                    name='contenido'
                                                    onChange={(e) => setData('contenido', e.target.value)}
                                                />
                                            </FormControl>

                                            {errors.contenido && (
                                                <FormMessage>{errors.contenido}</FormMessage>
                                            )}
                                        </FormItem>
                                    )}
                                >
                                </FormField>
                            </div>

                            <div className='pb-4'>
                                <FormField
                                    name="imagenes"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <div>
                                                    <Button
                                                        type="button"
                                                        onClick={() => document.getElementById('input-imagenes')?.click()}
                                                    >
                                                        <ImagePlus className='h-6 w-6' />
                                                        Agregar imágenes
                                                    </Button>

                                                    <input
                                                        id="input-imagenes"
                                                        type="file"
                                                        accept="image/*"
                                                        multiple
                                                        style={{ display: 'none' }}
                                                        onChange={(e) => {
                                                            if (e.target.files) {
                                                                const filesArray = Array.from(e.target.files);

                                                                const imagenesValidas = filesArray.filter(file =>
                                                                    file.type.startsWith('image/')
                                                                );

                                                                if (imagenesValidas.length !== filesArray.length) {
                                                                    alert('Solo puedes subir imagenes.');
                                                                }

                                                                if (imagenesValidas.length > 0) {
                                                                    setData('imagenes', [...(data.imagenes || []), ...imagenesValidas]);

                                                                    const nuevosPreviews = imagenesValidas.map(file => URL.createObjectURL(file));
                                                                    setPreviewUrls(prev => [...prev, ...nuevosPreviews]);
                                                                }
                                                            }
                                                        }}
                                                    />
                                                </div>
                                            </FormControl>

                                            {previewUrls.length > 0 && (
                                                <div className="flex flex-wrap gap-2 mt-2">
                                                    {previewUrls.map((url, index) => (
                                                        <div key={index} className="relative w-24 h-24">
                                                            <img
                                                                src={url}
                                                                alt={`Preview ${index}`}
                                                                className="w-full h-full object-cover rounded border"
                                                            />
                                                            <button
                                                                type="button"
                                                                onClick={() => handleRemoveImage(index)}
                                                                className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600"
                                                            >
                                                                ×
                                                            </button>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <div className="flex justify-end gap-x-4">
                                <Button
                                    type='button'
                                    variant='outline'
                                    onClick={() => setAbrirModal(false)}
                                >
                                    Cancelar
                                </Button>
                                <Button>
                                    Enviar
                                </Button>
                            </div>
                        </form>
                    </FormProvider>
                </DialogContent>
            </Dialog>

            {publicacionAEliminar &&
                <ConfirmationModal
                    confirmar={confirmarEliminacion}
                    modelo='Publicación'
                    abrirModal={abrirModalConfirmacion}
                    setAbrirModal={setAbrirModalConfirmacion}
                />
            }

            {comentarioSeleccionado &&
                <ConfirmationModal
                    confirmar={confirmarEliminacionComentario}
                    modelo='Comentario'
                    abrirModal={abrirModalConfirmacion}
                    setAbrirModal={setAbrirModalConfirmacion}
                />
            }

            <Dialog open={abrirModalReportePublicacion} onOpenChange={setAbrirModalReportePublicacion}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Reportar {reporte.data.reportable_type}</DialogTitle>
                    </DialogHeader>

                    <DropdownMenu>
                        <DropdownMenuTrigger>
                            Motivo: {reporte.data.type || 'Seleccionar'}
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            {opcionesReporte.map((opcion) => (
                                <DropdownMenuItem
                                    key={opcion.value}
                                    onSelect={() => reporte.setData('type', opcion.value)}
                                >
                                    {opcion.label}
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>

                    {reporte.errors.type && <div className='p-1 text-xs text-red-700'>{reporte.errors.type}</div>}

                    <Input
                        placeholder="Explicación"
                        value={reporte.data.explicacion}
                        onChange={(e) => reporte.setData('explicacion', e.target.value)}
                    />

                    {reporte.errors.explicacion && <div className='p-1 text-xs text-red-700'>{reporte.errors.explicacion}</div>}

                    <DialogFooter>
                        <Button variant="outline" onClick={() => setAbrirModalReportePublicacion(false)}>Cancelar</Button>
                        <Button
                            onClick={() => {
                                reporte.post(route('reporte.store'), {
                                    preserveScroll: true,
                                    onSuccess: () => {
                                        reporte.reset();
                                        setAbrirModalReportePublicacion(false);
                                    }
                                });
                            }}
                        >
                            Reportar
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <Dialog open={abrirModalReporteComentario} onOpenChange={setAbrirModalReporteComentario}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Reportar {reporte.data.reportable_type}</DialogTitle>
                    </DialogHeader>

                    <DropdownMenu>
                        <DropdownMenuTrigger>
                            Motivo: {reporte.data.type || 'Seleccionar'}
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            {opcionesReporte.map((opcion) => (
                                <DropdownMenuItem
                                    key={opcion.value}
                                    onSelect={() => reporte.setData('type', opcion.value)}
                                >
                                    {opcion.label}
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>
                    {reporte.errors.type && <div className='p-1 text-xs text-red-700'>{reporte.errors.type}</div>}

                    <Input
                        placeholder="Explicación"
                        value={reporte.data.explicacion}
                        onChange={(e) => reporte.setData('explicacion', e.target.value)}
                    />
                    {reporte.errors.explicacion && <div className='p-1 text-xs text-red-700'>{reporte.errors.explicacion}</div>}

                    <DialogFooter>
                        <Button variant="outline" onClick={() => setAbrirModalReporteComentario(false)}>Cancelar</Button>
                        <Button
                            onClick={() => {
                                reporte.post(route('reporte.store'), {
                                    preserveScroll: true,
                                    onSuccess: () => {
                                        reporte.reset();
                                        setAbrirModalReporteComentario(false);
                                    }
                                });
                            }}
                        >
                            Reportar
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </MainLayout>
    )
}
