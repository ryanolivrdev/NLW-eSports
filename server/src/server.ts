import express from 'express';

const app = express();

app.get("/ads", (req, res) => {
  return res.json([
    { id: 1, name: 'Ryan'}
  ])
})

app.listen(3333)