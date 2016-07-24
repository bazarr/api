import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import uuid from 'node-uuid';

import {Post, User} from './sequelize/';

const app = express();
const PORT = process.env.PORT || 8000;

app.use(bodyParser.json());
app.use(cors());

app.get('/users', async (req, res) => {
  try {
    let users = await User.findAll();
    users = users.map((user) => user.get({plain: true}));

    return res.json({users});
  } catch (err) {
    return res.json({error: err});
  }
});

app.post('/users', async (req, res) => {
  try {
    const user = await User.create({
      id: uuid.v4(),
      email: req.body.email,
    });

    return res.json(user.get({plain: true}));
  } catch (err) {
    return res.json({error: err});
  }
});

app.get('/posts', async (req, res) => {
  try {
    let posts = await Post.findAll();
    posts = posts.map((post) => post.get({plain: true}));

    return res.json({posts});
  } catch (err) {
    return res.json({error: err});
  }
});

app.post('/posts', async (req, res) => {
  try {
    const post = await Post.create({
      id: uuid.v4(),
      userId: req.body.userId,
      title: req.body.title,
      description: req.body.description,
    });

    return res.json(post.get({plain: true}));
  } catch (err) {
    return res.json({error: err});
  }
});

app.listen(PORT, () => {
  console.log('Node app is running on port', PORT);
});
