// Require Modules
const { Router } = require('express');
const router = Router();

// Start database connection
const dbConnection = require('../../store/db.connect');

// Dependency Injección Settings
const store = require('./store')(dbConnection);
const services = require('../../services');
services.store = store;

// Controllers
const handlerNewsController = require('./controller')(services);

// Declare Routes
router.post('/add', handlerNewsController.addNews);
router.get('/news', handlerNewsController.getNewsAndCategories);
router.get('/count', handlerNewsController.getNewsCount);
router.get('/all', handlerNewsController.getAllNews);
router.get('/estadistica', handlerNewsController.getEstadistica);
router.get('/search', handlerNewsController.getSearch);
router.get('/:id', handlerNewsController.getNews);
router.put('/upadate/:id', handlerNewsController.updateNews);
router.delete('/remove/:id', handlerNewsController.deleteNews);

module.exports = router;