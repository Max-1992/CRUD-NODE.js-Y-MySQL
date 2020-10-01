module.exports = ( dbConnection ) => ({

    
    add: async (news) => {

        const newNews = await dbConnection.query('INSERT INTO news SET ? ', [news]);
        return newNews;
        
    },

    getAll: async (page, limit) => {

       let start = ( page - 1 ) * limit;
       const end = Number(limit)
       const total = await dbConnection.query('SELECT COUNT(*) AS count FROM news');
       const count = total[0].count;
       const pages = Math.ceil((count / limit));

       if(page > pages) start = pages;
       
       const news = await dbConnection.query('SELECT * FROM news ORDER BY data_create DESC LIMIT ?, ?', [start, end]);
       return news;

       /*   
        dbConnection.query('SELECT * FROM categories', ( err, rows, results ) => {
            return rows;
        });
       */
       
    },

    getAllAndCategories: async (page, limit) => {

        let start = ( page - 1 ) * limit;
        const end = Number(limit)
        const total = await dbConnection.query('SELECT COUNT(*) AS count FROM news');
        const count = total[0].count;
        const pages = Math.ceil((count / limit));
 
        if(page > pages) start = pages;

        // Traer el nombre de la categoria, titulo y fecha de creación.    
        const news = await dbConnection.query(`
            SELECT c.name AS category, n.title, n.data_create FROM news n
            INNER JOIN categories c ON n.category_id = c.id
            ORDER BY n.data_create DESC LIMIT ?, ?
        `, [start, end]);
    
        return news;
        
     },

     getAllAndCategoriesCount: async (page, limit) => {

        // Traer el nombre de la categoria y la cantidad de noticias por categorias.
        const news = await dbConnection.query(`
            SELECT c.name AS category, COUNT(n.category_id) AS count FROM news n
            INNER JOIN categories c ON n.category_id = c.id
            GROUP BY n.category_id
        `);

        return news;
        
     },

    get: async (id) => {
        const news = await dbConnection.query('SELECT * FROM news WHERE id = ?', [id]);
        // const category = await dbConnection.query('SELECT * FROM categories WHERE id = ? AND name = ?', [id, 'Finance and Economy']);
        // const category = await dbConnection.query(`SELECT * FROM categories WHERE id = '${id}'`);
        return news;
    },

    update: async (id, dataNews) => {
        const news = await dbConnection.query('UPDATE news SET ? WHERE id = ?', [dataNews, id]);
        return news;
    },

    delete: async (id) => {
        const news = await dbConnection.query('DELETE FROM news WHERE id = ?', [id]);
        return news;
    },

    estadistica: async () => {


        // Calcular la cantidad de noticias por categoria.
        // const newsForCatetories = await dbConnection.query('SELECT COUNT(category_id) AS countNews, category_id FROM news GROUP BY category_id');
        const newsForCatetories = await dbConnection.query('SELECT COUNT(*) AS countNews, category_id FROM news GROUP BY category_id');

        return newsForCatetories;

    },

    search: async (search) => {

        const news = await dbConnection.query(`SELECT * FROM news WHERE title REGEXP '${search}'`);
        console.log(news);

        return news;
    },



});