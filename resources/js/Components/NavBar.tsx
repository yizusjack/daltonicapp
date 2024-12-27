import React from 'react'
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuIndicator,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    NavigationMenuViewport,
} from "@/Components/ui/navigation-menu"
import { Link, usePage } from '@inertiajs/react';


export default function NavBar() {
    const user = usePage().props.auth.user;
    return (
        <div className="p-3 w-full bg-slate-200 flex justify-end">
            <NavigationMenu>
                <NavigationMenuList>
                    {user ? (
                        <>
                            <NavigationMenuItem>
                                <NavigationMenuTrigger className='min-w-48'>{ user.name }</NavigationMenuTrigger>
                                <NavigationMenuContent>
                                    <div className="flex h-full w-48 text-sm select-none flex-col justify-end">
                                        <ul className="grid gap-3 p-4 w-full">
                                            <li className="row-span-3">
                                                <div className='rounded-md bg-gradient-to-b from-muted/50 to-muted p-2 no-underline outline-none focus:shadow-md'>
                                                    <Link href={route('profile.edit')}>
                                                        Mi cuenta
                                                    </Link>
                                                </div>
                                            </li>
                                            <li className="row-span-3">
                                                <div className='rounded-md bg-gradient-to-b from-muted/50 to-muted p-2 no-underline outline-none focus:shadow-md'>
                                                    <Link href={route('logout')} method="post">
                                                        Cerrar sesión
                                                    </Link>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </NavigationMenuContent>
                            </NavigationMenuItem>
                        </>
                    ) : (
                        <p>No hay usuario autenticado.</p>
                    )}
                </NavigationMenuList>
            </NavigationMenu>
        </div>
    )
}
