import { cn } from "@/lib/utils"
import { Button } from "@/Components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/Components/ui/card"
import { Input } from "@/Components/ui/input"
import { Label } from "@/Components/ui/label"
import { Link, useForm } from "@inertiajs/react"
import { FormEventHandler, useState } from "react"
import InputError from "./InputError"
import Checkbox from "./Checkbox"
import Terminos from "./Terminos"
import { useToast } from "@/hooks/use-toast"
import { Toaster } from "./ui/toaster"

export function RegisterForm() {
    const { toast } = useToast()

    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        terms: false,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    const [abrirModal, setAbrirModal] = useState(false);
    const [terminosAceptados, setTerminosAceptados] = useState(false);

    const aceptarTerminos = () => {
        setAbrirModal(true);
        setTerminosAceptados(true);
    }

    const displayToast = () => {
        if(!terminosAceptados) {
            toast({
                title: "No has abierto los términos y condiciones",
                description: "Para poder hacer clic aquí primero necesitas leerlos.",
                variant: "destructive",
            });
        }
    }

    return (
        <div className="flex flex-col gap-6">
            <Card>
                <CardHeader className="text-center">
                    <CardTitle className="text-xl">Daltonicapp</CardTitle>
                    <CardDescription>
                        Regístrate con tu cuenta de Google.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={submit}>
                        <div className="grid gap-6">
                            <div className="flex flex-col gap-4">
                                <a
                                    href={route('auth.google.redirect')}
                                >
                                    <Button variant="outline" type="button" className="w-full">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                            <path
                                                d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                                                fill="currentColor"
                                            />
                                        </svg>
                                        Regístrate con Google
                                    </Button>
                                </a>
                            </div>
                            <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                                <span className="relative z-10 bg-background px-2 text-muted-foreground">
                                    O crea tu cuenta con
                                </span>
                            </div>
                            <div className="grid gap-6">
                                <div className="grid gap-2">
                                    <Label htmlFor="name">Nombre</Label>
                                    <Input
                                        id="name"
                                        type="name"
                                        value={data.name}
                                        required
                                        onChange={(e) => setData('name', e.target.value)}
                                    />

                                    <InputError message={errors.name} className="mt-2" />
                                </div>


                                <div className="grid gap-2">
                                    <Label htmlFor="email">Correo electrónico</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        value={data.email}
                                        placeholder="m@example.com"
                                        required
                                        onChange={(e) => setData('email', e.target.value)}
                                    />

                                    <InputError message={errors.email} className="mt-2" />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="password">Contraseña</Label>
                                    <Input
                                        id="password"
                                        type="password"
                                        value={data.password}
                                        autoComplete="current-password"
                                        required
                                        onChange={(e) => setData('password', e.target.value)}
                                    />
                                    <InputError message={errors.password} className="mt-2" />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="password_confirmation">Confirma tu contraseña</Label>
                                    <Input
                                        id="password_confirmation"
                                        type="password"
                                        value={data.password_confirmation}
                                        autoComplete="current-password"
                                        required
                                        onChange={(e) => setData('password_confirmation', e.target.value)}
                                    />
                                    <InputError message={errors.password_confirmation} className="mt-2" />
                                </div>

                                <div className="mt-2 block flex items-center">
                                    <div onClick={displayToast}>
                                        <Checkbox
                                            id="terms"
                                            name="terms"
                                            checked={data.terms}
                                            onChange={(e) =>
                                                setData('terms', e.target.checked)
                                            }
                                            disabled={!terminosAceptados}
                                        />
                                        <Label className="pl-2" htmlFor="terms">He leído y acepto el </Label>
                                    </div>
                                    <div onClick={aceptarTerminos} className="text-sm font-medium leading-none ml-1 underline cursor-pointer hover:font-semibold">aviso de privacidad</div>
                                </div>

                                <Button type="submit" className="w-full" disabled={processing || data.terms == false}>
                                    Registrarme
                                </Button>
                            </div>
                            <div className="text-center text-sm">
                                ¿Ya estás registrado?{" "}
                                <Link href={route('login')} className="underline underline-offset-4">
                                    Inicia sesión
                                </Link>
                            </div>
                        </div>
                    </form>
                </CardContent>
            </Card>
            <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-primary  ">
                Al registrarte estás aceptando nuestro <a onClick={aceptarTerminos}>aviso de privacidad</a>
            </div>

            <Terminos
                abrirModal={abrirModal}
                setAbrirModal={setAbrirModal}
            />

            <Toaster />
        </div>
    )
}
