import AppCard from '@/Components/AppCard'
import MainLayout from '@/Layouts/MainLayout'
import { PageProps } from '@/types'
import React from 'react'

export default function ShowTransformedPicture({
    base64Image
}: PageProps<{
    base64Image: string,
}>) {
    return (
        <MainLayout
            name="Imagen">
            <AppCard
                title='Mostrar imagen nueva'
            >
                <div className="flex flex-col items-center gap-4">
                    <div className="mt-2 pt-5">
                        <img  src={`data:image/jpeg;base64,${base64Image}`} />
                    </div>
                </div>
            </AppCard>
        </MainLayout>
    )
}
