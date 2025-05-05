import AppCard from '@/Components/AppCard'
import { Button } from '@/Components/ui/button';
import MainLayout from '@/Layouts/MainLayout'
import { PageProps } from '@/types';
import { Picture } from '@/types/picture';
import { EyeIcon, FolderDown, MoveLeft, MoveRight, Share2, Trash } from 'lucide-react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/Components/ui/dialog"
import React, { useState } from 'react'
import { Card, CardContent } from '@/Components/ui/card';
import { Link as LinkType } from '@/types/link';
import { Link, useForm } from '@inertiajs/react';
import Paginator from '@/Components/partials/Paginator';
import { ReactCompareSlider, ReactCompareSliderImage } from 'react-compare-slider';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/Components/ui/form';
import { Input } from '@/Components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { FormProvider, useForm as useFormContext } from 'react-hook-form';
import ConfirmationModal from '@/Components/ConfirmationModal';
import Can from '@/Components/Auth/Can';

export default function IndexPicture({
    imagenes
}: PageProps<{
    imagenes: {
        data: Picture[];
        links: LinkType[];
        current_page: number,
        last_page: number,
    };
}>) {

    const breadcrumb = [
        {
            url: 'active',
            name: 'Mi galería'
        }
    ];

    const [abrirModal, setAbrirModal] = useState(false);
    const [selectedPicture, setSelectedPicture] = useState<Picture | null>(null);

    const mostrarImagen = (picture: Picture) => {
        setSelectedPicture(picture);

        setTimeout(() => {
            setAbrirModal(true);
        }, 10);
    }

    //Modal para publicar una imagen
    const [abrirModalPublicar, setAbrirModalPublicar] = useState(false);

    const publicarImagen = (picture: Picture) => {
        setSelectedPicture(picture);

        setTimeout(() => {
            setAbrirModalPublicar(true);
        }, 10);
    }

    //Forms para la creación de publicación
    const { data, setData, post, put, processing, errors, reset } = useForm<{
        contenido: string;
    }>({
        contenido: '',
    });

    const methods = useFormContext({
        defaultValues: {
            contenido: data.contenido,
        },
    });


    //Función para guardar publicación
    function submit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        post(route('picture.publicar', selectedPicture?.id), {
            preserveScroll: true,
            onSuccess: () => {
                reset();
                setAbrirModalPublicar(false);
                setSelectedPicture(null);
            },
        });
    }

    const [modalConfirmacion, setModalConfirmacion] = useState(false);

    const abrirModalConfirmacion = (picture: Picture) => {
        setSelectedPicture(picture);

        setTimeout(() => {
            setModalConfirmacion(true);
        }, 10);
    }

    const eliminar = useForm({});

    const confirmarEliminacion = () => {
        eliminar.delete(route('picture.destroy', selectedPicture?.id), {
            preserveScroll: true,
            onSuccess: () => {
                setSelectedPicture(null);
                setModalConfirmacion(false);
            },
        });
    };

    const getDate = (date: Date) => {
        const formatedDate = new Date(date);

        return formatedDate.toLocaleDateString();
    }

    return (
        <MainLayout
            name='Mi galería'
            breadcrumb={breadcrumb}
        >
            <AppCard
                title='Mi galería'
                description='Todas las imágenes de tu galería son privadas y solo las puedes ver tú.'
            >
                <div className="grid grid-cols-12 gap-x-4 gap-y-8 place-items-center">
                    {
                        imagenes.data.map((imagen) => (
                            <Card key={imagen.id} className='col-span-12 md:col-span-6 lg:col-span-4'>
                                <CardContent className='pt-6 pb-8'>
                                    {imagen.tipo_daltonismo &&
                                        <div className="flex justify-end text-xs text-white">
                                            <div className='my-1 p-1 rounded-md bg-slate-900'>
                                                {imagen.tipo_daltonismo}
                                            </div>
                                        </div>
                                    }
                                    <div className='max-w-64 xs:min-w-64 xl:min-w-64 h-64 justify-center items-center rounded-md relative group'>
                                        <img src={route('picture.show', imagen.id)} className='w-full h-full object-cover rounded-md' alt="" />

                                        <div className="p-3 absolute inset-0 bg-black bg-opacity-50 grid grid-cols-4 gap-2 items-end rounded-xl opacity-0 md:group-hover:opacity-100 transition-opacity duration-300">
                                            <Button onClick={() => mostrarImagen(imagen)} variant="secondary" className='w-full'>
                                                <EyeIcon className='h-6 w-6' />
                                            </Button>
                                            <a href={route('picture.download', imagen.id)}>
                                                <Button variant="secondary" className='w-full'>
                                                    <FolderDown className='h-6 w-6' />
                                                </Button>
                                            </a>
                                            <Can permission={!imagen.tipo_daltonismo}>
                                                <Button onClick={() => publicarImagen(imagen)} variant="secondary" className='w-full'>
                                                    <Share2 className='h-6 w-6' />
                                                </Button>
                                            </Can>
                                            <Button onClick={() => abrirModalConfirmacion(imagen)} variant="secondary" className='w-full'>
                                                <Trash className='h-6 w-6' />
                                            </Button>
                                        </div>
                                    </div>

                                    <div className="mt-2 opacity-100 md:opacity-0 grid grid-cols-4 gap-2">
                                        <Button onClick={() => mostrarImagen(imagen)} className='w-full'>
                                            <EyeIcon className='h-6 w-6' />
                                        </Button>
                                        <a href={route('picture.download', imagen.id)}>
                                            <Button className='w-full'>
                                                <FolderDown className='h-6 w-6' />
                                            </Button>
                                        </a>
                                        <Can permission={!imagen.tipo_daltonismo}>
                                            <Button onClick={() => publicarImagen(imagen)} className='w-full'>
                                                <Share2 className='h-6 w-6' />
                                            </Button>
                                        </Can>

                                        <Button onClick={() => abrirModalConfirmacion(imagen)} className='w-full'>
                                            <Trash className='h-6 w-6' />
                                        </Button>
                                    </div>

                                    <div className="p-3 flex justify-end text-sm text-slate-500 italic">
                                        {getDate(imagen.created_at)}
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
                        {/* Contenedor de los textos */}
                        <div className="mt-2 flex justify-center md:flex-row md:justify-between text-xs md:text-sm w-full lg:w-1/2">
                            <div className="flex gap-x-2 items-center mr-2">
                                <MoveLeft /> Imagen original
                            </div>

                            <div className="flex gap-x-2 text-right items-center">
                                Imagen transformada <MoveRight />
                            </div>
                        </div>

                        {/* Contenedor de la imagen */}
                        <div className="max-w-full max-h-[80vh] overflow-auto flex items-center justify-center">
                            <ReactCompareSlider
                                itemOne={<ReactCompareSliderImage src={route('picture.show', selectedPicture.id)} alt="Imagen transformada" />}
                                itemTwo={<ReactCompareSliderImage src={route('picture.show-original', selectedPicture.id)} alt="Imagen original" />}
                            />
                        </div>
                    </DialogContent>

                </Dialog>)
            }

            {/* Modal para publicar imagen */}
            {
                selectedPicture &&
                <Dialog open={abrirModalPublicar} onOpenChange={setAbrirModalPublicar}>
                    <DialogContent className="max-w-2xl max-h-full overflow-auto">
                        <h1 className='font-semibold leading-none tracking-tight'>
                            Publicar imagen
                        </h1>

                        <div className='flex justify-center'>
                            <img src={route('picture.show', selectedPicture.id)} alt="Vista previa de la imagen" className="max-w-md" />
                        </div>
                        <FormProvider {...methods}>
                            <form onSubmit={submit}>
                                <div className='pb-4'>
                                    <FormField
                                        name="contenido"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Agrega una descripción</FormLabel>

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

                                <div className="flex justify-end gap-x-4">
                                    <Button
                                        type='button'
                                        variant='outline'
                                        onClick={() => setAbrirModalPublicar(false)}
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
            }

            {/* Modal para eliminar */}
            {selectedPicture &&
                <ConfirmationModal
                    confirmar={confirmarEliminacion}
                    modelo='Imagen'
                    abrirModal={modalConfirmacion}
                    setAbrirModal={setModalConfirmacion}
                />
            }
        </MainLayout>
    )
}
