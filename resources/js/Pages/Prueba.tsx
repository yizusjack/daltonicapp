import React from 'react'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/Components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import MainLayout from '@/Layouts/MainLayout'
import CardPrueba from '@/Components/PruebasDaltonismo/CardPrueba'
import FormGuiaContribucion from './GuiaContribucion/FormGuiaContribucion'

export default function Prueba() {
  const handleChildClick = (mensaje: string) => {
    alert(mensaje);
  };
  return (
    <MainLayout>
      {/* <CardPrueba setearPropiedad={handleChildClick} /> */}
      <FormGuiaContribucion></FormGuiaContribucion>
    </MainLayout>
  )
}
