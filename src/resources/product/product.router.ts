import { Router, Request, Response } from 'express';
import {
  getProductsController,
  createProductController,
  showProductController,
} from './product.controllers';

const router = Router();

router.route('/').get(getProductsController).post(createProductController);

router.route('/:id').get(showProductController);

export default router;
