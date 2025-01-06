import MainLayout from '@/Layouts/MainLayout';
import { PageProps } from '@/types';
import { useForm } from '@inertiajs/react';
import React, { useState } from 'react'

export default function FormImagenes(
    {
        store_url
    }: PageProps<{
        store_url: string,
    }>
) {
    const { data, setData, post, processing, errors } = useForm<{
        Respuesta_1: number;
        Respuesta_2: number;
        Respuesta_3: number;
        Imagen: File | null;
    }>({
        Respuesta_1: 0,
        Respuesta_2: 0,
        Respuesta_3: 0,
        Imagen: null,
    });

    function submit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        post(store_url);
    }

  return (
    <MainLayout name='Imagenes'>
      <form onSubmit={submit}>
      <input type="number" value={data.Respuesta_1} onChange={e => setData('Respuesta_1', Number(e.target.value))} />
      {errors.Respuesta_1 && <div>{errors.Respuesta_1}</div>}
      <input type="number" value={data.Respuesta_2} onChange={e => setData('Respuesta_2', Number(e.target.value))} />
      {errors.Respuesta_2 && <div>{errors.Respuesta_2}</div>}
      <input type="number" value={data.Respuesta_3} onChange={e => setData('Respuesta_3', Number(e.target.value))} />
      {errors.Respuesta_3 && <div>{errors.Respuesta_3}</div>}
      <input type="file" onChange={(e) => setData('Imagen', e.target.files?.[0] || null)}/>
      {errors.Imagen && <div>{errors.Imagen}</div>}
      <button type="submit" disabled={processing}>
        Enviar
      </button>
      </form>
    </MainLayout>
  )
}
