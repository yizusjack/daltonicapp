import AppCard from '@/Components/AppCard'
import Paginator from '@/Components/partials/Paginator'
import { Button } from '@/Components/ui/button'
import { Dialog, DialogContent } from '@/Components/ui/dialog'
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuItem } from '@/Components/ui/dropdown-menu'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/Components/ui/form'
import { Input } from '@/Components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import MainLayout from '@/Layouts/MainLayout'
import { PageProps } from '@/types'
import { Link } from '@/types/link'
import { PublicacionWithRelations } from '@/types/publicacion'
import { useForm } from '@inertiajs/react'
import { Dot, EllipsisVertical, MessageCircleQuestion, Pencil, Trash2 } from 'lucide-react'
import React, { useState } from 'react'
import { FormProvider, useForm as useFormContext } from 'react-hook-form'

export default function IndexPublicacion({
    publicaciones
}: PageProps<{
    publicaciones: {
        data: PublicacionWithRelations[];
        links: Link[];
        current_page: number,
        last_page: number,
    };

}>) {

    //Modal para creación de dudas
    const [abrirModal, setAbrirModal] = useState(false);

    //Forms para la creación de publicación
    const { data, setData, post, processing, errors, reset } = useForm<{
        titulo?: string;
        contenido: string;
    }>({
        titulo: '',
        contenido: '',
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

        post(route('publicacion.store'), {
            preserveScroll: true,
            onSuccess: () => {
                reset();
                setAbrirModal(false);
            },
        });
    }

    //Estado para la creación de comentarios o edición de publicaciones
    const [publicacionSeleccionada, setPublicacionSeleccionada] = useState<null|number>(null);

    //Formulario para comentarios
    const comentarioForm = useForm<{
        comentario: string;
        comentable_id?: number;
    }>({
        comentario :'',
    });

    const setFormComentario = (publicacion: number) => {
        comentarioForm.setData('comentable_id', publicacion);

        setPublicacionSeleccionada(publicacion);
    }

    function submitComentario(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        comentarioForm.post(route('comentario.store'), {
            preserveScroll: true,
            onSuccess: () => {
                setPublicacionSeleccionada(null);
                comentarioForm.reset();
            },
        });
    }

    return (
        <MainLayout
            name="Dudas"
        >
            <AppCard
                title='Dudas - Daltonicapp'
                description='Si tienes alguna duda puedes escribirla, los administradores te responderán lo más pronto posible'
            >
                <div className="flex justify-center md:justify-end">
                    <Button onClick={() => setAbrirModal(true)}>
                        Tengo una duda
                        <MessageCircleQuestion />
                    </Button>
                </div>

                <div className='max-w-7xl m-auto'>
                    {
                        publicaciones.data.map((publicacion) => (
                            <div className='w-full my-4 py-4 border-b border-slate-200' key={publicacion.id}>
                                <div className="font-bold flex justify-between">
                                    <div>
                                        {publicacion.titulo}
                                    </div>

                                    <div className="justify-end">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger className='hover:bg-slate-200 rounded-md p-0.5'>
                                                <EllipsisVertical className='w-4 h-4' />
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent>
                                                <DropdownMenuItem>
                                                    <Pencil className='w-3 h-3 text-green-400' />
                                                    Editar
                                                </DropdownMenuItem>
                                                <DropdownMenuSeparator />
                                                <DropdownMenuItem>
                                                    <Trash2 className='w-3 h-3 text-red-400' />
                                                    Eliminar
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </div>
                                </div>

                                <div>
                                    {publicacion.contenido}
                                </div>

                                <div className='flex justify-between text-xs'>
                                    <div className='flex items-center text-cyan-900'>
                                        {publicacion.user.name}
                                        <Dot />
                                        {publicacion.fecha}
                                    </div>

                                    { publicacionSeleccionada != publicacion.id &&
                                        <div onClick={() => setFormComentario(publicacion.id)} className='text-slate-500 hover:text-slate-800 hover:underline cursor-pointer'>
                                            Agregar un comentario
                                        </div>
                                    }
                                </div>

                                <div className="ml-8">
                                    {
                                        publicacion.comentarios.map((comentario) => (
                                            <div className='w-full my-4 py-4 border-b border-slate-100 text-xs' key={comentario.id}>
                                                <div className='flex items-center text-cyan-900'>
                                                    {comentario.user.name}
                                                    <Dot />
                                                    {publicacion.fecha}
                                                </div>

                                                {comentario.comentario}
                                            </div>
                                        ))
                                    }
                                    </div>

                                { publicacionSeleccionada == publicacion.id &&
                                    <form onSubmit={submitComentario}>
                                        <div className='mt-4'>
                                            <Textarea
                                                className='h-20'
                                                name='comentario'
                                                placeholder='Escribe un comentario...'
                                                onChange={(e) => comentarioForm.setData('comentario', e.target.value)}
                                            />

                                            <div className="mt-2 flex justify-end gap-x-2">
                                                <Button
                                                    type='button'
                                                    variant='outline'
                                                    size='sm'
                                                    onClick={() => setPublicacionSeleccionada(null)}
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
                        Agregar duda
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
        </MainLayout>
    )
}
