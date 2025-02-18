import AppCard from '@/Components/AppCard'
import MainLayout from '@/Layouts/MainLayout'
import React from 'react'

export default function IndexPicture() {
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

            </AppCard>
        </MainLayout>
    )
}
