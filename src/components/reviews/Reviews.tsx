import React, { useState, useEffect } from 'react';
import { MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import {  
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage 
} from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useToast } from '@/hooks/use-toast';
import StarRating from './StarRating';
import { reviewUtils, Review } from '@/lib/reviewUtils';

// Визначення схеми валідації через Zod для форми
const formSchema = z.object({
  name: z.string().min(1, "Введіть ваше ім'я"), // Поле ім'я не може бути порожнім
  rating: z.number().min(1, "Оцінка не може бути менше 1").max(5, "Оцінка не може бути більше 5"), // Оцінка повинна бути між 1 і 5
  text: z.string().min(5, "Відгук має містити хоча б 5 символів"), // Відгук повинен містити хоча б 5 символів
});

const Reviews = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const reviewsPerPage = 3;
  const { toast } = useToast();
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      rating: 0,
      text: '',
    },
  });

  // Отримуємо відгуки при завантаженні компонента
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const data = await reviewUtils.getAllReviews();
        setReviews(data);
      } catch (error) {
        console.error('Error fetching reviews:', error);
        toast({
          title: 'Помилка',
          description: 'Не вдалося завантажити відгуки. Спробуйте пізніше.',
          variant: 'destructive',
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchReviews();
  }, []);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const newReview = {
        name: values.name,
        rating: values.rating,
        text: values.text,
        date: new Date().toLocaleDateString('uk-UA'),
      };

      const addedReview = await reviewUtils.addReview(newReview);
      setReviews(prev => [addedReview, ...prev]);

      setShowForm(false);
      form.reset();
      toast({
        title: 'Дякуємо за відгук!',
        description: 'Ваш відгук успішно додано.',
      });
    } catch (error) {
      console.error('Error adding review:', error);
      toast({
        title: 'Помилка',
        description: 'Не вдалося додати відгук. Спробуйте пізніше.',
        variant: 'destructive',
      });
    }
  };

  const deleteReview = async (id: string) => {
    try {
      await reviewUtils.deleteReview(id);
      setReviews(prev => prev.filter(review => review.id !== id));
      toast({
        title: 'Відгук видалено',
        description: 'Ваш відгук був успішно видалений.',
      });
    } catch (error) {
      console.error('Error deleting review:', error);
      toast({
        title: 'Помилка',
        description: 'Не вдалося видалити відгук. Спробуйте пізніше.',
        variant: 'destructive',
      });
    }
  };

  const indexOfLastReview = currentPage * reviewsPerPage;
  const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
  const currentReviews = reviews.slice(indexOfFirstReview, indexOfLastReview);
  const totalPages = Math.ceil(reviews.length / reviewsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <MessageSquare className="w-6 h-6" />
          Відгуки наших клієнтів
        </h2>
        <Button onClick={() => setShowForm(true)}>Написати відгук</Button>
      </div>

      {showForm && (
        <Card className="mb-8">
          <CardContent className="pt-6">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Ваше ім'я</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="rating"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Оцінка</FormLabel>
                      <FormControl>
                        <StarRating
                          value={field.value}
                          onChange={field.onChange}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="text"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Ваш відгук</FormLabel>
                      <FormControl>
                        <Textarea {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex justify-end gap-2">
                  <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
                    Скасувати
                  </Button>
                  <Button type="submit">Надіслати</Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      )}

      <div className="space-y-4">
        {currentReviews.map((review) => (
          <Card key={review.id}>
            <CardContent className="pt-6">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold">{review.name}</h3>
                  <StarRating value={review.rating} readOnly />
                  <p className="mt-2 text-gray-600">{review.text}</p>
                  <p className="text-sm text-gray-500 mt-2">{review.date}</p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => deleteReview(review.id!)}
                >
                  Видалити
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-8">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <Button
              key={page}
              variant={currentPage === page ? "default" : "outline"}
              onClick={() => handlePageChange(page)}
            >
              {page}
            </Button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Reviews;
