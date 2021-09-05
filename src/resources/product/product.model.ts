import client from '../../db';

type Product = {
  name: string;
  category: string;
  previous_owner: string;
  weight: number;
  price: number;
};

class ProductStore {
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

  async create(product: Product): Promise<void> {
    try {
      const { name, category, previous_owner, weight, price } = product;
      const conn = await client.connect();

      const sql = `INSERT INTO products 
          (
            name, 
            category, 
            previous_owner, 
            weight, 
            price
          ) 
          VALUES ($1, $2, $3, $4, $5)`;

      await conn.query(sql, [name, category, previous_owner, weight, price]);

      conn.release();
      return;
    } catch (error) {
      throw new Error(`Cannot add product to db :: ${error}`);
    }
  }
}

export { Product, ProductStore };
