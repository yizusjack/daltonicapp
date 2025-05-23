import MainLayout from "@/Layouts/MainLayout";
import { PageProps } from "@/types";
import { useForm, usePage } from "@inertiajs/react";
import React, { useEffect, useRef, useState } from "react";
import { Button } from "@/Components/ui/button";
import Webcam from "react-webcam";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/Components/ui/tabs"
import AppCard from "@/Components/AppCard";
import { Camera } from "lucide-react";
import Loader from "@/Components/Loader";
import { Input } from "@/Components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/Components/ui/select";
import { SelectValue } from "@radix-ui/react-select";

export default function PictureCreate({
    store_url,
    tipos_daltonismo,
}: PageProps<{
    store_url: string;
    tipos_daltonismo: { [index: string]: string };
}>) {

    const tipo_daltonismo = usePage().props.auth?.user.tipo_daltonismo;

    const useMediaQuery = (query: string) => {
        const [matches, setMatches] = useState(window.matchMedia(query).matches);

        useEffect(() => {
            const media = window.matchMedia(query);
            const listener = () => setMatches(media.matches);

            media.addEventListener("change", listener);
            return () => media.removeEventListener("change", listener);
        }, [query]);

        return matches;
    };

    const isMobile = useMediaQuery("(max-width: 768px)");

    const videoConstraints = {
        width: isMobile ? 225 : 640,
        height: isMobile ? 400 : 480,
        facingMode: "environment",
    }

    const breadcrumb = [
        {
            url: 'active',
            name: 'Nueva imagen'
        }
    ];

    const { data, setData, post, processing, errors } = useForm<{
        Imagen: string | null;
        tipo_daltonismo: string|null;
    }>({
        Imagen: null,
        tipo_daltonismo: null,
    });

    const [showWebcam, setShowWebcam] = useState(true);
    const webcamRef = useRef<Webcam>(null);
    const [image, setImage] = useState<string | null>(null);

    const capture = () => {
        if (webcamRef.current) {
            const screenshot = webcamRef.current.getScreenshot();
            setImage(screenshot);
        }
    };

    const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const toggleCamera = () => {
        setShowWebcam(!showWebcam);
    }

    useEffect(() => {
        setData("Imagen", image);
    }, [image])

    const cancelar = () => {
        setImage(null);
    }

    const [loader, setLoader] = useState(false);


    function submit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        setLoader(true);

        if (image) {
            post(store_url, {
                preserveScroll: true,
                onSuccess: () => {
                    setLoader(false);
                },
                onError: () => {
                    setLoader(false);
                }
            });
        }
    }

    return (
        <MainLayout
            name="Nueva Imagen"
            breadcrumb={breadcrumb}
        >
            <AppCard
                title="Nueva imagen"
            >
                {
                    loader &&
                    <Loader
                        mensaje="Transformando imagen"
                        tipo_daltonismo={tipo_daltonismo}
                    />
                }

                {
                    image ? (
                        <>
                            <div className="flex flex-col items-center gap-4">
                                <div className="mt-2 pt-5">
                                    <img src={image} />
                                </div>
                                <form onSubmit={submit}>
                                    {tipo_daltonismo == 'Sin Daltonismo' &&
                                        <div className="justify-center">
                                            <div className='px-1 text-sm'>
                                                Selecciona el tipo de daltonismo que quieres simular:
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
                                    }
                                    <div className="pt-3 w-full flex justify-center">
                                        <Button className="px-6 mx-3" variant="outline" type="button" disabled={processing} onClick={cancelar}>
                                            Cancelar
                                        </Button>

                                        <Button className="px-6 mx-3" variant="default" type="submit" disabled={processing}>
                                            Transformar
                                        </Button>
                                    </div>
                                </form>
                            </div>
                        </>
                    ) : (
                        <>
                            <Tabs defaultValue={showWebcam ? "camara" : "subir"} className="w-full">
                                <TabsList className="w-full">
                                    <TabsTrigger className="w-1/2" value="camara" onClick={() => setShowWebcam(true)}>
                                        Cámara
                                    </TabsTrigger>

                                    <TabsTrigger className="w-1/2" value="subir" onClick={() => setShowWebcam(false)}>
                                        Subir foto
                                    </TabsTrigger>
                                </TabsList>
                            </Tabs>
                            <div className="flex flex-col items-center gap-4">
                                {!showWebcam ? (
                                    <>
                                        <div className="mt-2 pt-5 max-w-full">
                                            <div className='px-1 text-sm'>
                                                Sube una imagen:
                                            </div>
                                            <Input
                                                type="file"
                                                name="Imagen"
                                                accept="image/*"
                                                onChange={handleUpload}
                                                className="h-16 w-full"
                                            />
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div className="mt-2 pt-5">
                                            <Webcam
                                                ref={webcamRef}
                                                screenshotFormat="image/jpeg"
                                                videoConstraints={videoConstraints}
                                                className="border rounded-lg"
                                            />
                                        </div>

                                        <Button
                                            variant="default"
                                            onClick={capture}
                                        >
                                            <Camera />
                                            Tomar Foto
                                        </Button>

                                    </>
                                )}
                            </div>
                        </>
                    )
                }
            </AppCard>
        </MainLayout>
    );
}
