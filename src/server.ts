import express from 'express';
import { json } from 'body-parser';
import morgan from 'morgan';

const PORT = 3000;

const app = express();

app.use(json());
app.use(morgan('dev'));

app.listen(3000, () => console.log(`Server running on port ${PORT}`));
