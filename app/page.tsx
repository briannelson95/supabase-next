import { supabase } from '@/lib/supabaseClient';

export default async function Home() {
  let { data } = await supabase.from('countries').select()

  return (
    <main>
      <h1>Hello World</h1>
      <ul>
        {data?.map((item: any, index: any) => (
          <li key={index}>{item.name}</li>
        ))}
      </ul>
    </main>
  )
}
