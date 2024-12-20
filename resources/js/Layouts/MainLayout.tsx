import { usePage } from '@inertiajs/react';
import React, { ReactNode, PropsWithChildren } from 'react'
import NavBar from '@/Components/NavBar';

export default function MainLayout({
    children,
}: PropsWithChildren<{}>) {
    const user = usePage().props.auth.user;
  return (
    <div>
        <div>
            <NavBar />
        </div>

        <div>
            {children}
        </div>
    </div>
  )
}
