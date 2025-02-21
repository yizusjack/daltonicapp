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
import { Card, CardContent } from '@/Components/ui/card';
import { Link as LinkType } from '@/types/link';
import { Link } from '@inertiajs/react';

export default function IndexPicture({
    imagenes
}: PageProps<{
    imagenes: {
        data: Picture[];
        links: LinkType[];
    };
}>) {

    const breadcrumb = [
        {
            url: 'active',
            name: 'Mi galería'
        }
    ];

    const [abrirModal, setAbrirModal] = useState(false);
    const [selectedPicture, setSelectedPicture] = useState<Picture | null>(null);

    const mostrarImagen = (picture: Picture) => {
        setSelectedPicture(picture);

        setTimeout(() => {
            setAbrirModal(true);
        }, 10);
    }

    const getDate = (date: Date) => {
        const formatedDate = new Date(date);

        return formatedDate.toLocaleDateString();
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
                        imagenes.data.map((imagen) => (
                            <Card key={imagen.id} className='col-span-12 md:col-span-6 lg:col-span-4'>
                                <CardContent className='pt-6 pb-8'>
                                    <div className='max-w-64 h-64 justify-center items-center rounded-md relative group'>
                                        <img src={route('picture.show', imagen.id)} className='w-full h-full object-cover rounded-md' alt="" />

                                        <div className="p-3 absolute inset-0 bg-black bg-opacity-50 flex items-end justify-between rounded-xl opacity-0 md:group-hover:opacity-100 transition-opacity duration-300">
                                            <Button onClick={() => mostrarImagen(imagen)} variant="secondary">
                                                <EyeIcon className='h-6 w-6' />
                                            </Button>
                                            <a href={route('picture.download', imagen.id)}>
                                                <Button variant="secondary">
                                                    <FolderDown className='h-6 w-6' />
                                                </Button>
                                            </a>
                                        </div>
                                    </div>

                                    <div className="mt-2 opacity-100 md:opacity-0 grid grid-cols-2 gap-2">
                                        <Button onClick={() => mostrarImagen(imagen)} className='w-full'>
                                            <EyeIcon className='h-6 w-6' />
                                        </Button>
                                        <a href={route('picture.download', imagen.id)}>
                                            <Button className='w-full'>
                                                <FolderDown className='h-6 w-6' />
                                            </Button>
                                        </a>
                                    </div>

                                    <div className="p-3 flex justify-end text-sm text-slate-500 italic">
                                        {getDate(imagen.created_at)}
                                    </div>
                                </CardContent>
                            </Card>
                        ))
                    }
                </div>

                <div className="py-10 text-center">
                    {
                        imagenes.links.map(link => (
                            link.url ?

                                <Link
                                    className={`p-1 mx-1 ${link.active ? 'font-bold text-blue-400 underline' : ''}`}
                                    key={link.label} href={link.url} dangerouslySetInnerHTML={{ __html: link.label }} />
                                :

                                <span
                                    className="cursor-not-allowed text-gray-300"
                                    key={link.label} dangerouslySetInnerHTML={{ __html: link.label }}>
                                </span>
                        ))
                    }
                </div>
            </AppCard>
            {
                selectedPicture &&
                (<Dialog open={abrirModal} onOpenChange={setAbrirModal}>
                    <DialogContent className='max-w-7xl'>
                        <div className='flex items-center justify-center'>
                            <img src={route('picture.show', selectedPicture.id)} alt="" />
                        </div>
                    </DialogContent>
                </Dialog>)
            }
        </MainLayout>
    )
}
