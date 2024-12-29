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
	index,
	imagen,
	setImagen,
	totalPruebas
}: PropsWithChildren<{
	index: number;
	setImagen: (valor: number, id: number) => void;
	imagen: { id: number, URL: string, Respuesta_1: number, Respuesta_2: number, Respuesta_3: number };
	totalPruebas: number
}>) {

	return (
		<div className='p-6'>
			<Card className='w-full bg-slate-50'>
				<CardHeader>
					<CardTitle>Guía de contribución</CardTitle>
					<CardDescription>Selecciona el número que ves en la imagen</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="flex justify-center">
						<div className="h-44 w-44 md:h-72 md:w-72 object-contain">
							<img src={imagen.URL} alt="" />
						</div>
					</div>

					<div className="flex justify-center">
						<div className="w-1/2 flex justify-center">
							<div className="grid md:grid-cols-2 gap-x-12 gap-y-4">
								<div>
									<Button className='w-32 px-7 py-4' onClick={() => setImagen(imagen.Respuesta_1, index)}>
										{imagen.Respuesta_1}
									</Button>
								</div>
								<div>
									<Button className='w-32 px-7 py-4' onClick={() => setImagen(imagen.Respuesta_2, index)}>
										{imagen.Respuesta_2}
									</Button>
								</div>
								<div>
									<Button className='w-32 px-7 py-4' onClick={() => setImagen(imagen.Respuesta_3, index)}>
										{imagen.Respuesta_3}
									</Button>
								</div>
								<div>
									<Button className='w-32 px-7 py-4' onClick={() => setImagen(-1, index)}>
										No veo
									</Button>
								</div>
							</div>
						</div>
					</div>
				</CardContent>
				<CardFooter className='flex justify-end'>
					<p className='text-xs'>Prueba {index + 1} de {totalPruebas}</p>
				</CardFooter>
			</Card>
		</div>
	)
}
