import { usePage } from '@inertiajs/react';
import React, { ReactNode, PropsWithChildren } from 'react'
import NavBar from '@/Components/NavBar';
import { SidebarProvider, SidebarTrigger } from '@/Components/ui/sidebar';
import AppSidebar from '@/Components/AppSidebar';

export default function MainLayout({
    children,
}: PropsWithChildren<{}>) {
    const user = usePage().props.auth.user;
    return (
        <div>
            {/* <div>
            <NavBar />
        </div> */}
            <SidebarProvider>
                <AppSidebar />
                <main>
                    <SidebarTrigger />
                    <div className="p-5">
                        {children}
                    </div>
                </main>
            </SidebarProvider>
        </div>
    )
}
