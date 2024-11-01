import express from 'express';

const app = express();

app.use((req, res, next) => {
  console.log(
    'The date is',
    new Date(),
    'The method is',
    req.method,
    'The path is',
    req.path
  );
  next();
});

app.get('/', (req, res) => {
  res.send('this is response to get');
});

app.get('/notes', (req, res) => {
  res.send('notes notes notes');
});

app.post('/notes/123', (req, res) => {
  res.send('posted notes 123');
});

app.listen(8080, () => {
  console.log('Express server listening on port 8080');
});
