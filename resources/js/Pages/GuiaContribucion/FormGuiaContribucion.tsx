import CardPrueba from '@/Components/PruebasDaltonismo/CardPrueba';
import MainLayout from '@/Layouts/MainLayout';
import { PageProps } from '@/types';
import { useForm } from '@inertiajs/react';
import React, { useEffect, useState } from 'react'

export default function FormGuiaContribucion(
    {
        pruebas,
        store_url
    }: PageProps<{
        pruebas: {id: number, URL: string, Respuesta_1: number, Respuesta_2: number, Respuesta_3: number}[],
        store_url: string,
    }>
) {
    const [imagenActual, setImagenActual] = useState(0);
    const totalPruebas = pruebas.length;

    const { data, setData, post, processing, errors } = useForm<{
        resultados: {id: number, valor: number}[];
    }>({
        resultados: [], // Inicializa como un array vacío
    });

    function submit() {
        post(store_url);
    }

    useEffect(() => {
        if (data.resultados.length === totalPruebas) {
            submit();
        }
    }, [data.resultados]);

    const setImagen = (valor: number, id: number) => {
        setData('resultados', [...data.resultados, {id: pruebas[id].id, valor}])

        if(id + 1 < totalPruebas) {
            setImagenActual(id + 1);
        }
    }

  return (
    <MainLayout name='Guia de contribución'>
        <CardPrueba
            index={imagenActual}
            imagen={pruebas[imagenActual]}
            setImagen={setImagen}
            totalPruebas={totalPruebas}
        />
    </MainLayout>
  )
}
