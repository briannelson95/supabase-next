"use client"
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

export default function AuthComponent() {
    const [supabase] = useState(() => createBrowserSupabaseClient())
    const router = useRouter()

    useEffect(() => {
        const {
            data: { subscription }
        } = supabase.auth.onAuthStateChange(() => {
            router.refresh()
        })

        return () => {
            subscription.unsubscribe()
        }
    }, [supabase, router])

    const signUp = () => {
        supabase.auth.signUp({
            email: "14nelsonb@gmail.com",
            password: "sup3rs3cur3"
        })
    }

    const signIn = () => {
        supabase.auth.signInWithPassword({
            email: "14nelsonb@gmail.com",
            password: "sup3rs3cur3"
        })
    }

    const signOut = () => {
        supabase.auth.signOut()
    }
    return (
        <div>
            <button className="border" onClick={signUp}>Sign Up</button>
            <button className="border" onClick={signIn}>Sign In</button>
            <button className="border" onClick={signOut}>Sign Out</button>
        </div>
    )
}
