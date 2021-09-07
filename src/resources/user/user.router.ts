import { Router } from 'express';
import userControllers from './user.controllers';

const { getUsers, createUser, showUser } = userControllers;

const router = Router();

router.route('/').get(getUsers).post(createUser);

router.route('/:id').get(showUser);

export default router;
