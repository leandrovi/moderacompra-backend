import express from "express";
import ProductQuantityController from "../controllers/ProductQuantityController";
import ProductController from "../controllers/ProductController";
import ListController from "../controllers/ListController";

const router = express.Router();
const ListMethods = new ListController();
const QttyMethods = new ProductQuantityController();
const ProductMethods = new ProductController();

// Health Check
router.get("/health", (req, res) => {
  const currentDate = new Date().toLocaleDateString("en-us");
  const currentTime = new Date().toLocaleTimeString("en-us");
  const timeStamp = `The current time is: ${currentTime} on: ${currentDate}`;

  return res.status(200).json({ timeCheck: timeStamp });
});

//Rotas para gerenciar listas
router.get("/list", ListMethods.getAll);
router.post("/list", ListMethods.create);
router.get("/newList", ListMethods.getNewList);
router.put("/list", ListMethods.update);

//Rotas para Gerenciar Produtos
router.get("/product", ProductMethods.getAll);
router.post("/product", ProductMethods.create);
router.put("/product", ProductMethods.update);
router.delete("/product", ProductMethods.delete);

//Rotas para Gerenciar Quantidade de Produtos
router.get("/quantity", QttyMethods.getAll);
router.post("/quantity", QttyMethods.create);
router.put("/quantity", QttyMethods.update);
router.post("/quantity", QttyMethods.delete);

export = router;
