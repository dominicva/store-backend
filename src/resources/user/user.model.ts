import client from '../../db';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
dotenv.config();

const { PEPPER, SALT_ROUNDS } = process.env;

type User = {
  firstName: string;
  lastName: string;
  password: string;
};

interface UserStore {
  tableName: string;
}

class UserStore {
  constructor() {
    this.tableName = 'users';
  }

  async index(): Promise<User[]> {
    try {
      const conn = await client.connect();
      const sql = 'SELECT * FROM users';

      const result = await conn.query(sql);

      conn.release();
      return result.rows;
    } catch (error) {
      throw new Error(`Cannot get users :: ${error}`);
    }
  }

  async show(id: string): Promise<User> {
    try {
      const conn = await client.connect();

      const sql = 'SELECT * FROM users WHERE id=($1)';

      const result = await conn.query(sql, [id]);

      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Unable to find user ${id}. Error: ${err}`);
    }
  }

  async create(u: User): Promise<void> {
    try {
      const { firstName, lastName, password } = u;
      const conn = await client.connect();

      const sql = `INSERT INTO users 
          (
            first_name, 
            last_name, 
            password, 
          ) 
          VALUES ($1, $2, $3) RETURNING *`;

      const hash = bcrypt.hashSync(`${password}${PEPPER}`, Number(SALT_ROUNDS));

      const result = await conn.query(sql, [firstName, lastName, hash]);
      const user = result.rows[0];

      conn.release();
      return user;
    } catch (err) {
      throw new Error(`Unable to create user :: ${err}`);
    }
  }

  async authenticate(
    firstName: string,
    lastName: string,
    password: string
  ): Promise<User | null> {
    const conn = await client.connect();
    const sql =
      'SELECT password FROM users WHERE first_name=($1) AND last_name=($2)';

    const result = await conn.query(sql, [lastName, firstName]);

    conn.release();

    if (result.rows.length) {
      const user = result.rows[0];

      if (bcrypt.compareSync(password + PEPPER, user.password)) {
        return user;
      }
    }
    return null;
  }
}

export { User, UserStore };
