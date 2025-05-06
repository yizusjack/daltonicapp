import { PageProps } from '@/types';
import { Link as LinkType } from '@/types/link';
import React, { useEffect, useState } from 'react'
import MainLayout from '@/Layouts/MainLayout';
import AppCard from '@/Components/AppCard';
import { Card, CardContent } from '@/Components/ui/card';
import Paginator from '@/Components/partials/Paginator';
import { PublicacionWithRelations } from '@/types/publicacion';
import { EllipsisVertical, EyeIcon, Pencil, Trash2 } from 'lucide-react';
import { Button } from '@/Components/ui/button';
import { Dialog, DialogContent } from '@/Components/ui/dialog';
import Can from '@/Components/Auth/Can';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/Components/ui/dropdown-menu';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/Components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { router, useForm } from '@inertiajs/react';
import { FormProvider, useForm as useFormContext } from 'react-hook-form';
import ConfirmationModal from '@/Components/ConfirmationModal';


export default function Galeria({
    imagenes
}: PageProps<{
    imagenes: {
        data: PublicacionWithRelations[];
        links: LinkType[];
        current_page: number,
        last_page: number,
    };
}>) {
    const breadcrumb = [
        {
            url: 'active',
            name: 'Imágenes para mi'
        }
    ];

    const [abrirModal, setAbrirModal] = useState(false);
    const [selectedPicture, setSelectedPicture] = useState<PublicacionWithRelations | null>(null);

    const [editarPublicacion, setEditarPublicacion] = useState(false);

    const mostrarImagen = (picture: PublicacionWithRelations) => {
        setEditarPublicacion(false);
        reset();
        setSelectedPicture(picture);

        setTimeout(() => {
            setAbrirModal(true);
        }, 10);
    }

    //Forms para la creación de publicación
    const { data, setData, put, processing, errors, reset } = useForm<{
        contenido: string;
    }>({
        contenido: '',
    });

    const methods = useFormContext({
        defaultValues: {
            contenido: data.contenido,
        },
    });

    const cargarEdicion = () => {
        data.contenido = selectedPicture?.contenido ?? '';
        setEditarPublicacion(true);
    }

    const submitEdicion = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        put(route('publicacion.update', selectedPicture?.id), {
            preserveScroll: true,
            onSuccess: () => {
                reset();
                setEditarPublicacion(false);
            },
        });
    }

    const [abrirModalConfirmacion, setAbrirModalConfirmacion] = useState(false);

    //Funcion para eliminar publicacion
    const eliminarPublicacion = () => {
        setTimeout(() => {
            setAbrirModalConfirmacion(true);
        }, 100);
    }

    const eliminar = useForm({});

    const confirmarEliminacion = () => {
        let picture = selectedPicture?.id;

        eliminar.delete(route('publicacion.destroy', picture), {
            preserveScroll: true,
            onSuccess: () => {
                setSelectedPicture(null);
                setAbrirModalConfirmacion(false);
            },
        });
    };

    useEffect(() => {
        if (selectedPicture) {
            let imagen = imagenes.data.find(i => i.id === selectedPicture.id);

            setSelectedPicture(imagen as PublicacionWithRelations);
        }
    }, [imagenes])

    return (
        <MainLayout
            name='Galería'
            breadcrumb={breadcrumb}
        >
            <AppCard
                title='Galería'
                description='Mira las últimas imágenes que se han compartido para tu tipo de daltonismo.'
            >
                <div className="grid grid-cols-12 gap-x-4 gap-y-8 place-items-center">
                    {
                        imagenes.data.map((imagen) => (
                            <Card key={imagen.id} className='col-span-12 md:col-span-6 lg:col-span-4'>
                                <CardContent className='pt-6 pb-8'>
                                    <div className='max-w-64 h-64 justify-center items-center rounded-md relative group'>
                                        <img src={imagen.imagenes[0]} className='w-full h-full object-cover rounded-md' alt="" />

                                        <div className="p-3 absolute inset-0 bg-black bg-opacity-50 flex items-end justify-center rounded-xl opacity-0 md:group-hover:opacity-100 transition-opacity duration-300">
                                            <Button onClick={() => mostrarImagen(imagen)} variant="secondary">
                                                <EyeIcon className='h-6 w-6' />
                                            </Button>
                                        </div>
                                    </div>

                                    <div className="mt-2 opacity-100 md:opacity-0">
                                        <Button onClick={() => mostrarImagen(imagen)} className='w-full'>
                                            <EyeIcon className='h-6 w-6' />
                                        </Button>
                                    </div>

                                    <div className="px-3 pt-3 flex justify-end text-sm text-slate-500 italic">
                                        {imagen.user.name}
                                    </div>

                                    <div className="px-3 flex justify-end text-sm text-slate-500 italic">
                                        {imagen.fecha}
                                    </div>
                                </CardContent>
                            </Card>
                        ))
                    }
                </div>
                <Paginator
                    links={imagenes.links}
                    current_page={imagenes.current_page}
                    last_page={imagenes.last_page}
                    elements={3}
                />
            </AppCard>
            {
                selectedPicture &&
                (<Dialog open={abrirModal} onOpenChange={setAbrirModal}>
                    <DialogContent className="max-w-7xl w-full max-h-[90vh] overflow-hidden">
                        <div className="flex flex-col lg:flex-row h-[80vh] gap-4">

                            {/* Imagen fija */}
                            <div className="flex-1 flex items-center justify-center overflow-hidden">
                                <img
                                    src={selectedPicture.imagenes[0]}
                                    alt="Imagen transformada"
                                    className="max-h-full max-w-full object-contain rounded"
                                />
                            </div>

                            {/* Columna de texto */}
                            <div className="w-full lg:w-[30%] flex flex-col justify-between overflow-hidden">
                                <div className="flex flex-col items-end text-cyan-900">
                                    <div className='flex items-center justify-between w-full font-semibold'>
                                        <span>{selectedPicture.user.name}</span>
                                        <Can permission={selectedPicture.canEditar || selectedPicture.canEliminar}>
                                            <DropdownMenu>
                                                <DropdownMenuTrigger className='hover:bg-slate-200 rounded-md p-0.5'>
                                                    <EllipsisVertical className='w-4 h-4' />
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent>
                                                    <Can permission={selectedPicture.canEditar}>
                                                        <DropdownMenuItem onClick={cargarEdicion}>
                                                            <Pencil className='w-3 h-3 text-green-400' />
                                                            Editar
                                                        </DropdownMenuItem>
                                                        <DropdownMenuSeparator />
                                                    </Can>
                                                    <Can permission={selectedPicture.canEliminar}>
                                                        <DropdownMenuItem onClick={eliminarPublicacion}>
                                                            <Trash2 className='w-3 h-3 text-red-400' />
                                                            Eliminar
                                                        </DropdownMenuItem>
                                                    </Can>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </Can>
                                    </div>
                                    <div className='italic'>{selectedPicture.fecha}</div>
                                </div>

                                {/* Descripción */}
                                <div className="mt-4 overflow-auto flex-grow">
                                    {!editarPublicacion ? (
                                        <div className="text-justify whitespace-pre-line">
                                            "{selectedPicture.contenido}"
                                        </div>
                                    ) : (
                                        <FormProvider {...methods}>
                                            <form onSubmit={submitEdicion} className="flex flex-col h-full">
                                                <div className='pb-4 flex-grow'>
                                                    <FormField
                                                        name="contenido"
                                                        render={({ field }) => (
                                                            <FormItem>
                                                                <FormControl>
                                                                    <Textarea
                                                                        className='h-20 w-full resize-none'
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
                                                    />
                                                </div>
                                                <div className="flex justify-end gap-x-4">
                                                    <Button type='button' variant='outline' onClick={() => setEditarPublicacion(false)}>
                                                        Cancelar
                                                    </Button>
                                                    <Button>Guardar</Button>
                                                </div>
                                            </form>
                                        </FormProvider>
                                    )}
                                </div>
                            </div>
                        </div>
                    </DialogContent>




                </Dialog>)
            }

            {selectedPicture &&
                <ConfirmationModal
                    confirmar={confirmarEliminacion}
                    modelo='Publicación'
                    abrirModal={abrirModalConfirmacion}
                    setAbrirModal={setAbrirModalConfirmacion}
                />
            }
        </MainLayout>
    )
}
