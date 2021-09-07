import UserStore from './user.model';
import { getAll, createOne, showOne } from '../../utils/crud';

const userStore = new UserStore();

const userControllers = {
  getUsers: getAll(userStore),
  createUser: createOne(userStore),
  showUser: showOne(userStore),
  // authenticateUser: userStore.authenticate,
};

export default userControllers;
