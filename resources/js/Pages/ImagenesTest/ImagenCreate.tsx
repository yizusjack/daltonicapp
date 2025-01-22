import MainLayout from "@/Layouts/MainLayout";
import { PageProps } from "@/types";
import { useForm as useInertiaForm } from "@inertiajs/react";
import React from "react";
import {
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormDescription,
    FormMessage,
} from "@/Components/ui/form";
import { Input } from "@/Components/ui/input";
import { useForm, FormProvider } from "react-hook-form";
import { Button } from "@/Components/ui/button";
import AppCard from "@/Components/AppCard";

export default function FormImagenes({
    store_url,
}: PageProps<{
    store_url: string;
}>) {
    const { data, setData, post, processing, errors } = useInertiaForm<{
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

    const methods = useForm({
        defaultValues: {
            Respuesta_1: data.Respuesta_1,
            Respuesta_2: data.Respuesta_2,
            Respuesta_3: data.Respuesta_3,
            Imagen: null,
        },
    });

    function submit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const formData = new FormData();
        formData.append("Respuesta_1", data.Respuesta_1.toString());
        formData.append("Respuesta_2", data.Respuesta_2.toString());
        formData.append("Respuesta_3", data.Respuesta_3.toString());
        if (data.Imagen) {
            formData.append("Imagen", data.Imagen);
        }

        post(store_url, { data: formData });
    }

    return (
        <MainLayout name="Nueva imagen de test">
            <AppCard
                title="Nueva imagen para test de Ishihara"
            >
                <FormProvider {...methods}>
                    <form onSubmit={submit} encType="multipart/form-data">

                        <div>
                            {/* File Input */}
                            <FormField
                                name="Imagen"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Imagen</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="file"
                                                name="Imagen"
                                                onChange={(e) => setData('Imagen', e.target.files?.[0] || null)}
                                                className="h-16"
                                            />
                                        </FormControl>
                                        <FormDescription>Subir Imagen.</FormDescription>
                                        {errors.Imagen && (
                                            <FormMessage>{errors.Imagen}</FormMessage>
                                        )}
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="grid grid-cols-12 gap-3">
                            <div className="col-span-12 md:col-span-4 my-2">
                                {/* Respuesta_1 */}
                                <FormField
                                    name="Respuesta_1"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Respuesta 1</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="number"
                                                    placeholder="0"
                                                    onChange={(e) => setData("Respuesta_1", Number(e.target.value))}
                                                />
                                            </FormControl>
                                            <FormDescription>Primera opción.</FormDescription>
                                            {errors.Respuesta_1 && (
                                                <FormMessage>{errors.Respuesta_1}</FormMessage>
                                            )}
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <div className="col-span-12 md:col-span-4 my-2">
                                {/* Respuesta_2 */}
                                <FormField
                                    name="Respuesta_2"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Respuesta 2</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="number"
                                                    placeholder="0"
                                                    onChange={(e) => setData("Respuesta_2", Number(e.target.value))}
                                                />
                                            </FormControl>
                                            <FormDescription>Segunda opción.</FormDescription>
                                            {errors.Respuesta_2 && (
                                                <FormMessage>{errors.Respuesta_2}</FormMessage>
                                            )}
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <div className="col-span-12 md:col-span-4 my-2">
                                {/* Respuesta_3 */}
                                <FormField
                                    name="Respuesta_3"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Respuesta 3</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="number"
                                                    placeholder="0"
                                                    onChange={(e) => setData("Respuesta_3", Number(e.target.value))}
                                                />
                                            </FormControl>
                                            <FormDescription>Tercer opción.</FormDescription>
                                            {errors.Respuesta_3 && (
                                                <FormMessage>{errors.Respuesta_3}</FormMessage>
                                            )}
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className="pt-3 w-full flex justify-center">
                            <Button className="px-6" variant="default" type="submit" disabled={processing}>
                                Enviar
                            </Button>
                        </div>
                    </form>
                </FormProvider>
            </AppCard>
        </MainLayout>
    );
}
