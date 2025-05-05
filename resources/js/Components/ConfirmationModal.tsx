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
                    <Button className='mb-2' onClick={() => setAbrirModal(false)} variant='outline'>Cancelar</Button>
                    <Button className='mb-2' onClick={confirmar} variant='destructive'>Eliminar</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
