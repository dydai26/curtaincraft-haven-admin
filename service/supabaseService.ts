// lib/supabaseService.ts
import { createClient } from '@supabase/supabase-js';
import { Database } from '../src/lib/types/supabase';
import { Product, Category } from '../src/lib/data';

// Підключення до Supabase
const supabase = createClient<Database>(
  'https://llupvsfyzmuknstajibw.supabase.co',  // заміни на свій URL
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxsdXB2c2Z5em11a25zdGFqaWJ3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM0MTc5NzgsImV4cCI6MjA1ODk5Mzk3OH0.M94YgQK15aeuxGat1sx7GylSko_oNXDZ9dW-Gi8K9Ew'  // заміни на свій анонімний ключ
);

export const fetchProductsByCategory = async (categoryId: string): Promise<Product[]> => {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('category', categoryId);

  if (error) {
    console.error('Error fetching products:', error);
    return [];
  }

  return data || [];
};

export const fetchCategories = async (): Promise<Category[]> => {
  const { data, error } = await supabase
    .from('products')
    .select('category');

  if (error) {
    console.error('Error fetching categories:', error);
    return [];
  }

  // Отримуємо унікальні категорії
  const uniqueCategories = new Set((data || []).map(item => item.category));
  
  return Array.from(uniqueCategories).map(category => ({
    id: category,
    name: category,
    description: '',
    imageUrl: '',
    featured: false
  }));
};

export const addProduct = async (product: Omit<Product, 'id'>): Promise<Product | null> => {
  const { data, error } = await supabase
    .from('products')
    .insert([{
      ...product,
      characteristics: product.characteristics || [],
      sizeVariants: product.sizeVariants || [],
      images: product.images || [],
      isNew: product.isNew || false,
      isFeatured: product.isFeatured || false,
      discount: product.discount || 0,
      inStock: product.inStock ?? true,
    }])
    .select()
    .single();

  if (error) {
    console.error('Error adding product:', error);
    return null;
  }

  return data;
};

export const updateProduct = async (product: Product): Promise<Product | null> => {
  const { data, error } = await supabase
    .from('products')
    .update({
      ...product,
      characteristics: product.characteristics || [],
      sizeVariants: product.sizeVariants || [],
      images: product.images || [],
      isNew: product.isNew || false,
      isFeatured: product.isFeatured || false,
      discount: product.discount || 0,
      inStock: product.inStock ?? true,
    })
    .eq('id', product.id)
    .select()
    .single();

  if (error) {
    console.error('Error updating product:', error);
    return null;
  }

  return data;
};

export const deleteProduct = async (productId: string): Promise<boolean> => {
  const { error } = await supabase
    .from('products')
    .delete()
    .eq('id', productId);

  if (error) {
    console.error('Error deleting product:', error);
    return false;
  }

  return true;
};

export const fetchAllProducts = async (): Promise<Product[]> => {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching all products:', error);
    return [];
  }

  return data || [];
};

export const deleteAllProducts = async (): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('products')
      .delete()
      .neq('id', 'dummy'); // Видаляємо всі товари

    if (error) {
      console.error('Error deleting all products:', error);
      return false;
    }

    console.log('Successfully deleted all products');
    return true;
  } catch (error) {
    console.error('Unexpected error deleting all products:', error);
    return false;
  }
};
