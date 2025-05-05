import MainLayout from "@/Layouts/MainLayout";
import AppCard from "@/Components/AppCard";
import { DataTable } from "@/Components/ui/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { useForm } from '@inertiajs/react'
import { Button } from "@/Components/ui/button";

type Reportable = {
    id: number;
    contenido: string;
    reportes: {
        tipo: string;
        explicacion: string;
    }[];
    reportable_type: "Publicacion" | "Comentario";
};

interface PageProps {
    publicaciones: Reportable[];
    comentarios: Reportable[];
}

export default function ReportesIndex({ publicaciones, comentarios }: PageProps) {

    const publicacionesArray = Object.values(publicaciones);
    const comentariosArray = Object.values(comentarios);
            
    const eliminar = useForm({});

    const confirmarEliminacionPublicacion = (publicacion: number) => {
        eliminar.delete(route('publicacion.destroy', publicacion), {
            preserveScroll: true,
            onSuccess: () => {
                eliminar.reset();
            },
        });
    };

    const confirmarEliminacionComentario = (comentario: number) => {
        eliminar.delete(route('comentario.destroy', comentario), {
            preserveScroll: true,
            onSuccess: () => {
                eliminar.reset();
            },
        });
    };

    const confirmarEliminacion = (id: number, tipo: string) => {
        if (tipo === "Publicacion") {
            confirmarEliminacionPublicacion(id);
        } else {
            confirmarEliminacionComentario(id);
        }
    };

    const columns: ColumnDef<Reportable>[] = [
        { accessorKey: "id", header: "ID" },
        { accessorKey: "contenido", header: "Contenido" },
        {
            header: "Reportes",
            cell: ({ row }) => (
                <ul className="list-disc ml-4">
                    {row.original.reportes.map((reporte, index) => (
                        <li key={index}>{reporte.tipo}: {reporte.explicacion}</li>
                    ))}
                </ul>
            )
        },
        {
            header: "Acciones",
            cell: ({ row }) => {
                return (
                    <Button
                    variant='destructive'
                    onClick={() => confirmarEliminacion(row.original.id, row.original.reportable_type)}
                    >
                    Eliminar
                    </Button>
                );

            },
        }
    ];

    return (
        <MainLayout name="Reportes">
            <AppCard title="Publicaciones con muchos reportes">
                <DataTable columns={columns} data={publicacionesArray} />
            </AppCard>
            <AppCard title="Comentarios con muchos reportes">
                <DataTable columns={columns} data={comentariosArray} />
            </AppCard>
        </MainLayout>
    );
}