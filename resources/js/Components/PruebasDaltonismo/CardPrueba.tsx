import React, { PropsWithChildren } from 'react'
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/Components/ui/card"
import { Button } from '@/Components/ui/button';

export default function CardPrueba({
	index,
	imagen,
	setImagen,
	totalPruebas,
	titleCard,
}: PropsWithChildren<{
	index: number;
	setImagen: (valor: number, id: number) => void;
	imagen: { id: number, URL: string, Respuesta_1: number, Respuesta_2: number, Respuesta_3: number };
	totalPruebas: number;
	titleCard: string;
}>) {

	return (
		<div className='p-6'>
			<Card className='w-full bg-slate-50'>
				<CardHeader>
					<CardTitle>{titleCard}</CardTitle>
					<CardDescription>Selecciona el número que ves en la imagen, se honesto y no trates de adivinar con lógica, si lo haces tus resultados podrían no ser precisos.</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="flex justify-center">
						<div className="h-44 w-44 md:h-72 md:w-72 m-6 object-contain">
							<img src={imagen.URL} alt="" />
						</div>
					</div>

					<div className="flex justify-center">
						<div className="w-1/2 flex justify-center">
							<div className="grid md:grid-cols-2 gap-x-12 gap-y-4">
								<div>
									<Button className='w-64 md:w-32 px-7 py-4' onClick={() => setImagen(imagen.Respuesta_1, index)}>
										{imagen.Respuesta_1}
									</Button>
								</div>
								<div>
									<Button className='w-64 md:w-32 px-7 py-4' onClick={() => setImagen(imagen.Respuesta_2, index)}>
										{imagen.Respuesta_2}
									</Button>
								</div>
								<div>
									<Button className='w-64 md:w-32 px-7 py-4' onClick={() => setImagen(imagen.Respuesta_3, index)}>
										{imagen.Respuesta_3}
									</Button>
								</div>
								<div>
									<Button className='w-64 md:w-32 px-7 py-4' onClick={() => setImagen(-1, index)}>
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
