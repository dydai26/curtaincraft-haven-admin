
import React, { useState } from 'react';
import { getProducts, Product } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Edit, Search, Trash, Plus } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import ProductForm from './ProductForm';

const ProductsAdmin = () => {
  const [products, setProducts] = useState<Product[]>(getProducts());
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const { toast } = useToast();

  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSaveProduct = (product: Product) => {
    if (editingProduct) {
      // Update existing product
      setProducts(products.map(p => p.id === product.id ? product : p));
      toast({
        title: "Товар оновлено",
        description: `${product.name} було успішно оновлено.`,
      });
    } else {
      // Add new product
      setProducts([...products, product]);
      toast({
        title: "Товар додано",
        description: `${product.name} було успішно додано до каталогу.`,
      });
    }
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
  };

  const handleDeleteProduct = (product: Product) => {
    // In a real app, you would likely ask for confirmation before deleting
    setProducts(products.filter(p => p.id !== product.id));
    toast({
      title: "Товар видалено",
      description: `${product.name} було успішно видалено з каталогу.`,
    });
  };

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'curtains': return 'Штори';
      case 'tulle': return 'Тюль';
      case 'accessories': return 'Аксесуари';
      default: return category;
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-2 sm:space-y-0">
        <div>
          <CardTitle>Управління товарами</CardTitle>
          <CardDescription>Додавайте, редагуйте та видаляйте товари з каталогу</CardDescription>
        </div>
        <Button onClick={() => setIsAddingProduct(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Новий товар
        </Button>
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
