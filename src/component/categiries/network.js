// Require Modules
const { Router } = require('express');
const router = Router();

// Start database connection
const dbConnection = require('../../store/db.connectAwait');

// Dependency Injección Settings
const store = require('./store')(dbConnection);
const services = require('../../services');
services.store = store;

// Controllers
const handlerCategoriesController = require('./controller')(services);

// Declare Routes
router.post('/add', handlerCategoriesController.addCategory);
router.get('/all', handlerCategoriesController.getAllCategories);
router.get('/:id', handlerCategoriesController.getCategories);
router.put('/upadate/:id', handlerCategoriesController.updateCategory);
router.delete('/remove/:id', handlerCategoriesController.deleteCategory);

module.exports = router;