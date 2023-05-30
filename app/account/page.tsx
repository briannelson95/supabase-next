'use client';

import { useEffect, useState } from 'react';
import {
  useUser,
  useSupabaseClient,
  useSession,
} from '@supabase/auth-helpers-react';
import { Database } from '@/lib/database.types';
import { useRouter } from 'next/navigation'

type Profiles = Database['public']['Tables']['profiles']['Row'];

export default function Page() {
  const router = useRouter();
  const supabase = useSupabaseClient<Database>();
  const user = useUser();
  const session = useSession();

  const [isLoading, setIsLoading] = useState(true);
  const [username, setUsername] = useState<Profiles['username']>('');
  const [full_name, setFullName] = useState<Profiles['full_name']>('');
  const [website, setWebsite] = useState<Profiles['website']>('');
  const [avatar_url, setAvatarUrl] = useState<Profiles['avatar_url']>('');
  const [admin, setAdmin] = useState<Profiles['admin']>(false);

  useEffect(() => {
    async function getProfile() {
      try {
        setIsLoading(true);

        if (!user) throw new Error('No user');

        let { data, error, status } = await supabase
          .from('profiles')
          .select('username, full_name, website, avatar_url, admin')
          .eq('id', user.id)
          .single();

        if (error && status !== 406) {
          throw error;
        }

        if (data) {
          setUsername(data.username);
          setFullName(data.full_name);
          setWebsite(data.website);
          setAvatarUrl(data.avatar_url);
          setAdmin(data.admin);
        }
      } catch (error) {
        // alert('Error loading user data!');
        // console.warn(error);
      } finally {
        setIsLoading(false);
      }
    }
    getProfile();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session]);

  async function updateProfile({
    username,
    full_name,
    website,
    avatar_url,
    admin,
  }: {
    username: Profiles['username'];
    full_name: Profiles['full_name'];
    website: Profiles['website'];
    avatar_url: Profiles['avatar_url'];
    admin: Profiles['admin'];
  }) {
    try {
      setIsLoading(true);
      if (!user) throw new Error('No user');

      const updates = {
        id: user.id,
        username,
        full_name,
        website,
        avatar_url,
        admin,
        updated_at: new Date().toISOString(),
      };

      let { error } = await supabase.from('profiles').upsert(updates);

      if (error) throw error;

      alert('Profile updated!');
    } catch (error) {
      alert('Error updating the data!');
      // console.warn(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className='grid min-h-screen place-items-center'>
      <div className='container grid gap-4'>
        {admin ? <div className='text-white text-4xl'>Admin View</div> : <div className='text-white text-4xl'>Hello World</div>}
        <div>
          <label htmlFor='email'>Email</label>
          <input id='email' type='text' value={session?.user.email || ''} disabled />
        </div>
        <div>
          <label htmlFor='username'>Username</label>
          <input
            id='username'
            type='text'
            value={username || ''}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor='fullName'>Full Name</label>
          <input
            id='fullName'
            type='text'
            value={full_name || ''}
            onChange={(e) => setFullName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor='website'>Website</label>
          <input
            id='website'
            type='url'
            value={website || ''}
            onChange={(e) => setWebsite(e.target.value)}
          />
        </div>

        <div>
          <button
            className='button primary block'
            onClick={() => updateProfile({ username, full_name, website, avatar_url, admin })}
            disabled={isLoading}
          >
            {isLoading ? 'Loading ...' : 'Update'}
          </button>
        </div>

        <div>
          <button
            className='button block'
            onClick={async () => {
              await supabase.auth.signOut()
              router.push('/')
            }
            }
          >
            Sign Out
          </button>
        </div>
      </div>
    </main>
  );
}