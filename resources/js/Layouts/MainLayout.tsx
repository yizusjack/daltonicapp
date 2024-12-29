import { usePage } from '@inertiajs/react';
import React, { ReactNode, PropsWithChildren, useEffect } from 'react'
import { SidebarProvider, SidebarTrigger } from '@/Components/ui/sidebar';
import AppSidebar from '@/Components/AppSidebar';

export default function MainLayout({
    name,
    children,
}: PropsWithChildren<{
    name?: string
}>) {
    const user = usePage().props.auth.user;

    useEffect(()=> {
        document.title = name ?? 'Daltonicapp';
    }, [name]);

    return (
        <div>
            <SidebarProvider>
                <AppSidebar />
                <main className='w-full'>
                    <SidebarTrigger />
                    <div className="p-5">
                        {children}
                    </div>
                </main>
            </SidebarProvider>
        </div>
    )
}
