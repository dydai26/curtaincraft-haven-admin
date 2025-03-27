// routes/orders.js

import express from 'express';
import Order from '../models/order.js'; // Імпортуємо модель для замовлень

const router = express.Router();

// Створення нового замовлення
router.post('/', (req, res) => {
  const { productId, userName, userAddress, quantity, totalPrice } = req.body;

  const newOrder = new Order({
    productId,
    userName,
    userAddress,
    quantity,
    totalPrice,
  });

  newOrder.save()
    .then((order) => {
      res.status(201).json(order);
    })
    .catch((error) => {
      res.status(500).json({ message: 'Помилка збереження замовлення', error });
    });
});

export default router;
