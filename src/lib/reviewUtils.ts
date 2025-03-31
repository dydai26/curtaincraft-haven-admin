import { supabase } from './supabase';

export interface Review {
  id?: string;
  name: string;
  rating: number;
  text: string;
  date: string;
  created_at?: string;
}

// Локальні відгуки для синхронізації
const localReviews: Review[] = [
  {
    name: "Анна",
    rating: 5,
    text: "Чудові штори! Якість матеріалу відмінна, пошиття професійне. Рекомендую!",
    date: "15.03.2024"
  },
  {
    name: "Марія",
    rating: 5,
    text: "Дуже задоволена покупкою. Швидка доставка, гарна комунікація з продавцем.",
    date: "10.03.2024"
  },
  {
    name: "Олександр",
    rating: 5,
    text: "Відмінний сервіс! Штори точно відповідають опису, якість на висоті.",
    date: "05.03.2024"
  }
];

export const reviewUtils = {
  // Отримати всі відгуки
  async getAllReviews() {
    const { data, error } = await supabase
      .from('reviews')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  },

  // Синхронізація відгуків
  async syncReviews() {
    try {
      console.log('Starting sync with reviews:', localReviews.length);
      
      // Отримуємо всі відгуки з Supabase
      console.log('Fetching existing reviews from Supabase...');
      const { data: existingReviews, error: fetchError } = await supabase
        .from('reviews')
        .select('*');

      if (fetchError) {
        console.error('Error fetching reviews:', fetchError);
        throw fetchError;
      }

      // Додаємо нові відгуки
      for (const review of localReviews) {
        const exists = existingReviews?.some(
          (existing) => existing.name === review.name && existing.text === review.text
        );

        if (!exists) {
          const { error: insertError } = await supabase
            .from('reviews')
            .insert([review]);

          if (insertError) {
            console.error('Error inserting review:', insertError);
            throw insertError;
          }
        }
      }

      console.log('Reviews sync completed successfully');
    } catch (error) {
      console.error('Detailed sync error:', error);
      throw error;
    }
  },

  // Додати новий відгук
  async addReview(review: Omit<Review, 'id' | 'created_at'>) {
    const { data, error } = await supabase
      .from('reviews')
      .insert([review])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Видалити відгук
  async deleteReview(id: string) {
    const { error } = await supabase
      .from('reviews')
      .delete()
      .eq('id', id);

    if (error) throw error;
  }
}; 