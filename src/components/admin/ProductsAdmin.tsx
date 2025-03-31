import React, { useState, useEffect } from 'react';
import { Product } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Edit, Search, Trash, Plus, RefreshCw } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import ProductForm from './ProductForm';
import { fetchAllProducts, addProduct, updateProduct, deleteProduct, deleteAllProducts } from '@service/supabaseService';

const ProductsAdmin = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isSyncing, setIsSyncing] = useState(false);
  const { toast } = useToast();

  // Завантажуємо продукти при монтуванні компонента
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const data = await fetchAllProducts();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
      toast({
        title: "Помилка завантаження",
        description: "Не вдалося завантажити товари. Спробуйте ще раз.",
        variant: "destructive",
      });
    }
  };

  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSaveProduct = async (product: Product) => {
    try {
      if (editingProduct) {
        // Оновлюємо існуючий товар
        const updatedProduct = await updateProduct(product);
        if (updatedProduct) {
          setProducts(products.map(p => p.id === product.id ? updatedProduct : p));
          toast({
            title: "Товар оновлено",
            description: `${product.name} було успішно оновлено.`,
          });
        } else {
          throw new Error('Failed to update product');
        }
      } else {
        // Додаємо новий товар
        const newProduct = await addProduct(product);
        if (newProduct) {
          setProducts([newProduct, ...products]);
          toast({
            title: "Товар додано",
            description: `${product.name} було успішно додано до каталогу.`,
          });
        } else {
          throw new Error('Failed to add product');
        }
      }
    } catch (error) {
      console.error('Error saving product:', error);
      toast({
        title: "Помилка збереження",
        description: "Не вдалося зберегти товар. Спробуйте ще раз.",
        variant: "destructive",
      });
    }
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
  };

  const handleDeleteProduct = async (product: Product) => {
    try {
      const success = await deleteProduct(product.id);
      if (success) {
        setProducts(products.filter(p => p.id !== product.id));
        toast({
          title: "Товар видалено",
          description: `${product.name} було успішно видалено з каталогу.`,
        });
      } else {
        throw new Error('Failed to delete product');
      }
    } catch (error) {
      console.error('Error deleting product:', error);
      toast({
        title: "Помилка видалення",
        description: "Не вдалося видалити товар. Спробуйте ще раз.",
        variant: "destructive",
      });
    }
  };

  const handleDeleteAllProducts = async () => {
    if (!window.confirm('Ви впевнені, що хочете видалити всі товари? Ця дія незворотна.')) {
      return;
    }

    try {
      const success = await deleteAllProducts();
      if (success) {
        setProducts([]);
        toast({
          title: "Всі товари видалено",
          description: "Всі товари були успішно видалені з бази даних.",
        });
      } else {
        throw new Error('Failed to delete all products');
      }
    } catch (error) {
      console.error('Error deleting all products:', error);
      toast({
        title: "Помилка видалення",
        description: "Не вдалося видалити всі товари. Спробуйте ще раз.",
        variant: "destructive",
      });
    }
  };

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'curtains': return 'Штори';
      case 'tulle': return 'Тюль';
      case 'accessories': return 'Аксесуари';
      default: return category;
    }
  };

  const handleSync = async () => {
    setIsSyncing(true);
    try {
      await fetchProducts();
      toast({
        title: "Синхронізація завершена",
        description: "Дані успішно синхронізовано з Supabase.",
      });
    } catch (error) {
      console.error("Error syncing products:", error);
      toast({
        title: "Помилка синхронізації",
        description: "Не вдалося синхронізувати дані з Supabase. Спробуйте ще раз.",
        variant: "destructive",
      });
    } finally {
      setIsSyncing(false);
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-2 sm:space-y-0">
        <div>
          <CardTitle>Управління товарами</CardTitle>
          <CardDescription>Додавайте, редагуйте та видаляйте товари з каталогу</CardDescription>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            onClick={handleSync}
            disabled={isSyncing}
          >
            <RefreshCw className={`mr-2 h-4 w-4 ${isSyncing ? 'animate-spin' : ''}`} />
            {isSyncing ? 'Синхронізація...' : 'Синхронізувати з Supabase'}
          </Button>
          <Button 
            variant="destructive"
            onClick={handleDeleteAllProducts}
          >
            <Trash className="mr-2 h-4 w-4" />
            Видалити всі товари
          </Button>
          <Button onClick={() => setIsAddingProduct(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Новий товар
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center py-4">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Пошук товарів..."
              className="w-full pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Назва</TableHead>
                <TableHead>Категорія</TableHead>
                <TableHead className="text-right">Ціна</TableHead>
                <TableHead>Наявність</TableHead>
                <TableHead>Дії</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell className="font-medium">
                      {product.name.length > 30 
                        ? `${product.name.substring(0, 30)}...` 
                        : product.name}
                    </TableCell>
                    <TableCell>{getCategoryLabel(product.category)}</TableCell>
                    <TableCell className="text-right">{product.price} ₴</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        product.inStock 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {product.inStock ? 'В наявності' : 'Немає в наявності'}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={() => handleEditProduct(product)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => handleDeleteProduct(product)}
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                    Товари не знайдено
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        
        <ProductForm
          open={isAddingProduct || !!editingProduct}
          onOpenChange={(open) => {
            if (!open) {
              setIsAddingProduct(false);
              setEditingProduct(null);
            }
          }}
          onSave={handleSaveProduct}
          product={editingProduct || undefined}
        />
      </CardContent>
    </Card>
  );
};

export default ProductsAdmin;
