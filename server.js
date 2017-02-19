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
      password: req.body.password
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
      image: req.body.image || null
    });

    return res.json(post.get({plain: true}));
  } catch (err) {
    return res.json({error: err});
  }
});


app.get('/search', async (req, res) => {
  // If it's an empty search, we might want to show most popular newest ads down the line
  try {
    let result = await Post.findAll({
        order: "created_at DESC"
      });
      result = result.map((result) => result.get({plain: true}));

    return res.json({result});
  } catch (err) {
    return res.json({error: err});
  }
});

app.get('/search/:title', async (req, res) => {
  // If there is actually a search term provided
  try {
      var searchTerm = req.params.title.replace(/-/g, "%") //When passed, spaces were replaced with '-'
      let result = await Post.findAll({
        where: { $or: {
          title: { ilike: '%' + searchTerm + '%'},
          description: { ilike: '%' + searchTerm + '%'},
          }
        },
        order: "CASE WHEN title ILIKE '" + searchTerm + "%' THEN 3 \
        WHEN title ILIKE '%" + searchTerm + "' THEN 1 \
        WHEN title ILIKE '%" + searchTerm + "%' THEN 2 \
        WHEN description ILIKE '%" + searchTerm + "%' THEN 0 END DESC, title",
        
      });
      result = result.map((result) => result.get({plain: true}));

    return res.json({result});
  } catch (err) {
    return res.json({error: err});
  }
});

app.listen(PORT, () => {
  console.log('Node app is running on port', PORT);
});
