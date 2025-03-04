import PageProps from "@/types";
import { useForm } from "@inertiajs/react";
import MainLayout from "@/Layouts/MainLayout";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/Components/ui/data-table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/Components/ui/select";
import { useEffect, useState } from "react";

type User = {
    id: number;
    name: string;
    email: string;
    roles: string[]; 
};

interface PageProps {
    auth: {
        user: {
            id: number;
            name: string;
            email: string;
            roles: string[];
        };
    };
    users: User[];
    roles: string[];
}

export default function Users({ users, roles, auth }: PageProps) {
    const { post, transform } = useForm<{ role: string | null }>({
        role: null,
    });

    const [userID, setID] = useState<number>(0);
    const [newRole, setRole] = useState<string>("");
    const [count, setCount] = useState<number>(0);
    const [search, setSearch] = useState<string>("");

    useEffect(() => {
        if (newRole) {
            transform((data) => ({ ...data, role: newRole }));
            post(`/users/${userID}/role`);
        }
    }, [count, newRole]);
    
    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(search.toLowerCase())
    );

    const columns: ColumnDef<User>[] = [
        { accessorKey: "id", header: "ID" },
        { accessorKey: "name", header: "Name" },
        { accessorKey: "email", header: "Email" },
        {
            accessorKey: "roles",
            header: "Roles",
            cell: ({ row }) => {
                const user = row.original;
                return (
                    <Select onValueChange={(value) => (setRole(value), setID(user.id), setCount(count + 1))}>
                        <SelectTrigger>
                            <SelectValue placeholder={user.roles[0]} />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Administrador">Administrador</SelectItem>
                            <SelectItem value="Usuario">Usuario</SelectItem>
                        </SelectContent>
                    </Select>
                );
            },
        },
    ];

    return (
        <MainLayout>
            <div className="container mx-auto py-10">
                <input 
                    type="text" 
                    placeholder="Buscar por nombre..." 
                    value={search} 
                    onChange={(e) => setSearch(e.target.value)} 
                    className="mb-4 p-2 border border-gray-300 rounded w-full"
                />
                <DataTable columns={columns} data={filteredUsers} />
            </div>
        </MainLayout>
    );
}
