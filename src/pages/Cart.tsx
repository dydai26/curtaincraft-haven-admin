
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { useCart } from '@/context/CartContext';

const Cart = () => {
  const { items, removeFromCart, updateQuantity, totalPrice, clearCart } = useCart();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-28 pb-16">
        <div className="container px-4 md:px-6">
          <div className="mb-8">
            <h1 className="text-3xl font-serif font-medium">Кошик</h1>
            <p className="text-muted-foreground mt-1">
              {items.length > 0
                ? `${items.length} ${
                    items.length === 1 ? 'товар' : 'товарів'
                  } у вашому кошику`
                : 'Ваш кошик порожній'}
            </p>
          </div>

          {items.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="md:col-span-2 space-y-6">
                <div className="rounded-lg border border-border">
                  <div className="hidden md:grid grid-cols-4 gap-4 p-4 bg-muted/50 text-sm font-medium">
                    <div className="col-span-2">Товар</div>
                    <div className="text-center">Кількість</div>
                    <div className="text-right">Сума</div>
                  </div>
                  <Separator />
                  {items.map((item) => (
                    <div key={item.product.id} className="p-4">
                      <div className="md:grid md:grid-cols-4 md:gap-4 md:items-center">
                        <div className="md:col-span-2 flex items-center gap-4">
                          <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border border-border">
                            <img
                              src={item.product.images[0]}
                              alt={item.product.name}
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <div className="flex flex-col">
                            <Link
                              to={`/product/${item.product.id}`}
                              className="font-medium hover:underline line-clamp-1"
                            >
                              {item.product.name}
                            </Link>
                            <p className="text-sm text-muted-foreground mt-1">
                              {item.product.price} ₴
                            </p>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="mt-2 md:hidden h-8 w-8 p-0 text-muted-foreground hover:text-destructive"
                              onClick={() => removeFromCart(item.product.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                              <span className="sr-only">Видалити</span>
                            </Button>
                          </div>
                        </div>
                        <div className="flex items-center justify-between md:justify-center mt-4 md:mt-0">
                          <div className="flex md:flex-col items-center">
                            <div className="flex">
                              <Button
                                size="icon"
                                variant="outline"
                                className="h-8 w-8 rounded-r-none"
                                onClick={() =>
                                  updateQuantity(item.product.id, item.quantity - 1)
                                }
                                disabled={item.quantity <= 1}
                              >
                                <Minus className="h-3 w-3" />
                                <span className="sr-only">Зменшити кількість</span>
                              </Button>
                              <div className="flex h-8 w-12 items-center justify-center border-y border-border">
                                {item.quantity}
                              </div>
                              <Button
                                size="icon"
                                variant="outline"
                                className="h-8 w-8 rounded-l-none"
                                onClick={() =>
                                  updateQuantity(item.product.id, item.quantity + 1)
                                }
                              >
                                <Plus className="h-3 w-3" />
                                <span className="sr-only">Збільшити кількість</span>
                              </Button>
                            </div>
                          </div>
                          <div className="md:hidden font-medium">
                            {item.product.price * item.quantity} ₴
                          </div>
                        </div>
                        <div className="hidden md:flex md:justify-end font-medium">
                          {item.product.price * item.quantity} ₴
                          <Button
                            variant="ghost"
                            size="sm"
                            className="ml-2 h-8 w-8 p-0 text-muted-foreground hover:text-destructive"
                            onClick={() => removeFromCart(item.product.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                            <span className="sr-only">Видалити</span>
                          </Button>
                        </div>
                      </div>
                      <Separator className="mt-4" />
                    </div>
                  ))}
                  <div className="p-4 flex justify-between">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-muted-foreground"
                      onClick={clearCart}
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Очистити кошик
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="button-hover"
                      asChild
                    >
                      <Link to="/">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Продовжити покупки
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
              <div className="md:col-span-1">
                <div className="rounded-lg border border-border p-6 space-y-4 sticky top-28">
                  <h2 className="text-lg font-medium">Разом</h2>
                  <Separator />
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Товари ({items.length}):</span>
                      <span>{totalPrice} ₴</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Доставка:</span>
                      <span>
                        {totalPrice >= 1500 ? (
                          <span className="text-green-600">Безкоштовно</span>
                        ) : (
                          '100 ₴'
                        )}
                      </span>
                    </div>
                  </div>
                  <Separator />
                  <div className="flex justify-between text-lg font-medium">
                    <span>Загалом:</span>
                    <span>
                      {totalPrice >= 1500 ? totalPrice : totalPrice + 100} ₴
                    </span>
                  </div>
                  <Button size="lg" className="w-full button-hover mt-4" asChild>
                    <Link to="/checkout">
                      Оформити замовлення
                    </Link>
                  </Button>
                  <div className="text-center text-xs text-muted-foreground mt-4">
                    Ми приймаємо оплату карткою, готівкою та через PayPal
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="mx-auto w-24 h-24 mb-6 flex items-center justify-center rounded-full bg-muted">
                <ShoppingBag className="h-12 w-12 text-muted-foreground" />
              </div>
              <h2 className="text-2xl font-medium mb-4">Ваш кошик порожній</h2>
              <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                Схоже, ви ще не додали жодного товару до кошика. Перегляньте наші
                колекції, щоб знайти ідеальні штори або тюль для вашого інтер'єру.
              </p>
              <Button size="lg" className="button-hover" asChild>
                <Link to="/">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Продовжити покупки
                </Link>
              </Button>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Cart;
