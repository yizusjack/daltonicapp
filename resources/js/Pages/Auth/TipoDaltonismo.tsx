import AppCard from '@/Components/AppCard';
import CardPrueba from '@/Components/PruebasDaltonismo/CardPrueba';
import { Button } from '@/Components/ui/button';
import MainLayout from '@/Layouts/MainLayout';
import { PageProps } from '@/types'
import { useForm } from '@inertiajs/react';
import React, { useState } from 'react'

export default function TipoDaltonismo(
    {
        pruebas,
        store_url
    }: PageProps<{
        pruebas: { id: number, URL: string, Respuesta_1: number, Respuesta_2: number, Respuesta_3: number }[],
        tipos_daltonismo: { [index: string]: string },
        store_url: string,
    }>
) {
    const [imagenActual, setImagenActual] = useState(0);
    const [completadas, setCompletadas] = useState(false);
    const totalPruebas = pruebas.length;

    const { data, setData, post, processing, errors } = useForm<{
        resultados: { id: number, valor: number }[];
    }>({
        resultados: [], // Inicializa como un array vacío
    });

    function submit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        post(store_url);
    }

    const setImagen = (valor: number, id: number) => {
        setData('resultados', [...data.resultados, { id: pruebas[id].id, valor }])

        if (id + 1 < totalPruebas) {
            setImagenActual(id + 1);
        } else {
            setCompletadas(true);
        }
    }

    return (
        <MainLayout name='Test de tipo de daltonismo'>
            {completadas == false ?
                <CardPrueba
                    index={imagenActual}
                    imagen={pruebas[imagenActual]}
                    setImagen={setImagen}
                    totalPruebas={totalPruebas}
                    titleCard='Test de tipo de daltonismo'
                />
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
        </MainLayout>
    )
}
