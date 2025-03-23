
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useToast } from '@/components/ui/use-toast';
import { Lock } from 'lucide-react';

const formSchema = z.object({
  email: z.string().email({ message: 'Введіть правильну електронну пошту' }),
  password: z.string().min(6, { message: 'Пароль має містити мінімум 6 символів' }),
});

const AdminLogin = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    try {
      const success = await login(values.email, values.password);
      if (success) {
        toast({
          title: 'Вхід виконано успішно',
          description: 'Ви увійшли як адміністратор',
        });
        navigate('/admin');
      } else {
        toast({
          variant: 'destructive',
          title: 'Помилка входу',
          description: 'Невірна електронна пошта або пароль',
        });
      }
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Помилка входу',
        description: 'Сталася помилка при вході',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container max-w-md py-16">
      <Card>
        <CardHeader className="space-y-1">
          <div className="flex justify-center mb-4">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <Lock className="h-6 w-6 text-primary" />
            </div>
          </div>
          <CardTitle className="text-2xl text-center">Вхід для адміністратора</CardTitle>
          <CardDescription className="text-center">
            Введіть свої облікові дані для доступу до панелі адміністратора
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Електронна пошта</FormLabel>
                    <FormControl>
                      <Input placeholder="адмін@пошта.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Пароль</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="••••••" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? 'Вхід...' : 'Увійти'}
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-sm text-muted-foreground">
            Для тестування використовуйте: admin@example.com / admin123
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default AdminLogin;
