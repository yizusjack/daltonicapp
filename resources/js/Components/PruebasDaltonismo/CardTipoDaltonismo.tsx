import React, { PropsWithChildren } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card'
import { Button } from '@/Components/ui/button'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/Components/ui/select"

export default function CardTipoDaltonismo({
    tipos_daltonismo,
    errors,
    setData,
    onSubmit,
}: PropsWithChildren<{
    tipos_daltonismo: { [index: string]: string }
    errors: Partial<Record<string, string>>
    setData: (field: string, value: any) => void;
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}>) {
    return (
        <div className='p-6'>
            <Card className='w-full bg-slate-50'>
                <CardHeader>
                    <CardTitle>Guía de contribución</CardTitle>
                    <CardDescription>Tipo de daltonismo</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex justify-center">
                        <div className='w-full flex justify-center'>
                            <form onSubmit={onSubmit}>
                                <div className="w-64 mb-3">
                                    <div className='px-1 text-sm'>
                                        Selecciona tu tipo de daltonismo:
                                    </div>
                                    <Select onValueChange={e => setData('tipo_daltonismo', e)}>
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Tipo de daltonismo:" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {
                                                Object.entries(tipos_daltonismo).map((value, key) => (
                                                    <SelectItem value={value[0]} key={key}>{value[1]}</SelectItem>
                                                ))
                                            }
                                        </SelectContent>
                                    </Select>
                                    {errors.tipo_daltonismo && <div className='p-1 text-xs text-red-700'>{errors.tipo_daltonismo}</div>}
                                </div>
                                <Button className='w-full' type="submit">Enviar</Button>
                            </form>
                        </div>
                    </div>
                </CardContent>
                <CardFooter className='flex justify-end'>
                    <p className='text-xs'>Ingresa tu tipo de daltonismo para finalizar</p>
                </CardFooter>
            </Card>
        </div>
    )
}
