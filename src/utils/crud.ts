import { Request, Response } from 'express';

function getAll(model: any) {
  return async function getAllController(
    _: Request,
    res: Response
  ): Promise<void> {
    try {
      const result = await model.index();
      res.status(200).json(result);
    } catch (err) {
      console.error(`Error getting ${model.tableName} from db :: ${err}`);
      res.status(500).end();
    }
  };
}

function createOne(model: any) {
  return async function createOneController(req: Request, res: Response) {
    try {
      const data = req.body;
      const newResource = await model.create(data);
      console.log(newResource);
      res.status(201).json({ data: newResource });
    } catch (err) {
      console.error(
        `Error creating new resource in ${model.tableName} table :: ${err}`
      );
      res.status(500).end();
    }
  };
}

export { getAll, createOne };
// import client from '../db';
// // import { Product } from '../resources/product/product.model';
// // import { User } from '../resources/user/user.model';
// export const getOne = (model) => async (req, res) => {
//   try {
//     const doc = await model
//       .findOne({ createdBy: req.user._id, _id: req.params.id })
//       .lean()
//       .exec();

//     if (!doc) {
//       return res.status(400).end();
//     }

//     res.status(200).json({ data: doc });
//   } catch (e) {
//     console.error(e);
//     res.status(400).end();
//   }
// };

// export const getMany = (model) => async (req, res) => {
//   try {
//     const docs = await model.find({ createdBy: req.user._id }).lean().exec();

//     res.status(200).json({ data: docs });
//   } catch (e) {
//     console.error(e);
//     res.status(400).end();
//   }
// };

// export const createOne = (model) => async (req, res) => {
//   const createdBy = req.user._id;
//   try {
//     const doc = await model.create({ ...req.body, createdBy });
//     res.status(201).json({ data: doc });
//   } catch (e) {
//     console.error(e);
//     res.status(400).end();
//   }
// };

// export const updateOne = (model) => async (req, res) => {
//   try {
//     const updatedDoc = await model
//       .findOneAndUpdate(
//         {
//           createdBy: req.user._id,
//           _id: req.params.id,
//         },
//         req.body,
//         { new: true }
//       )
//       .lean()
//       .exec();

//     if (!updatedDoc) {
//       return res.status(400).end();
//     }

//     res.status(200).json({ data: updatedDoc });
//   } catch (e) {
//     console.error(e);
//     res.status(400).end();
//   }
// };

// export const removeOne = (model) => async (req, res) => {
//   try {
//     const removed = await model.findOneAndRemove({
//       createdBy: req.user._id,
//       _id: req.params.id,
//     });

//     if (!removed) {
//       return res.status(400).end();
//     }

//     return res.status(200).json({ data: removed });
//   } catch (e) {
//     console.error(e);
//     res.status(400).end();
//   }
// };

// export const crudControllers = (model) => ({
//   removeOne: removeOne(model),
//   updateOne: updateOne(model),
//   getMany: getMany(model),
//   getOne: getOne(model),
//   createOne: createOne(model),
// });

// // class Crud<ModelType> {
// //   async index(): Promise<ModelType[]> {
// //     try {
// //       const conn = await client.connect();
// //       const sql = 'SELECT * FROM users';

// //       const result = await conn.query(sql);

// //       conn.release();
// //       return result.rows;
// //     } catch (error) {
// //       throw new Error(`Cannot get users :: ${error}`);
// //     }
// //   }

// //   async create(resource: ModelType): Promise<void> {
// //     try {
// //       const { firstName, lastName, password } = resource;
// //       const conn = await client.connect();

// //       const sql = `INSERT INTO users
// //           (
// //             first_name,
// //             last_name,
// //             password,
// //           )
// //           VALUES ($1, $2, $3)`;

// //       await conn.query(sql, [firstName, lastName, password]);

// //       conn.release();
// //       return;
// //     } catch (error) {
// //       throw new Error(`Cannot add product to db :: ${error}`);
// //     }
// //   }

// //   async show(id: string): Promise<User> {
// //     try {
// //       const conn = await client.connect();

// //       const sql = 'SELECT * FROM users WHERE id=($1)';

// //       const result = await conn.query(sql, [id]);

// //       conn.release();

// //       return result.rows[0];
// //     } catch (err) {
// //       throw new Error(`Could not find product ${id}. Error: ${err}`);
// //     }
// //   }
// // }

// // export default Crud;
