import CardPrueba from '@/Components/PruebasDaltonismo/CardPrueba';
import React, { useState } from 'react'

export default function FormGuiaContribucion() {
    const [imagenActual, setImagenActual] = useState(0);

    const setImagen = (valor: number, id: number) => {
        console.log(valor);

        setImagenActual(id + 1);
    }

    const pruebas: {id: number, URL: string, Respuesta_1: number, Respuesta_2: number, Respuesta_3: number}[] = [
        {
            id: 1,
            URL: 'http://daltonicapp.test/storage/ish1.png',
            Respuesta_1: 23,
            Respuesta_2: 34,
            Respuesta_3: 2
        },
        {
            id: 2,
            URL: 'http://daltonicapp.test/storage/ish2.png',
            Respuesta_1: 3,
            Respuesta_2: 4,
            Respuesta_3: 23
        }
    ]
  return (
    <div>
        <img src={pruebas[1].URL} alt="" />
        <CardPrueba 
            imagen={pruebas[imagenActual]}
            setImagen={setImagen}
        />
    </div>
  )
}
