import { supabase } from './supabase';
import { Product } from './data';
import { v4 as uuidv4 } from 'uuid';

export const syncUtils = {
  // Синхронізація всіх товарів
  async syncProducts(products: Product[]) {
    try {
      console.log('Starting sync with products:', products.length);
      
      // Отримуємо всі товари з Supabase
      console.log('Fetching existing products from Supabase...');
      const { data: existingProducts, error: fetchError } = await supabase
        .from('products')
        .select('*');

      if (fetchError) {
        console.error('Error fetching products:', fetchError);
        throw fetchError;
      }

      console.log('Existing products from Supabase:', existingProducts?.length || 0);

      // Створюємо мапу існуючих товарів для швидкого пошуку
      const existingProductsMap = new Map(
        existingProducts?.map(product => [product.name, product]) || []
      );

      // Масиви для операцій
      const toInsert: any[] = [];
      const toUpdate: any[] = [];
      const toDelete: string[] = [];

      // Аналізуємо товари
      console.log('Analyzing products for sync...');
      products.forEach(product => {
        const existingProduct = existingProductsMap.get(product.name);
        const productData = {
          id: existingProduct?.id || uuidv4(),
          name: product.name,
          title: product.name,
          category: product.category,
          subcategory: product.subcategory,
          price: Number(product.price),
          sizePrices: product.sizeVariants || [],
          description: product.description,
          characteristics: [
            product.material && `Матеріал: ${product.material}`,
            product.dimensions && `Розміри: ${product.dimensions}`,
            product.care && `Догляд: ${product.care}`
          ].filter(Boolean),
          images: (product.images || []).map(img => img.replace('/public/', '')),
          mainImage: product.images?.[0]?.replace('/public/', '') || null,
          material: product.material,
          dimensions: product.dimensions,
          care: product.care,
          inStock: Boolean(product.inStock),
          isNew: Boolean(product.isNew),
          isFeatured: Boolean(product.isFeatured),
          discount: Number(product.discount || 0)
        };

        if (!existingProduct) {
          console.log('Product to insert:', product.name);
          toInsert.push(productData);
        } else {
          console.log('Product to update:', product.name);
          toUpdate.push({ ...productData, id: existingProduct.id });
        }
      });

      // Знаходимо товари для видалення
      existingProducts?.forEach(existingProduct => {
        if (!products.find(p => p.name === existingProduct.name)) {
          console.log('Product to delete:', existingProduct.name);
          toDelete.push(existingProduct.id);
        }
      });

      console.log('Sync operations:', {
        toInsert: toInsert.length,
        toUpdate: toUpdate.length,
        toDelete: toDelete.length
      });

      // Виконуємо операції
      const results = [];

      // Вставка нових товарів
      if (toInsert.length > 0) {
        console.log('Inserting new products...');
        for (const product of toInsert) {
          try {
            console.log('Inserting product data:', JSON.stringify(product, null, 2));
            
            // Перевіряємо, чи всі обов'язкові поля присутні
            if (!product.name || !product.category || !product.price) {
              console.error('Missing required fields for product:', product.name);
              continue;
            }

            const { data: insertedData, error: insertError } = await supabase
              .from('products')
              .insert(product)
              .select();

            if (insertError) {
              console.error('Error inserting product:', product.name, insertError);
              throw insertError;
            }

            console.log('Successfully inserted product:', product.name);
            results.push({ type: 'insert', data: insertedData });
          } catch (error) {
            console.error('Error inserting product:', product.name, error);
            throw error;
          }
        }
      }

      // Оновлення існуючих товарів
      if (toUpdate.length > 0) {
        console.log('Updating existing products...');
        for (const product of toUpdate) {
          try {
            console.log('Updating product data:', JSON.stringify(product, null, 2));
            
            // Перевіряємо, чи всі обов'язкові поля присутні
            if (!product.name || !product.category || !product.price) {
              console.error('Missing required fields for product:', product.name);
              continue;
            }

            const { data: updatedData, error: updateError } = await supabase
              .from('products')
              .upsert(product)
              .select();

            if (updateError) {
              console.error('Error updating product:', product.name, updateError);
              throw updateError;
            }

            console.log('Successfully updated product:', product.name);
            results.push({ type: 'update', data: updatedData });
          } catch (error) {
            console.error('Error updating product:', product.name, error);
            throw error;
          }
        }
      }

      // Видалення товарів
      if (toDelete.length > 0) {
        console.log('Deleting products...');
        const { error: deleteError } = await supabase
          .from('products')
          .delete()
          .in('id', toDelete);

        if (deleteError) {
          console.error('Error deleting products:', deleteError);
          throw deleteError;
        }

        results.push({ type: 'delete', count: toDelete.length });
      }

      console.log('Sync completed successfully');
      return {
        inserted: toInsert.length,
        updated: toUpdate.length,
        deleted: toDelete.length,
        results
      };
    } catch (error) {
      console.error('Detailed sync error:', error);
      throw error;
    }
  }
}; 