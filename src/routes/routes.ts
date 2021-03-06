import express from "express";
import multer from "multer";

import UserController from "../controllers/UserController";
import SessionController from "../controllers/SessionController";
import ListController from "../controllers/ListController";
import ProductController from "../controllers/ProductController";
import ProductQuantityController from "../controllers/ProductQuantityController";
import authMiddleware from "../middlewares/auth";
import ScrapController from "../controllers/ScrapController";
import { validate } from "../middlewares/validateSchema";
import Schemas from "../schemas/index";

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

router.use((req, res, next) => {
  console.log("\n*****REQUEST: ", req.path);
  next();
});

// Health Check
router.get("/health", (req, res) => {
  const currentDate = new Date().toLocaleDateString("en-us");
  const currentTime = new Date().toLocaleTimeString("en-us");
  const timeStamp = `The current time is: ${currentTime} on: ${currentDate}`;

  return res.status(200).json({ timeCheck: timeStamp });
});

//Create user
router.post("/users", /*validate(Schemas.userSchema),*/ userController.create);

router.post(
  "/sessions",
  validate(Schemas.sessionSchema),
  sessionController.authenticate
);

router.use(authMiddleware);

/**
 * Routes that need authentication
 */

/**
 * Users routes
 */
const storage = multer.memoryStorage({
  destination: function (req, file, callback) {
    callback(null, "");
  },
});

const file = multer({ storage }).single("file");

router.get("/users", userController.list);
router.get("/users/:id", userController.show);
router.put(
  "/users/:id",
  /*validate(Schemas.userSchema),*/ userController.update
);

router.put("/users/:id/image", file, userController.updatePicture);

/**
 * Lists routes
 */
router.get("/lists", listController.list);
router.get("/lists/:id", listController.show);
router.put(
  "/lists/:id",
  /* validate(Schemas.listSchema),*/ listController.update
);
router.post("/lists", /*validate(Schemas.listSchema),*/ listController.create);

/**
 * Products routes
 */
router.get("/products", productController.list);
router.get("/products/:id", productController.show);
router.put(
  "/products/:id",
  // validate(Schemas.productSchema),
  productController.update
);
router.post(
  "/products",
  // validate(Schemas.productSchema),
  productController.create
);
router.post("/products/batch", productController.createBatch);
router.delete("/products/:id", productController.delete);

/**
 * Quantities routes
 */
router.get("/product-quantities", productQuantityController.list);
router.get("/product-quantities/:id", productQuantityController.show);
router.put(
  "/product-quantities/close",
  // validate(Schemas.productQuantitySchema),
  productQuantityController.close
);
router.put(
  "/product-quantities/batch",
  // validate(Schemas.productQuantitySchema),
  productQuantityController.updateBatch
);
router.put(
  "/product-quantities/:id",
  // validate(Schemas.productQuantitySchema),
  productQuantityController.update
);
router.post(
  "/product-quantities",
  // validate(Schemas.productQuantitySchema),
  productQuantityController.create
);
router.post("/product-quantities/batch", productQuantityController.createBatch);
router.delete("/product-quantities/:id", productQuantityController.delete);
router.get(
  "/product-quantities/lists/:id",
  productQuantityController.getAllByList
);

/*
 * Scrap routes
 */
router.post("/scrap", scrapController.parseNote);

export = router;
