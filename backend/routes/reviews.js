// routes/reviews.js

import express from 'express';
import Review from '../models/review.js'; // Імпортуємо модель для відгуків

const router = express.Router();

// Створення нового відгуку
router.post('/', (req, res) => {
  const { productId, reviewText, userName } = req.body;

  const newReview = new Review({
    productId,
    reviewText,
    userName,
  });

  newReview.save()
    .then((review) => {
      res.status(201).json(review);
    })
    .catch((error) => {
      res.status(500).json({ message: 'Помилка збереження відгуку', error });
    });
});

// Отримання всіх відгуків для певного продукту
router.get('/', (req, res) => {
  const { productId } = req.query; // передаємо productId через query параметр

  Review.find({ productId })
    .then((reviews) => {
      res.status(200).json(reviews);
    })
    .catch((error) => {
      res.status(500).json({ message: 'Помилка завантаження відгуків', error });
    });
});

export default router;
