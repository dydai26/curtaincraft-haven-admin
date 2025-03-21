
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, CreditCard, Truck, MapPin, User, Mail, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import { toast } from "sonner";
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { useCart } from '@/context/CartContext';

type CheckoutStep = 'details' | 'shipping' | 'payment' | 'confirmation';

const Checkout = () => {
  const navigate = useNavigate();
  const { items, totalPrice, clearCart } = useCart();
  const [currentStep, setCurrentStep] = useState<CheckoutStep>('details');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    deliveryMethod: 'novaposhta',
    paymentMethod: 'card',
    cardNumber: '',
    cardExpiry: '',
    cardCvc: '',
    notes: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Redirect to cart if cart is empty
    if (items.length === 0) {
      navigate('/cart');
    }
  }, [items, navigate]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    
    // Clear error when field is being edited
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: '',
      });
    }
  };

  const handleRadioChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateStep = (step: CheckoutStep): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (step === 'details') {
      if (!formData.firstName.trim()) {
        newErrors.firstName = "Введіть ім'я";
      }
      if (!formData.lastName.trim()) {
        newErrors.lastName = "Введіть прізвище";
      }
      if (!formData.email.trim()) {
        newErrors.email = "Введіть email";
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = "Введіть коректний email";
      }
      if (!formData.phone.trim()) {
        newErrors.phone = "Введіть номер телефону";
      }
    } else if (step === 'shipping') {
      if (!formData.address.trim()) {
        newErrors.address = "Введіть адресу";
      }
      if (!formData.city.trim()) {
        newErrors.city = "Введіть місто";
      }
      if (!formData.postalCode.trim()) {
        newErrors.postalCode = "Введіть поштовий індекс";
      }
    } else if (step === 'payment') {
      if (formData.paymentMethod === 'card') {
        if (!formData.cardNumber.trim()) {
          newErrors.cardNumber = "Введіть номер картки";
        }
        if (!formData.cardExpiry.trim()) {
          newErrors.cardExpiry = "Введіть термін дії";
        }
        if (!formData.cardCvc.trim()) {
          newErrors.cardCvc = "Введіть CVC код";
        }
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      switch (currentStep) {
        case 'details':
          setCurrentStep('shipping');
          break;
        case 'shipping':
          setCurrentStep('payment');
          break;
        case 'payment':
          setCurrentStep('confirmation');
          break;
        default:
          break;
      }
      window.scrollTo(0, 0);
    }
  };

  const prevStep = () => {
    switch (currentStep) {
      case 'shipping':
        setCurrentStep('details');
        break;
      case 'payment':
        setCurrentStep('shipping');
        break;
      case 'confirmation':
        setCurrentStep('payment');
        break;
      default:
        break;
    }
    window.scrollTo(0, 0);
  };

  const placeOrder = () => {
    toast.success("Замовлення успішно оформлено! Дякуємо за покупку.");
    clearCart();
    navigate('/');
  };

  const renderStepIndicator = () => {
    const steps = [
      { key: 'details', label: 'Особисті дані' },
      { key: 'shipping', label: 'Доставка' },
      { key: 'payment', label: 'Оплата' },
      { key: 'confirmation', label: 'Підтвердження' },
    ];

    return (
      <div className="mb-8">
        <div className="hidden sm:flex items-center justify-between">
          {steps.map((step, index) => (
            <React.Fragment key={step.key}>
              <div className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    currentStep === step.key
                      ? 'bg-primary text-primary-foreground'
                      : steps.findIndex(s => s.key === currentStep) > index
                      ? 'bg-primary/80 text-primary-foreground'
                      : 'bg-muted text-muted-foreground'
                  }`}
                >
                  {steps.findIndex(s => s.key === currentStep) > index ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  ) : (
                    index + 1
                  )}
                </div>
                <div
                  className={`mt-2 text-sm ${
                    currentStep === step.key
                      ? 'font-medium'
                      : 'text-muted-foreground'
                  }`}
                >
                  {step.label}
                </div>
              </div>
              {index < steps.length - 1 && (
                <div
                  className={`h-px w-full max-w-[100px] ${
                    steps.findIndex(s => s.key === currentStep) > index
                      ? 'bg-primary'
                      : 'bg-border'
                  }`}
                />
              )}
            </React.Fragment>
          ))}
        </div>
        <div className="sm:hidden">
          <p className="text-sm font-medium">
            Крок {steps.findIndex(s => s.key === currentStep) + 1} з {steps.length}:{' '}
            <span className="text-primary">
              {steps.find(s => s.key === currentStep)?.label}
            </span>
          </p>
          <div className="mt-2 h-2 w-full rounded-full bg-muted">
            <div
              className="h-2 rounded-full bg-primary transition-all"
              style={{
                width: `${
                  ((steps.findIndex(s => s.key === currentStep) + 1) / steps.length) * 100
                }%`,
              }}
            />
          </div>
        </div>
      </div>
    );
  };

  const renderOrderSummary = () => (
    <div className="rounded-lg border border-border p-6 space-y-4 sticky top-28">
      <h2 className="text-lg font-medium">Ваше замовлення</h2>
      <Separator />
      <div className="max-h-60 overflow-y-auto space-y-4">
        {items.map((item) => (
          <div key={item.product.id} className="flex gap-4">
            <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border border-border">
              <img
                src={item.product.images[0]}
                alt={item.product.name}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="flex flex-col flex-1 min-w-0">
              <Link
                to={`/product/${item.product.id}`}
                className="text-sm font-medium hover:underline line-clamp-1"
              >
                {item.product.name}
              </Link>
              <p className="text-xs text-muted-foreground">
                Кількість: {item.quantity}
              </p>
              <div className="mt-auto text-sm font-medium">
                {item.product.price * item.quantity} ₴
              </div>
            </div>
          </div>
        ))}
      </div>
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
      <Button
        variant="outline"
        size="sm"
        className="w-full button-hover mt-4"
        asChild
      >
        <Link to="/cart">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Повернутися до кошика
        </Link>
      </Button>
    </div>
  );

  const renderDetailsStep = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="firstName">Ім'я *</Label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              className="pl-10"
              placeholder="Ваше ім'я"
            />
          </div>
          {errors.firstName && (
            <p className="text-destructive text-xs">{errors.firstName}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastName">Прізвище *</Label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              className="pl-10"
              placeholder="Ваше прізвище"
            />
          </div>
          {errors.lastName && (
            <p className="text-destructive text-xs">{errors.lastName}</p>
          )}
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">Email *</Label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            className="pl-10"
            placeholder="ваш.email@приклад.com"
          />
        </div>
        {errors.email && (
          <p className="text-destructive text-xs">{errors.email}</p>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="phone">Телефон *</Label>
        <div className="relative">
          <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            id="phone"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleInputChange}
            className="pl-10"
            placeholder="+380 XX XXX XX XX"
          />
        </div>
        {errors.phone && (
          <p className="text-destructive text-xs">{errors.phone}</p>
        )}
      </div>
    </div>
  );

  const renderShippingStep = () => (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Спосіб доставки</h3>
        <RadioGroup
          value={formData.deliveryMethod}
          onValueChange={(value) => handleRadioChange('deliveryMethod', value)}
          className="space-y-2"
        >
          <div className="flex items-center space-x-2 rounded-lg border border-border p-4">
            <RadioGroupItem value="novaposhta" id="novaposhta" />
            <Label htmlFor="novaposhta" className="flex-1 cursor-pointer">
              <div className="font-medium">Нова Пошта</div>
              <div className="text-sm text-muted-foreground">
                Доставка 1-2 робочих дні
              </div>
            </Label>
            <div className="text-right">50 ₴</div>
          </div>
          <div className="flex items-center space-x-2 rounded-lg border border-border p-4">
            <RadioGroupItem value="ukrposhta" id="ukrposhta" />
            <Label htmlFor="ukrposhta" className="flex-1 cursor-pointer">
              <div className="font-medium">Укрпошта</div>
              <div className="text-sm text-muted-foreground">
                Доставка 3-5 робочих днів
              </div>
            </Label>
            <div className="text-right">40 ₴</div>
          </div>
          <div className="flex items-center space-x-2 rounded-lg border border-border p-4">
            <RadioGroupItem value="courier" id="courier" />
            <Label htmlFor="courier" className="flex-1 cursor-pointer">
              <div className="font-medium">Кур'єр</div>
              <div className="text-sm text-muted-foreground">
                Доставка у вказаний час (лише Київ)
              </div>
            </Label>
            <div className="text-right">100 ₴</div>
          </div>
        </RadioGroup>
      </div>

      <div className="space-y-2">
        <Label htmlFor="address">Адреса *</Label>
        <div className="relative">
          <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            id="address"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            className="pl-10"
            placeholder="Вулиця, будинок, квартира"
          />
        </div>
        {errors.address && (
          <p className="text-destructive text-xs">{errors.address}</p>
        )}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="city">Місто *</Label>
          <Input
            id="city"
            name="city"
            value={formData.city}
            onChange={handleInputChange}
            placeholder="Назва міста"
          />
          {errors.city && (
            <p className="text-destructive text-xs">{errors.city}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="postalCode">Поштовий індекс *</Label>
          <Input
            id="postalCode"
            name="postalCode"
            value={formData.postalCode}
            onChange={handleInputChange}
            placeholder="Поштовий індекс"
          />
          {errors.postalCode && (
            <p className="text-destructive text-xs">{errors.postalCode}</p>
          )}
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="notes">Примітки до замовлення</Label>
        <Textarea
          id="notes"
          name="notes"
          value={formData.notes}
          onChange={handleInputChange}
          placeholder="Додаткова інформація щодо доставки"
          rows={3}
        />
      </div>
    </div>
  );

  const renderPaymentStep = () => (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Спосіб оплати</h3>
        <RadioGroup
          value={formData.paymentMethod}
          onValueChange={(value) => handleRadioChange('paymentMethod', value)}
          className="space-y-2"
        >
          <div className="flex items-center space-x-2 rounded-lg border border-border p-4">
            <RadioGroupItem value="card" id="card" />
            <Label htmlFor="card" className="flex-1 cursor-pointer">
              <div className="font-medium">Оплата карткою</div>
              <div className="text-sm text-muted-foreground">
                Visa, MasterCard, Google Pay, Apple Pay
              </div>
            </Label>
            <CreditCard className="h-5 w-5 text-muted-foreground" />
          </div>
          <div className="flex items-center space-x-2 rounded-lg border border-border p-4">
            <RadioGroupItem value="paypal" id="paypal" />
            <Label htmlFor="paypal" className="flex-1 cursor-pointer">
              <div className="font-medium">PayPal</div>
              <div className="text-sm text-muted-foreground">
                Швидка та безпечна оплата через PayPal
              </div>
            </Label>
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
              className="text-muted-foreground"
            >
              <path d="M17.001 8.9c.5 0 .9.4.9.9s-.4.9-.9.9h-10c-.5 0-.9-.4-.9-.9s.4-.9.9-.9h10Z" />
              <path d="M17.001 5.9c.5 0 .9.4.9.9s-.4.9-.9.9h-10c-.5 0-.9-.4-.9-.9s.4-.9.9-.9h10Z" />
              <path d="M8.001 11.9c-.5 0-.9.4-.9.9s.4.9.9.9h6c.5 0 .9-.4.9-.9s-.4-.9-.9-.9h-6Z" />
            </svg>
          </div>
          <div className="flex items-center space-x-2 rounded-lg border border-border p-4">
            <RadioGroupItem value="cod" id="cod" />
            <Label htmlFor="cod" className="flex-1 cursor-pointer">
              <div className="font-medium">Оплата при отриманні</div>
              <div className="text-sm text-muted-foreground">
                Готівкою або карткою при отриманні замовлення
              </div>
            </Label>
            <Truck className="h-5 w-5 text-muted-foreground" />
          </div>
        </RadioGroup>
      </div>

      {formData.paymentMethod === 'card' && (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="cardNumber">Номер картки *</Label>
            <div className="relative">
              <CreditCard className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="cardNumber"
                name="cardNumber"
                value={formData.cardNumber}
                onChange={handleInputChange}
                className="pl-10"
                placeholder="1234 5678 9012 3456"
              />
            </div>
            {errors.cardNumber && (
              <p className="text-destructive text-xs">{errors.cardNumber}</p>
            )}
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="cardExpiry">Термін дії *</Label>
              <Input
                id="cardExpiry"
                name="cardExpiry"
                value={formData.cardExpiry}
                onChange={handleInputChange}
                placeholder="MM/YY"
              />
              {errors.cardExpiry && (
                <p className="text-destructive text-xs">{errors.cardExpiry}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="cardCvc">CVC/CVV *</Label>
              <Input
                id="cardCvc"
                name="cardCvc"
                value={formData.cardCvc}
                onChange={handleInputChange}
                placeholder="123"
              />
              {errors.cardCvc && (
                <p className="text-destructive text-xs">{errors.cardCvc}</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const renderConfirmationStep = () => (
    <div className="space-y-6">
      <div className="rounded-lg border border-border p-6 space-y-4">
        <h3 className="text-lg font-medium">Особисті дані</h3>
        <Separator />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-muted-foreground">Ім'я:</p>
            <p className="font-medium">{formData.firstName} {formData.lastName}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Контакти:</p>
            <p className="font-medium">{formData.email}</p>
            <p className="font-medium">{formData.phone}</p>
          </div>
        </div>
      </div>
      
      <div className="rounded-lg border border-border p-6 space-y-4">
        <h3 className="text-lg font-medium">Доставка</h3>
        <Separator />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-muted-foreground">Спосіб доставки:</p>
            <p className="font-medium">
              {formData.deliveryMethod === 'novaposhta'
                ? 'Нова Пошта'
                : formData.deliveryMethod === 'ukrposhta'
                ? 'Укрпошта'
                : 'Кур\'єр'}
            </p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Адреса:</p>
            <p className="font-medium">{formData.address}</p>
            <p className="font-medium">{formData.city}, {formData.postalCode}</p>
          </div>
        </div>
        {formData.notes && (
          <div>
            <p className="text-sm text-muted-foreground">Примітки:</p>
            <p>{formData.notes}</p>
          </div>
        )}
      </div>
      
      <div className="rounded-lg border border-border p-6 space-y-4">
        <h3 className="text-lg font-medium">Оплата</h3>
        <Separator />
        <div>
          <p className="text-sm text-muted-foreground">Спосіб оплати:</p>
          <p className="font-medium">
            {formData.paymentMethod === 'card'
              ? 'Оплата карткою'
              : formData.paymentMethod === 'paypal'
              ? 'PayPal'
              : 'Оплата при отриманні'}
          </p>
        </div>
      </div>
      
      <div className="rounded-lg border border-border p-6 space-y-4">
        <h3 className="text-lg font-medium">Замовлення</h3>
        <Separator />
        <div className="max-h-60 overflow-y-auto space-y-4">
          {items.map((item) => (
            <div key={item.product.id} className="flex gap-4">
              <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border border-border">
                <img
                  src={item.product.images[0]}
                  alt={item.product.name}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="flex flex-col flex-1 min-w-0">
                <p className="text-sm font-medium line-clamp-1">
                  {item.product.name}
                </p>
                <p className="text-xs text-muted-foreground">
                  Кількість: {item.quantity}
                </p>
                <div className="mt-auto text-sm font-medium">
                  {item.product.price * item.quantity} ₴
                </div>
              </div>
            </div>
          ))}
        </div>
        <Separator />
        <div className="flex justify-between text-lg font-medium">
          <span>Загалом:</span>
          <span>
            {totalPrice >= 1500 ? totalPrice : totalPrice + 100} ₴
          </span>
        </div>
      </div>
      
      <div className="rounded-lg border border-primary/20 bg-primary/5 p-6">
        <p className="text-center">
          Натискаючи кнопку "Підтвердити замовлення", ви погоджуєтеся з нашими{' '}
          <Link to="/terms" className="text-primary hover:underline">
            Умовами використання
          </Link>{' '}
          та{' '}
          <Link to="/privacy-policy" className="text-primary hover:underline">
            Політикою конфіденційності
          </Link>
          .
        </p>
      </div>
    </div>
  );

  const renderStepContent = () => {
    switch (currentStep) {
      case 'details':
        return renderDetailsStep();
      case 'shipping':
        return renderShippingStep();
      case 'payment':
        return renderPaymentStep();
      case 'confirmation':
        return renderConfirmationStep();
      default:
        return null;
    }
  };

  const renderNavigationButtons = () => {
    return (
      <div className="flex justify-between mt-8">
        {currentStep !== 'details' ? (
          <Button variant="outline" onClick={prevStep} className="button-hover">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Назад
          </Button>
        ) : (
          <Button variant="outline" asChild className="button-hover">
            <Link to="/cart">
              <ArrowLeft className="mr-2 h-4 w-4" />
              До кошика
            </Link>
          </Button>
        )}
        {currentStep !== 'confirmation' ? (
          <Button onClick={nextStep} className="button-hover">
            Продовжити
          </Button>
        ) : (
          <Button onClick={placeOrder} className="button-hover">
            Підтвердити замовлення
          </Button>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-28 pb-16">
        <div className="container px-4 md:px-6">
          <div className="mb-8">
            <h1 className="text-3xl font-serif font-medium">Оформлення замовлення</h1>
          </div>

          {renderStepIndicator()}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              {renderStepContent()}
              {renderNavigationButtons()}
            </div>
            <div className="md:col-span-1">
              {renderOrderSummary()}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Checkout;
