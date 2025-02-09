import { PageProps } from '@/types';
import { Head } from "@inertiajs/react";
import MainLayout from '@/Layouts/MainLayout';
import { ColumnDef } from "@tanstack/react-table"

type User = {
    id: number;
    name: string;
    email: string;
    roles: string[];
};

interface UsersPageProps extends PageProps {
    users: User[];
}


export default function Users({ users }: UsersPageProps) {
    return (
        <MainLayout>
            <div className="container mx-auto p-4">
                <Head title="Users and Roles" />
                <h2 className="text-2xl font-bold mb-4">Users and Roles</h2>
                <table className="min-w-full bg-white border border-gray-300">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="border px-4 py-2">ID</th>
                            <th className="border px-4 py-2">Name</th>
                            <th className="border px-4 py-2">Email</th>
                            <th className="border px-4 py-2">Roles</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user.id} className="border-t">
                                <td className="border px-4 py-2">{user.id}</td>
                                <td className="border px-4 py-2">{user.name}</td>
                                <td className="border px-4 py-2">{user.email}</td>
                                <td className="border px-4 py-2">{user.roles.join(", ")}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </MainLayout>
    );
}