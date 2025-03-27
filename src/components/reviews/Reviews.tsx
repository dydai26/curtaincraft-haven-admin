// src/components/reviews/Reviews.tsx

import React, { useState } from 'react';
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
import StarRating from './StarRating'; // імпортуємо StarRating

// Визначення схеми валідації через Zod
const formSchema = z.object({
  name: z.string().min(1, 'Введіть ваше ім’я'),
  rating: z.number().min(1, 'Оцінка не може бути менше 1').max(5, 'Оцінка не може бути більше 5'),
  text: z.string().min(5, 'Відгук має містити хоча б 5 символів'),
});

const Reviews = () => {
  const [reviews, setReviews] = useState([
    {
      id: '1',
      userName: 'Іван Іванов',
      reviewText: 'Цей товар просто чудовий! Дуже задоволений якістю.',
      rating: 5,
    },
    {
      id: '2',
      userName: 'Марія Петрівна',
      reviewText: 'Товари супер! Якість відмінна, але трохи пізно доставили.',
      rating: 4,
    },
    {
      id: '3',
      userName: 'Андрій Олексійович',
      reviewText: 'Не зовсім задоволений, не відповідає опису на сайті.',
      rating: 2,
    },
    {
      id: '4',
      userName: 'Олена Сергіївна',
      reviewText: 'Прекрасна покупка! Рекомендую всім друзям!',
      rating: 5,
    },
    {
      id: '5',
      userName: 'Дмитро Олександрович',
      reviewText: 'Відмінний товар, не шкодую про покупку.',
      rating: 4,
    },
    {
      id: '6',
      userName: 'Катерина Іванівна',
      reviewText: 'Швидко доставили, товар відповідає опису.',
      rating: 4,
    },
  ]);
  
  const [showForm, setShowForm] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
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

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const newReview = {
      id: String(reviews.length + 1), // генеруємо ID для нового відгука
      productId: 'your-product-id', // ID продукту, для якого залишаються відгуки
      reviewText: values.text,
      userName: values.name,
      rating: values.rating,
    };

    setReviews([newReview, ...reviews]);
    setShowForm(false);
    form.reset();
    
    toast({
      title: 'Дякуємо за відгук!',
      description: 'Ваш відгук успішно додано.',
    });
  };

  // Обчислення відгуків для поточної сторінки
  const indexOfLastReview = currentPage * reviewsPerPage;
  const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
  const currentReviews = reviews.slice(indexOfFirstReview, indexOfLastReview);

  const totalPages = Math.ceil(reviews.length / reviewsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <section className="py-16 bg-secondary/30">
      <div className="container px-4 md:px-6">
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-2xl font-serif font-medium md:text-3xl flex items-center gap-2">
            <MessageSquare className="h-6 w-6" />
            Відгуки наших клієнтів
          </h2>
          <Button 
            onClick={() => setShowForm(!showForm)} 
            variant={showForm ? 'outline' : 'default'}
          >
            {showForm ? 'Скасувати' : 'Залишити відгук'}
          </Button>
        </div>
        
        {showForm && (
          <Card className="mb-10">
            <CardContent className="p-6">
              <h3 className="text-lg font-medium mb-4">Поділіться вашими враженнями</h3>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Ваше ім'я</FormLabel>
                        <FormControl>
                          <Input placeholder="Введіть ваше ім'я" {...field} />
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
                          <div>
                            <StarRating 
                              rating={field.value} 
                              editable={true} 
                              onChange={(value) => field.onChange(value)} 
                            />
                          </div>
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
                          <Textarea 
                            placeholder="Поділіться вашими враженнями про наші товари" 
                            className="min-h-[120px]" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button type="submit" className="mt-2">Надіслати відгук</Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentReviews.map((review) => (
            <div key={review.id} className="bg-white p-6 shadow-lg rounded-lg">
              <h3 className="text-xl font-semibold">{review.userName}</h3>
              <StarRating rating={review.rating} editable={false} onChange={() => {}} />
              <p>{review.reviewText}</p>
            </div>
          ))}
        </div>
        
        {/* Пагінація */}
        <div className="flex justify-center mt-6">
          <Button
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
          >
            Попередня
          </Button>
          <div className="flex gap-2 mx-4">
            {[...Array(totalPages)].map((_, index) => (
              <Button
                key={index}
                variant={currentPage === index + 1 ? 'default' : 'outline'}
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </Button>
            ))}
          </div>
          <Button
            disabled={currentPage === totalPages}
            onClick={() => handlePageChange(currentPage + 1)}
          >
            Наступна
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Reviews;
