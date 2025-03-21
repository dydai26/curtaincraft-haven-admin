import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { FeaturedCollection, CategoryCollection } from '@/components/home/FeaturedCollection';
import Reviews from '@/components/reviews/Reviews';
import { getCategories, getFeaturedProducts, getNewProducts } from '@/lib/data';

const Index = () => {
  const featuredProducts = getFeaturedProducts();
  const newProducts = getNewProducts();
  const categories = getCategories();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-16">
        {/* Hero Section */}
        <section className="relative h-[80vh] min-h-[600px] w-full overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1605774337664-7a846e9cdf17?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&q=80"
            alt="Elegant living room with beautiful curtains"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background/70 to-background/30" />
          <div className="container relative h-full px-4 md:px-6 flex items-center">
            <div className="max-w-lg space-y-6 animate-fade-in">
              <div className="space-y-2">
                <h1 className="text-4xl font-serif font-medium tracking-tight sm:text-5xl md:text-6xl">
                  Ідеальні штори для вашої оселі
                </h1>
                <p className="text-lg text-muted-foreground md:text-xl">
                  Перетворіть ваш простір за допомогою наших елегантних штор та тюлів
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="button-hover" asChild>
                  <Link to="/category/curtains">
                    Переглянути колекцію
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" className="button-hover" asChild>
                  <Link to="/category/tulle">Тюлі</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Categories Collection */}
        <CategoryCollection categories={categories} />

        {/* Featured Products */}
        <FeaturedCollection
          title="Популярні товари"
          products={featuredProducts}
          link={{ text: "Переглянути всі", url: "/category/curtains" }}
        />

        {/* New Products */}
        {newProducts.length > 0 && (
          <FeaturedCollection
            title="Новинки"
            products={newProducts}
            link={{ text: "Переглянути всі новинки", url: "/new" }}
          />
        )}

        {/* Benefits Section */}
        <section className="py-16 bg-secondary/30">
          <div className="container px-4 md:px-6">
            <h2 className="text-2xl font-serif font-medium md:text-3xl text-center mb-12">
              Чому обирають нас
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-card rounded-lg p-6 text-center space-y-4 shadow-sm transition-all hover:shadow-md">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-primary"
                  >
                    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                    <path d="M3.27 6.96 12 12.01l8.73-5.05"></path>
                    <path d="M12 22.08V12"></path>
                  </svg>
                </div>
                <h3 className="text-lg font-medium">Висока якість</h3>
                <p className="text-muted-foreground">
                  Ми пропонуємо тільки високоякісні вироби від перевірених виробників
                </p>
              </div>
              <div className="bg-card rounded-lg p-6 text-center space-y-4 shadow-sm transition-all hover:shadow-md">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-primary"
                  >
                    <circle cx="12" cy="12" r="10"></circle>
                    <polyline points="12 6 12 12 16 14"></polyline>
                  </svg>
                </div>
                <h3 className="text-lg font-medium">Швидка доставка</h3>
                <p className="text-muted-foreground">
                  Доставка по всій Україні протягом 1-3 робочих днів
                </p>
              </div>
              <div className="bg-card rounded-lg p-6 text-center space-y-4 shadow-sm transition-all hover:shadow-md">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-primary"
                  >
                    <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path>
                  </svg>
                </div>
                <h3 className="text-lg font-medium">Гарантія якості</h3>
                <p className="text-muted-foreground">
                  Ми надаємо гарантію на всі наші вироби та забезпечуємо повернення
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Reviews Section */}
        <Reviews />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
