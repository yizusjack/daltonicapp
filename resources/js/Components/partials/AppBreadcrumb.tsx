import { PageProps } from '@/types'
import React from 'react'
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/Components/ui/breadcrumb"
import { Link } from '@inertiajs/react'

export default function AppBreadcrumb({
    elementos
}: PageProps<{
    elementos: { url: string, name: string }[]
}>) {
    return (
        <Breadcrumb>
            <BreadcrumbList>
                <BreadcrumbItem>
                    <BreadcrumbLink href="/dashboard">Inicio</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />

                {
                    elementos.map((elemento) => (
                        <div key={elemento.url}>
                            {
                                elemento.url != 'active' ? (
                                    <>
                                        <BreadcrumbItem>
                                            <Link href={elemento.url}>{elemento.name}</Link>
                                            <BreadcrumbSeparator />
                                        </BreadcrumbItem>
                                    </>
                                ) : (
                                    <>
                                        <BreadcrumbItem>
                                            <BreadcrumbPage>{elemento.name}</BreadcrumbPage>
                                        </BreadcrumbItem>
                                    </>
                                )
                            }
                            
                        </div>
                    ))
                }
            </BreadcrumbList>
        </Breadcrumb>
    )
}
