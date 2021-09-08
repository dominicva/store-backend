import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const { TOKEN_SECRET } = process.env;

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
      const token = jwt.sign({ resource: newResource }, TOKEN_SECRET);
      console.log(token);
      res.status(201).json(token);
    } catch (err) {
      console.error(
        `Error creating new resource in ${model.tableName} table :: ${err}`
      );
      res.status(500).end();
    }
  };
}

function showOne(model: any) {
  return async function showOneController(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const resource = await model.show(id);
      res.status(200).json(resource);
    } catch (err) {
      console.error(
        `Error fetching ${model.tableName} resource wtith id: ${id}. ${err}`
      );
      res.status(500).end();
    }
  };
}

export { getAll, createOne, showOne };
