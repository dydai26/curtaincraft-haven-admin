
export type Product = {
  id: number;
  name: string;
  price: number;
  category: 'curtains' | 'tulle' | 'accessories';
  subcategory?: string;
  images: string[];
  description: string;
  material?: string;
  dimensions?: string;
  care?: string;
  features?: string[];
  inStock: boolean;
  isNew?: boolean;
  isFeatured?: boolean;
  discount?: number;
};

export type Category = {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  featured?: boolean;
};

export const getProducts = (): Product[] => [
  {
    id: 1,
    name: "Елегантні штори 'Венеція'",
    price: 1299,
    category: 'curtains',
    subcategory: 'Класичні',
    images: [
      'https://images.unsplash.com/photo-1585412727339-54e4bae3bbf9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1636742794236-7fbfad6262a6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
    ],
    description: "Розкішні штори 'Венеція' додадуть елегантності та витонченості вашому інтер'єру. Виготовлені з високоякісного жакардового матеріалу, ці штори забезпечують відмінну звукоізоляцію та захист від сонячних променів.",
    material: "100% поліестер, жакардове плетіння",
    dimensions: "Ширина: 150 см, Висота: 270 см",
    care: "Делікатне прання при 30°C, не використовувати відбілювач, прасувати при низькій температурі.",
    features: ["Звукоізоляція", "Захист від УФ-променів", "Термоізоляція"],
    inStock: true,
    isFeatured: true,
  },
  {
    id: 2,
    name: "Тюль 'Ніжність'",
    price: 799,
    category: 'tulle',
    images: [
      'https://images.unsplash.com/photo-1513161455079-7dc1de15ef3e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1596162954151-cdcb4c0f70ab?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
    ],
    description: "Тюль 'Ніжність' створений для тих, хто цінує легкість і витонченість. Напівпрозора тканина м'яко розсіює сонячне світло, створюючи затишну атмосферу в приміщенні.",
    material: "100% поліестер",
    dimensions: "Ширина: 300 см, Висота: 270 см",
    care: "Машинне прання при 30°C, не використовувати відбілювач.",
    features: ["Легке драпірування", "Стійкість до вигорання", "Гіпоалергенний матеріал"],
    inStock: true,
    isNew: true,
  },
  {
    id: 3,
    name: "Карниз 'Модерн'",
    price: 599,
    category: 'accessories',
    images: [
      'https://images.unsplash.com/photo-1575414003553-1d9824670d12?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
    ],
    description: "Сучасний карниз з мінімалістичним дизайном. Ідеально підходить для створення легкого і стильного образу в інтер'єрі.",
    material: "Алюміній з матовим покриттям",
    dimensions: "Довжина: 200 см, Діаметр: 2.5 см",
    features: ["Легкий монтаж", "Витримує до 15 кг", "Безшумне ковзання"],
    inStock: true,
  },
  {
    id: 4,
    name: "Оксамитові штори 'Імперіал'",
    price: 1599,
    category: 'curtains',
    subcategory: 'Преміум',
    images: [
      'https://images.unsplash.com/photo-1581783342308-f792dbdd27c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
    ],
    description: "Розкішні оксамитові штори 'Імперіал' - втілення вишуканості та комфорту. Щільна тканина забезпечує повне затемнення приміщення, а багата текстура додає інтер'єру розкішного вигляду.",
    material: "100% бавовняний оксамит",
    dimensions: "Ширина: 150 см, Висота: 270 см",
    care: "Тільки хімчистка",
    features: ["Повне затемнення", "Звукоізоляція", "Термоізоляція"],
    inStock: true,
    isFeatured: true,
  },
  {
    id: 5,
    name: "Вишитий тюль 'Флора'",
    price: 1099,
    category: 'tulle',
    images: [
      'https://images.unsplash.com/photo-1574879948818-1cfda7aa5b1a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
    ],
    description: "Елегантний тюль з вишитим квітковим орнаментом. Делікатна вишивка надає виробу витонченості та унікальності.",
    material: "Поліестер з вишивкою",
    dimensions: "Ширина: 300 см, Висота: 260 см",
    care: "Делікатне прання при 30°C, не викручувати",
    features: ["Елегантна вишивка", "Легке драпірування", "Стійкість до вигорання"],
    inStock: true,
    isFeatured: true,
  },
  {
    id: 6,
    name: "Магнітні зажими для штор",
    price: 299,
    category: 'accessories',
    images: [
      'https://images.unsplash.com/photo-1601628828688-632f38a5a7d0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
    ],
    description: "Стильні магнітні зажими для елегантної фіксації штор. Доповнять інтер'єр і зроблять його більш вишуканим.",
    material: "Метал з матовим покриттям",
    features: ["Потужні магніти", "Не пошкоджують тканину", "Легке регулювання"],
    inStock: true,
    isNew: true,
  },
  {
    id: 7,
    name: "Льняні штори 'Прованс'",
    price: 1199,
    category: 'curtains',
    subcategory: 'Натуральні',
    images: [
      'https://images.unsplash.com/photo-1615529162924-f8605388461d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
    ],
    description: "Натуральні льняні штори в стилі Прованс. Екологічно чистий матеріал, який створює атмосферу затишку та спокою.",
    material: "100% льон",
    dimensions: "Ширина: 145 см, Висота: 270 см",
    care: "Прання при 40°C, можливо легке зсідання",
    features: ["Екологічно чисті", "Натуральне повітропроникнення", "Антистатичні"],
    inStock: true,
  },
  {
    id: 8,
    name: "Легкий тюль 'Хмаринка'",
    price: 699,
    category: 'tulle',
    images: [
      'https://images.unsplash.com/photo-1543377950-dd5c1416db32?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
    ],
    description: "Надзвичайно легкий і повітряний тюль, який створює ефект 'хмаринки' у вашому інтер'єрі. Ідеально підходить для створення романтичної атмосфери.",
    material: "Ультратонкий поліестер",
    dimensions: "Ширина: 300 см, Висота: 280 см",
    care: "Делікатне прання при 30°C",
    features: ["Ультралегкий", "Висока повітропроникність", "Ефект 'хмаринки'"],
    inStock: true,
  },
  {
    id: 9,
    name: "Комплект тримачів для штор",
    price: 399,
    category: 'accessories',
    images: [
      'https://images.unsplash.com/photo-1631509493202-3b0d40ce7c67?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
    ],
    description: "Елегантні тримачі для штор зі стильним дизайном. Допоможуть красиво зафіксувати штори та надати інтер'єру завершеності.",
    material: "Метал з декоративними елементами",
    features: ["Легкий монтаж", "Стильний дизайн", "Універсальне кріплення"],
    inStock: true,
  },
  {
    id: 10,
    name: "Штори блекаут 'Місячна ніч'",
    price: 1399,
    category: 'curtains',
    subcategory: 'Блекаут',
    images: [
      'https://images.unsplash.com/photo-1605774337664-7a846e9cdf17?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
    ],
    description: "Штори з ефектом повного затемнення 'Місячна ніч'. Ідеальне рішення для спальні або домашнього кінотеатру.",
    material: "Трьохшаровий блекаут",
    dimensions: "Ширина: 150 см, Висота: 270 см",
    care: "Машинне прання при 30°C, прасування при низькій температурі",
    features: ["100% затемнення", "Звукоізоляція", "Енергозбереження"],
    inStock: true,
    isFeatured: true,
  }
];

export const getCategories = (): Category[] => [
  {
    id: "curtains",
    name: "Штори",
    description: "Широкий вибір штор різних стилів та матеріалів",
    imageUrl: "https://images.unsplash.com/photo-1581783342308-f792dbdd27c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
    featured: true
  },
  {
    id: "tulle",
    name: "Тюль",
    description: "Легкі та повітряні тюлі для сучасного інтер'єру",
    imageUrl: "https://images.unsplash.com/photo-1513161455079-7dc1de15ef3e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
    featured: true
  },
  {
    id: "accessories",
    name: "Аксесуари",
    description: "Карнизи, зажими та інші аксесуари для штор і тюлів",
    imageUrl: "https://images.unsplash.com/photo-1575414003553-1d9824670d12?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
    featured: true
  }
];

export const getProductsByCategory = (category: string): Product[] => {
  return getProducts().filter(product => product.category === category);
};

export const getProductById = (id: number): Product | undefined => {
  return getProducts().find(product => product.id === id);
};

export const getFeaturedProducts = (): Product[] => {
  return getProducts().filter(product => product.isFeatured);
};

export const getNewProducts = (): Product[] => {
  return getProducts().filter(product => product.isNew);
};
