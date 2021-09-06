import { Request, Response } from 'express';
import { Product, ProductStore } from './product.model';

const { index, create, show } = new ProductStore();

async function getProductsController(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const products = await index();
    res.status(200).json(products);
  } catch (err) {
    console.error(`Error getting products from db :: ${err}`);
    res.status(500).end();
  }
}

async function createProductController(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const product: Product = req.body;
    const newProduct = await create(product);
    console.log(newProduct);
    res.status(201).json({ data: newProduct });
  } catch (err) {
    console.error(`Error posting new product to db :: ${err}`);
    res.status(500).end();
  }
}

async function showProductController(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const product = await show(id);
    res.status(200).json(product);
  } catch (err) {
    console.error(`Error fetching product ${id} from db :: ${err}`);
    res.status(500).end();
  }
}

export {
  getProductsController,
  createProductController,
  showProductController,
};
