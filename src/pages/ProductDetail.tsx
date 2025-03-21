
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  Plus, 
  Minus, 
  Heart, 
  Share2, 
  Truck, 
  CreditCard, 
  RefreshCw, 
  Check, 
  ShoppingCart
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { FeaturedCollection } from '@/components/home/FeaturedCollection';
import { getProductById, getProductsByCategory, Product, SizeVariant } from '@/lib/data';
import { useCart } from '@/context/CartContext';

const ProductDetail = () => {
  const { productId } = useParams<{ productId: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [selectedSizeVariant, setSelectedSizeVariant] = useState<SizeVariant | null>(null);
  const { addToCart } = useCart();
  const [imagesLoaded, setImagesLoaded] = useState<boolean[]>([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    setIsLoading(true);
    
    // Simulate loading
    setTimeout(() => {
      if (productId) {
        const fetchedProduct = getProductById(Number(productId));
        if (fetchedProduct) {
          setProduct(fetchedProduct);
          setImagesLoaded(new Array(fetchedProduct.images.length).fill(false));
          
          // Set default selected size variant if available
          if (fetchedProduct.sizeVariants && fetchedProduct.sizeVariants.length > 0) {
            // Try to find an in-stock variant first
            const inStockVariant = fetchedProduct.sizeVariants.find(v => v.inStock);
            setSelectedSizeVariant(inStockVariant || fetchedProduct.sizeVariants[0]);
          }
          
          // Get related products
          const categoryProducts = getProductsByCategory(fetchedProduct.category);
          const filtered = categoryProducts
            .filter(p => p.id !== fetchedProduct.id)
            .slice(0, 4);
          setRelatedProducts(filtered);
        }
      }
      setIsLoading(false);
    }, 500);
  }, [productId]);

  const handleAddToCart = () => {
    if (product) {
      if (selectedSizeVariant) {
        const productWithSize = {
          ...product,
          price: selectedSizeVariant.price,
          selectedSize: selectedSizeVariant.size,
        };
        addToCart(productWithSize, quantity);
      } else {
        addToCart(product, quantity);
      }
    }
  };

  const handleSizeChange = (size: string) => {
    if (product && product.sizeVariants) {
      const variant = product.sizeVariants.find(v => v.size === size);
      if (variant) {
        setSelectedSizeVariant(variant);
      }
    }
  };

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };

  const handleImageLoad = (index: number) => {
    setImagesLoaded(prev => {
      const newState = [...prev];
      newState[index] = true;
      return newState;
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow pt-28 pb-16">
          <div className="container px-4 md:px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="animate-pulse rounded-lg bg-muted aspect-square"></div>
              <div className="space-y-6 animate-pulse">
                <div className="h-8 bg-muted-foreground/20 rounded w-3/4"></div>
                <div className="h-6 bg-muted-foreground/20 rounded w-1/3"></div>
                <div className="h-24 bg-muted-foreground/20 rounded"></div>
                <div className="h-12 bg-muted-foreground/20 rounded w-1/2"></div>
                <div className="h-12 bg-muted-foreground/20 rounded"></div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow pt-28 pb-16">
          <div className="container px-4 md:px-6 text-center py-12">
            <h1 className="text-2xl font-medium mb-4">Товар не знайдено</h1>
            <p className="text-muted-foreground mb-8">
              Вибачте, товар, який ви шукаєте, не існує або був видалений.
            </p>
            <Button asChild>
              <Link to="/">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Повернутися на головну
              </Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const getCategoryName = (category: string) => {
    switch (category) {
      case 'curtains':
        return 'Штори';
      case 'tulle':
        return 'Тюль';
      case 'accessories':
        return 'Аксесуари';
      default:
        return category;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-28 pb-16">
        <div className="container px-4 md:px-6">
          {/* Breadcrumb */}
          <div className="mb-6">
            <nav className="flex" aria-label="Breadcrumb">
              <ol className="inline-flex items-center space-x-1 md:space-x-3 text-sm">
                <li className="inline-flex items-center">
                  <Link to="/" className="text-muted-foreground hover:text-foreground">
                    Головна
                  </Link>
                </li>
                <li className="inline-flex items-center">
                  <span className="mx-2 text-muted-foreground">/</span>
                  <Link
                    to={`/category/${product.category}`}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    {getCategoryName(product.category)}
                  </Link>
                </li>
                <li aria-current="page">
                  <div className="flex items-center">
                    <span className="mx-2 text-muted-foreground">/</span>
                    <span className="text-foreground line-clamp-1">{product.name}</span>
                  </div>
                </li>
              </ol>
            </nav>
          </div>

          {/* Product Detail */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {/* Product Images */}
            <div className="space-y-4">
              <div className="relative aspect-square overflow-hidden rounded-lg border border-border bg-muted">
                <img
                  src={product.images[selectedImage]}
                  alt={product.name}
                  className={`h-full w-full object-cover transition-all duration-300 ${
                    imagesLoaded[selectedImage] ? 'opacity-100' : 'opacity-0'
                  }`}
                  onLoad={() => handleImageLoad(selectedImage)}
                />
                {!imagesLoaded[selectedImage] && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <svg
                      className="animate-spin h-8 w-8 text-muted-foreground"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                  </div>
                )}
                
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
              </div>

              {product.images.length > 1 && (
                <div className="grid grid-cols-4 gap-2">
                  {product.images.map((image, index) => (
                    <div
                      key={index}
                      className={`cursor-pointer aspect-square rounded-md border ${
                        selectedImage === index
                          ? 'border-primary'
                          : 'border-border'
                      } overflow-hidden`}
                      onClick={() => setSelectedImage(index)}
                    >
                      <img
                        src={image}
                        alt={`${product.name} - view ${index + 1}`}
                        className="h-full w-full object-cover"
                        onLoad={() => handleImageLoad(index)}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-serif font-medium md:text-3xl">
                  {product.name}
                </h1>
                <div className="mt-1 flex items-center">
                  <p className="text-muted-foreground">
                    Категорія: {getCategoryName(product.category)}
                    {product.subcategory && ` / ${product.subcategory}`}
                  </p>
                </div>
              </div>

              <div className="flex items-baseline gap-4">
                {selectedSizeVariant && product.discount ? (
                  <>
                    <span className="text-2xl font-medium">
                      {Math.round(
                        selectedSizeVariant.price - (selectedSizeVariant.price * product.discount) / 100
                      )}{' '}
                      ₴
                    </span>
                    <span className="text-lg text-muted-foreground line-through">
                      {selectedSizeVariant.price} ₴
                    </span>
                  </>
                ) : selectedSizeVariant ? (
                  <span className="text-2xl font-medium">{selectedSizeVariant.price} ₴</span>
                ) : product.discount ? (
                  <>
                    <span className="text-2xl font-medium">
                      {Math.round(
                        product.price - (product.price * (product.discount || 0)) / 100
                      )}{' '}
                      ₴
                    </span>
                    <span className="text-lg text-muted-foreground line-through">
                      {product.price} ₴
                    </span>
                  </>
                ) : (
                  <span className="text-2xl font-medium">{product.price} ₴</span>
                )}
              </div>

              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">
                  {selectedSizeVariant ? (
                    selectedSizeVariant.inStock ? (
                      <span className="flex items-center text-green-600">
                        <Check className="mr-1 h-4 w-4" />
                        В наявності
                      </span>
                    ) : (
                      <span className="text-muted-foreground">Немає в наявності</span>
                    )
                  ) : product.inStock ? (
                    <span className="flex items-center text-green-600">
                      <Check className="mr-1 h-4 w-4" />
                      В наявності
                    </span>
                  ) : (
                    <span className="text-muted-foreground">Немає в наявності</span>
                  )}
                </p>
                <p className="text-md">{product.description}</p>
              </div>

              {/* Size Variants */}
              {product.sizeVariants && product.sizeVariants.length > 0 && (
                <div className="space-y-3">
                  <h3 className="text-sm font-medium">Розміри:</h3>
                  <RadioGroup 
                    value={selectedSizeVariant?.size || ''} 
                    onValueChange={handleSizeChange}
                    className="flex flex-wrap gap-3"
                  >
                    {product.sizeVariants.map((variant) => (
                      <div 
                        key={variant.size} 
                        className={`
                          flex items-center justify-between rounded-md border p-3 
                          ${variant.inStock ? 'cursor-pointer hover:border-primary' : 'opacity-60 cursor-not-allowed'} 
                          ${selectedSizeVariant?.size === variant.size ? 'border-primary' : 'border-border'}
                        `}
                      >
                        <div className="flex items-center space-x-3">
                          <RadioGroupItem 
                            value={variant.size} 
                            id={`size-${variant.size}`} 
                            disabled={!variant.inStock}
                          />
                          <label 
                            htmlFor={`size-${variant.size}`}
                            className="text-sm cursor-pointer font-medium flex flex-col"
                          >
                            <span>{variant.size}</span>
                            <span className="font-normal text-muted-foreground">
                              {product.discount ? (
                                <>
                                  {Math.round(variant.price - (variant.price * product.discount) / 100)} ₴
                                  <span className="ml-2 text-xs line-through">{variant.price} ₴</span>
                                </>
                              ) : (
                                `${variant.price} ₴`
                              )}
                            </span>
                          </label>
                        </div>
                        {!variant.inStock && 
                          <span className="text-xs text-muted-foreground">Немає в наявності</span>
                        }
                      </div>
                    ))}
                  </RadioGroup>
                </div>
              )}

              {product.material && (
                <div>
                  <h3 className="text-sm font-medium">Матеріал:</h3>
                  <p className="text-muted-foreground">{product.material}</p>
                </div>
              )}

              {product.dimensions && (
                <div>
                  <h3 className="text-sm font-medium">Розміри:</h3>
                  <p className="text-muted-foreground">{product.dimensions}</p>
                </div>
              )}

              {((selectedSizeVariant && selectedSizeVariant.inStock) || (!selectedSizeVariant && product.inStock)) && (
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <h3 className="text-sm font-medium">Кількість:</h3>
                    <div className="flex items-center">
                      <Button
                        size="icon"
                        variant="outline"
                        className="h-8 w-8 rounded-r-none"
                        onClick={() => handleQuantityChange(quantity - 1)}
                        disabled={quantity <= 1}
                      >
                        <Minus className="h-3 w-3" />
                        <span className="sr-only">Зменшити кількість</span>
                      </Button>
                      <div className="flex h-8 w-12 items-center justify-center border-y border-border">
                        {quantity}
                      </div>
                      <Button
                        size="icon"
                        variant="outline"
                        className="h-8 w-8 rounded-l-none"
                        onClick={() => handleQuantityChange(quantity + 1)}
                      >
                        <Plus className="h-3 w-3" />
                        <span className="sr-only">Збільшити кількість</span>
                      </Button>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button size="lg" className="flex-1 button-hover" onClick={handleAddToCart}>
                      <ShoppingCart className="mr-2 h-4 w-4" />
                      Додати до кошика
                    </Button>
                    <Button
                      size="lg"
                      variant="outline"
                      className="flex-1 button-hover"
                    >
                      <Heart className="mr-2 h-4 w-4" />
                      До списку бажань
                    </Button>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-border pt-6">
                <div className="flex items-start space-x-2">
                  <Truck className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <h4 className="text-sm font-medium">Безкоштовна доставка</h4>
                    <p className="text-xs text-muted-foreground">
                      Для замовлень від 1500 ₴
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-2">
                  <CreditCard className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <h4 className="text-sm font-medium">Безпечна оплата</h4>
                    <p className="text-xs text-muted-foreground">
                      Карта, готівка, PayPal
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-2">
                  <RefreshCw className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <h4 className="text-sm font-medium">Легке повернення</h4>
                    <p className="text-xs text-muted-foreground">
                      Протягом 14 днів
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-2">
                  <Share2 className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <h4 className="text-sm font-medium">Поділитися</h4>
                    <div className="flex space-x-2 mt-1">
                      <Button size="icon" variant="ghost" className="h-8 w-8">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                        </svg>
                      </Button>
                      <Button size="icon" variant="ghost" className="h-8 w-8">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                        </svg>
                      </Button>
                      <Button size="icon" variant="ghost" className="h-8 w-8">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
                        </svg>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Product Tabs */}
          <div className="mt-12">
            <Tabs defaultValue="description">
              <TabsList className="w-full justify-start border-b rounded-none">
                <TabsTrigger value="description">Опис</TabsTrigger>
                {product.features && (
                  <TabsTrigger value="features">Характеристики</TabsTrigger>
                )}
                {product.care && (
                  <TabsTrigger value="care">Догляд</TabsTrigger>
                )}
              </TabsList>
              <TabsContent value="description" className="pt-4">
                <div className="prose max-w-none">
                  <p>{product.description}</p>
                </div>
              </TabsContent>
              {product.features && (
                <TabsContent value="features" className="pt-4">
                  <div className="prose max-w-none">
                    <ul className="space-y-2">
                      {product.features.map((feature, index) => (
                        <li key={index} className="flex items-start">
                          <Check className="mr-2 h-5 w-5 text-primary mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </TabsContent>
              )}
              {product.care && (
                <TabsContent value="care" className="pt-4">
                  <div className="prose max-w-none">
                    <p>{product.care}</p>
                  </div>
                </TabsContent>
              )}
            </Tabs>
          </div>
          
          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <div className="mt-16">
              <FeaturedCollection
                title="Схожі товари"
                products={relatedProducts}
                link={{ text: "Переглянути всі", url: `/category/${product.category}` }}
              />
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProductDetail;
