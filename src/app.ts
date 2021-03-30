import express from "express";
import moderaRoutes from './routes/routes'
import bodyParser from 'body-parser';

const app = express();

app.use(express.json());

const router = express();

/** Parse the body of the request */
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

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
