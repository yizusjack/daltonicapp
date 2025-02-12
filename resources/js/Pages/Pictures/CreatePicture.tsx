import MainLayout from "@/Layouts/MainLayout";
import { PageProps } from "@/types";
import { useForm } from "@inertiajs/react";
import React, { useEffect, useRef, useState } from "react";
import { Button } from "@/Components/ui/button";
import Webcam from "react-webcam";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/Components/ui/tabs"
import AppCard from "@/Components/AppCard";
import { Camera } from "lucide-react";

export default function PictureCreate({
    store_url,
}: PageProps<{
    store_url: string;
}>) {

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

    const videoConstraints={
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
    }>({
        Imagen: null,
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


    function submit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        if (image) {
            post(store_url, { data });
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
                    image ? (
                        <>
                            <div className="flex flex-col items-center gap-4">
                                <div className="mt-2 pt-5">
                                    <img src={image} />
                                </div>
                                <form onSubmit={submit}>
                                    <div className="pt-3 w-full flex justify-center">
                                        <Button className="px-6 mx-3" variant="outline" type="button" disabled={processing} onClick={cancelar}>
                                            Cancelar
                                        </Button>

                                        <Button className="px-6 mx-3" variant="default" type="submit" disabled={processing}>
                                            Enviar
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
                                            <input
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
