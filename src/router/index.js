const categoriesRoutes = require('../component/categiries/network');
const newsRoutes = require('../component/news/network');

// Declare Router
const router = server => {
    server.use('/api/v1/categories', categoriesRoutes);
    server.use('/api/v1/news', newsRoutes);
}

module.exports = router;