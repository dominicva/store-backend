import { Request, Response } from 'express';
import { Product, ProductStore } from './product.model';

const { index, create } = new ProductStore();

async function getProductsController(req: Request, res: Response) {
  try {
    const products = await index();
    res.status(200).json(products);
  } catch (err) {
    console.error(`Error getting products from db :: ${err}`);
    res.status(500).end();
  }
}
