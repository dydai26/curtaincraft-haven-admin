
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ProductCard from '@/components/ui/ProductCard';
import { Button } from '@/components/ui/button';
import { getProductsByCategory, getCategories, Product } from '@/lib/data';
import { FilterX, SlidersHorizontal } from 'lucide-react';

type SortOption = 'featured' | 'price-low-high' | 'price-high-low' | 'name-a-z' | 'name-z-a';

const Category = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sortOption, setSortOption] = useState<SortOption>('featured');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 2000]);
  const [selectedSubcategories, setSelectedSubcategories] = useState<string[]>([]);

  const categories = getCategories();
  const category = categories.find(c => c.id === categoryId);

  useEffect(() => {
    window.scrollTo(0, 0);
    setIsLoading(true);
    
    // Simulate loading
    setTimeout(() => {
      if (categoryId) {
        const fetchedProducts = getProductsByCategory(categoryId);
        setProducts(fetchedProducts);
        setFilteredProducts(fetchedProducts);
      }
      setIsLoading(false);
    }, 500);
  }, [categoryId]);

  useEffect(() => {
    let result = [...products];
    
    // Filter by subcategory if any selected
    if (selectedSubcategories.length > 0) {
      result = result.filter(product => 
        product.subcategory && selectedSubcategories.includes(product.subcategory)
      );
    }
    
    // Filter by price range
    result = result.filter(product => 
      product.price >= priceRange[0] && product.price <= priceRange[1]
    );
    
    // Sort products
    switch (sortOption) {
      case 'price-low-high':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high-low':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'name-a-z':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name-z-a':
        result.sort((a, b) => b.name.localeCompare(a.name));
        break;
      default:
        // 'featured' or default: no additional sorting needed
        break;
    }
    
    setFilteredProducts(result);
  }, [products, sortOption, priceRange, selectedSubcategories]);

  // Get unique subcategories
  const subcategories = [...new Set(products.map(product => product.subcategory).filter(Boolean))];

  const resetFilters = () => {
    setPriceRange([0, 2000]);
    setSelectedSubcategories([]);
  };

  const handleSubcategoryChange = (subcategory: string) => {
    setSelectedSubcategories(prev => 
      prev.includes(subcategory)
        ? prev.filter(sc => sc !== subcategory)
        : [...prev, subcategory]
    );
  };

  const getCategoryTitle = () => {
    if (!categoryId) return 'Товари';
    
    switch (categoryId) {
      case 'curtains':
        return 'Штори';
      case 'tulle':
        return 'Тюль';
      case 'accessories':
        return 'Аксесуари';
      default:
        return 'Товари';
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-16">
        {/* Category Header */}
        <section className="relative py-24 mb-8 bg-secondary/30">
          <div className="container px-4 md:px-6">
            <h1 className="text-3xl font-serif font-medium md:text-4xl text-center">
              {category?.name || getCategoryTitle()}
            </h1>
            {category?.description && (
              <p className="mt-4 max-w-2xl mx-auto text-center text-muted-foreground">
                {category.description}
              </p>
            )}
          </div>
        </section>

        <div className="container px-4 md:px-6 pb-16">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filters - Desktop */}
            <aside className="hidden lg:block w-64 space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">Фільтри</h3>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={resetFilters}
                    className="text-xs h-8 px-2"
                  >
                    <FilterX className="mr-1 h-3 w-3" />
                    Скинути
                  </Button>
                </div>
                
                {subcategories.length > 0 && (
                  <div>
                    <h4 className="text-sm font-medium mb-2">Підкатегорії</h4>
                    <div className="space-y-2">
                      {subcategories.map((subcategory) => (
                        <div key={subcategory} className="flex items-center">
                          <input
                            type="checkbox"
                            id={`subcategory-${subcategory}`}
                            checked={selectedSubcategories.includes(subcategory!)}
                            onChange={() => handleSubcategoryChange(subcategory!)}
                            className="rounded border-gray-300 text-primary focus:ring-primary"
                          />
                          <label
                            htmlFor={`subcategory-${subcategory}`}
                            className="ml-2 text-sm"
                          >
                            {subcategory}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                <div>
                  <h4 className="text-sm font-medium mb-2">Ціна</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">{priceRange[0]} ₴</span>
                      <span className="text-sm">{priceRange[1]} ₴</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="2000"
                      step="100"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                      className="w-full"
                    />
                  </div>
                </div>
              </div>
            </aside>

            {/* Mobile Filters Button */}
            <div className="lg:hidden flex items-center justify-between mb-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
              >
                <SlidersHorizontal className="mr-2 h-4 w-4" />
                Фільтри
              </Button>
              
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value as SortOption)}
                className="rounded border-gray-300 text-sm py-1 px-2"
              >
                <option value="featured">За популярністю</option>
                <option value="price-low-high">Ціна: від нижчої до вищої</option>
                <option value="price-high-low">Ціна: від вищої до нижчої</option>
                <option value="name-a-z">Назва: А-Я</option>
                <option value="name-z-a">Назва: Я-А</option>
              </select>
            </div>

            {/* Mobile Filters */}
            {isMobileFilterOpen && (
              <div className="lg:hidden bg-card rounded-lg border border-border p-4 mb-4 animate-fade-in">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-medium">Фільтри</h3>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={resetFilters}
                    className="text-xs h-8 px-2"
                  >
                    <FilterX className="mr-1 h-3 w-3" />
                    Скинути
                  </Button>
                </div>
                
                {subcategories.length > 0 && (
                  <div className="mb-4">
                    <h4 className="text-sm font-medium mb-2">Підкатегорії</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {subcategories.map((subcategory) => (
                        <div key={subcategory} className="flex items-center">
                          <input
                            type="checkbox"
                            id={`mobile-subcategory-${subcategory}`}
                            checked={selectedSubcategories.includes(subcategory!)}
                            onChange={() => handleSubcategoryChange(subcategory!)}
                            className="rounded border-gray-300 text-primary focus:ring-primary"
                          />
                          <label
                            htmlFor={`mobile-subcategory-${subcategory}`}
                            className="ml-2 text-sm"
                          >
                            {subcategory}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                <div>
                  <h4 className="text-sm font-medium mb-2">Ціна</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">{priceRange[0]} ₴</span>
                      <span className="text-sm">{priceRange[1]} ₴</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="2000"
                      step="100"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                      className="w-full"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Product Content */}
            <div className="flex-1">
              {/* Desktop Sort */}
              <div className="hidden lg:flex items-center justify-between mb-6">
                <p className="text-sm text-muted-foreground">
                  Знайдено {filteredProducts.length} товарів
                </p>
                <div className="flex items-center">
                  <span className="text-sm mr-2">Сортувати за:</span>
                  <select
                    value={sortOption}
                    onChange={(e) => setSortOption(e.target.value as SortOption)}
                    className="rounded border-gray-300 text-sm py-1 px-2"
                  >
                    <option value="featured">За популярністю</option>
                    <option value="price-low-high">Ціна: від нижчої до вищої</option>
                    <option value="price-high-low">Ціна: від вищої до нижчої</option>
                    <option value="name-a-z">Назва: А-Я</option>
                    <option value="name-z-a">Назва: Я-А</option>
                  </select>
                </div>
              </div>

              {/* Products Grid */}
              {isLoading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {Array.from({ length: 6 }).map((_, index) => (
                    <div key={index} className="rounded-lg bg-muted animate-pulse">
                      <div className="aspect-[3/4]"></div>
                      <div className="p-4 space-y-3">
                        <div className="h-5 bg-muted-foreground/20 rounded w-3/4"></div>
                        <div className="h-4 bg-muted-foreground/20 rounded w-1/2"></div>
                        <div className="h-4 bg-muted-foreground/20 rounded w-1/4"></div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : filteredProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <h3 className="text-lg font-medium mb-2">Товари не знайдено</h3>
                  <p className="text-muted-foreground mb-6">
                    Спробуйте змінити параметри фільтрації або перегляньте інші категорії
                  </p>
                  <Button onClick={resetFilters}>
                    Скинути фільтри
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Category;
