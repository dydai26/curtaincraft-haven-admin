
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Product } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';
import { ShoppingCart, Eye } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
  };

  return (
    <Link to={`/product/${product.id}`} className="block group">
      <div className="overflow-hidden rounded-lg border border-border bg-card product-card-hover">
        <div className="relative aspect-[3/4] overflow-hidden bg-muted">
          <img
            src={product.images[0]}
            alt={product.name}
            className={`object-cover w-full h-full transition-all duration-500 group-hover:scale-105 ${
              isImageLoaded ? 'lazy-image' : 'lazy-image lazy-image-loading'
            }`}
            onLoad={() => setIsImageLoaded(true)}
          />
          {(product.isNew || product.discount) && (
            <div className="absolute top-2 left-2 flex flex-col gap-2">
              {product.isNew && (
                <Badge className="bg-primary text-xs">Новинка</Badge>
              )}
              {product.discount && (
                <Badge variant="destructive" className="text-xs">
                  -{product.discount}%
                </Badge>
              )}
            </div>
          )}
          <div className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/10" />
          <div className="absolute bottom-2 right-2 flex space-x-2 scale-90 opacity-0 transition-all group-hover:scale-100 group-hover:opacity-100">
            <Button
              size="icon"
              variant="secondary"
              className="h-8 w-8 rounded-full shadow-md"
              onClick={handleAddToCart}
            >
              <ShoppingCart className="h-4 w-4" />
              <span className="sr-only">Додати в кошик</span>
            </Button>
            <Button
              size="icon"
              variant="secondary"
              className="h-8 w-8 rounded-full shadow-md"
              asChild
            >
              <Link to={`/product/${product.id}`}>
                <Eye className="h-4 w-4" />
                <span className="sr-only">Переглянути</span>
              </Link>
            </Button>
          </div>
        </div>
        <div className="p-4">
          <h3 className="font-medium text-card-foreground line-clamp-1">
            {product.name}
          </h3>
          <p className="mt-1 text-sm text-muted-foreground line-clamp-1">
            {product.category === 'curtains'
              ? 'Штори'
              : product.category === 'tulle'
              ? 'Тюль'
              : 'Аксесуари'}
          </p>
          <div className="mt-2 flex items-baseline justify-between">
            <div className="font-medium">
              {product.discount ? (
                <div className="flex items-center gap-2">
                  <span className="font-medium">
                    {Math.round(
                      product.price - (product.price * product.discount) / 100
                    )}{' '}
                    ₴
                  </span>
                  <span className="text-sm text-muted-foreground line-through">
                    {product.price} ₴
                  </span>
                </div>
              ) : (
                <span>{product.price} ₴</span>
              )}
            </div>
            <div className="text-xs text-muted-foreground">
              {product.inStock ? 'В наявності' : 'Немає в наявності'}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
