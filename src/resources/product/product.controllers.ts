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

async function createProductController(req: Request, res: Response) {
  try {
    const product: Product = req.body;
    await create(product);
    res.status(201).end();
  } catch (err) {
    console.error(`Error posting new product to db :: ${err}`);
    res.status(500).end();
  }
}

export { getProductsController, createProductController };
