import React from 'react'
import { Link } from '@inertiajs/react';
import { UserPlus, UserRound } from 'lucide-react';

export default function LoginButtons() {
    return (
        <div>
            <div className='p-1 rounded-md text-md hover:bg-[#b5b7bd] hover:text-slate-900'>
                <Link href={route('login')}>
                    <div className="inline-flex w-full">
                        <UserRound className='h-4 my-auto' />
                        Iniciar sesión
                    </div>
                </Link>
            </div>

            <div className='p-1 rounded-md text-md hover:bg-[#b5b7bd] hover:text-slate-900'>
                <Link href={route('register')}>
                    <div className="inline-flex w-full">
                        <UserPlus className='h-4 my-auto' />
                        Regístrate
                    </div>
                </Link>
            </div>
        </div>
    )
}
