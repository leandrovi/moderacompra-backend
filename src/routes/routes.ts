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
router.get("/product", productController.list);
router.get("/product/:id", productController.show);
router.put("/product/:id", productController.update);
router.post("/product", productController.create);
router.delete("/product/:id", productController.delete);

/**
 * Quantities routes
 */
router.get("/produc-quantity/list", productQuantityController.list);
router.get("/product-quantity/:id", productQuantityController.show);
router.put("/product-quantity/:id", productQuantityController.update);
router.post("/product-quantity", productQuantityController.create);
router.delete("/product-quantity/:id", productQuantityController.delete);

export = router;
