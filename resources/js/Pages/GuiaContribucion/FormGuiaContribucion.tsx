import CardPrueba from '@/Components/PruebasDaltonismo/CardPrueba';
import CardTipoDaltonismo from '@/Components/PruebasDaltonismo/CardTipoDaltonismo';
import MainLayout from '@/Layouts/MainLayout';
import { PageProps } from '@/types';
import { useForm } from '@inertiajs/react';
import React, { useState } from 'react'

export default function FormGuiaContribucion(
    {
        pruebas,
        tipos_daltonismo,
        store_url
    }: PageProps<{
        pruebas: {id: number, URL: string, Respuesta_1: number, Respuesta_2: number, Respuesta_3: number}[],
        tipos_daltonismo: { [index: string]: string },
        store_url: string,
    }>
) {
    const [imagenActual, setImagenActual] = useState(0);
    const [completadas, setCompletadas] = useState(false);
    const totalPruebas = pruebas.length;

    const breadcrumb = [
        {
            url: 'active',
            name: 'Guía de contribución'
        }
    ];

    const { data, setData, post, processing, errors } = useForm<{
        tipo_daltonismo: string;
        resultados: {id: number, valor: number}[];
    }>({
        tipo_daltonismo: '',
        resultados: [], // Inicializa como un array vacío
    });

    function submit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        post(store_url);
    }

    const setImagen = (valor: number, id: number) => {
        setData('resultados', [...data.resultados, {id: pruebas[id].id, valor}])

        if(id + 1 < totalPruebas) {
            setImagenActual(id + 1);
        } else {
            setCompletadas(true);
        }
    }

  return (
    <MainLayout 
        name='Guia de contribución'
        breadcrumb={breadcrumb}
    >
        { completadas == false ?
            <CardPrueba
                index={imagenActual}
                imagen={pruebas[imagenActual]}
                setImagen={setImagen}
                totalPruebas={totalPruebas}
                titleCard='Guía de contribución'
            /> 
            : 
            <CardTipoDaltonismo 
                tipos_daltonismo = {tipos_daltonismo} 
                errors = {errors}
                setData={setData}
                onSubmit={submit}
            />
        }
    </MainLayout>
  )
}
