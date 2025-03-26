import AppCard from '@/Components/AppCard'
import { Button } from '@/Components/ui/button'
import { Dialog, DialogContent } from '@/Components/ui/dialog'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/Components/ui/form'
import { Input } from '@/Components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import MainLayout from '@/Layouts/MainLayout'
import { useForm } from '@inertiajs/react'
import { MessageCircleQuestion } from 'lucide-react'
import React, { useState } from 'react'
import { FormProvider, useForm as useFormContext } from 'react-hook-form'

export default function IndexPublicacion() {
    const [abrirModal, setAbrirModal] = useState(false);

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
