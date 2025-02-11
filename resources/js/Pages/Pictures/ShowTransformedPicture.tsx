import AppCard from '@/Components/AppCard'
import MainLayout from '@/Layouts/MainLayout'
import { PageProps } from '@/types'
import { Tabs, TabsList, TabsTrigger } from "@/Components/ui/tabs";
import React, { useState } from 'react'

export default function ShowTransformedPicture({
    base64Image,
    base64OldImage
}: PageProps<{
    base64Image: string,
    base64OldImage: string,
}>) {
    const [imagenTransformada, setImagenTransformada] = useState(true);
    
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
                </div>
            </AppCard>
        </MainLayout>
    )
}
