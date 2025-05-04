import React from 'react'

export default function TerminosYCondiciones() {
    return (
        <div className='p-16'>
            <h1 className='font-bold text-xl'>Términos y condiciones</h1>

            <div className='leading-relaxed text-justify'>
                <p>Última actualización: 01/03/2025</p>

                <p className='pt-4'>Al registrarte en <span className='text-indigo-900 font-semibold'>Daltonicapp</span>, aceptas los siguientes términos y condiciones:</p>

                <p className='font-semibold text-md pt-4'>1. Subida de Imágenes</p>

                <div className="ml-4">
                    Los usuarios pueden subir imágenes a la plataforma para almacenarlas de forma segura. <br />
                    Al hacerlo, el usuario declara que es el titular legítimo de los derechos de las imágenes o que cuenta con los permisos necesarios para almacenarlas en este sitio.
                </div>

                <hr className='py-2 mt-4' />

                <p className='font-semibold text-md'>2. Privacidad de Imágenes</p>

                <div className="ml-4">
                    Al subir una imagen, el usuario podrá elegir entre dos configuraciones de visibilidad:

                    <ul className='list-disc pl-4'>
                        <li>
                            <div className='font-semibold'>
                                Privada:
                            </div>
                            Las imágenes marcadas como privadas serán visibles únicamente para el usuario que las subió. Nadie más, incluyendo otros usuarios, podrá acceder a estas imágenes.
                        </li>

                        <li>
                            <div className='font-semibold'>
                                Pública:
                            </div>
                            Las imágenes marcadas como públicas estarán disponibles para todos los usuarios de la plataforma, quienes podrán verlas y/o comentarlas dentro de los límites establecidos posteriormente.
                        </li>
                    </ul>
                </div>

                <hr className='py-2 mt-4' />

                <p className='font-semibold text-md'>3. Responsabilidad del Usuario</p>

                <div className="pl-4">
                    Cada usuario es responsable del contenido que sube. Está estrictamente prohibido subir imágenes que:

                    <ul className="list-disc pl-4">
                        <li>Infrinjan derechos de autor o privacidad de terceros.</li>
                        <li>Contengan contenido ilegal, ofensivo o que viole normas comunitarias.</li>
                        <li> La plataforma se reserva el derecho de eliminar cualquier imagen que incumpla estas condiciones sin previo aviso o que sea reportada por múltiples usuarios.</li>
                    </ul>
                </div>

                <hr className='py-2 mt-4' />

                <p className='font-semibold text-md'>4. Almacenamiento y Eliminación</p>

                <div className="pl-4">
                    Los usuarios podrán eliminar sus propias imágenes en cualquier momento. Las imágenes eliminadas no serán accesibles por el usuario o terceros y serán eliminadas permanentemente de nuestros servidores de manera inmediata.
                </div>

                <hr className='py-2 mt-4' />

                <p className='font-semibold text-md'>5. Publicaciones y comentarios</p>

                <div className="pl-4">
                    <p>Las publicaciones y comentarios en el foro son visibles para todos los usuarios, por lo que estas deben de aportar a la conversación y ser respetuosas</p>
                    <p>Se podrá eliminar cualquier publicación o comentario que:</p>
                    <ul className="list-disc pl-4">
                        <li>Funja como publicidad engañosa/estafa.</li>
                        <li>Sea inapropiada para el resto de usuarios.</li>
                        <li>No se relacione con el foro.</li>
                        <li>Sea ofensiva para un usuario o grupo vulnerable.</li>
                        <li>Sea motivo de discriminación.</li>
                    </ul>
                </div>

                <hr className='py-2 mt-4' />

                <p className='font-semibold text-md'>6. Test de daltonismo</p>

                <div className="pl-4">
                    El test de daltonismo proporcionado en Daltonicapp es una herramienta que puede ser útil, sin embargo, no es 100% exacta por lo que no sustituye un diagnóstico médico y no debería ser tomado como tal.
                </div>

                <hr className='py-2 mt-4' />

                <p className='font-semibold text-md'>7. Guía de contribución</p>

                <div className="pl-4">
                    <p>Las respuestas enviadas como parte de la guía de contribución son utilizadas para mejorar la funcionalidad del test de daltonismo para nuevos usuarios.</p>
                    <p>Al llenar la guía de contribución también se da consentimiento que las respuestas capturadas puedan ser compartidas con especialistas de la salud como herramienta para investigación</p>
                </div>

                <hr className='py-2 mt-4' />

                <p className='font-semibold text-md'>8. Modificaciones</p>

                <div className="pl-4">
                    Estos términos pueden ser modificados en el futuro. Notificaremos a los usuarios sobre cambios relevantes, y el uso continuado de la plataforma implicará la aceptación de los nuevos términos.
                </div>
            </div>
        </div>
    )
}
