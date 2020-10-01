module.exports = ( dbConnection ) => ({

    
    add: async (category) => {

        const newCategory = await dbConnection.query('INSERT INTO categories SET ? ', [category]);
        return newCategory;
        
    },

    getAll: async (page, limit) => {

       let start = ( page - 1 ) * limit;
       const end = Number(limit)
       const total = await dbConnection.query('SELECT COUNT(*) AS count FROM categories');
       const count = total[0].count;
       const pages = Math.ceil((count / limit));
 
       if(page > pages) start = pages;

       const rows = await dbConnection.query('SELECT * FROM categories ORDER BY data_create DESC LIMIT ?, ?', [start, end]);
       return rows;

       /*   
        dbConnection.query('SELECT * FROM categories', ( err, rows, results ) => {
            return rows;
        });
       */
       
    },

    get: async (id) => {
        const category = await dbConnection.query('SELECT * FROM categories WHERE id = ?', [id]);
        // const category = await dbConnection.query('SELECT * FROM categories WHERE id = ? AND name = ?', [id, 'Finance and Economy']);
        // const category = await dbConnection.query(`SELECT * FROM categories WHERE id = '${id}'`);
        return category;
    },

    update: async (id, dataCategory) => {
        const category = await dbConnection.query('UPDATE categories SET ? WHERE id = ?', [dataCategory, id]);
        return category;
    },

    delete: async (id) => {
        const category = await dbConnection.query('DELETE FROM categories WHERE id = ?', [id]);
        return category;
    },



});