import React, { useEffect, useRef } from 'react';
import { CreditCard, Truck, Package, Repeat, Clock, ShieldCheck, BadgeInfo } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const PaymentDelivery = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);


  return (
    <div className="min-h-screen pt-24  ">
      <Navbar />
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Hero Section */}
        <section className="text-center space-y-6 animate-fade-in">
          <div className="space-y-2">
            <span className="chip">Інформація</span>
            <h1 className="text-4xl md:text-5xl font-medium tracking-tight">
              Оплата і доставка
            </h1>
          </div>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Ми пропонуємо зручні способи оплати та швидку доставку по всій Україні. 
            Дізнайтеся більше про наші умови та процеси.
          </p>
        </section>

        {/* Main Content with Tabs */}
        <section className="animate-fade-in" style={{ animationDelay: "0.2s" }}>
          <Tabs defaultValue="payment" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="payment" className="text-base py-3">Оплата</TabsTrigger>
              <TabsTrigger value="delivery" className="text-base py-3">Доставка</TabsTrigger>
            </TabsList>
            
            {/* Payment Tab */}
            <TabsContent value="payment" className="mt-6 space-y-10">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <PaymentMethodCard 
                  icon={<CreditCard className="h-8 w-8 text-primary" />}
                  title="Банківська карта"
                  description="Оплатіть замовлення онлайн за допомогою кредитної або дебетової карти."
                  delay={0}
                />
                <PaymentMethodCard 
                  icon={<Package className="h-8 w-8 text-primary" />}
                  title="Накладений платіж"
                  description="Оплатіть замовлення при отриманні у відділенні або кур'єру."
                  delay={0.1}
                />
                <PaymentMethodCard 
                  icon={<Repeat className="h-8 w-8 text-primary" />}
                  title="Банківський переказ"
                  description="Оплатіть замовлення через банківський переказ по реквізитах."
                  delay={0.2}
                />
              </div>
              
              <div className="pt-4">
                <h3 className="text-2xl font-medium mb-6">Часті запитання про оплату</h3>
                <PaymentFAQ />
              </div>
            </TabsContent>
            
            {/* Delivery Tab */}
            <TabsContent value="delivery" className="mt-6 space-y-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <DeliveryMethodCard 
                  icon={<Package className="h-8 w-8 text-primary" />}
                  title="Нова Пошта"
                  description="Доставка у відділення Нової Пошти по всій Україні."
                  time="1-2 робочих дні"
                  price="За тарифами перевізника"
                  delay={0}
                />
                <DeliveryMethodCard 
                  icon={<Truck className="h-8 w-8 text-primary" />}
                  title="Укрпошта"
                  description="Доставка у відділення Укрпошти по всій Україні."
                  time="3-5 робочих днів"
                  price="За тарифами перевізника"
                  delay={0.1}
                />
                <DeliveryMethodCard 
                  icon={<Truck className="h-8 w-8 text-primary" />}
                  title="Кур'єрська доставка"
                  description="Доставка кур'єром за вашою адресою у більшості великих міст."
                  time="1-2 робочих дні"
                  price="100-200 грн залежно від міста"
                  delay={0.2}
                />
                
              </div>
              
              <div className="pt-4">
                <h3 className="text-2xl font-medium mb-6">Часті запитання про доставку</h3>
                <DeliveryFAQ />
              </div>
            </TabsContent>
          </Tabs>
        </section>
        
        {/* Additional Info Section */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8 animate-fade-in mb-16 !mb-16" style={{ animationDelay: "0.4s" }}>
  <InfoCard 
    icon={<ShieldCheck className="h-8 w-8 text-primary" />}
    title="Безпечна оплата"
    description="Усі транзакції захищені за допомогою SSL шифрування для вашої безпеки."
  />
  <InfoCard 
    icon={<Clock className="h-8 w-8 text-primary" />}
    title="Швидка обробка"
    description="Ми обробляємо ваше замовлення протягом 24 годин після отримання оплати."
  />
  <InfoCard 
    icon={<BadgeInfo className="h-8 w-8 text-primary" />}
    title="Підтримка 24/7"
    description="Наша команда підтримки завжди готова відповісти на ваші запитання."
  />
</section>
      </div>
      <Footer />
    </div>
  );
};

