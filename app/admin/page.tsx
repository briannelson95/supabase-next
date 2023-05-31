import AdminView from "@/components/AdminView";
import { supabase } from "@/lib/supabaseClient";

export default async function page() {
    let {data: users} = await supabase.from('profiles').select()
    return (
        <main>
            Protected Page
            <AdminView>
                <pre>
                    {JSON.stringify(users, null, 2)}
                </pre>
            </AdminView>
        </main>
    )
}
