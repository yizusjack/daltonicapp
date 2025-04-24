import { PageProps } from '@/types'
import React from 'react'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog'
import { Button } from './ui/button'

export default function Terminos({
    abrirModal,
    setAbrirModal,
}: PageProps<{
    abrirModal: boolean,
    setAbrirModal: React.Dispatch<React.SetStateAction<boolean>>,
}>) {
    return (
        <Dialog open={abrirModal} onOpenChange={setAbrirModal}>
            <DialogContent className="p-8 max-w-7xl">
                <DialogHeader>
                    <DialogTitle>Términos y condiciones</DialogTitle>
                </DialogHeader>
                <div>
                    Claro que si jajajaja
                </div>
                <DialogFooter>
                    <Button onClick={() => setAbrirModal(false)} variant='outline'>Cerrar</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
