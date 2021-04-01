import express from 'express';
import ProductQuantityController from '../controllers/ProductQuantityController'
import ProductController from '../controllers/ProductController'
import ListController from '../controllers/ListController';

const router = express.Router();
const ListMethods = new ListController();
const QttyMethods = new ProductQuantityController();
const ProductMethods = new ProductController();

//Rotas para gerenciar listas
router.get('/list', ListMethods.getAll);
router.post('/list', ListMethods.create);
router.get('/newList', ListMethods.getNewList);
router.put('/list', ListMethods.update);

//Rotas para Gerenciar Produtos
router.get('/product', ProductMethods.getAll);
router.post('/product', ProductMethods.create);
router.put('/product', ProductMethods.update);
router.delete('/product', ProductMethods.delete);

//Rotas para Gerenciar Quantidade de Produtos
router.get('/quantity', QttyMethods.getAll);
router.post('/quantity', QttyMethods.create);
router.put('/quantity', QttyMethods.update);
router.post('/quantity', QttyMethods.delete);

export = router;