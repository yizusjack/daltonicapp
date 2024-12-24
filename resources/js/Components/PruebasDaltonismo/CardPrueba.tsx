import React, { PropsWithChildren } from 'react'

export default function CardPrueba({
    imagen,
    setImagen
}: PropsWithChildren<{
    setImagen: (valor: number, id: number) => void;
    imagen: {id: number, URL: string, Respuesta_1: number, Respuesta_2: number, Respuesta_3: number};
}>) {
    const mensaje = "Holalalala";
    console.log(imagen);
  return (
    // <button onClick={() => setImagen(mensaje)}>Soy un boton</button>
    <div>
      {mensaje}
    </div>
  )
}
