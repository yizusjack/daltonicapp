import React, { PropsWithChildren } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/Components/ui/card"
import { Button } from '@/components/ui/button';

export default function CardPrueba({
  imagen,
  setImagen
}: PropsWithChildren<{
  setImagen: (valor: number, id: number) => void;
  imagen: { id: number, URL: string, Respuesta_1: number, Respuesta_2: number, Respuesta_3: number };
}>) {

  return (
    <div className='p-6'>
      <Card className='w-full bg-slate-50'>
        <CardHeader>
          <CardTitle>Guía de contribución</CardTitle>
          <CardDescription>Imágen {imagen.id}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center">
            <div className="h-72 w-72 object-contain">
              <img src={imagen.URL} alt="" />
            </div>
          </div>

          <div className="flex justify-center">
            <div className="w-1/2 flex justify-center">
              <div className="grid grid-cols-2 gap-x-12 gap-y-4">
                <div>
                  <Button className='w-24 px-7 py-6' onClick={() => setImagen(imagen.Respuesta_1, imagen.id - 1)}>
                    {imagen.Respuesta_1}
                  </Button>
                </div>
                <div>
                  <Button className='w-24 px-7 py-6' onClick={() => setImagen(imagen.Respuesta_2, imagen.id - 1)}>
                    {imagen.Respuesta_2}
                  </Button>
                </div>
                <div>
                  <Button className='w-24 px-7 py-6' onClick={() => setImagen(imagen.Respuesta_3, imagen.id - 1)}>
                    {imagen.Respuesta_3}
                  </Button>
                </div>
                <div>
                  <Button className='w-24 px-7 py-6' onClick={() => setImagen(0, imagen.id - 1)}>
                    No veo nada
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <p>Card Footer</p>
        </CardFooter>
      </Card>
    </div>
  )
}
