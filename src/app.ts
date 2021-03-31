import express from "express";
import moderaRoutes from './routes/routes'

const app = express();

app.use(express.json());

const router = express();

/** Regras da API */
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Content-Type, Accept');

  if (req.method == 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
    return res.status(200).json({});
  }
  next();
});

/** Rotas da API */
app.use('/modera', moderaRoutes);

/** Error */
app.use((req, res, next) => {
  const error = new Error('Not found');

  res.status(404).json({
    message: error.message
  });
});

export default app;
