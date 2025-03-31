import { supabase } from './supabase';

export interface Product {
  id?: string;
  name: string;
  description: string;
  price: number;
  image_url: string;
  category: string;
  created_at?: string;
}

export const productUtils = {
  // Отримати всі товари
  async getAllProducts() {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  },

  // Отримати товар за ID
  async getProductById(id: string) {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  },

  // Створити новий товар
  async createProduct(product: Omit<Product, 'id' | 'created_at'>) {
    const { data, error } = await supabase
      .from('products')
      .insert([product])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Оновити товар
  async updateProduct(id: string, updates: Partial<Product>) {
    const { data, error } = await supabase
      .from('products')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Видалити товар
  async deleteProduct(id: string) {
    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', id);

    if (error) throw error;
  }
}; 