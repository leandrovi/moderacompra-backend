import express from "express";

import UserController from "../controllers/UserController";
import ListController from "../controllers/ListController";
import ProductController from "../controllers/ProductController";
import ProductQuantityController from "../controllers/ProductQuantityController";

const router = express.Router();

const userController = new UserController();
const listController = new ListController();
const productController = new ProductController();
const productQuantityController = new ProductQuantityController();

// Health Check
router.get("/health", (req, res) => {
  const currentDate = new Date().toLocaleDateString("en-us");
  const currentTime = new Date().toLocaleTimeString("en-us");
  const timeStamp = `The current time is: ${currentTime} on: ${currentDate}`;

  return res.status(200).json({ timeCheck: timeStamp });
});

/**
 * Users routes
 */
router.get("/users", userController.list);
router.get("/users/:id", userController.show);
router.put("/users/:id", userController.update);
router.post("/users", userController.create);

/**
 * Lists routes
 */
router.get("/lists", listController.list);
router.get("/lists/:id", listController.show);
router.put("/lists/:id", listController.update);
router.post("/lists", listController.create);

/**
 * Products routes
 */
router.get("/products", productController.list);
router.get("/products/:id", productController.show);
router.put("/products/:id", productController.update);
router.post("/products", productController.create);
router.delete("/products/:id", productController.delete);

/**
 * Quantities routes
 */
router.get("/product-quantities/list", productQuantityController.list);
router.get("/product-quantities/:id", productQuantityController.show);
router.put("/product-quantities/:id", productQuantityController.update);
router.post("/product-quantities", productQuantityController.create);
router.delete("/product-quantities/:id", productQuantityController.delete);

export = router;
