
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const About = () => {
  return (
    <div>
      <Navbar />
      <div className="container mx-auto p-4">
        {/* Тайтл сторінки */}
        <h1 className="text-3xl mt-24 mb-10 font-semibold mb-8 text-center">Про нас</h1>

        {/* Контейнер для фото та тексту */}
        <div className="flex flex-col md:flex-row items-center gap-8 mb-12" >
          {/* Ліва частина з фото */}
          <div className="w-full md:w-1/2">
            {/* Тут вставте своє фото */}
            <img src="/public/baner 2.JPG" alt="About us" className="w-[600px] h-auto rounded-lg shadow-lg" />
          </div>

          {/* Права частина з текстом */}
          <div className="w-full md:w-1/2">
            <p className="text-lg leading-relaxed">
              Привіт! Ми молода команда, яка прагне зробити ваш простір стильним та комфортним, оскільки гарний інтер'єр — це запорука гарного самопочуття та відмінного настрою на весь день.
            </p>
            <p className="mt-4 text-lg leading-relaxed">
              Ми пропонуємо тюлі та штори від Турецьких виробників. Продаємо на метраж або шиємо під індивідуальні розміри.
            </p>
            <p className="mt-4 text-lg leading-relaxed">
              Наші фахівці завжди готові надати консультацію та допомогти у виборі тканин і виробів, що підходять саме вам.
            </p>
            <p className="mt-4 text-lg leading-relaxed">
              За роки роботи у нас з'явилися десятки тисяч вдячних покупців, які регулярно користуються нашими послугами.
            </p>
            <p className="mt-4 text-lg leading-relaxed">
              Ми знаходимося у Львові, але здійснюємо доставку по всій Україні.
            </p>
            <p className="mt-4 text-lg font-semibold">
              Приємних покупок!
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default About;
