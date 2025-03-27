import React from 'react';
import { Shield, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Separator } from '@/components/ui/separator';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const Privacy = () => {
    return (
      <div className="pt-24">
        {/* Додати Navbar (Хедер) */}
        <Navbar />
  
        <div className="max-w-4xl mx-auto mb-16">
          {/* Header section */}
          <div className="mb-10 text-center">
            <div className="inline-flex items-center justify-center p-2 bg-primary/10 rounded-full mb-4">
              <Shield className="h-6 w-6 text-primary" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Політика конфіденційності</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Ми дбаємо про безпеку ваших персональних даних. Ця політика описує, яку інформацію ми збираємо та як її використовуємо.
            </p>
          </div>
  
          <Separator className="mb-10" />
  
          {/* Content sections */}
          <div className="space-y-12">
            <PrivacySection 
              title="1. Збір інформації" 
              content={
                <div className="space-y-4">
                  <p>Ми збираємо наступні типи інформації:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Особисту інформацію, яку ви надаєте при реєстрації: ім'я, адресу електронної пошти, номер телефону та адресу доставки.</li>
                    <li>Інформацію про ваші покупки, замовлення, історію переглядів на сайті.</li>
                    <li>Технічну інформацію, включаючи IP-адресу, тип браузера, інформацію про пристрій.</li>
                    <li>Файли cookie та подібні технології для покращення вашого досвіду користування сайтом.</li>
                  </ul>
                </div>
              } 
            />
  
            <PrivacySection 
              title="2. Використання інформації" 
              content={
                <div className="space-y-4">
                  <p>Ми використовуємо зібрану інформацію для:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Обробки та виконання ваших замовлень.</li>
                    <li>Надсилання інформації про стан замовлення та доставку.</li>
                    <li>Покращення наших товарів та послуг.</li>
                    <li>Забезпечення персоналізованого досвіду покупок.</li>
                    <li>Надсилання рекламних повідомлень, якщо ви погодилися їх отримувати.</li>
                  </ul>
                </div>
              } 
            />
  
            <PrivacySection 
              title="3. Захист даних" 
              content={
                <div className="space-y-4">
                  <p>Безпека ваших даних є нашим пріоритетом:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Ми використовуємо стандартні протоколи шифрування для захисту ваших персональних даних.</li>
                    <li>Обмежуємо доступ до персональних даних тільки авторизованим працівникам.</li>
                    <li>Регулярно оновлюємо наші системи безпеки для захисту від несанкціонованого доступу.</li>
                  </ul>
                </div>
              } 
            />
  
            <PrivacySection 
              title="4. Розкриття інформації третім особам" 
              content={
                <div className="space-y-4">
                  <p>Ми можемо передавати ваші персональні дані:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Нашим партнерам з доставки для виконання замовлень.</li>
                    <li>Платіжним системам для обробки платежів.</li>
                    <li>Державним органам у випадках, передбачених законодавством.</li>
                  </ul>
                  <p>Ми не продаємо ваші персональні дані третім особам для маркетингових цілей.</p>
                </div>
              } 
            />
  
            <PrivacySection 
              title="5. Ваші права" 
              content={
                <div className="space-y-4">
                  <p>Ви маєте право:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Отримати доступ до своїх персональних даних.</li>
                    <li>Вимагати виправлення неточної інформації.</li>
                    <li>Вимагати видалення ваших даних.</li>
                    <li>Відкликати згоду на обробку персональних даних.</li>
                    <li>Подати скаргу до контролюючого органу.</li>
                  </ul>
                </div>
              } 
            />
  
            <PrivacySection 
              title="6. Зміни в політиці конфіденційності" 
              content={
                <div className="space-y-4">
                  <p>Ми можемо оновлювати цю політику конфіденційності. Останнє оновлення було здійснено 01.08.2023.</p>
                  <p>Ми рекомендуємо періодично переглядати цю сторінку для отримання останньої інформації про нашу політику конфіденційності.</p>
                </div>
              } 
            />
  
            <div className="bg-secondary/50 p-6 rounded-xl mt-8 mb-16 pb-8">
              <h3 className="text-lg font-medium mb-4">Залишились питання?</h3>
              <p className="mb-4">Якщо у вас є запитання щодо нашої політики конфіденційності, будь ласка, зв'яжіться з нами:</p>
              <div className="space-y-2">
                <p>Email: privacy@minimalist.ua</p>
                <p>Телефон: +380 (50) 123-4567</p>
                <p>Адреса: пр. Ярослава Мудрого, 33, Київ</p>
              </div>
              <div className="mt-6">
                <a 
                  href="/contact" 
                  className="inline-flex items-center text-primary hover:underline"
                >
                  Зв'язатися з нами 
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
  
        {/* Додати Footer */}
        <Footer />
      </div>
    );
  };
  
  // Privacy section component for better readability
  const PrivacySection = ({ 
    title, 
    content 
  }: { 
    title: string; 
    content: React.ReactNode 
  }) => {
    return (
      <section className="space-y-4">
        <h2 className="text-xl md:text-2xl font-medium">{title}</h2>
        <div className="text-muted-foreground">
          {content}
        </div>
      </section>
    );
  };
  
  export default Privacy;