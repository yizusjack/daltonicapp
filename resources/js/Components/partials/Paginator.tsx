import React, { PropsWithChildren } from 'react'
import { Link as LinkType } from '@/types/link';
import { Link } from '@inertiajs/react';

export default function Paginator({
    links,
    current_page,
    last_page,
    elements,
}: PropsWithChildren<{
    links: LinkType[];
    current_page: number;
    last_page: number;
    elements: number;
}>) {

    const primerSegmento = [1, 0];
    const segundoSegmento = [0, 0];

    primerSegmento[1] = last_page >= elements ? elements : last_page;

    if(current_page <= elements && last_page > elements) {
        segundoSegmento[0] = ((Math.ceil(last_page / elements) - 1) * elements) + 1;
        segundoSegmento[1] = (((Math.ceil(last_page / elements) - 1) * elements) + elements) <= last_page
            ? ((Math.ceil(last_page / elements) - 1) * elements) + elements
            : last_page;
    } else {
        segundoSegmento[0] = ((Math.ceil(current_page / elements) - 1) * elements) + 1;
        segundoSegmento[1] = (((Math.ceil(current_page / elements) - 1) * elements) + elements) <= last_page
            ? ((Math.ceil(current_page / elements) - 1) * elements) + elements
            : last_page;
    }

    const cargarPuntos = segundoSegmento[0] > 2 * elements;

    return (
        <div className="py-10 text-center">
            {
                links[0].url ?

                    <Link
                        className={`p-1 mx-1 ${links[0].active ? 'font-bold text-blue-400 underline' : ''}`}
                        key={links[0].label} href={links[0].url} dangerouslySetInnerHTML={{ __html: links[0].label }} />
                    :

                    <span
                        className="cursor-not-allowed text-gray-300"
                        key={links[0].label} dangerouslySetInnerHTML={{ __html: links[0].label }}>
                    </span>
            }

            {
                links.slice(primerSegmento[0], primerSegmento[1] + 1).map(link => (
                    <Link
                        className={`p-1 mx-1 ${link.active ? 'font-bold text-blue-400 underline' : ''}`}
                        key={link.label} href={link.url} dangerouslySetInnerHTML={{ __html: link.label }} 
                    />
                ))
            }

            {
                cargarPuntos &&
                <span>...</span>
            }

            {
                last_page > elements &&
                    (
                        links.slice(segundoSegmento[0], segundoSegmento[1] + 1).map(link => (
                            <Link
                                className={`p-1 mx-1 ${link.active ? 'font-bold text-blue-400 underline' : ''}`}
                                key={link.label} href={link.url} dangerouslySetInnerHTML={{ __html: link.label }} 
                            />
                        ))
                    )
            }

            {
                links[last_page + 1].url ?

                    <Link
                        className={`p-1 mx-1 ${links[last_page + 1].active ? 'font-bold text-blue-400 underline' : ''}`}
                        key={links[last_page + 1].label} href={links[last_page + 1].url} dangerouslySetInnerHTML={{ __html: links[last_page + 1].label }} />
                    :

                    <span
                        className="cursor-not-allowed text-gray-300"
                        key={links[last_page + 1].label} dangerouslySetInnerHTML={{ __html: links[last_page + 1].label }}>
                    </span>
            }
        </div>
    )
}
