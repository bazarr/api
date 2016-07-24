import Sequelize from 'sequelize';

import post from './post';
import user from './user';

const sequelize = new Sequelize(process.env.DATABASE_URL);

export const Post = post(sequelize, Sequelize);
export const User = user(sequelize, Sequelize);
