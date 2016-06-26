import uuid from 'node-uuid';

import {
  User,
} from '../sequelize/models';

export async function createUser(_, args) {
  const user = await User.create({
    id: uuid.v4(),
    email: args.email,
  });

  return user;
}

export async function getUser(_, args) {
  const user = await User.findOne({
    where: {email: args.email},
  });

  return user;
}
