module.exports = ({ store, response, uuid }) => ({

    addCategory: async (req, res) => {

        try {
            const category = req.body;

            category.id = uuid.v4();
            category.data_create = new Date();
    
            const newCategory = await store.add(category);

            if(!newCategory) {
                let message = `No hemos podido crear la categoria.`;
                return response.error(res, message, 400);
            }

            let message = `La categoria se creo correctamente.`;
    
            return response.success(res, message, 201);
            
        } catch (error) {
            console.log(error);
        }

    },

    getAllCategories: async (req, res) => {
        try {
            const { page } = req.query;
            const { limit } = req.query;
            const data = await store.getAll(page, limit);
            return response.success(res, data, 200)
        } catch (error) {
            console.log(error);
        }   
    },

    getCategories: async (req, res) => {

        const { id } = req.params;

        const category = await store.get(id);

        if(category.length === 0) {
            let message = `No hemos podido encontrar la categoria buscada.`;
            return response.error(res, message, 400);
        }

        return response.success(res, category, 201);

    },

    updateCategory: async (req, res) => {

        try {
            const { id } = req.params;

            const dataCategory = req.body;

            const category = await store.update(id, dataCategory);
            
            if(!category) {
                let message = `No hemos podido actualizar la categoria.`;
                return response.error(res, message, 400);
            }

            let message = `La categoria fue actualizada correctamente.`;
    
            return response.success(res, message, 201);

        } catch (error) {
            console.log(error);
        }

    },

    deleteCategory: async (req, res) => {
        try {
            const { id } = req.params;

            const category = await store.delete(id);

            if(!category) {
                let message = `No hemos podido eliminar la categoria.`;
                return response.error(res, message, 400);
            }
            
            let message = `La categoria fue eliminada correctamente.`;
    
        return response.success(res, message, 201);
        } catch (error) {
            console.log(error);
        }
    }

});