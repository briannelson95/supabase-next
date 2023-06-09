'use client'

import './globals.css';
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { SessionContextProvider } from '@supabase/auth-helpers-react';

// export const metadata = {
//   title: 'Create Next App',
//   description: 'Generated by create next app',
// };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <html lang='en'>
      <SessionContextProvider
        supabaseClient={createBrowserSupabaseClient()}
        initialSession={null}
      >
        <body>{children}</body>
      </SessionContextProvider>
    </html>
  );
}