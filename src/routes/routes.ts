import express from "express";

import UserController from "../controllers/UserController";
import SessionController from "../controllers/SessionController";
import ListController from "../controllers/ListController";
import ProductController from "../controllers/ProductController";
import ProductQuantityController from "../controllers/ProductQuantityController";
import authMiddleware from "../middlewares/auth";
import ScrapController from "../controllers/ScrapController";

const router = express.Router();

const userController = new UserController();
const sessionController = new SessionController();
const listController = new ListController();
const productController = new ProductController();
const productQuantityController = new ProductQuantityController();
const scrapController = new ScrapController();

/**
 * Open Routes without authentication
 */

// Health Check
router.get("/health", (req, res) => {
  const currentDate = new Date().toLocaleDateString("en-us");
  const currentTime = new Date().toLocaleTimeString("en-us");
  const timeStamp = `The current time is: ${currentTime} on: ${currentDate}`;

  return res.status(200).json({ timeCheck: timeStamp });
});

router.post("/sessions", sessionController.authenticate);

//router.use(authMiddleware);

/**
 * Routes that need authentication
 */

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
router.post("/products/batch", productController.createBatch);
router.delete("/products/:id", productController.delete);

/**
 * Quantities routes
 */
router.get("/product-quantities", productQuantityController.list);
router.get("/product-quantities/:id", productQuantityController.show);
router.put("/product-quantities/:id", productQuantityController.update);
router.post("/product-quantities", productQuantityController.create);
router.post("/product-quantities/batch", productQuantityController.createBatch);
router.delete("/product-quantities/:id", productQuantityController.delete);

/*
 * Scrap routes
 */
router.post("/scrap", scrapController.parseNote);

export = router;
