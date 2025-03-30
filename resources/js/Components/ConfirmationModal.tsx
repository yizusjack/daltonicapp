import { PageProps } from '@/types'
import React, { useState } from 'react'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { useForm } from '@inertiajs/react';

export default function ConfirmationModal({
    confirmar,
    modelo,
    abrirModal,
    setAbrirModal,
}: PageProps<{
    confirmar: () => void,
    modelo: string,
    abrirModal: boolean,
    setAbrirModal: React.Dispatch<React.SetStateAction<boolean>>,
}>) {

    const {delete: destroy} = useForm({});

    // const confirmar = () => {
    //     destroy(ruta as string, {
    //         preserveScroll: true,
    //         onSuccess: () => {
    //             setAbrirModal(false);
    //         },
    //     });
    // }


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
