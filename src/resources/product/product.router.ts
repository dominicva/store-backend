import { Router, Request, Response } from 'express';
import {
  getProductsController,
  createProductController,
} from './product.controllers';

const router = Router();

router.get('/', getProductsController);

export default router;
