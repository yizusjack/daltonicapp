import CardPrueba from '@/Components/PruebasDaltonismo/CardPrueba';
import MainLayout from '@/Layouts/MainLayout';
import { PageProps } from '@/types';
import React, { useState } from 'react'

export default function FormGuiaContribucion(
    {
        pruebas
    }: PageProps<{pruebas: {id: number, URL: string, Respuesta_1: number, Respuesta_2: number, Respuesta_3: number}[]}>
) {
    const [imagenActual, setImagenActual] = useState(0);
    const totalPruebas = pruebas.length;

    const setImagen = (valor: number, id: number) => {
        console.log(valor);

        if(id + 1 < totalPruebas) {
            setImagenActual(id + 1);
        } else {
            alert("Ya fue todo");
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
