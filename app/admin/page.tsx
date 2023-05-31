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
                                <td>{item.username}</td>
                                <td>{item.full_name}</td>
                                <td>{item.avatar_url}</td>
                                <td>{item.website}</td>
                                <td>{item.admin}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </AdminView>
        </main>
    )
}
