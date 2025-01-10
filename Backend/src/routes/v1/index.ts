import { Router } from 'express';
// import userRoutes from './userRoutes';
// import orderRoutes from './orderRoutes';
import authRoutes from './authRoutes';
const router = Router();

router.use('/auth',authRoutes);
// router.use('/orders', orderRoutes);

export default router;