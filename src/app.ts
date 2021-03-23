import express from "express";
import ListController from "./controllers/ListController";

const listController = new ListController();

const app = express();

app.use(express.json());

app.get("/", listController.create);

export default app;
