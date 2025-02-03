import MainLayout from "@/Layouts/MainLayout";
import { PageProps } from "@/types";
import { useForm } from "@inertiajs/react";
import React, { useEffect, useRef, useState } from "react";
import { Button } from "@/Components/ui/button";
import Webcam from "react-webcam";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/Components/ui/tabs"
import AppCard from "@/Components/AppCard";

export default function PictureCreate({
    store_url,
}: PageProps<{
    store_url: string;
}>) {

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
            setShowWebcam(false);
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
        setShowWebcam(! showWebcam);
    }

    useEffect(() => {
        setData("Imagen", image);
    }, [image])


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
                <Tabs defaultValue="camara" className="w-full">
                    <TabsList className="w-full">
                        <TabsTrigger className="w-1/2" value="camara" onClick={toggleCamera}>Cámara</TabsTrigger>
                        <TabsTrigger className="w-1/2" value="subir" onClick={toggleCamera}>Subir foto</TabsTrigger>
                    </TabsList>
                </Tabs>
                {
                    image && <img src={image} />
                }
                <div className="flex flex-col items-center gap-4">
                    {!showWebcam ? (
                        <>
                            <label className="px-4 py-2 bg-green-500 text-white rounded-md cursor-pointer">
                                Subir Foto
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleUpload}
                                    className="hidden"
                                />
                            </label>
                        </>
                    ) : (
                        <>
                            <Webcam
                                ref={webcamRef}
                                screenshotFormat="image/jpeg"
                                videoConstraints={{
                                    width: 640,
                                    height: 480,
                                    facingMode: "user",
                                }}
                                className="border rounded-lg"
                            />

                            <Button
                                onClick={capture}
                                className="px-4 py-2 bg-blue-500 text-white rounded-md"
                            >
                                Tomar Foto
                            </Button>
                        </>
                    )}

                    <form onSubmit={submit}>
                        <div className="pt-3 w-full flex justify-center">
                            <Button className="px-6" variant="default" type="submit" disabled={processing}>
                                Enviar
                            </Button>
                        </div>
                    </form>
                </div>
            </AppCard>
        </MainLayout>
    );
}
