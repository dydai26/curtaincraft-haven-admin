
import React, { useState } from 'react';
import { Star, MessageSquare, User } from 'lucide-react';
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

// Sample review data
const initialReviews = [
  {
    id: 1,
    name: 'Марія Петренко',
    rating: 5,
    date: '15.03.2023',
    text: 'Замовляла штори у вітальню, якість просто неймовірна! Тканина приємна на дотик, колір повністю відповідає фото. Дуже задоволена покупкою!',
  },
  {
    id: 2,
    name: 'Іван Ковальчук',
    rating: 4,
    date: '02.02.2023',
    text: 'Купував тюль для спальні. Доставка швидка, якість чудова. Єдиний мінус - трохи відрізнявся відтінок від фото, але це не критично. Рекомендую!',
  },
  {
    id: 3,
    name: 'Олена Сидоренко',
    rating: 5,
    date: '20.01.2023',
    text: 'Дуже задоволена якістю штор та обслуговуванням. Менеджер допоміг з вибором, все швидко доставили. Буду рекомендувати знайомим!',
  },
];

const formSchema = z.object({
  name: z.string().min(2, { message: "Ім'я повинно містити принаймні 2 символи" }),
  rating: z.number().min(1, { message: "Оберіть оцінку" }).max(5),
  text: z.string().min(10, { message: "Відгук повинен містити принаймні 10 символів" }),
});

const StarRating = ({ 
  rating, 
  editable = false, 
  onChange 
}: { 
  rating: number; 
  editable?: boolean;
  onChange?: (value: number) => void;
}) => {
  const [hoverRating, setHoverRating] = useState(0);

  return (
    <div className="flex">
      {[1, 2, 3, 4, 5].map((value) => (
        <Star
          key={value}
          className={`h-5 w-5 ${
            (editable ? (hoverRating || rating) : rating) >= value
              ? 'fill-primary text-primary'
              : 'text-muted-foreground'
          } ${editable ? 'cursor-pointer' : ''}`}
          onMouseEnter={editable ? () => setHoverRating(value) : undefined}
          onMouseLeave={editable ? () => setHoverRating(0) : undefined}
          onClick={editable && onChange ? () => onChange(value) : undefined}
        />
      ))}
    </div>
  );
};

const ReviewCard = ({ review }: { review: typeof initialReviews[0] }) => (
  <Card className="mb-4">
    <CardContent className="p-6">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <div className="bg-primary/10 rounded-full p-2">
            <User className="h-5 w-5 text-primary" />
          </div>
          <span className="font-medium">{review.name}</span>
        </div>
        <span className="text-sm text-muted-foreground">{review.date}</span>
      </div>
      <StarRating rating={review.rating} />
      <p className="mt-3 text-muted-foreground">{review.text}</p>
    </CardContent>
  </Card>
);

const Reviews = () => {
  const [reviews, setReviews] = useState(initialReviews);
  const [showForm, setShowForm] = useState(false);
  const { toast } = useToast();
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      rating: 0,
      text: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const newReview = {
      id: reviews.length + 1,
      name: values.name,
      rating: values.rating,
      date: new Date().toLocaleDateString('uk-UA'),
      text: values.text,
    };
    
    setReviews([newReview, ...reviews]);
    setShowForm(false);
    form.reset();
    
    toast({
      title: "Дякуємо за відгук!",
      description: "Ваш відгук успішно додано.",
    });
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
            variant={showForm ? "outline" : "default"}
          >
            {showForm ? "Скасувати" : "Залишити відгук"}
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
          {reviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Reviews;
