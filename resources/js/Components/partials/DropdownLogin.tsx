import React, { PropsWithChildren, ReactNode } from 'react'
import {
    SidebarMenuButton,
} from "@/Components/ui/sidebar"
import { ChevronUp, LogOut, User2, UserPen } from 'lucide-react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu'
import { Link } from '@inertiajs/react';

export default function DropdownLogin({
    user
}: PropsWithChildren<{
    user: {
        id: number,
        name: string
    }
}>) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <SidebarMenuButton className='text-md hover:bg-[#b5b7bd]'>
                    <User2 /> {user.name}
                    <ChevronUp className="ml-auto" />
                </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent
                side="top"
                className="w-[--radix-popper-anchor-width] bg-white py-2 px-3 mb-1 rounded-md"
            >

                <div className='p-1 rounded-sm hover:bg-slate-100'>
                    <Link href={route('profile.edit')}>
                        <div className="inline-flex">
                            <UserPen className='h-4 m-auto' />
                            Editar perfil
                        </div>
                    </Link>
                </div>


                <div className='p-1 rounded-sm hover:bg-slate-100'>
                    <Link href={route('logout')} method="post">
                        <div className="inline-flex">
                            <LogOut className='h-4 m-auto' />
                            Cerrar sesión
                        </div>
                    </Link>
                </div>

            </DropdownMenuContent>
        </DropdownMenu>
    )
}
