import { Router, Request, Response } from 'express';
import {
  getProductsController,
  createProductController,
} from './product.controllers';

const router = Router();

router.route('/').get(getProductsController).post(createProductController);

export default router;
