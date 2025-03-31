import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { Trash2, Plus, RefreshCw } from 'lucide-react';
import { reviewUtils } from '@/lib/reviewUtils';

interface Review {
  id: string;
  name: string;
  rating: number;
  text: string;
  date: string;
}

export const ReviewsAdmin: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [newReview, setNewReview] = useState<Omit<Review, 'id'>>({
    name: '',
    rating: 5,
    text: '',
    date: new Date().toLocaleDateString('uk-UA'),
  });
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  // Завантаження відгуків
  const fetchReviews = async () => {
    try {
      const { data, error } = await supabase
        .from('reviews')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setReviews(data || []);
    } catch (error) {
      console.error('Error fetching reviews:', error);
      toast({
        title: 'Помилка',
        description: 'Не вдалося завантажити відгуки',
        variant: 'destructive',
      });
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  // Синхронізація відгуків
  const handleSyncReviews = async () => {
    setIsLoading(true);
    try {
      await reviewUtils.syncReviews();
      toast({
        title: 'Успіх',
        description: 'Відгуки успішно синхронізовано',
      });
      fetchReviews();
    } catch (error) {
      console.error('Error syncing reviews:', error);
      toast({
        title: 'Помилка',
        description: 'Не вдалося синхронізувати відгуки',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Додавання нового відгуку
  const handleAddReview = async () => {
    if (!newReview.name || !newReview.text) {
      toast({
        title: 'Помилка',
        description: 'Заповніть всі обов\'язкові поля',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);
    try {
      const { error } = await supabase
        .from('reviews')
        .insert([newReview]);

      if (error) throw error;

      toast({
        title: 'Успіх',
        description: 'Відгук додано',
      });

      setNewReview({
        name: '',
        rating: 5,
        text: '',
        date: new Date().toLocaleDateString('uk-UA'),
      });

      fetchReviews();
    } catch (error) {
      console.error('Error adding review:', error);
      toast({
        title: 'Помилка',
        description: 'Не вдалося додати відгук',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Видалення відгуку
  const handleDeleteReview = async (id: string) => {
    setIsLoading(true);
    try {
      const { error } = await supabase
        .from('reviews')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: 'Успіх',
        description: 'Відгук видалено',
      });

      fetchReviews();
    } catch (error) {
      console.error('Error deleting review:', error);
      toast({
        title: 'Помилка',
        description: 'Не вдалося видалити відгук',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Управління відгуками</h2>
        <Button
          onClick={handleSyncReviews}
          disabled={isLoading}
          variant="outline"
          className="gap-2"
        >
          <RefreshCw className="w-4 h-4" />
          Синхронізувати відгуки
        </Button>
      </div>

      {/* Форма додавання нового відгуку */}
      <div className="space-y-4 p-4 border rounded-lg">
        <h3 className="text-lg font-semibold">Додати новий відгук</h3>
        <div className="space-y-2">
          <Input
            placeholder="Ім'я"
            value={newReview.name}
            onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
          />
          <div className="flex items-center space-x-2">
            <span>Оцінка:</span>
            {[1, 2, 3, 4, 5].map((rating) => (
              <Button
                key={rating}
                variant={newReview.rating === rating ? 'default' : 'outline'}
                size="sm"
                onClick={() => setNewReview({ ...newReview, rating })}
              >
                {rating}
              </Button>
            ))}
          </div>
          <Textarea
            placeholder="Текст відгуку"
            value={newReview.text}
            onChange={(e) => setNewReview({ ...newReview, text: e.target.value })}
          />
          <Button
            onClick={handleAddReview}
            disabled={isLoading}
            className="w-full"
          >
            <Plus className="w-4 h-4 mr-2" />
            Додати відгук
          </Button>
        </div>
      </div>

      {/* Список відгуків */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Існуючі відгуки</h3>
        {reviews.map((review) => (
          <div
            key={review.id}
            className="p-4 border rounded-lg flex justify-between items-start"
          >
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <span className="font-medium">{review.name}</span>
                <span className="text-sm text-muted-foreground">
                  {review.date}
                </span>
              </div>
              <div className="flex items-center space-x-1">
                {[1, 2, 3, 4, 5].map((rating) => (
                  <span
                    key={rating}
                    className={`text-sm ${
                      rating <= review.rating ? 'text-yellow-400' : 'text-gray-300'
                    }`}
                  >
                    ★
                  </span>
                ))}
              </div>
              <p className="text-sm">{review.text}</p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => handleDeleteReview(review.id)}
              disabled={isLoading}
            >
              <Trash2 className="w-4 h-4 text-red-500" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}; 