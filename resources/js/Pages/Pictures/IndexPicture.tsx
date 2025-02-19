import AppCard from '@/Components/AppCard'
import { Button } from '@/Components/ui/button';
import MainLayout from '@/Layouts/MainLayout'
import { PageProps } from '@/types';
import { Picture } from '@/types/picture';
import { EyeIcon, FolderDown } from 'lucide-react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/Components/ui/dialog"
import React, { useState } from 'react'

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

    const [abrirModal, setAbrirModal] = useState(false);
    const [selectedPicture, setSelectedPicture] = useState<Picture|null>(null);

    const mostrarImagen = (picture: Picture) => {
        setSelectedPicture(picture);

        setTimeout(() => {
            setAbrirModal(true);
        }, 10);
    }

    return (
        <MainLayout
            name='Mi galería'
            breadcrumb={breadcrumb}
        >
            <AppCard
                title='Mi galería'
                description='Todas las imágenes de tu galería son privadas y solo las puedes ver tú.'
            >
                <div className="grid grid-cols-12 gap-x-4 gap-y-8 place-items-center">
                    {
                        imagenes.map((imagen) => (
                            <div key={imagen.id} className='col-span-4 w-64 h-64 justify-center items-center rounded-md relative group'>
                                <img src={route('picture.show', imagen.id)} className='w-full h-full object-cover rounded-md' alt="" />

                                <div className="p-3 absolute inset-0 bg-black bg-opacity-50 flex items-end justify-between rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <Button onClick={() => mostrarImagen(imagen)} variant="secondary">
                                        <EyeIcon className='h-6 w-6' />
                                    </Button>
                                    <Button variant="secondary">
                                        <FolderDown className='h-6 w-6' />
                                    </Button>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </AppCard>
            <Dialog open={abrirModal} onOpenChange={setAbrirModal}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Are you absolutely sure?</DialogTitle>
                        <DialogDescription>
                            This action cannot be undone. This will permanently delete your account
                            and remove your data from our servers.
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </MainLayout>
    )
}
