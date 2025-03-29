import { PageProps } from '@/types'
import React, { useState } from 'react'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { useForm } from '@inertiajs/react';

export default function ConfirmationModal({
    ruta,
    modelo,
    abrirModal,
    setAbrirModal,
    setModelo,
}: PageProps<{
    ruta?: string,
    modelo?: string,
    abrirModal: boolean,
    setAbrirModal: React.Dispatch<React.SetStateAction<boolean>>,
    setModelo: React.Dispatch<React.SetStateAction<any | null>>
}>) {

    const {delete: destroy} = useForm({});

    const confirmar = () => {
        setModelo(null);
        destroy(ruta as string, {
            preserveScroll: true,
            onSuccess: () => {
                setAbrirModal(false);
            },
        });
    }


    return (
        <Dialog open={abrirModal} onOpenChange={setAbrirModal}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Eliminar {modelo}</DialogTitle>
                </DialogHeader>
                <div>
                    ¿Estás seguro de querer eliminar esta {modelo}?
                </div>
                <DialogFooter>
                    <Button onClick={() => setAbrirModal(false)} variant='outline'>Cancelar</Button>
                    <Button onClick={confirmar} variant='destructive'>Eliminar</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
