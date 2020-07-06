import express from 'express';
import bodyParser from 'body-parser';
import { randomBytes } from 'crypto';
import cors from 'cors';
import axios from 'axios';

const app = express();
app.use(bodyParser.json());
app.use(cors());

const posts = {};

app.get('/posts', (req, res) => {
  res.send(posts);
});

app.post('/posts', async (req, res) => {
  const id = randomBytes(4).toString('hex');
  const { title } = req.body;

  posts[id] = {
    id,
    title,
  };

  try {
    await axios.post('http://localhost:4005/events', {
      type: 'PostCreated',
      data: {
        id,
        title,
      },
    });
  } catch (e) {
    console.warn(e);
  }

  res.status(201).send(posts[id]);
});

app.post('/events', (req, res) => {
  console.log('Event Received', req.body.type);
  res.send({});
});

app.listen(4000, () => {
  console.log('KUBERNETES');
  console.log('LISTENING on Port:', 4000);
});
