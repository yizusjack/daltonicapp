import AppCard from '@/Components/AppCard'
import MainLayout from '@/Layouts/MainLayout'
import { PageProps } from '@/types';
import { Picture } from '@/types/picture';
import React from 'react'

export default function IndexPicture({
    imagenes
}: PageProps<{
    imagenes: Picture[];
}>) {
    const breadcrumb = [
        {
            url: 'active',
            name: 'Mi galería'
        }
    ];

    return (
        <MainLayout
            name='Mi galería'
            breadcrumb={breadcrumb}
        >
            <AppCard
                title='Mi galería'
                description='Todas las imágenes de tu galería son privadas y solo las puedes ver tú.'
            >
                {
                    imagenes.map((imagen) => (
                        <div key={imagen.id}>
                            <img src={route('picture.show', imagen.id)} alt="" />
                        </div>
                    ))
                }
            </AppCard>
        </MainLayout>
    )
}
