"use client"

import React, { useEffect, useState } from 'react'
import {
    useUser,
    useSupabaseClient,
    useSession,
} from '@supabase/auth-helpers-react';
import { Database } from '@/lib/database.types';

type Profiles = Database['public']['Tables']['profiles']['Row'];

export default function AdminView() {
    const supabase = useSupabaseClient<Database>();
    const user = useUser();
    const session = useSession();

    const [isLoading, setIsLoading] = useState(true);
    const [username, setUsername] = useState<Profiles['username']>('');
    const [admin, setAdmin] = useState<Profiles['admin']>(false);

    useEffect(() => {
        async function getProfile() {
            try {
                setIsLoading(true);
    
                if (!user) throw new Error('No user');
    
                let { data, error, status } = await supabase
                    .from('profiles')
                    .select('username, admin')
                    .eq('id', user.id)
                    .single();
    
                if (error && status !== 406) {
                    throw error;
                }
    
                if (data) {
                    setUsername(data.username);
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

    return (
        <div>
            {admin ? 'AdminView' : 'Not admin'}
        </div>
    )
}
