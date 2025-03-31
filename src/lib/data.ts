export type SizeVariant = {
  size: string;
  price: number;
  inStock: boolean;
};

export type Product = {
  id: string;
  name: string;
  price: number;
  category: 'curtains' | 'tulle' | 'accessories';
  subcategory?: string;
  images: string[];
  description: string;
  material?: string;
  dimensions?: string;
  care?: string;
  characteristics?: string[];
  inStock: boolean;
  isNew?: boolean;
  isFeatured?: boolean;
  discount?: number;
  sizeVariants?: SizeVariant[];
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
    id: "1",
    name: "Штори льон-блекаут",
    price: 1299,
    category: 'curtains',
    subcategory: 'Льон-Блекаут',
    images: [
      '/1.jpg',
      '/2-2.jpg'
    ],
    description: "Шторний матеріал льон-блекаут. Колір графітовий, максимальна висота 2,90м. Продаємо на метраж або шиємо під індивідуальні розміри.",
    material: "Льон-Блекаут",
    dimensions: "Ширина: 150 см, Висота: 270 см",
    care: "Делікатне прання при 30°C, не використовувати відбілювач, прасувати при низькій температурі.",
    characteristics: [
      "Матеріал: Льон-Блекаут",
      "Розміри: Ширина: 150 см, Висота: 270 см",
      "Догляд: Делікатне прання при 30°C, не використовувати відбілювач, прасувати при низькій температурі."
    ],
    inStock: true,
    isFeatured: true,
    sizeVariants: [
      { size: "150x250 см", price: 1199, inStock: true },
      { size: "200x250 см", price: 1299, inStock: true },
      { size: "300x250 см", price: 1499, inStock: true },
      { size: "400x250 см", price: 1899, inStock: false }
    ]
  },
  {
    id: "2",
    name: "Штори льон-блекаут",
    price: 1299,
    category: 'curtains',
    subcategory: 'Льон-Блекаут',
    images: [
      '/public/IMG_7124 копія.jpg',
      '/public/IMG_6613.jpg',
      '/public/7-7.jpg',
    ],
    description: "Шторний матеріал льон-блекаут. Колір коричневий, максимальна висота 2,90м. Продаємо на метраж або шиємо під індивідуальні розміри.",
    material: "Льон-Блекаут",
    dimensions: "Ширина: 150 см, Висота: 270 см",
    care: "Делікатне прання при 30°C, не використовувати відбілювач, прасувати при низькій температурі.",
    characteristics: [
      "Матеріал: Льон-Блекаут",
      "Розміри: Ширина: 150 см, Висота: 270 см",
      "Догляд: Делікатне прання при 30°C, не використовувати відбілювач, прасувати при низькій температурі."
    ],
    inStock: true,
    sizeVariants: [
      { size: "150x250 см", price: 1199, inStock: true },
      { size: "200x250 см", price: 1299, inStock: true },
      { size: "300x250 см", price: 1499, inStock: true },
      { size: "400x250 см", price: 1899, inStock: false }
    ]
  },
  {
    id: "3",
    name: "Штори льон-блекаут",
    price: 1299,
    category: 'curtains',
    subcategory: 'Льон-Блекаут',
    images: [
      '/public/3.jpg',
      '/public/3-3.jpg'
    ],
    description: "Шторний матеріал льон-блекаут. Колір бордовий, максимальна висота 2,90м. Продаємо на метраж або шиємо під індивідуальні розміри.",
    material: "Льон-Блекаут",
    dimensions: "Ширина: 150 см, Висота: 270 см",
    care: "Делікатне прання при 30°C, не використовувати відбілювач, прасувати при низькій температурі.",
    characteristics: [
      "Матеріал: Льон-Блекаут",
      "Розміри: Ширина: 150 см, Висота: 270 см",
      "Догляд: Делікатне прання при 30°C, не використовувати відбілювач, прасувати при низькій температурі."
    ],
    inStock: true,
    sizeVariants: [
      { size: "150x250 см", price: 1199, inStock: true },
      { size: "200x250 см", price: 1299, inStock: true },
      { size: "300x250 см", price: 1499, inStock: true },
      { size: "400x250 см", price: 1899, inStock: false }
    ]
  },
  {
    id: "4",
    name: "Штори льон-блекаут",
    price: 1299,
    category: 'curtains',
    subcategory: 'Льон-Блекаут',
    images: [
      '/public/4.jpg'
    ],
    description: "Шторний матеріал льон-блекаут. Колір солм'яний, максимальна висота 2,90м. Продаємо на метраж або шиємо під індивідуальні розміри.",
    material: "Льон-Блекаут",
    dimensions: "Ширина: 150 см, Висота: 270 см",
    care: "Делікатне прання при 30°C, не використовувати відбілювач, прасувати при низькій температурі.",
    characteristics: [
      "Матеріал: Льон-Блекаут",
      "Розміри: Ширина: 150 см, Висота: 270 см",
      "Догляд: Делікатне прання при 30°C, не використовувати відбілювач, прасувати при низькій температурі."
    ],
    inStock: true,
    isNew: true,
    sizeVariants: [
      { size: "150x250 см", price: 1199, inStock: true },
      { size: "200x250 см", price: 1299, inStock: true },
      { size: "300x250 см", price: 1499, inStock: true },
      { size: "400x250 см", price: 1899, inStock: false }
    ]
  },
  {
    id: "5",
    name: "Штори льон-блекаут",
    price: 1299,
    category: 'curtains',
    subcategory: 'Льон-Блекаут',
    images: [
      '/public/IMG_7115.jpg',
      '/public/11-1.jpg'
    ],
    description: "Шторний матеріал льон-блекаут. Колір бєжевий, максимальна висота 2,90м. Продаємо на метраж або шиємо під індивідуальні розміри.",
    material: "Льон-Блекаут",
    dimensions: "Ширина: 150 см, Висота: 270 см",
    care: "Делікатне прання при 30°C, не використовувати відбілювач, прасувати при низькій температурі.",
    characteristics: [
      "Матеріал: Льон-Блекаут",
      "Розміри: Ширина: 150 см, Висота: 270 см",
      "Догляд: Делікатне прання при 30°C, не використовувати відбілювач, прасувати при низькій температурі."
    ],
    inStock: true,
    isFeatured: true,
    sizeVariants: [
      { size: "150x250 см", price: 1199, inStock: true },
      { size: "200x250 см", price: 1299, inStock: true },
      { size: "300x250 см", price: 1499, inStock: true },
      { size: "400x250 см", price: 1899, inStock: false }
    ]
  },
  {
    id: "6",
    name: "Штори льон-блекаут",
    price: 1299,
    category: 'curtains',
    subcategory: 'Льон-Блекаут',
    images: [
      
      '/public/13.jpg'
    ],
    description: "Шторний матеріал льон-блекаут. Колір салатовий, максимальна висота 2,90м. Продаємо на метраж або шиємо під індивідуальні розміри.",
    material: "Льон-Блекаут",
    dimensions: "Ширина: 150 см, Висота: 270 см",
    care: "Делікатне прання при 30°C, не використовувати відбілювач, прасувати при низькій температурі.",
    characteristics: [
      "Матеріал: Льон-Блекаут",
      "Розміри: Ширина: 150 см, Висота: 270 см",
      "Догляд: Делікатне прання при 30°C, не використовувати відбілювач, прасувати при низькій температурі."
    ],
    inStock: true,
    sizeVariants: [
      { size: "150x250 см", price: 1199, inStock: true },
      { size: "200x250 см", price: 1299, inStock: true },
      { size: "300x250 см", price: 1499, inStock: true },
      { size: "400x250 см", price: 1899, inStock: false }
    ]
  },
  {
    id: "7",
    name: "Штори льон-блекаут",
    price: 1299,
    category: 'curtains',
    subcategory: 'Льон-Блекаут',
    images: [
      '/public/5.jpg',
      '/public/11111.jpg'
    ],
    description: "Шторний матеріал льон-блекаут. Колір комбіновані коричневий з бежевим, максимальна висота 2,90м. Продаємо на метраж або шиємо під індивідуальні розміри.",
    material: "Льон-Блекаут",
    dimensions: "Ширина: 150 см, Висота: 270 см",
    care: "Делікатне прання при 30°C, не використовувати відбілювач, прасувати при низькій температурі.",
    characteristics: [
      "Матеріал: Льон-Блекаут",
      "Розміри: Ширина: 150 см, Висота: 270 см",
      "Догляд: Делікатне прання при 30°C, не використовувати відбілювач, прасувати при низькій температурі."
    ],
    inStock: true,
    sizeVariants: [
      { size: "150x250 см", price: 1199, inStock: true },
      { size: "200x250 см", price: 1299, inStock: true },
      { size: "300x250 см", price: 1499, inStock: true },
      { size: "400x250 см", price: 1899, inStock: false }
    ]
  },
  {
    id: "8",
    name: "Штори льон-блекаут",
    price: 1299,
    category: 'curtains',
    subcategory: 'Льон-Блекаут',
    images: [
      '/public/16.jpg'
      
    ],
    description: "Шторний матеріал льон-блекаут. Колір комбіновані коричневий з сірим, максимальна висота 2,90м. Продаємо на метраж або шиємо під індивідуальні розміри.",
    material: "Льон-Блекаут",
    dimensions: "Ширина: 150 см, Висота: 270 см",
    care: "Делікатне прання при 30°C, не використовувати відбілювач, прасувати при низькій температурі.",
    characteristics: [
      "Матеріал: Льон-Блекаут",
      "Розміри: Ширина: 150 см, Висота: 270 см",
      "Догляд: Делікатне прання при 30°C, не використовувати відбілювач, прасувати при низькій температурі."
    ],
    inStock: true,
    isFeatured: true,
    sizeVariants: [
      { size: "150x250 см", price: 1199, inStock: true },
      { size: "200x250 см", price: 1299, inStock: true },
      { size: "300x250 см", price: 1499, inStock: true },
      { size: "400x250 см", price: 1899, inStock: false }
    ]
  },
  {
    id: "9",
    name: "Штори льон-блекаут",
    price: 1299,
    category: 'curtains',
    subcategory: 'Льон-Блекаут',
    images: [
      '/public/curtain 1.png',
      '/public/curtain2.png'
    ],
    description: "Шторний матеріал льон-блекаут. Колір графітовий, максимальна висота 2,90м. Продаємо на метраж або шиємо під індивідуальні розміри.",
    material: "Льон-Блекаут двохсторонній",
    dimensions: "Ширина: 150 см, Висота: 270 см",
    care: "Делікатне прання при 30°C, не використовувати відбілювач, прасувати при низькій температурі.",
    characteristics: [
      "Матеріал: Льон-Блекаут двохсторонній",
      "Розміри: Ширина: 150 см, Висота: 270 см",
      "Догляд: Делікатне прання при 30°C, не використовувати відбілювач, прасувати при низькій температурі."
    ],
    inStock: true,
    sizeVariants: [
      { size: "150x250 см", price: 1199, inStock: true },
      { size: "200x250 см", price: 1299, inStock: true },
      { size: "300x250 см", price: 1499, inStock: true },
      { size: "400x250 см", price: 1899, inStock: false }
    ]
  },
  {
    id: "10",
    name: "Мікровелюр",
    price: 1299,
    category: 'curtains',
    subcategory: 'Мікровелюр',
    images: [
      '/public/IMG_8391.jpg',
      '/public/mic3.jpg'
    ],
    description: "Шторний матеріал мікровелюр. Колір коричневий, максимальна висота 2,90м. Продаємо на метраж або шиємо під індивідуальні розміри.",
    material: "Мікровелюр",
    dimensions: "Ширина: 150 см, Висота: 270 см",
    care: "Делікатне прання при 30°C, не використовувати відбілювач, прасувати при низькій температурі.",
    characteristics: [
      "Матеріал: Мікровелюр",
      "Розміри: Ширина: 150 см, Висота: 270 см",
      "Догляд: Делікатне прання при 30°C, не використовувати відбілювач, прасувати при низькій температурі."
    ],
    inStock: true,
    isFeatured: true,
    sizeVariants: [
      { size: "150x250 см", price: 1199, inStock: true },
      { size: "200x250 см", price: 1299, inStock: true },
      { size: "300x250 см", price: 1499, inStock: true },
      { size: "400x250 см", price: 1899, inStock: false }
    ]
  },
  {
    id: "11",
    name: "Мікровелюр",
    price: 1299,
    category: 'curtains',
    subcategory: 'Мікровелюр',
    images: [
      '/public/IMG_8348.jpg',
      '/public/mic 2.jpg'
    ],
    description: "Шторний матеріал мікровелюр. Колір бєжевий, максимальна висота 2,90м. Продаємо на метраж або шиємо під індивідуальні розміри.",
    material: "Мікровелюр",
    dimensions: "Ширина: 150 см, Висота: 270 см",
    care: "Делікатне прання при 30°C, не використовувати відбілювач, прасувати при низькій температурі.",
    characteristics: [
      "Матеріал: Мікровелюр",
      "Розміри: Ширина: 150 см, Висота: 270 см",
      "Догляд: Делікатне прання при 30°C, не використовувати відбілювач, прасувати при низькій температурі."
    ],
    inStock: true,
    isFeatured: true,
    sizeVariants: [
      { size: "150x250 см", price: 1199, inStock: true },
      { size: "200x250 см", price: 1299, inStock: true },
      { size: "300x250 см", price: 1499, inStock: true },
      { size: "400x250 см", price: 1899, inStock: false }
    ]
  },
  {
    id: "12",
    name: "Мікровелюр",
    price: 1299,
    category: 'curtains',
    subcategory: 'Мікровелюр',
    images: [
      '/public/g1.png',
      '/public/g2.png'
    ],
    description: "Шторний матеріал мікровелюр. Колір графітовий, максимальна висота 2,90м. Продаємо на метраж або шиємо під індивідуальні розміри.",
    material: "Мікровелюр",
    dimensions: "Ширина: 150 см, Висота: 270 см",
    care: "Делікатне прання при 30°C, не використовувати відбілювач, прасувати при низькій температурі.",
    characteristics: [
      "Матеріал: Мікровелюр",
      "Розміри: Ширина: 150 см, Висота: 270 см",
      "Догляд: Делікатне прання при 30°C, не використовувати відбілювач, прасувати при низькій температурі."
    ],
    inStock: true,
    sizeVariants: [
      { size: "150x250 см", price: 1199, inStock: true },
      { size: "200x250 см", price: 1299, inStock: true },
      { size: "300x250 см", price: 1499, inStock: true },
      { size: "400x250 см", price: 1899, inStock: false }
    ]
  },
  {
    id: "13",
    name: "Тюль матеріал фатин",
    price: 799,
    category: 'tulle',
    subcategory: 'Фатин',
    images: [      
      '/public/1-1-1.jpeg',
      '/public/IMG_0870.PNG'
    ],
    description: "Тюль 'Ніжність' створений для тих, хто цінує легкість і витонченість. Напівпрозора тканина м'яко розсіює сонячне світло, створюючи затишну атмосферу в приміщенні.",
    material: "100% поліестер",
    dimensions: "Ширина: 300 см, Висота: 270 см",
    care: "Машинне прання при 30°C, не використовувати відбілювач.",
    characteristics: [
      "Матеріал: 100% поліестер",
      "Розміри: Ширина: 300 см, Висота: 270 см",
      "Догляд: Машинне прання при 30°C, не використовувати відбілювач."
    ],
    inStock: true,
    isNew: true,
    sizeVariants: [
      { size: "200x260 см", price: 699, inStock: true },
      { size: "300x260 см", price: 799, inStock: true },
      { size: "400x260 см", price: 999, inStock: true },
      { size: "500x260 см", price: 1199, inStock: true }
    ]
  },
  
  {
    id: "14",
    name: "Широка стрічка'",
    price: 15,
    category: 'accessories',
    images: [
      '/public/тасьма.jpg',
      '/public/тасьма2.png'
    ],
    description: "Шторна стрічка використовується для встановлення та пошиття гардин. Тесьма має петлі, на які здійснюється підвішування тюлі або гардини до карниза на відповідні гачки. Пришивається по всій ширині тюлі..",
    material: "Тесьма виготовлена ​​з непрозорого текстилю.",
    dimensions: "6 см (ХБ)",
    characteristics: [
      "Матеріал: Тесьма виготовлена ​​з непрозорого текстилю.",
      "Розміри: 6 см (ХБ)",
      "Легке регулювання, Підходить для штор та гардин з будь-яких матеріалів."
    ],
    inStock: true,
    sizeVariants: [
      { size: "150 см", price: 499, inStock: true },
      { size: "200 см", price: 599, inStock: true },
      { size: "250 см", price: 699, inStock: true },
      { size: "300 см", price: 799, inStock: true }
    ]
  },
  {
    id: "16",
    name: "Тюль матеріал фатин",
    price: 1599,
    category: 'tulle',
    subcategory: 'Фатин',
    images: [
      '/public/IMG_0871.jpg',
      '/public/IMG_9584.jpg'
    ],
    description: "Розкішні оксамитові штори 'Імперіал' - втілення вишуканості та комфорту. Щільна тканина забезпечує повне затемнення приміщення, а багата текстура додає інтер'єру розкішного вигляду.",
    material: "100% бавовняний оксамит",
    dimensions: "Ширина: 150 см, Висота: 270 см",
    care: "Тільки хімчистка",
    characteristics: [
      "Матеріал: 100% бавовняний оксамит",
      "Розміри: Ширина: 150 см, Висота: 270 см",
      "Догляд: Тільки хімчистка"
    ],
    inStock: true,
    isFeatured: true,
    sizeVariants: [
      { size: "150x270 см", price: 1499, inStock: true },
      { size: "200x270 см", price: 1599, inStock: true },
      { size: "300x270 см", price: 1899, inStock: true },
      { size: "400x270 см", price: 2199, inStock: false }
    ]
  },
  {
    id: "15",
    name: "Тюль матеріал фатин",
    price: 799,
    category: 'tulle',
    subcategory: 'Фатин',
    images: [      
      '/public/IMG_0869-transformed.png',
      '/public/IMG_0870.PNG'
    ],
    description: "Тюль 'Ніжність' створений для тих, хто цінує легкість і витонченість. Напівпрозора тканина м'яко розсіює сонячне світло, створюючи затишну атмосферу в приміщенні.",
    material: "100% поліестер",
    dimensions: "Ширина: 300 см, Висота: 270 см",
    care: "Машинне прання при 30°C, не використовувати відбілювач.",
    characteristics: [
      "Матеріал: 100% поліестер",
      "Розміри: Ширина: 300 см, Висота: 270 см",
      "Догляд: Машинне прання при 30°C, не використовувати відбілювач."
    ],
    inStock: true,
    sizeVariants: [
      { size: "200x260 см", price: 699, inStock: true },
      { size: "300x260 см", price: 799, inStock: true },
      { size: "400x260 см", price: 999, inStock: true },
      { size: "500x260 см", price: 1199, inStock: true }
    ]
  },
  {
    id: "17",
    name: "Жаккард під мармур",
    price: 1099,
    category: 'tulle',
    subcategory: 'Жаккард',
    images: [
      '/public/IMG_0700.jpeg',
      '/public/IMG_0661.jpg',
      '/public/video.mov'
    ],
    description: "Елегантний тюль з вишитим квітковим орнаментом. Делікатна вишивка надає виробу витонченості та унікальності.",
    material: "Поліестер з вишивкою",
    dimensions: "Ширина: 300 см, Висота: 260 см",
    care: "Делікатне прання при 30°C, не викручувати",
    characteristics: [
      "Матеріал: Поліестер з вишивкою",
      "Розміри: Ширина: 300 см, Висота: 260 см",
      "Догляд: Делікатне прання при 30°C, не викручувати"
    ],
    inStock: true,
    isNew: true,
    sizeVariants: [
      { size: "200x260 см", price: 899, inStock: true },
      { size: "300x260 см", price: 1099, inStock: true },
      { size: "400x260 см", price: 1399, inStock: true },
      { size: "500x260 см", price: 1699, inStock: false }
    ]
  },
  {
    id: "18",
    name: "Жаккард",
    price: 1099,
    category: 'tulle',
    subcategory: 'Жаккард',
    images: [
      '/public/Жакардновий 1.png',
      '/public/IMG_0978.jpg'
    ],
    description: "Елегантний тюль з вишитим квітковим орнаментом. Делікатна вишивка надає виробу витонченості та унікальності.",
    material: "Поліестер з вишивкою",
    dimensions: "Ширина: 300 см, Висота: 260 см",
    care: "Делікатне прання при 30°C, не викручувати",
    characteristics: [
      "Матеріал: Поліестер з вишивкою",
      "Розміри: Ширина: 300 см, Висота: 260 см",
      "Догляд: Делікатне прання при 30°C, не викручувати"
    ],
    inStock: true,
    sizeVariants: [
      { size: "200x260 см", price: 899, inStock: true },
      { size: "300x260 см", price: 1099, inStock: true },
      { size: "400x260 см", price: 1399, inStock: true },
      { size: "500x260 см", price: 1699, inStock: false }
    ]
  },
  {
    id: "19",
    name: "Жаккард",
    price: 1099,
    category: 'tulle',
    subcategory: 'Жаккард',
    images: [
      '/public/10 2.JPG',
      '/public/IMG_0451.jpg'
    ],
    description: "Елегантний тюль з вишитим квітковим орнаментом. Делікатна вишивка надає виробу витонченості та унікальності.",
    material: "Поліестер з вишивкою",
    dimensions: "Ширина: 300 см, Висота: 260 см",
    care: "Делікатне прання при 30°C, не викручувати",
    characteristics: [
      "Матеріал: Поліестер з вишивкою",
      "Розміри: Ширина: 300 см, Висота: 260 см",
      "Догляд: Делікатне прання при 30°C, не викручувати"
    ],
    inStock: true,
    sizeVariants: [
      { size: "200x260 см", price: 899, inStock: true },
      { size: "300x260 см", price: 1099, inStock: true },
      { size: "400x260 см", price: 1399, inStock: true },
      { size: "500x260 см", price: 1699, inStock: false }
    ]
  },
  {
    id: "20",
    name: "Жаккард",
    price: 1099,
    category: 'tulle',
    subcategory: 'Жаккард',
    images: [
      '/public/IMG_1066.jpg'
    ],
    description: "Елегантний тюль з вишитим квітковим орнаментом. Делікатна вишивка надає виробу витонченості та унікальності.",
    material: "Поліестер з вишивкою",
    dimensions: "Ширина: 300 см, Висота: 260 см",
    care: "Делікатне прання при 30°C, не викручувати",
    characteristics: [
      "Матеріал: Поліестер з вишивкою",
      "Розміри: Ширина: 300 см, Висота: 260 см",
      "Догляд: Делікатне прання при 30°C, не викручувати"
    ],
    inStock: true,
    sizeVariants: [
      { size: "200x260 см", price: 899, inStock: true },
      { size: "300x260 см", price: 1099, inStock: true },
      { size: "400x260 см", price: 1399, inStock: true },
      { size: "500x260 см", price: 1699, inStock: false }
    ]
  },
  {
    id: "21",
    name: "Льон-Бамбук",
    price: 1099,
    category: 'tulle',
    subcategory: 'Льон-Бамбук',
    images: [
      '/public/4 2.JPG'
    ],
    description: "Елегантний тюль з вишитим квітковим орнаментом. Делікатна вишивка надає виробу витонченості та унікальності.",
    material: "Поліестер з вишивкою",
    dimensions: "Ширина: 300 см, Висота: 260 см",
    care: "Делікатне прання при 30°C, не викручувати",
    characteristics: [
      "Матеріал: Поліестер з вишивкою",
      "Розміри: Ширина: 300 см, Висота: 260 см",
      "Догляд: Делікатне прання при 30°C, не викручувати"
    ],
    inStock: true,
    sizeVariants: [
      { size: "200x260 см", price: 899, inStock: true },
      { size: "300x260 см", price: 1099, inStock: true },
      { size: "400x260 см", price: 1399, inStock: true },
      { size: "500x260 см", price: 1699, inStock: false }
    ]
  },
  {
    id: "22",
    name: "Льон-Бамбук",
    price: 1099,
    category: 'tulle',
    subcategory: 'Льон-Бамбук',
    images: [
      '/public/0710.jpg'
    ],
    description: "Елегантний тюль з вишитим квітковим орнаментом. Делікатна вишивка надає виробу витонченості та унікальності.",
    material: "Поліестер з вишивкою",
    dimensions: "Ширина: 300 см, Висота: 260 см",
    care: "Делікатне прання при 30°C, не викручувати",
    characteristics: [
      "Матеріал: Поліестер з вишивкою",
      "Розміри: Ширина: 300 см, Висота: 260 см",
      "Догляд: Делікатне прання при 30°C, не викручувати"
    ],
    inStock: true,
    sizeVariants: [
      { size: "200x260 см", price: 899, inStock: true },
      { size: "300x260 см", price: 1099, inStock: true },
      { size: "400x260 см", price: 1399, inStock: true },
      { size: "500x260 см", price: 1699, inStock: false }
    ]
  },
  {
    id: "23",
    name: "Льон-Бамбук",
    price: 1099,
    category: 'tulle',
    subcategory: 'Льон-Бамбук',
    images: [
      '/public/3-3 копія.jpg',
      '/public/26(1).jpg'
    ],
    description: "Елегантний тюль з вишитим квітковим орнаментом. Делікатна вишивка надає виробу витонченості та унікальності.",
    material: "Поліестер з вишивкою",
    dimensions: "Ширина: 300 см, Висота: 260 см",
    care: "Делікатне прання при 30°C, не викручувати",
    characteristics: [
      "Матеріал: Поліестер з вишивкою",
      "Розміри: Ширина: 300 см, Висота: 260 см",
      "Догляд: Делікатне прання при 30°C, не викручувати"
    ],
    inStock: true,
    sizeVariants: [
      { size: "200x260 см", price: 899, inStock: true },
      { size: "300x260 см", price: 1099, inStock: true },
      { size: "400x260 см", price: 1399, inStock: true },
      { size: "500x260 см", price: 1699, inStock: false }
    ]
  },
  {
    id: "24",
    name: "Льон-Бамбук",
    price: 1099,
    category: 'tulle',
    subcategory: 'Льон-Бамбук',
    images: [
      '/public/IMG_1060.jpg'
    ],
    description: "Елегантний тюль з вишитим квітковим орнаментом. Делікатна вишивка надає виробу витонченості та унікальності.",
    material: "Поліестер з вишивкою",
    dimensions: "Ширина: 300 см, Висота: 260 см",
    care: "Делікатне прання при 30°C, не викручувати",
    characteristics: [
      "Матеріал: Поліестер з вишивкою",
      "Розміри: Ширина: 300 см, Висота: 260 см",
      "Догляд: Делікатне прання при 30°C, не викручувати"
    ],
    inStock: true,
    sizeVariants: [
      { size: "200x260 см", price: 899, inStock: true },
      { size: "300x260 см", price: 1099, inStock: true },
      { size: "400x260 см", price: 1399, inStock: true },
      { size: "500x260 см", price: 1699, inStock: false }
    ]
  },
  {
    id: "25",
    name: "Льон-Бамбук",
    price: 1099,
    category: 'tulle',
    subcategory: 'Льон-Бамбук',
    images: [
      '/public/8 2.JPG'
    ],
    description: "Елегантний тюль з вишитим квітковим орнаментом. Делікатна вишивка надає виробу витонченості та унікальності.",
    material: "Поліестер з вишивкою",
    dimensions: "Ширина: 300 см, Висота: 260 см",
    care: "Делікатне прання при 30°C, не викручувати",
    characteristics: [
      "Матеріал: Поліестер з вишивкою",
      "Розміри: Ширина: 300 см, Висота: 260 см",
      "Догляд: Делікатне прання при 30°C, не викручувати"
    ],
    inStock: true,
    isFeatured: true,
    sizeVariants: [
      { size: "200x260 см", price: 899, inStock: true },
      { size: "300x260 см", price: 1099, inStock: true },
      { size: "400x260 см", price: 1399, inStock: true },
      { size: "500x260 см", price: 1699, inStock: false }
    ]
  },
  {
    id: "26",
    name: "Шифон",
    price: 1099,
    category: 'tulle',
    subcategory: 'Шифон',
    images: [
      '/public/11.jpg',
      '/public/IMG_6730.jpg'
    ],
    description: "Елегантний тюль з вишитим квітковим орнаментом. Делікатна вишивка надає виробу витонченості та унікальності.",
    material: "Поліестер з вишивкою",
    dimensions: "Ширина: 300 см, Висота: 260 см",
    care: "Делікатне прання при 30°C, не викручувати",
    characteristics: [
      "Матеріал: Поліестер з вишивкою",
      "Розміри: Ширина: 300 см, Висота: 260 см",
      "Догляд: Делікатне прання при 30°C, не викручувати"
    ],
    inStock: true,
    sizeVariants: [
      { size: "200x260 см", price: 899, inStock: true },
      { size: "300x260 см", price: 1099, inStock: true },
      { size: "400x260 см", price: 1399, inStock: true },
      { size: "500x260 см", price: 1699, inStock: false }
    ]
  },
  {
    id: "27",
    name: "Льон-Бамбук",
    price: 1099,
    category: 'tulle',
    subcategory: 'Льон-Бамбук',
    images: [
      '/public/IMG301.JPG',
      '/public/IMG_9887.jpg',
      '/public/IMG_9980.jpg'
    ],
    description: "Елегантний тюль з вишитим квітковим орнаментом. Делікатна вишивка надає виробу витонченості та унікальності.",
    material: "Поліестер з вишивкою",
    dimensions: "Ширина: 300 см, Висота: 260 см",
    care: "Делікатне прання при 30°C, не викручувати",
    characteristics: [
      "Матеріал: Поліестер з вишивкою",
      "Розміри: Ширина: 300 см, Висота: 260 см",
      "Догляд: Делікатне прання при 30°C, не викручувати"
    ],
    inStock: true,
    isFeatured: true,
    sizeVariants: [
      { size: "200x260 см", price: 899, inStock: true },
      { size: "300x260 см", price: 1099, inStock: true },
      { size: "400x260 см", price: 1399, inStock: true },
      { size: "500x260 см", price: 1699, inStock: false }
    ]
  },
  {
    id: "28",
    name: "Льон",
    price: 1099,
    category: 'tulle',
    subcategory: 'Льон',
    images: [
      '/public/льон1.JPG',
      '/public/льон2.jpg',
      '/public/IMG_0420.JPG'
    ],
    description: "Елегантний тюль з вишитим квітковим орнаментом. Делікатна вишивка надає виробу витонченості та унікальності.",
    material: "Поліестер з вишивкою",
    dimensions: "Ширина: 300 см, Висота: 260 см",
    care: "Делікатне прання при 30°C, не викручувати",
    characteristics: [
      "Матеріал: Поліестер з вишивкою",
      "Розміри: Ширина: 300 см, Висота: 260 см",
      "Догляд: Делікатне прання при 30°C, не викручувати"
    ],
    inStock: true,
    sizeVariants: [
      { size: "200x260 см", price: 899, inStock: true },
      { size: "300x260 см", price: 1099, inStock: true },
      { size: "400x260 см", price: 1399, inStock: true },
      { size: "500x260 см", price: 1699, inStock: false }
    ]
  },
  {
    id: "29",
    name: "Грек-сітка",
    price: 1099,
    category: 'tulle',
    subcategory: 'Грек-сітка',
    images: [
      '/public/IMG_8158.jpg',
      '/public/IMG_8231.jpg'
    ],
    description: "Елегантний тюль з вишитим квітковим орнаментом. Делікатна вишивка надає виробу витонченості та унікальності.",
    material: "Поліестер з вишивкою",
    dimensions: "Ширина: 300 см, Висота: 260 см",
    care: "Делікатне прання при 30°C, не викручувати",
    characteristics: [
      "Матеріал: Поліестер з вишивкою",
      "Розміри: Ширина: 300 см, Висота: 260 см",
      "Догляд: Делікатне прання при 30°C, не викручувати"
    ],
    inStock: true,
    sizeVariants: [
      { size: "200x260 см", price: 899, inStock: true },
      { size: "300x260 см", price: 1099, inStock: true },
      { size: "400x260 см", price: 1399, inStock: true },
      { size: "500x260 см", price: 1699, inStock: false }
    ]
  },
  {
    id: "180",
    name: "Вузька стрічка",
    price: 15,
    category: 'accessories',
    images: [
      '/public/вузька 1.png',
      '/public/вузька 2.png'
    ],
    description: "Стрічка використовується для карнизів закритого типу, для карнизів, встановлених у стельовій ніші, якщо використовуються ламбрекени. Вузька шторна стрічка має винятково практичну функцію - кріплення штори до карнизу. Ця модель стрічки передбачає кріплення на гачки. Тесьма нашивається на верхній край штори по всій ширині, без урахування довжини карниза.",
    material: "Вузька стрічка",
    characteristics: [
      "Матеріал: Вузька стрічка",
      "Розміри: Тесьма виготовлена ​​з непрозорого текстилю.",
      "Легке регулювання, Підходить для штор та гардин з будь-яких матеріалів."
    ],
    inStock: true,
    isNew: true,
    sizeVariants: [
      { size: "Малий (2 шт)", price: 249, inStock: true },
      { size: "Середній (2 шт)", price: 299, inStock: true },
      { size: "Великий (2 шт)", price: 349, inStock: true },
      { size: "Набір (6 шт)", price: 699, inStock: true }
    ]
  },
  {
    id: "200",
    name: "Стрічка кріплення на трубу",
    price: 45,
    category: 'accessories',
    images: [
      '/public/стірчка 1.JPG',
      '/public/стрічка 2.JPG',
      '/public/стірчка 3.jpg'
    ],
    description: "Дана тасьма прозора, шириною 10см. Вона не має ниток для стягування, але є петлі шириною 4см які розташовані через 20см. Петлі одягаються на трубчатий карниз і формують глибокі, рівні складки на шторі чи гардині. Ця тасьма дозволить підкреслити фактуру та малюнок тканини і допоможе без зайвих витрат зробити вигляд готового виробу актуальним та стильним.",
    material: "Тесьма, кріплення на карниз 6 см (ХБ)",
    characteristics: [
      "Матеріал: Тесьма, кріплення на карниз 6 см (ХБ)",
      "Легкий монтаж",
      "Країна виробництва	Туреччина"
    ],
    inStock: true,
    sizeVariants: [
      { size: "Класичний", price: 399, inStock: true },
      { size: "Модерн", price: 449, inStock: true },
      { size: "Вінтаж", price: 499, inStock: true },
      { size: "Преміум", price: 599, inStock: true }
    ]
  },
  
];

export const getCategories = (): Category[] => [
  {
    id: "curtains",
    name: "Штори",
    description: "Елегантні штори",
    imageUrl: "/public/baner 2.jpg",
    featured: true
  },
  {
    id: "tulle",
    name: "Тюль",
    description: "Легкі та повітряні тюлі для сучасного інтер'єру",
    imageUrl: "/public/категорія тюль.jpg",
    featured: true
  },
  {
    id: "accessories",
    name: "Аксесуари",
    description: "Аксесуари для штор і тюлів",
    imageUrl: "/public/тасьма.jpg",
    featured: true
  }
];

export const getProductsByCategory = (category: string): Product[] => {
  return getProducts().filter(product => product.category === category);
};

export const getProductById = (id: string): Product | undefined => {
  return getProducts().find(product => product.id === id);
};

export const getFeaturedProducts = (): Product[] => {
  return getProducts().filter(product => product.isFeatured);
};

export const getNewProducts = (): Product[] => {
  return getProducts().filter(product => product.isNew);
};
