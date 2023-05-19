import { headers, cookies } from 'next/headers'
import { createServerComponentSupabaseClient } from "@supabase/auth-helpers-nextjs";

export default async function Home() {

  const supabase = createServerComponentSupabaseClient({
    headers,
    cookies,
  })

  const { data: posts } = await supabase.from("posts").select();

  return (
    <>
      <pre>{JSON.stringify(posts, null, 2)}</pre>
    </>
  );
}