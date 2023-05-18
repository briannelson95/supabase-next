import { supabase } from '@/lib/supabaseClient';
import AuthComponent from '@/components/AuthComponent';

export default async function Home() {
  let { users }: any = await supabase.from('users').select()

  return (
    <main>
      <h1 className='text-3xl font-bold'>Hello World</h1>
      <ul className='list-disc list-inside'>
        {users?.map((item: any, index: any) => (
          <li key={index}>{item.name}</li>
        ))}
      </ul>
      <AuthComponent />
    </main>
  )
}
