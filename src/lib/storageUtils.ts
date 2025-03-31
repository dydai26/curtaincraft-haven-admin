import { supabase } from './supabase';

export const storageUtils = {
  // Завантажити зображення
  async uploadImage(file: File, folder: string = 'products') {
    try {
      console.log('Starting upload to Supabase storage...');
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${folder}/${fileName}`;

      console.log('Uploading file:', {
        fileName,
        filePath,
        fileSize: file.size,
        fileType: file.type
      });

      const { error: uploadError, data } = await supabase.storage
        .from('product-images')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (uploadError) {
        console.error('Supabase upload error:', uploadError);
        throw uploadError;
      }

      console.log('File uploaded successfully, getting public URL...');

      // Отримати публічний URL для завантаженого файлу
      const { data: { publicUrl } } = supabase.storage
        .from('product-images')
        .getPublicUrl(filePath);

      console.log('Public URL obtained:', publicUrl);
      return publicUrl;
    } catch (error) {
      console.error('Detailed storage error:', error);
      throw error;
    }
  },

  // Видалити зображення
  async deleteImage(path: string) {
    try {
      console.log('Deleting image:', path);
      const { error } = await supabase.storage
        .from('product-images')
        .remove([path]);

      if (error) {
        console.error('Error deleting image:', error);
        throw error;
      }
      console.log('Image deleted successfully');
    } catch (error) {
      console.error('Detailed delete error:', error);
      throw error;
    }
  }
}; 