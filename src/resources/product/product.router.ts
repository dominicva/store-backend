import { Router } from 'express';
// import {
//   getProductsController,
//   createProductController,
//   showProductController,
// } from './product.controllers';
import productControllers from './product.controllers';

const {
  getProductsController,
  createProductController,
  showProductController,
} = productControllers;

const router = Router();

router.route('/').get(getProductsController).post(createProductController);

router.route('/:id').get(showProductController);

export default router;
