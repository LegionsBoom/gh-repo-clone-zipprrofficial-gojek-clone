import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { supabase } from '../lib/supabase'

export default function AuthComponent() {
  return (
    <div className="max-w-md mx-auto p-6 bg-white/20 backdrop-blur-md border border-white/20 rounded-xl shadow-lg">
      <Auth
        supabaseClient={supabase}
        appearance={{
          theme: ThemeSupa,
          variables: {
            default: {
              colors: {
                brand: '#FF6B00',
                brandAccent: '#6B2B89',
              },
            },
          },
        }}
        providers={[]}
      />
    </div>
  )
}