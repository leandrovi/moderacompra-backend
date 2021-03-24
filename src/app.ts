import express from "express";
import ListController from "./controllers/ListController";

const listController = new ListController();

const app = express();

app.use(express.json());

// Lists
app.get("/list", listController.create);

// Products
app.get("/products", (req, res) => {
  return res.json({ ok: true });
});

// Users
app.get("/users", (req, res) => {
  return res.json({ ok: true });
});

export default app;
