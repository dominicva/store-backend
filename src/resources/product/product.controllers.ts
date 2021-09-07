import ProductStore from './product.model';
import { getAll, createOne, showOne } from '../../utils/crud';

const productStore = new ProductStore();

const productControllers = {
  getProducts: getAll(productStore),
  createProduct: createOne(productStore),
  showProduct: showOne(productStore),
};

export default productControllers;
