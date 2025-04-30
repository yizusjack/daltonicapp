import { Link } from '@inertiajs/react'
import { motion } from "framer-motion";
import React from 'react'

export default function Landing() {
    return (
        <div>
            <header className="sticky top-0 z-50 bg-card shadow-md bg-neutral-200">
                <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
                    {/* Logo o nombre del sitio */}
                    <h1 className="opacity-0 md:opacity-100 text-2xl font-bold text-gray-800">Daltonicapp</h1>

                    {/* Botones */}
                    <div className='flex justify-end font-semibold'>
                        <Link
                            href={route('login')}
                            className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                        >
                            Iniciar sesión
                        </Link>
                        <Link
                            href={route('register')}
                            className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                        >
                            Regístrate
                        </Link>
                    </div>
                </div>
            </header>
            <section className="relative w-full min-h-[60vh] flex items-center justify-center text-white">
                {/* Fondo degradado multicolor */}
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.9, ease: "easeOut" }} className="absolute inset-0 bg-gradient-to-br from-blue-900 via-yellow-300 via-red-400 to-green-800 z-1" />
                <div className="absolute inset-0 bg-black opacity-20 z-0" />
                {/* Contenido */}
                <div className="z-10 text-center px-6">
                    <motion.h1 initial={{ x: -200, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.8, ease: "easeOut" }} className="text-5xl font-bold">¡Bienvenido a Daltonicapp!</motion.h1>
                    <motion.p initial={{ x: 200, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.8, ease: "easeOut" }} className="mt-4 text-xl">Un lugar para ayudar con el daltonismo.</motion.p>
                </div>

                {/* Curva inferior asimétrica */}
                <svg
                    className="absolute bottom-0 w-full"
                    viewBox="0 0 1440 320"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        fill="#f5f5f5"
                        fillOpacity="1"
                        d="M0,288L60,266.7C120,245,240,203,360,192C480,181,600,203,720,208C840,213,960,203,1080,197.3C1200,192,1320,192,1380,192L1440,192L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
                    ></path>
                </svg>
            </section>

            {/* Info del daltonismo */}
            <section className='bg-neutral-100 px-16'>
                <motion.div
                    className="w-full md:w-3/4"
                    initial={{ opacity: 0, x: 100 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                    viewport={{ once: true, amount: 0.2 }}
                >
                    <div className="text-2xl md:text-3xl font-black uppercase  text-slate-700">
                        ¿Qué es el Daltonismo?
                    </div>

                    <div className="text-justify my-4">
                        <p>
                            El daltonismo es una afección que impide ver algunos colores de la misma forma que la mayoría de la población, causada por una anomalía en los fotorreceptores del ojo (conos).
                        </p>
                        <p>
                            Las personas que padecen algún tipo de daltonismo suelen tener problemas en varias áreas de sus vidas cotidianas. Por ejemplo, muchos manuales, recursos didácticos o material gráfico recaen en la utilización de colores variados para ilustrar de manera oportuna su contenido, muchas veces, utilizando colores que pueden llegar a ser confundidos por personas daltónicas, lo cual hace que estos recursos no puedan ser aprovechados en su totalidad por estas personas.
                        </p>
                    </div>
                </motion.div>

                <motion.div
                    className="w-full md:ml-auto md:w-3/4 p-16"
                    initial={{ opacity: 0, x: -100 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                    viewport={{ once: true, amount: 0.2 }}
                >
                    <div className="text-2xl md:text-3xl font-black uppercase text-slate-700 text-right">
                        ¿El daltonismo es común?
                    </div>

                    <div className="text-right my-4">
                        <p>
                            La mayor parte de los casos de daltonismo se presentan en hombres, estimando que aproximadamente 1 de cada 10 hombres padecen alguna forma de daltonismo, mientras que en mujeres esta cifra ronda el 0.5%.
                        </p>
                    </div>
                </motion.div>

                <motion.div
                    className="w-full md:w-3/4"
                    initial={{ opacity: 0, x: 100 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                    viewport={{ once: true, amount: 0.2 }}
                >
                    <div className="text-2xl md:text-3xl font-black uppercase  text-slate-700">
                        ¿Qué es el Daltonicapp?
                    </div>

                    <div className="text-justify my-4">
                        <p>Daltonicapp es una aplicación web que ayuda a las personas con daltonismo o a las interesadas en este tema a poder afrontar las problemáticas ocasionadas por el daltonismo.</p>
                        <p>Para hacerlo ponemos a tu disposición las siguientes herramientas:</p>
                    </div>
                </motion.div>
            </section>
        </div>
    )
}
