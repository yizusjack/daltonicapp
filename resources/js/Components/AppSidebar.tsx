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
import { Camera, CircleHelp, ClipboardX, Diff, GalleryHorizontal, Images, ScanEye, Speech, UsersRound, View } from 'lucide-react'
import { Link, usePage } from '@inertiajs/react';
import DropdownLogin from './partials/DropdownLogin';
import LoginButtons from './partials/LoginButtons';
import Can from './Auth/Can';


export default function AppSidebar() {
    const user = usePage().props.auth?.user;
    const permissions = usePage().props.auth?.permissions;
    const { url } = usePage();

    return (
        <Sidebar>
            <SidebarHeader>
                <Link href='/dashboard'>
                    <div className='text-center text-2xl font-extrabold	'>
                        DALTONICAPP
                    </div>
                </Link>
            </SidebarHeader>
            <SidebarContent>
                <Can permission={permissions ? (! permissions.imagenes.useCamera) : false}>
                    <SidebarGroup>
                        <SidebarGroupLabel>Test de daltonismo</SidebarGroupLabel>
                        <SidebarGroupContent>
                            <Link href='/test'>
                                <SidebarMenuButton isActive={url === '/test'}>
                                    <View /> Realizar test de daltonismo
                                </SidebarMenuButton>
                            </Link>
                        </SidebarGroupContent>
                    </SidebarGroup>
                </Can>

                <Can
                    permission={permissions ? (permissions.imagenes.useCamera) : false}
                >
                    <SidebarGroup>
                        <SidebarGroupLabel>Cámara</SidebarGroupLabel>
                        <SidebarGroupContent>
                            <Link href={route('picture.create')}>
                                <SidebarMenuButton isActive={url == "/picture/create"}>
                                    <Camera />Nueva imagen
                                </SidebarMenuButton>
                            </Link>
                            <Link href={route('picture.index')}>
                                <SidebarMenuButton isActive={url == "/picture" || url.startsWith("/picture?page=")}>
                                    <Images />Mi galería
                                </SidebarMenuButton>
                            </Link>
                        </SidebarGroupContent>
                    </SidebarGroup>
                </Can>

                <SidebarGroup>
                    <SidebarGroupLabel>Foro</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <Link href={route('publicacion.index', 1)}>
                            <SidebarMenuButton  isActive={ url.startsWith("/publicacion/foro/1")}>
                                <CircleHelp />Dudas
                            </SidebarMenuButton>
                        </Link>
                        <Link href={route('publicacion.index', 2)}>
                            <SidebarMenuButton isActive={ url.startsWith("/publicacion/foro/2")}>
                                    <Speech />Comunidad
                            </SidebarMenuButton>
                        </Link>
                        <Can
                            permission={permissions ? (permissions.imagenes.galeria) : false}
                        >
                            <Link href={route('picture.galeria')}>
                                <SidebarMenuButton isActive={ url.startsWith("/imagenes-para-mi")}>
                                    <GalleryHorizontal />Imágenes para mi
                                </SidebarMenuButton>
                            </Link>
                        </Can>
                    </SidebarGroupContent>
                </SidebarGroup>

                <Can permission={permissions ? (permissions.guiaContribucion.create && permissions.imagenes.useCamera) : false}>
                    <SidebarGroup>
                        <SidebarGroupLabel>Guía de contribución</SidebarGroupLabel>
                        <SidebarGroupContent>
                            <Link href='/guiaContribucion/create'>
                                <SidebarMenuButton isActive={url === '/guiaContribucion/create'}>
                                    <View /> Ayuda a mejorar test de visión
                                </SidebarMenuButton>
                            </Link>
                        </SidebarGroupContent>
                    </SidebarGroup>
                </Can>

                <Can permission={permissions ? permissions.users.viewAny : false}>
                    <SidebarGroup>
                        <SidebarGroupLabel>Administración</SidebarGroupLabel>
                        <SidebarGroupContent>
                            <Link href='/users'>
                                <SidebarMenuButton isActive={url === '/users'}>
                                    <UsersRound /> Usuarios
                                </SidebarMenuButton>
                            </Link>
                        </SidebarGroupContent>
                        <SidebarGroupContent>
                            <Link href='/reporte'>
                                <SidebarMenuButton >
                                    <ClipboardX /> Reportes
                                </SidebarMenuButton>
                            </Link>
                        </SidebarGroupContent>
                        <SidebarGroupContent>
                            <Link href='/imagenes'>
                                <SidebarMenuButton isActive={url === '/imagenes'}>
                                    <ScanEye /> Imágenes de test
                                </SidebarMenuButton>
                            </Link>
                        </SidebarGroupContent>
                    </SidebarGroup>
                </Can>
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
