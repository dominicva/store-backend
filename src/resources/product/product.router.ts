import { Router } from 'express';
import productControllers from './product.controllers';

const { getProducts, createProduct, showProduct } = productControllers;

const router = Router();

router.route('/').get(getProducts).post(createProduct);

router.route('/:id').get(showProduct);

export default router;
