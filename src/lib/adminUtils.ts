
import { Product } from './data';

// In a real application, this would save to a database or API
export const saveProducts = (products: Product[]): void => {
  localStorage.setItem('admin_products', JSON.stringify(products));
};

export const loadProducts = (): Product[] | null => {
  const savedProducts = localStorage.getItem('admin_products');
  return savedProducts ? JSON.parse(savedProducts) : null;
};
