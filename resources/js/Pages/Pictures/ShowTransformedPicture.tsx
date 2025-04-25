import AppCard from '@/Components/AppCard';
import MainLayout from '@/Layouts/MainLayout';
import { PageProps } from '@/types';
import React, { useState } from 'react'
import { Button } from '@/Components/ui/button';
import { Link, useForm } from '@inertiajs/react';
import { ReactCompareSlider, ReactCompareSliderImage } from 'react-compare-slider';
import { MoveLeft, MoveRight } from 'lucide-react';

export default function ShowTransformedPicture({
    base64Image,
    base64OldImage,
    tipo_daltonismo,
}: PageProps<{
    base64Image: string,
    base64OldImage: string,
    tipo_daltonismo?: string,
}>) {
    const [imagenTransformada, setImagenTransformada] = useState(true);

    const { data, post, processing, errors } = useForm<{
        base64: string;
        originalBase64: string;
        tipo_daltonismo?: string;
    }>({
        base64: base64Image,
        originalBase64: base64OldImage,
        tipo_daltonismo: tipo_daltonismo,
    });

    function submit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        post(route('picture.save'), {data});
    }

    return (
        <MainLayout
            name="Imagen">
            <AppCard
                title='Imagen transformada'
            >

                <div className="flex flex-col items-center gap-4 w-full">
                    <div className="mt-2 flex justify-between text-xs md:text-sm w-full lg:w-1/2">
                        <div className='flex gap-x-2 items-center'>
                            <MoveLeft /> Imagen original
                        </div>

                        <div className='flex gap-x-2 text-right items-center'>
                            Imagen transformada <MoveRight />
                        </div>
                    </div>

                    <div className="mt-2">
                        <ReactCompareSlider
                            itemOne={<ReactCompareSliderImage src={`data:image/jpeg;base64,${base64Image}`} alt="Image one" />}
                            itemTwo={<ReactCompareSliderImage src={base64OldImage} alt="Image two" />}
                        />
                    </div>

                    <form onSubmit={submit}>
                        <div className="pt-3 w-full flex flex-col flex-col-reverse items-center sm:flex-row sm:justify-center">
                            <Link href={route('picture.create')} className="w-full sm:w-auto">
                                <Button className="px-6 py-4 md:mx-3 w-full sm:w-auto" variant="outline" disabled={processing} type="button">
                                    Cancelar
                                </Button>
                            </Link>

                            <Button className="px-6 my-4 md:mx-3 w-full sm:w-auto" variant="default" disabled={processing} type="submit">
                                Guardar imagen
                            </Button>
                        </div>


                    </form>
                </div>
            </AppCard>
        </MainLayout>
    )
}
