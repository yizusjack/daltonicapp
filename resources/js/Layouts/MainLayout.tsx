import { Head, usePage } from '@inertiajs/react';
import React, { ReactNode, PropsWithChildren, useEffect, useState } from 'react'
import { SidebarProvider, SidebarTrigger } from '@/Components/ui/sidebar';
import AppSidebar from '@/Components/AppSidebar';
import { Toaster } from '@/Components/ui/toaster';
import { useToast } from '@/hooks/use-toast';
import AppBreadcrumb from '@/Components/partials/AppBreadcrumb';

export default function MainLayout({
    name,
    children,
    breadcrumb,
}: PropsWithChildren<{
    name?: string,
    breadcrumb? : { url: string, name: string }[],
}>) {
    const user = usePage().props.auth?.user;
    const {flash} = usePage().props;

    const { toast } = useToast()
    
    const displayToast = () => {
        toast({
            title: flash?.message,
            description: flash?.description,
          })
    }

    useEffect(() => {
        if(flash?.description && flash?.message) {
            displayToast();
        }
    }, [flash]);

    return (
        <div>
            <Head title = {name}/>
            <SidebarProvider>
                <AppSidebar />
                <main className='w-full'>
                    <div className='flex pt-3'>
                        <SidebarTrigger />
                        {
                            breadcrumb && (
                                <div className="pt-1 pl-5">
                                    <AppBreadcrumb
                                        elementos={breadcrumb}
                                    />
                                </div>
                            )
                        }
                    </div>
                    <div className="px-5 py-1">
                        {children}
                    </div>
                </main>
            </SidebarProvider>
            <Toaster />
        </div>
    )
}
