
import { Product } from './data';

// In a real application, this would save to a database or API
export const saveProducts = (products: Product[]): void => {
  localStorage.setItem('admin_products', JSON.stringify(products));
};

export const loadProducts = (): Product[] | null => {
  const savedProducts = localStorage.getItem('admin_products');
  return savedProducts ? JSON.parse(savedProducts) : null;
};

// Helper for saving an individual product
export const saveProduct = (product: Product): void => {
  const existingProducts = loadProducts() || [];
  const productIndex = existingProducts.findIndex(p => p.id === product.id);
  
  if (productIndex >= 0) {
    // Update existing product
    existingProducts[productIndex] = product;
  } else {
    // Add new product
    existingProducts.push(product);
  }
  
  saveProducts(existingProducts);
};

// Helper for deleting a product
export const deleteProduct = (productId: number): void => {
  const existingProducts = loadProducts() || [];
  const updatedProducts = existingProducts.filter(p => p.id !== productId);
  saveProducts(updatedProducts);
};

// Convert a File object to a base64 string for local storage
export const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = error => reject(error);
  });
};


