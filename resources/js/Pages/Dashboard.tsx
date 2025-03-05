import AppCard from '@/Components/AppCard';
import CardTipoDaltonismo from '@/Components/PruebasDaltonismo/CardTipoDaltonismo';
import { Button } from '@/Components/ui/button';
import MainLayout from '@/Layouts/MainLayout';
import { PageProps } from '@/types';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { Camera } from 'lucide-react';
import { useState } from 'react';

export default function Dashboard({
    resultados,
    tipos_daltonismo,
}: PageProps<{
    resultados?: { id: number, valor: number }[];
    tipos_daltonismo: { [index: string]: string };
}>) {

    const user = usePage().props.auth?.user;

    const [seleccionarTipoDaltonismo, setSeleccionarTipoDaltonismo] = useState(false);

    const { data, setData, post, processing, errors } = useForm<{
        tipo_daltonismo: string;
        resultados: { id: number, valor: number }[];
    }>({
        tipo_daltonismo: '',
        resultados: resultados ? resultados : [], // Inicializa como un array vacío
    });

    function submit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        post(route('guiaContribucion.store'), {
            onSuccess: () => setSeleccionarTipoDaltonismo(false),
        });
    }

    return (
        <MainLayout>
            <Head title="Dashboard" />

            {
                user?.tipo_daltonismo
                    ? (
                        <>
                            {
                                !seleccionarTipoDaltonismo
                                    ? (
                                        <>
                                            <AppCard>
                                                <div className="w-full flex flex-col justify-center items-center">
                                                    <div className="text-md italic font-semi-bold">
                                                        Tu tipo de daltonismo es:
                                                    </div>
                                                    <div className="p-4 text-4xl font-black uppercase  text-slate-700">
                                                        {user.tipo_daltonismo}
                                                    </div>

                                                    {
                                                        resultados &&
                                                        (
                                                            <div className="p-4">
                                                                <Button variant='destructive' onClick={() => setSeleccionarTipoDaltonismo(true)}>
                                                                    Mi tipo de daltonismo es incorrecto
                                                                </Button>
                                                            </div>
                                                        )
                                                    }

                                                    <div className='max-w-2xl text-center'>
                                                        <p>
                                                            La deuteranopía es un tipo de deficiencia en la visión del color que afecta específicamente a
                                                            los fotorreceptores verdes de la retina. Las personas con deuteranopía tienen dificultad para
                                                            distinguir entre tonos verdes y rojos, lo que puede afectar su vida diaria de manera sutil pero
                                                            significativa.
                                                        </p>

                                                        <div>
                                                            Aqui van los colores
                                                        </div>

                                                        <p>
                                                            ¡No te preocupes! Al usar nuestra cámara podrás tener una percepción de los colores más acercada
                                                            a la realidad.
                                                        </p>

                                                        <div className="p-4">
                                                            <Link href={route('picture.create')}>
                                                                <Button>
                                                                    <Camera className='w-6 h-6' />
                                                                    Ir a la cámara
                                                                </Button>
                                                            </Link>
                                                        </div>
                                                    </div>
                                                </div>
                                            </AppCard>
                                        </>
                                    ) :
                                    (
                                        <>
                                            <CardTipoDaltonismo
                                                tipos_daltonismo={tipos_daltonismo}
                                                errors={errors}
                                                setData={setData}
                                                onSubmit={submit}
                                            />
                                        </>
                                    )
                            }
                        </>
                    ) :
                    (
                        <>
                            <div className="py-12">
                                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                                        <div className="p-6 text-gray-900">
                                            You're logged in!
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    )
            }
        </MainLayout>
    );
}
