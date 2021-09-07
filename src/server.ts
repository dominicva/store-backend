import express, { Request, Response } from 'express';
import { json } from 'body-parser';
import morgan from 'morgan';
import productsRouter from './resources/product/product.router';
import usersRouter from './resources/user/user.router';

const PORT = 3000;

const app = express();

app.use(json());
app.use(morgan('dev'));

app.use('/products', productsRouter);
app.use('/users', usersRouter);

app.listen(3000, () => console.log(`Server running on port ${PORT}`));
