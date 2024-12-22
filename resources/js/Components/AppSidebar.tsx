import React from 'react'
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupAction,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/Components/ui/sidebar"
import { Camera, CircleHelp, ClipboardX, Diff, GalleryHorizontal, Images, Speech, UsersRound, View } from 'lucide-react'
import { Link, usePage } from '@inertiajs/react';
import DropdownLogin from './partials/DropdownLogin';
import LoginButtons from './partials/LoginButtons';

export default function AppSidebar() {
    const user = usePage().props.auth.user;
    return (
        <Sidebar>
            <SidebarHeader>
                <div className='text-center text-2xl font-extrabold	'>
                    DALTONICAPP
                </div>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Cámara</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenuButton>
                            <Camera />Nueva imagen
                        </SidebarMenuButton>
                        <SidebarMenuButton>
                            <Images />Mi galería
                        </SidebarMenuButton>
                    </SidebarGroupContent>
                </SidebarGroup>

                <SidebarGroup>
                    <SidebarGroupLabel>Foro</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenuButton>
                            <CircleHelp />Dudas
                        </SidebarMenuButton>
                        <SidebarMenuButton>
                            <Speech />Comunidad
                        </SidebarMenuButton>
                        <SidebarMenuButton>
                            <GalleryHorizontal />Imágenes para mi
                        </SidebarMenuButton>
                    </SidebarGroupContent>
                </SidebarGroup>

                <SidebarGroup>
                    <SidebarGroupLabel>Guía de contribución</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenuButton>
                            <View /> Ayuda a mejorar test de visión
                        </SidebarMenuButton>
                    </SidebarGroupContent>
                </SidebarGroup>

                <SidebarGroup>
                    <SidebarGroupLabel>Administración</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenuButton>
                            <UsersRound /> Usuarios
                        </SidebarMenuButton>
                    </SidebarGroupContent>
                    <SidebarGroupContent>
                        <SidebarMenuButton>
                            <Diff /> Permisos
                        </SidebarMenuButton>
                    </SidebarGroupContent>
                    <SidebarGroupContent>
                        <SidebarMenuButton>
                            <ClipboardX /> Reportes
                        </SidebarMenuButton>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
                <SidebarMenu>
                    <SidebarMenuItem>
                        {user ? (
                            <DropdownLogin user={user} />
                        )
                            : (
                                <LoginButtons />
                            )}
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    )
}
