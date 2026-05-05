import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  compare_price?: number;
  images: string[];
  sizes: string[];
  category: string;
  stock: number;
  is_featured: boolean;
  is_active: boolean;
  ratings_average: number;
  ratings_count: number;
  created_at: string;
};

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProducts(data as Product[]);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { products, loading, error, refetch: fetchProducts };
}
