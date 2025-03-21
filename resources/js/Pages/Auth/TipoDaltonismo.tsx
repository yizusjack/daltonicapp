import AppCard from '@/Components/AppCard';
import CardPrueba from '@/Components/PruebasDaltonismo/CardPrueba';
import CardTipoDaltonismo from '@/Components/PruebasDaltonismo/CardTipoDaltonismo';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/Components/ui/button';
import MainLayout from '@/Layouts/MainLayout';
import { PageProps } from '@/types'
import { useForm } from '@inertiajs/react';
import { Info, Terminal } from 'lucide-react';
import React, { useState } from 'react'

export default function TipoDaltonismo(
    {
        pruebas,
        store_url,
        tipos_daltonismo
    }: PageProps<{
        pruebas: { id: number, URL: string, Respuesta_1: number, Respuesta_2: number, Respuesta_3: number }[],
        tipos_daltonismo: { [index: string]: string },
        store_url: string,
    }>
) {
    const breadcrumb = [
        {
            url: 'active',
            name: 'Test de daltonismo'
        }
    ];

    //Contador de la imagen de test en que se encuentra
    const [imagenActual, setImagenActual] = useState(0);

    //Evalúa si ya se completaron todas las imagenes
    const [completadas, setCompletadas] = useState(false);

    //Bandera para determinar si se está haciendo el test de daltonismo o se llenará manualmente
    const [seleccionarTipo, setSeleccionarTipo] = useState(false);

    const totalPruebas = pruebas.length;

    //Form del tipo de daltonismo
    const { data, setData, post, processing, errors } = useForm<{
        resultados: { id: number, valor: number }[];
    }>({
        resultados: [], // Inicializa como un array vacío
    });

    //Función para enviar los parámetros al test
    function submit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        post(store_url);
    }

    //Función para guardar valor del test actual y cambiar a la siguiente imagen
    const setImagen = (valor: number, id: number) => {
        setData('resultados', [...data.resultados, { id: pruebas[id].id, valor }])

        if (id + 1 < totalPruebas) {
            setImagenActual(id + 1);
        } else {
            setCompletadas(true);
        }
    }

    const formTipo = useForm<{
        tipo_daltonismo: string;
    }>({
        tipo_daltonismo :'', // Inicializa como un array vacío
    });

    function submitTipo(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        formTipo.post(store_url);
    }

    return (
        <MainLayout
            name='Test de tipo de daltonismo'
            breadcrumb={breadcrumb}
        >
            {
                ! seleccionarTipo ?
                    <>
                    {completadas == false ?
                        <div>
                            <div className='mt-4 px-5'>
                                <Alert variant='destructive'>
                                    <div className="flex items-center gap-x-2">
                                    <Info className="h-4 w-4" />
                                    <AlertTitle className='font-bold'>¿Ya conoces tu tipo de daltonismo?</AlertTitle>
                                    </div>
                                    <AlertDescription>
                                        Puedes registrarlo haciendo clic <span onClick={() => setSeleccionarTipo(true)} className='text-slate-900 font-bold hover:underline cursor-pointer'>aquí</span>
                                    </AlertDescription>
                                </Alert>
                            </div>
                            <CardPrueba
                                index={imagenActual}
                                imagen={pruebas[imagenActual]}
                                setImagen={setImagen}
                                totalPruebas={totalPruebas}
                                titleCard='Test de tipo de daltonismo'
                            />
                        </div>
                        :
                        <AppCard
                            title='Test de tipo de daltonismo'
                            description='Al enviar el formulario obtendrás tu tipo de daltonismo'
                            footer='Enviar resultados'
                        >
                            <div className="h-96 flex justify-center items-center">
                                <form onSubmit={submit}>
                                    <Button type="submit">Enviar mis resultados</Button>
                                </form>
                            </div>
                        </AppCard>
                    }
                    </>
                    :
                    <>
                        <CardTipoDaltonismo
                            tipos_daltonismo={tipos_daltonismo}
                            errors={formTipo.errors}
                            setData={formTipo.setData}
                            onSubmit={submitTipo}
                        />
                    </>
                }
        </MainLayout>
    )
}
