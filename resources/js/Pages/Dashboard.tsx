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

    const descripciones = {
        "Deuteranopia": {
            'descripcion': "La deuteranopía es un tipo de deficiencia en la visión del color que afecta específicamente a los fotorreceptores verdes de la retina. Las personas con deuteranopía tienen dificultad para distinguir entre tonos verdes y rojos, lo que puede afectar su vida diaria de manera sutil pero significativa.",
            'colores': [{name: "Verde", class:'bg-green-800'}, {name: "Amarillo", class: 'bg-yellow-300'}, {name: "Azul", class: 'bg-blue-900'}, {name: "Morado", class: 'bg-purple-500'}, {name: "Rojo", class: 'bg-red-600'}],
        },
        "Protanopia": {
            'descripcion': "La protanopia es la carencia de sensibilidad al color rojo, una disfunción visual relacionada con la percepción del color. Se denomina también dicromacia roja. Consiste en la ausencia de actividad funcional de los protoconos, que son sensibles a la porción roja del espectro visible.",
            'colores': [{name: "Verde", class: 'bg-green-800'}, {name: "Amarillo", class: 'bg-yellow-300'}, {name: "Naranja", class: 'bg-orange-500'}, {name: "Rojo", class: 'bg-red-600'}, {name: "Café", class: 'bg-red-950'}],
        },
        "Tritanopia": {
            'descripcion': "La tritanopía es una afección en la que una persona no puede distinguir entre los colores azul y amarillo. La alteración de la visión del azul y el amarillo es el síntoma principal asociado con esta afección. Sin embargo, las personas con tritanopía tienen una visión normal del rojo y el verde.",
            'colores': [{name: "Verde", class: 'bg-green-800'}, {name: "Azul", class: 'bg-blue-900'}, {name: "Amarillo", class: 'bg-yellow-300'}],
        }
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
                                                    <div className="p-4 text-3xl md:text-4xl font-black uppercase  text-slate-700">
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

                                                    <div className='max-w-full lg:max-w-2xl text-center'>
                                                        <p>
                                                            {descripciones[user.tipo_daltonismo as keyof typeof descripciones].descripcion}
                                                        </p>

                                                        <div className='p-4'>
                                                            <div className='text-md italic font-semi-bold'>
                                                                Las personas con {user.tipo_daltonismo} pueden tener problemas para ver los colores:
                                                            </div>

                                                            <div className="p-4 flex justify-center max-w-full flex-wrap">
                                                                {
                                                                    descripciones[user.tipo_daltonismo as keyof typeof descripciones].colores.map((color) => (
                                                                        <div className="flex flex-col items-center mx-2">
                                                                            <div className={`h-16 w-16 rounded-full mx-2 ${color.class}`} />
                                                                            <span className="mt-2 text-sm">{color.name}</span>
                                                                        </div>
                                                                    ))
                                                                }
                                                            </div>
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
