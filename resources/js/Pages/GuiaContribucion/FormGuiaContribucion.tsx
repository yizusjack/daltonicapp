import CardPrueba from '@/Components/PruebasDaltonismo/CardPrueba';
import MainLayout from '@/Layouts/MainLayout';
import { PageProps } from '@/types';
import React, { useState } from 'react'

export default function FormGuiaContribucion(
    {
        pruebas
    }: PageProps<{pruebas: {id: number, URL: string, Respuesta_1: number, Respuesta_2: number, Respuesta_3: number}[]}>
) {
    console.log(pruebas);
    const [imagenActual, setImagenActual] = useState(0);

    const setImagen = (valor: number, id: number) => {
        console.log(valor);

        setImagenActual(id + 1);
    }

  return (
    <MainLayout name='Guia de contribución'>
        <CardPrueba 
            imagen={pruebas[imagenActual]}
            setImagen={setImagen}
        />
    </MainLayout>
  )
}
