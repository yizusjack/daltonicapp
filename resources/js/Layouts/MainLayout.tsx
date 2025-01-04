import { Head, usePage } from '@inertiajs/react';
import React, { ReactNode, PropsWithChildren, useEffect, useState } from 'react'
import { SidebarProvider, SidebarTrigger } from '@/Components/ui/sidebar';
import AppSidebar from '@/Components/AppSidebar';
import { Toaster } from '@/Components/ui/toaster';
import { useToast } from '@/hooks/use-toast';

export default function MainLayout({
    name,
    children,
}: PropsWithChildren<{
    name?: string
}>) {
    const user = usePage().props.auth.user;
    const permissions = usePage().props.auth?.permissions;
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
                    <SidebarTrigger />
                    <div className="p-5">
                        {children}
                    </div>
                </main>
            </SidebarProvider>
            <Toaster />
        </div>
    )
}
