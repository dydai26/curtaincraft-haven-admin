
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Product, Category } from '@/lib/data';
import ProductCard from '@/components/ui/ProductCard';

interface FeaturedCollectionProps {
  title: string;
  products: Product[];
  link?: {
    text: string;
    url: string;
  };
  showViewAll?: boolean;
}

export const FeaturedCollection: React.FC<FeaturedCollectionProps> = ({
  title,
  products,
  link,
  showViewAll = true,
}) => {
  return (
    <section className="py-16">
      <div className="container px-4 md:px-6">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-serif font-medium md:text-3xl">{title}</h2>
          {showViewAll && link && (
            <Link
              to={link.url}
              className="hidden md:flex items-center text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              {link.text}
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          )}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        {showViewAll && link && (
          <div className="mt-8 flex justify-center md:hidden">
            <Button asChild variant="outline">
              <Link to={link.url}>
                {link.text}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

interface CategoryCollectionProps {
  categories: Category[];
}

export const CategoryCollection: React.FC<CategoryCollectionProps> = ({
  categories,
}) => {
  return (
    <section className="py-16 bg-secondary/50">
      <div className="container px-4 md:px-6">
        <h2 className="text-2xl font-serif font-medium md:text-3xl text-center mb-12">
          Наші категорії
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((category) => (
            <Link
              key={category.id}
              to={`/category/${category.id}`}
              className="group relative overflow-hidden rounded-lg aspect-[4/3]"
            >
              <img
                src={category.imageUrl}
                alt={category.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="text-xl font-serif text-white mb-2">
                  {category.name}
                </h3>
                <p className="text-white/80 text-sm line-clamp-2 mb-4">
                  {category.description}
                </p>
                <Button
                  size="sm"
                  variant="secondary"
                  className="w-full sm:w-auto button-hover"
                >
                  Переглянути колекцію
                </Button>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
