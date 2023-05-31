import AdminView from "@/components/AdminView";
import { supabase } from "@/lib/supabaseClient";

export default async function page() {
    let {data: users} = await supabase.from('profiles').select()
    return (
        <main>
            Protected Page
            <AdminView>
                {/* <pre>
                    {JSON.stringify(users, null, 2)}
                </pre> */}
                <table className="table-auto">
                    <thead>
                        <th>Username</th>
                        <th>Full Name</th>
                        <th>Avatar URL</th>
                        <th>Website</th>
                        <th>Admin</th>
                    </thead>
                    <tbody>
                        {users?.map((item: any) => (
                            <tr key={item.id}>
                                <td className="border p-1">{item.username}</td>
                                <td className="border p-1">{item.full_name}</td>
                                <td className="border p-1">{item.avatar_url}</td>
                                <td className="border p-1">{item.website}</td>
                                <td className="border p-1">{item.admin}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </AdminView>
        </main>
    )
}
