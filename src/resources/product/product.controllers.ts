import { Request, Response, RequestParamHandler } from 'express';
import { Product, ProductStore } from './product.model';
import { getAll } from '../../utils/crud';
// const { index, create, show } = new ProductStore();
const productStore = new ProductStore();
const { show, create } = productStore;

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

async function showProductController(
  req: Request,
  res: Response
): Promise<void> {
  const { id } = req.params;

  try {
    const product = await show(id);
    res.status(200).json(product);
  } catch (err) {
    console.error(`Error fetching product ${id} from db :: ${err}`);
    res.status(500).end();
  }
}

const productControllers = {
  getProductsController: getAll(productStore),
  createProductController,
  showProductController,
};

export default productControllers;
