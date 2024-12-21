import React from 'react'
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/Components/ui/sidebar"
import { ChevronUp, LogOut, User2, UserPen } from 'lucide-react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu'
import { Link, usePage } from '@inertiajs/react';

export default function AppSidebar() {
    const user = usePage().props.auth.user;
    return (
        <Sidebar>
            <SidebarHeader />
            <SidebarContent>
                <SidebarGroup />
                <SidebarGroup />
            </SidebarContent>
            <SidebarFooter>
                <SidebarMenu>
                    <SidebarMenuItem>
                        {user ? (
                            <>
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
                                        <Link href={route('profile.edit')}>
                                            <div className='p-1 rounded-sm hover:bg-slate-100'>

                                                <div className="inline-flex">
                                                    <UserPen className='h-4 m-auto' />
                                                    Editar perfil
                                                </div>
                                            </div>
                                        </Link>
                                        <div className='p-1 rounded-sm hover:bg-slate-100'>
                                            <div className="inline-flex">
                                                <LogOut className='h-4 m-auto' />
                                                Cerrar sesión
                                            </div>
                                        </div>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </>)
                            : (
                                <>
                                    Inicia sesión
                                </>
                            )}
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    )
}