// Component for Payment Method Cards
const PaymentMethodCard = ({ 
  icon, 
  title, 
  description,
  delay = 0
}: { 
  icon: React.ReactNode; 
  title: string; 
  description: string;
  delay?: number;
}) => {
  return (
    <div 
      className="card-glass p-6 hover:shadow-md hover:scale-[1.01] animate-scale-in"
      style={{ animationDelay: `${delay}s` }}
    >
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-medium mb-2">{title}</h3>
      <p className="text-muted-foreground text-sm">{description}</p>
    </div>
  );
};

// Component for Delivery Method Cards
const DeliveryMethodCard = ({ 
  icon, 
  title, 
  description, 
  time, 
  price,
  delay = 0
}: { 
  icon: React.ReactNode; 
  title: string; 
  description: string; 
  time: string; 
  price: string;
  delay?: number;
}) => {
  return (
    <div 
      className="card-glass p-6 hover:shadow-md hover:scale-[1.01] animate-scale-in"
      style={{ animationDelay: `${delay}s` }}
    >
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-medium mb-2">{title}</h3>
      <p className="text-muted-foreground text-sm mb-4">{description}</p>
      <div className="grid grid-cols-2 gap-2 text-sm">
        <div>
          <p className="text-muted-foreground">Термін доставки:</p>
          <p className="font-medium">{time}</p>
        </div>
        <div>
          <p className="text-muted-foreground">Вартість:</p>
          <p className="font-medium">{price}</p>
        </div>
      </div>
    </div>
  );
};

// Info Card Component
const InfoCard = ({ 
  icon, 
  title, 
  description 
}: { 
  icon: React.ReactNode; 
  title: string; 
  description: string;
}) => {
  return (
    <div className="card-glass p-6 text-center">
      <div className="flex justify-center mb-4">{icon}</div>
      <h3 className="text-lg font-medium mb-2">{title}</h3>
      <p className="text-muted-foreground text-sm">{description}</p>
    </div>
  );
};

// Payment FAQ Component
const PaymentFAQ = () => {
  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger>Які способи оплати ви приймаєте?</AccordionTrigger>
        <AccordionContent>
          Ми приймаємо оплату банківськими картами (Visa, Mastercard), через банківський переказ та накладеним платежем при отриманні.
        </AccordionContent>
        </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Чи безпечно оплачувати онлайн?</AccordionTrigger>
        <AccordionContent>
          Так, всі оплати проходять через захищене SSL-з'єднання. Ми не зберігаємо дані вашої карти.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Як отримати фіскальний чек?</AccordionTrigger>
        <AccordionContent>
          Фіскальний чек надсилається на вашу електронну пошту після оплати замовлення. 
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

// Delivery FAQ Component
const DeliveryFAQ = () => {
  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger>Як відстежити моє замовлення?</AccordionTrigger>
        <AccordionContent>
          Після відправлення замовлення ви отримаєте ТТН з номером для відстеження. Також ви можете перевірити статус у вашому особистому кабінеті перевізника.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Скільки коштує доставка?</AccordionTrigger>
        <AccordionContent>
          Вартість доставки залежить від обраного способу та міста. Доставка Новою Поштою та Укрпоштою оплачується за тарифами перевізника. Самовивіз з нашого офісу в Києві безкоштовний.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Як довго триватиме доставка?</AccordionTrigger>
        <AccordionContent>
          Термін доставки залежить від обраного способу. Нова Пошта - 1-2 робочих дні, Укрпошта - 3-5 робочих днів, кур'єрська доставка - 1-2 робочих дні.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-4">
        <AccordionTrigger>Чи доставляєте ви за кордон?</AccordionTrigger>
        <AccordionContent>
          Так, ми здійснюємо міжнародну доставку. Вартість та терміни залежать від країни призначення. Для отримання детальної інформації, будь ласка, зв'яжіться з нашою службою підтримки.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default PaymentDelivery;
