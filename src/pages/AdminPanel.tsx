
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import ProtectedRoute from '@/components/admin/ProtectedRoute';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { LogOut, Package, Settings, ShoppingBag } from 'lucide-react';
import ProductsAdmin from '@/components/admin/ProductsAdmin';
import AdminHeader from '@/components/admin/AdminHeader';

const AdminPanel = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('products');

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-background">
        <AdminHeader activeTab={activeTab} setActiveTab={setActiveTab} onLogout={handleLogout} />
        
        <main className="container py-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
            <TabsList className="grid w-full md:w-auto grid-cols-2 md:grid-cols-3 mb-4">
              <TabsTrigger value="products" className="flex items-center gap-2">
                <Package className="w-4 h-4" />
                <span className="hidden md:inline">Товари</span>
              </TabsTrigger>
              <TabsTrigger value="orders" className="flex items-center gap-2">
                <ShoppingBag className="w-4 h-4" />
                <span className="hidden md:inline">Замовлення</span>
              </TabsTrigger>
              <TabsTrigger value="settings" className="flex items-center gap-2">
                <Settings className="w-4 h-4" />
                <span className="hidden md:inline">Налаштування</span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="products" className="space-y-4">
              <ProductsAdmin />
            </TabsContent>
            
            <TabsContent value="orders" className="space-y-4">
              <div className="rounded-lg border p-8 text-center">
                <h3 className="text-lg font-medium">Розділ замовлень</h3>
                <p className="text-muted-foreground mt-2">
                  Функціональність замовлень буде реалізована в наступних оновленнях.
                </p>
              </div>
            </TabsContent>
            
            <TabsContent value="settings" className="space-y-4">
              <div className="rounded-lg border p-8 text-center">
                <h3 className="text-lg font-medium">Налаштування сайту</h3>
                <p className="text-muted-foreground mt-2">
                  Налаштування буде реалізовано в наступних оновленнях.
                </p>
                <Button onClick={handleLogout} variant="outline" className="mt-4">
                  <LogOut className="mr-2 h-4 w-4" />
                  Вийти
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </ProtectedRoute>
  );
};

export default AdminPanel;
