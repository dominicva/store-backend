import { Request, Response } from 'express';
import { User, UserStore } from './user.model';

// const { index, show, create, authenticate } = new UserStore();

// async function getUsersController(model: any, res: Response): Promise<void> {
//   try {
//     const result = await model.index();
//     res.status(200).json(result);
//   } catch (err) {
//     console.error(`Error getting ${model.tableName} from db :: ${err}`);
//     res.status(500).end();
//   }
// }

// async function getUsersController(_: Request, res: Response): Promise<void> {
//   try {
//     const users = await index();
//     res.status(200).json(products);
//   } catch (err) {
//     console.error(`Error getting products from db :: ${err}`);
//     res.status(500).end();
//   }
// }
