const {
    registerHandler,
    loginHandler,
    getHomeHandler,
    createSliderHandler,
    updateSliderHandler,
    deleteSliderHandler,
    createArticleHandler,
    updateArticleHandler,
    deleteArticleHandler,
    adminLoginHandler,
    getSlidersHandler,
    getSliderByIdHandler,
    getArticlesHandler,
    getArticleByIdHandler,
} = require("./handler");

const routes = [
    {
        method: "GET",
        path: "/",
        handler: getHomeHandler,
    },
    {
        method: "POST",
        path: "/register",
        handler: registerHandler,
    },
    {
        method: "POST",
        path: "/login",
        handler: loginHandler,
    },
    // Public routes for sliders
    {
        method: "GET",
        path: "/sliders",
        handler: getSlidersHandler,
    },
    {
        method: "GET",
        path: "/sliders/{id}",
        handler: getSliderByIdHandler,
    },
    // Public routes for articles
    {
        method: "GET",
        path: "/articles",
        handler: getArticlesHandler,
    },
    {
        method: "GET",
        path: "/articles/{id}",
        handler: getArticleByIdHandler,
    },
    // Admin routes
    {
        method: "POST",
        path: "/admin",
        handler: adminLoginHandler,
    },
    {
        method: "POST",
        path: "/admin/sliders",
        options: {
            payload: {
                allow: ['multipart/form-data'],
                multipart: {
                    output: 'stream'
                },
                maxBytes: 1000000
            }
        },
        handler: createSliderHandler,
    },
    {
        method: "PUT",
        path: "/admin/sliders/{id}",
        options: {
            payload: {
                allow: ['multipart/form-data'],
                multipart: {
                    output: 'stream'
                },
                maxBytes: 1000000
            }
        },
        handler: updateSliderHandler,
    },
    {
        method: "DELETE",
        path: "/admin/sliders/{id}",
        handler: deleteSliderHandler,
    },
    {
        method: "POST",
        path: "/admin/articles",
        options: {
            payload: {
                allow: ['multipart/form-data'],
                multipart: {
                    output: 'stream'
                },
                maxBytes: 1000000
            }
        },
        handler: createArticleHandler,
    },
    {
        method: "PUT",
        path: "/admin/articles/{id}",
        options: {
            payload: {
                allow: ['multipart/form-data'],
                multipart: {
                    output: 'stream'
                },
                maxBytes: 1000000
            }
        },
        handler: updateArticleHandler,
    },
    {
        method: "DELETE",
        path: "/admin/articles/{id}",
        handler: deleteArticleHandler,
    },
    {
        method: 'GET',
        path: '/uploads/{param*}',
        handler: {
            directory: {
                path: './src/uploads'
            }
        }
    }
];

module.exports = routes;
