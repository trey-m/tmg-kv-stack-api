import express from 'express';
import Stack from './utils/stack.js';
import KV from './utils/kv.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

const stack = new Stack();

app.post('/stack', (req, res) => {
  const { value } = req.body;

  if (value === undefined) {
    return res.status(400).send('value is required');
  }

  stack.push(value);

  res.status(201).send({ stack });
});

app.get('/stack', (req, res) => {
  if (stack.isEmpty()) {
    return res.status(204).send('stack is empty');
  }

  const value = stack.pop();

  res.send({ value, stack });
});

const kv = new KV();

// Add to key-value store
app.post('/kv', (req, res) => {
  const { key, value, ttl = null } = req.body;

  if (key === undefined || value === undefined) {
    return res.status(400).send('key and value are required');
  }

  kv.set(key, value, ttl);

  res.status(201).send({ key, value });
});

// Get from key-value store
app.get('/kv/:key', (req, res) => {
  const key = req.params.key;

  try {
    const { value } = kv.get(key);
    res.send({ key, value });
  } catch (err) {
    res.send({});
  }
});

// Delete from key-value store
app.delete('/kv/:key', (req, res) => {
  const key = req.params.key;

  if (!kv.has(key)) {
    return res.status(404).send('Key not found');
  }

  kv.delete(key);

  res.status(204).send({ kv });
});

app.use((err, req, res, next) => {
  const statusCode = err.status || 500;

  res.status(statusCode).send({
    message: err.message,
    stack: err.stack, // bad4prod
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Stack and KV provider is running on port: ${PORT}`);
});
