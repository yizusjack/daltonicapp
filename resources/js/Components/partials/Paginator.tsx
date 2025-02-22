import React, { PropsWithChildren } from 'react'
import { Link as LinkType } from '@/types/link';
import { Link } from '@inertiajs/react';
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/Components/ui/pagination";
import { ChevronLeft, ChevronRight } from 'lucide-react';

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

    if (current_page <= elements && last_page > elements) {
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
            <Pagination>
                <PaginationContent>
                    <PaginationItem>
                        {
                            links[0].url ?
                                <PaginationPrevious
                                    href={links[0].url}
                                />
                                :
                                <div className="flex items-center text-sm mr-5 cursor-not-allowed text-gray-300 gap-1 pr-2.5" key={links[0].label}>
                                    <ChevronLeft className="h-4 w-4" />
                                    <span>Anterior</span>
                                </div>
                        }
                    </PaginationItem>

                    {
                        links.slice(primerSegmento[0], primerSegmento[1] + 1).map(link => (
                            <PaginationItem key={link.label}>
                                <PaginationLink href={link.url} isActive={link.active}>
                                    {link.label}
                                </PaginationLink>
                            </PaginationItem>
                        ))
                    }

                    {
                        cargarPuntos &&
                        <PaginationItem>
                            <PaginationEllipsis />
                        </PaginationItem>
                    }

                    {
                        last_page > elements &&
                        (
                            links.slice(segundoSegmento[0], segundoSegmento[1] + 1).map(link => (
                                <PaginationItem key={link.label}>
                                    <PaginationLink href={link.url} isActive={link.active}>
                                        {link.label}
                                    </PaginationLink>
                                </PaginationItem>
                            ))
                        )
                    }

                    <PaginationItem>
                        {
                            links[last_page + 1].url ?
                                <PaginationNext href={links[last_page + 1].url} />
                                :
                                <div className="flex items-center text-sm ml-5 cursor-not-allowed text-gray-300 gap-1 pr-2.5" key={links[last_page + 1].label}>
                                    <span>Siguiente</span>
                                    <ChevronRight className="h-4 w-4" />
                                </div>
                        }
                    </PaginationItem>

                </PaginationContent>
            </Pagination>
        </div>
    )
}
