import { PageProps } from '@/types';
import { Link as LinkType } from '@/types/link';
import React, { useState } from 'react'
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
                // let selected = selectedPicture;
                if(selectedPicture) {
                    selectedPicture.contenido = data.contenido;
                }

                reset();
                setEditarPublicacion(false);
            },
        });
    }

    return (
        <MainLayout
            name='Mi galería'
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
                    <DialogContent className="max-w-7xl max-h-full flex flex-col items-center justify-center">

                        <div className="max-w-full grid grid-cols-12 gap-4 my-4">
                            <div className="col-span-12 md:col-span-6 lg:col-span-8">
                                <img src={selectedPicture.imagenes[0]} alt="Imagen transformada" />
                            </div>

                            <div className="col-span-12 md:col-span-6 lg:col-span-4">
                                <div className="flex flex-col items-end justify-end text-cyan-900">
                                    <div className='flex items-center font-semibold'>
                                        {selectedPicture.user.name}

                                        <Can
                                            permission={selectedPicture.canEditar || selectedPicture.canEliminar}
                                        >
                                            {/* <div className="justify-end"> */}
                                            <DropdownMenu>
                                                <DropdownMenuTrigger className='hover:bg-slate-200 rounded-md p-0.5'>
                                                    <EllipsisVertical className='w-4 h-4' />
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent>
                                                    <Can
                                                        permission={selectedPicture.canEditar}
                                                    >
                                                        <DropdownMenuItem
                                                            onClick={cargarEdicion}
                                                        >
                                                            <Pencil className='w-3 h-3 text-green-400' />
                                                            Editar
                                                        </DropdownMenuItem>

                                                        <DropdownMenuSeparator />
                                                    </Can>

                                                    <Can
                                                        permission={selectedPicture.canEliminar}
                                                    >
                                                        <DropdownMenuItem
                                                        //onClick={() => eliminarPublicacion(selectedPicture)}
                                                        >
                                                            <Trash2 className='w-3 h-3 text-red-400' />
                                                            Eliminar
                                                        </DropdownMenuItem>
                                                    </Can>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                            {/* </div> */}
                                        </Can>
                                    </div>

                                    <div className='italic'>{selectedPicture.fecha}</div>
                                </div>

                                {
                                    !editarPublicacion ? (
                                        <>
                                            <div className="text-justify whitespace-pre-line">
                                                "{selectedPicture.contenido}"
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <FormProvider {...methods}>
                                                <form onSubmit={submitEdicion}>
                                                    <div className='pb-4'>
                                                        <FormField
                                                            name="contenido"
                                                            render={({ field }) => (
                                                                <FormItem>
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
                                                            onClick={() => setEditarPublicacion(false)}
                                                        >
                                                            Cancelar
                                                        </Button>
                                                        <Button>
                                                            Guardar
                                                        </Button>
                                                    </div>
                                                </form>
                                            </FormProvider>
                                        </>)
                                }
                            </div>
                        </div>
                    </DialogContent>

                </Dialog>)
            }
        </MainLayout>
    )
}
