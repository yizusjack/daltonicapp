import AppCard from '@/Components/AppCard'
import MainLayout from '@/Layouts/MainLayout'
import { PageProps } from '@/types'
import React, { useRef, useState } from 'react'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
    type CarouselApi,
} from "@/Components/ui/carousel"
import { Button } from '@/Components/ui/button'
import { Link } from '@inertiajs/react'
import { Plus } from 'lucide-react'
import { isNumberObject } from 'util/types'
import Webcam from 'react-webcam'

export default function PictureCreate() {
    const webcamRef = useRef<Webcam>(null);
    const [image, setImage] = useState<string | null>(null);
    const [showWebcam, setShowWebcam] = useState(false);

    const capture = () => {
        if (webcamRef.current) {
            const screenshot = webcamRef.current.getScreenshot();
            setImage(screenshot);
            setShowWebcam(false); // Hide webcam after capture
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

    return (
        <MainLayout name="Create Picture">
            <div className="flex flex-col items-center gap-4">
                {!showWebcam ? (
                    <>
                        <button 
                            onClick={() => setShowWebcam(true)} 
                            className="px-4 py-2 bg-blue-500 text-white rounded-md"
                        >
                            Take Photo
                        </button>

                        <label className="px-4 py-2 bg-green-500 text-white rounded-md cursor-pointer">
                            Upload Photo
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
                        
                        <button 
                            onClick={capture} 
                            className="px-4 py-2 bg-blue-500 text-white rounded-md"
                        >
                            Capture Photo
                        </button>
                    </>
                )}

                {image && (
                    <div>
                        <h3 className="text-lg font-semibold">Selected Image:</h3>
                        <img src={image} alt="Captured or Uploaded" className="mt-2 border rounded-lg" />
                    </div>
                )}
            </div>
        </MainLayout>
    );
}

