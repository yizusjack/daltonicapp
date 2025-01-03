import { Head, usePage } from '@inertiajs/react';
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
    const permissions = usePage().props.auth?.permissions;

    return (
        <div>
            <Head title = {name}/>
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
