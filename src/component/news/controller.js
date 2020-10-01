module.exports = ({ store, response, uuid }) => ({

    addNews: async (req, res) => {

        try {
            const news = req.body;

            news.id = uuid.v4();
            news.data_create = new Date();

            const newNews = await store.add(news);

            if(!newNews) {
                let message = `No hemos podido crear la noticia.`;
                return response.error(res, message, 400);
            }

            let message = `La noticia se creo correctamente.`;
    
            return response.success(res, message, 201);
            
        } catch (error) {
            console.log(error);
        }

    },

    getAllNews: async (req, res) => {
        try {
            const { page } = req.query;
            const { limit } = req.query;

            const data = await store.getAll(page, limit);
            return response.success(res, data, 200)
        } catch (error) {
            console.log(error);
        }   
    },

    getNewsAndCategories: async (req, res) => {
        try {
            const { page } = req.query;
            const { limit } = req.query;

            const data = await store.getAllAndCategories(page, limit);
            return response.success(res, data, 200)
        } catch (error) {
            console.log(error);
        }  
    },

    getNewsCount: async (req, res) => {
        try {
            const data = await store.getAllAndCategoriesCount();
            return response.success(res, data, 200)
        } catch (error) {
            console.log(error);
        }  
    },

    getNews: async (req, res) => {

        const { id } = req.params;

        const news = await store.get(id);

        if(news.length === 0) {
            let message = `No hemos podido encontrar la noticia buscada.`;
            return response.error(res, message, 400);
        }

        return response.success(res, category, 201);

    },

    updateNews: async (req, res) => {

        try {
            const { id } = req.params;

            const dataNews = req.body;

            const news = await store.update(id, dataNews);
            
            if(!news) {
                let message = `No hemos podido actualizar la noticia.`;
                return response.error(res, message, 400);
            }

            let message = `La noticia fue actualizada correctamente.`;
    
            return response.success(res, message, 201);

        } catch (error) {
            console.log(error);
        }

    },

    deleteNews: async (req, res) => {
        try {
            const { id } = req.params;

            const news = await store.delete(id);

            if(!news) {
                let message = `No hemos podido eliminar la news.`;
                return response.error(res, message, 400);
            }
            
            let message = `La noticia fue eliminada correctamente.`;
    
        return response.success(res, message, 201);
        } catch (error) {
            console.log(error);
        }
    },

    getEstadistica: async (req, res) => {

        const result = await store.estadistica();
        return response.success(res, result, 200);

    },

    getSearch:  async (req, res) => {

        const { search } = req.query;

        const result = await store.search(search);
        
        return response.success(res, result, 200);

    },

});