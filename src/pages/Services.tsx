import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import ServiceCard from '../components/ServiceCard';
import Auth from '../components/Auth';

interface Category {
  id: string;
  name: string;
  description: string;
  icon: string;
}

export default function Services() {
  const [session, setSession] = useState(null);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (session) {
      fetchCategories();
    }
  }, [session]);

  async function fetchCategories() {
    const { data, error } = await supabase
      .from('service_categories')
      .select('*')
      .eq('active', true);

    if (error) {
      console.error('Error fetching categories:', error);
    } else {
      setCategories(data);
    }
  }

  if (!session) {
    return (
      <div className="max-w-4xl mx-auto py-12">
        <h2 className="text-3xl font-bold text-center mb-8">Sign in to Browse Services</h2>
        <Auth />
      </div>
    );
  }

  return (
    <div className="space-y-12">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Available Services</h1>
        <p className="text-xl text-gray-600">Browse and connect with service providers</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {categories.map((category) => (
          <ServiceCard
            key={category.id}
            title={category.name}
            description={category.description}
            icon={category.icon}
            category="Service"
          />
        ))}
      </div>
    </div>
  );
}