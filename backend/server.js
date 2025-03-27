import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';  // Імпортуємо cors
import reviewsRouter from './routes/reviews.js';
import ordersRouter from './routes/orders.js';
import Review from './models/review.js';  // Імпортуємо модель для відгуків

// Завантажуємо змінні середовища з .env
dotenv.config({ path: './.env' });

// Перевірка наявності MONGO_URI в .env
const mongoUri = process.env.MONGO_URI;
if (!mongoUri) {
  console.error('Помилка: MONGO_URI не знайдено в .env файлі');
  process.exit(1); // Зупинити сервер, якщо MONGO_URI відсутній
}

// Підключення до MongoDB
mongoose.connect(mongoUri)
  .then(() => console.log('MongoDB підключено'))
  .catch((error) => console.error('Помилка підключення до MongoDB', error));

const app = express();
const PORT = process.env.PORT || 5000;

// Додаємо CORS перед іншими маршрутизаторами
app.use(cors());  // Це дозволяє доступ до API з різних доменів

// Налаштовуємо Express для обробки JSON запитів
app.use(express.json());

// Маршрути
app.use('/api/reviews', reviewsRouter); // Роут для відгуків
app.use('/api/orders', ordersRouter); // Роут для замовлень

// Маршрут для отримання всіх відгуків
app.get('/api/reviews', async (req, res) => {
  try {
    const reviews = await Review.find(); // Отримуємо всі відгуки з бази
    res.json(reviews); // Відправляємо відгуки у відповідь
  } catch (error) {
    res.status(500).json({ message: 'Не вдалося отримати відгуки', error });
  }
});

// Тестовий маршрут
app.get('/', (req, res) => {
  res.send('Hello from the server!');
});

// Запуск серверу
app.listen(PORT, () => {
  console.log(`Сервер працює на порті ${PORT}`);
});
