import { usePage } from '@inertiajs/react';
import React, { ReactNode, PropsWithChildren } from 'react'

export default function MainLayout({
    children,
}: PropsWithChildren<{}>) {
    const user = usePage().props.auth.user;
    console.log(user);
  return (
    <div>
        MainLayout

        <div>
            {children}
        </div>
    </div>
  )
}
