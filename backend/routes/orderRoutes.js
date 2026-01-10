import express from "express";
import {
  addOrderItems,
  getMyOrders,
  updateOrderToDelivered,
  updateOrderToPaid,
  updateOrderToShipped,
  getAllOrders,
  getOrderById,
} from "../controllers/orderController.js";
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').post(protect, addOrderItems).get(protect, admin, getAllOrders);
router.route('/mine').get(protect, getMyOrders);
router.route('/:id').get(protect, admin, getOrderById);
router.route('/:id/pay').put(protect, updateOrderToPaid);
router.route('/:id/ship').put(protect, admin, updateOrderToShipped);
router.route('/:id/deliver').put(protect, admin, updateOrderToDelivered);

export default router;



