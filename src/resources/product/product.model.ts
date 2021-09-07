import client from '../../db';
import Store from '../../utils/Store';

type Product = {
  name: string;
  category: string;
  previous_owner: string;
  weight: number;
  price: number;
};

class ProductStore extends Store {
  constructor() {
    super('products');
  }

  async index(): Promise<Product[]> {
    try {
      const conn = await client.connect();
      const sql = 'SELECT * FROM products';

      const result = await conn.query(sql);

      conn.release();
      return result.rows;
    } catch (error) {
      throw new Error(`Cannot get products :: ${error}`);
    }
  }

  async create(p: Product): Promise<Product> {
    try {
      const { name, category, previous_owner, weight, price } = p;
      const conn = await client.connect();

      const sql = `INSERT INTO products 
          (
            name, 
            category, 
            previous_owner, 
            weight, 
            price
          ) 
          VALUES ($1, $2, $3, $4, $5) RETURNING *`;

      const result = await conn.query(sql, [
        name,
        category,
        previous_owner,
        weight,
        price,
      ]);
      const product: Product = result.rows[0];

      conn.release();
      return product;
    } catch (error) {
      throw new Error(`Cannot add product to db :: ${error}`);
    }
  }

  async show(id: string): Promise<Product> {
    try {
      const conn = await client.connect();

      const sql = 'SELECT * FROM products WHERE id=($1)';

      const result = await conn.query(sql, [id]);

      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not find product ${id}. Error: ${err}`);
    }
  }
}

export { Product, ProductStore };
