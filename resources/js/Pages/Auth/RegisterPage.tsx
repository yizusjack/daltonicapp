import { GalleryVerticalEnd } from "lucide-react"

import { Head } from "@inertiajs/react"
import { RegisterForm } from "@/Components/RegisterForm"

export default function RegisterPage() {
    return (
        <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
            <Head title="Registro" />
            <div className="flex w-full max-w-sm flex-col gap-6">
                <a href="#" className="flex items-center gap-2 self-center font-medium">
                    <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
                        <GalleryVerticalEnd className="size-4" />
                    </div>
                    Daltonicapp
                </a>
                <RegisterForm />
            </div>
        </div>
    )
}
