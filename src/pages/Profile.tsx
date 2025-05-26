import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import Auth from '../components/Auth';

interface Profile {
  id: string;
  email: string;
  full_name?: string;
  avatar_url?: string;
}

export default function Profile() {
  const [session, setSession] = useState(null);
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session?.user) {
        fetchProfile(session.user.id);
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session?.user) {
        fetchProfile(session.user.id);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  async function fetchProfile(userId: string) {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) {
      console.error('Error fetching profile:', error);
    } else {
      setProfile(data);
    }
  }

  if (!session) {
    return (
      <div className="max-w-4xl mx-auto py-12">
        <h2 className="text-3xl font-bold text-center mb-8">Sign in to View Profile</h2>
        <Auth />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-12">
      <div className="bg-white/20 backdrop-blur-md border border-white/20 rounded-xl p-8">
        <h1 className="text-3xl font-bold mb-8">Profile</h1>
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <p className="mt-1 text-lg">{session.user.email}</p>
          </div>
          {profile && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <p className="mt-1 text-lg">{profile.full_name || 'Not set'}</p>
              </div>
              {profile.avatar_url && (
                <div>
                  <label className="block text-sm font-medium text-gray-700">Avatar</label>
                  <img 
                    src={profile.avatar_url} 
                    alt="Profile" 
                    className="mt-1 w-20 h-20 rounded-full"
                  />
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}