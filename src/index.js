import express from 'express';

const app = new express();

app.get('/', (req, res) => res.status(200).json({ message: 'Aôba ModeraCompra' }));

app.listen(3000, () => {
  console.log('🚀 ModeraCompra server listening on port 3000!')
});