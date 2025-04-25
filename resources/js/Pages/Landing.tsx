import React from 'react'

export default function Landing() {
    return (
        <body>
            <header className="sticky top-0 z-50 bg-white shadow-md">
                <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
                    {/* Logo o nombre del sitio */}
                    <h1 className="text-xl font-bold text-gray-800">MiSitio</h1>

                    {/* Botones */}
                    <div className="space-x-4">
                        <button className="px-4 py-2 rounded-full bg-blue-500 text-white hover:bg-blue-600 transition">
                            Login
                        </button>
                        <button className="px-4 py-2 rounded-full bg-green-500 text-white hover:bg-green-600 transition">
                            Registrarse
                        </button>
                    </div>
                </div>
            </header>
            <section className="relative w-full min-h-[60vh] flex items-center justify-center text-white">
                {/* Fondo degradado multicolor */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-yellow-300 via-red-400 to-green-800 z-1" />
                <div className="absolute inset-0 bg-black opacity-20 z-0" />
                {/* Contenido */}
                <div className="z-10 text-center px-6">
                    <h1 className="text-5xl font-bold">¡Bienvenido a Daltonicapp!</h1>
                    <p className="mt-4 text-xl">Un lugar para ayudar con el daltonismo.</p>
                </div>

                {/* Curva inferior asimétrica */}
                <svg
                    className="absolute bottom-0 w-full"
                    viewBox="0 0 1440 320"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        fill="#ffffff"
                        fillOpacity="1"
                        d="M0,288L60,266.7C120,245,240,203,360,192C480,181,600,203,720,208C840,213,960,203,1080,197.3C1200,192,1320,192,1380,192L1440,192L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
                    ></path>
                </svg>
            </section>
        </body>
    )
}
