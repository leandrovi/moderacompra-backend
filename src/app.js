import express from 'express';

const app = new express();

app.get('/', (req, res) => res.status(200).json({ message: 'Banana' }));

export default app;