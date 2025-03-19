import AppCard from '@/Components/AppCard'
import MainLayout from '@/Layouts/MainLayout'
import { PageProps } from '@/types'
import { Tabs, TabsList, TabsTrigger } from "@/Components/ui/tabs";
import React, { useState } from 'react'
import { Button } from '@/Components/ui/button';
import { Link, useForm } from '@inertiajs/react';
import { ReactCompareSlider, ReactCompareSliderImage } from 'react-compare-slider';

export default function ShowTransformedPicture({
    base64Image,
    base64OldImage
}: PageProps<{
    base64Image: string,
    base64OldImage: string,
}>) {
    const [imagenTransformada, setImagenTransformada] = useState(true);

    const { data, post, processing, errors } = useForm<{
        base64: string;
        originalBase64: string;
    }>({
        base64: base64Image,
        originalBase64: base64OldImage,
    });

    function submit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        post(route('picture.save'), {data});
    }

    return (
        <MainLayout
            name="Imagen">
            <AppCard
                title='Mostrar imagen nueva'
            >
                <Tabs defaultValue="nueva" className="w-full">
                    <TabsList className="w-full">
                        <TabsTrigger className="w-1/2" value="nueva" onClick={() => setImagenTransformada(true)}>
                            Imagen transformada
                        </TabsTrigger>
                        <TabsTrigger className="w-1/2" value="original" onClick={() => setImagenTransformada(false)}>Imagen original</TabsTrigger>
                    </TabsList>
                </Tabs>

                <div className="flex flex-col items-center gap-4">
                    <div className="mt-2 pt-5">

                        {
                            imagenTransformada == true
                                ? (
                                    <img src={`data:image/jpeg;base64,${base64Image}`} />
                                ) : (
                                    <img src={base64OldImage} />
                                )
                        }
                    </div>

                    <div className="mt-2 pt-5">
                    <ReactCompareSlider
                        itemOne={<ReactCompareSliderImage src={`data:image/jpeg;base64,${base64Image}`} alt="Image one" />}
                        itemTwo={<ReactCompareSliderImage src={base64OldImage} alt="Image two" />}
                        />
                    </div>

                    <form onSubmit={submit}>
                        <div className="pt-3 w-full flex justify-center">
                            <Link href={route('picture.create')}>
                                <Button className="px-6 mx-3" variant="outline" disabled={processing} type="button">
                                    Cancelar
                                </Button>
                            </Link>

                            <Button className="px-6 mx-3" variant="default" disabled={processing} type="submit">
                                Guardar imagen
                            </Button>
                        </div>
                    </form>
                </div>
            </AppCard>
        </MainLayout>
    )
}
