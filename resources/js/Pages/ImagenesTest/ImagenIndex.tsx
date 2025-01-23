import AppCard from '@/Components/AppCard'
import MainLayout from '@/Layouts/MainLayout'
import { PageProps } from '@/types'
import React from 'react'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
    type CarouselApi,
} from "@/Components/ui/carousel"
import { Button } from '@/Components/ui/button'
import { Link } from '@inertiajs/react'
import { Plus } from 'lucide-react'

export default function ImagenIndex({
    pruebas,
    create_url
}: PageProps<{
    pruebas: { id: number, URL: string, Respuesta_1: number, Respuesta_2: number, Respuesta_3: number }[],
    create_url: string
}>) {

    const [api, setApi] = React.useState<CarouselApi>()
    const [current, setCurrent] = React.useState(0)
    const [count, setCount] = React.useState(0)

    React.useEffect(() => {
        if (!api) {
            return
        }

        setCount(api.scrollSnapList().length)
        setCurrent(api.selectedScrollSnap() + 1)

        api.on("select", () => {
            setCurrent(api.selectedScrollSnap() + 1)
        })
    }, [api])

    return (
        <MainLayout
            name="Imagenes de test"
        >
            <AppCard
                title='Imagenes de test'
            >
                <div className="flex pb-3 md:justify-end">
                    <Button 
                        asChild 
                        className='bg-neutral-700 hover:bg-neutral-600'
                        size={"sm"}
                    >
                        <Link href={create_url}>
                            <Plus />
                            Nueva imagen de prueba
                        </Link>
                    </Button>
                </div>

                <div className="flex justify-center px-10">
                    <Carousel setApi={setApi} className="w-full max-w-xs">
                        <CarouselContent>
                            {pruebas.map((prueba) => (
                                <CarouselItem
                                    key={prueba.id}
                                >
                                    <div className="h-44 w-44 md:h-72 md:w-72 object-contain">
                                        <img src={prueba.URL} alt="" />
                                    </div>
                                    <div className='w-44 md:w-72'>
                                        <div className='w-full bg-slate-800 text-white rounded-md p-2 text-center mb-3'>
                                            {prueba.Respuesta_1}
                                        </div>

                                        <div className='w-full bg-slate-800 text-white rounded-md p-2 text-center mb-3'>
                                            {prueba.Respuesta_2}
                                        </div>

                                        <div className='w-full bg-slate-800 text-white rounded-md p-2 text-center mb-3'>
                                            {prueba.Respuesta_3}
                                        </div>
                                    </div>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        <CarouselPrevious />
                        <CarouselNext />
                    </Carousel>
                </div>

                <div className="text-xs md:text-sm mt-3 text-right text-muted-foreground">
                    Imagen {current} de {count}
                </div>
            </AppCard>
        </MainLayout>
    )
}
