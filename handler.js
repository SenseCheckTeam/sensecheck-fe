const { nanoid } = require("nanoid");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const users = require("./users");
const sliders = require("./sliders");
const articles = require("./articles");
const admins = require("./admins");
const { JWT_SECRET } = require('./config');
const fs = require('fs');
const path = require('path');
const util = require('util');
const pipeline = util.promisify(require('stream').pipeline);

const saveFile = async (file, filename) => {
    const filepath = path.join(__dirname, 'uploads', filename);
    await pipeline(file, fs.createWriteStream(filepath));
    return `/uploads/${filename}`;
};

// Fungsi untuk menghapus file
const deleteFile = async (filepath) => {
    if (!filepath) return;
    
    const fullPath = path.join(__dirname, filepath);
    try {
        if (fs.existsSync(fullPath)) {
            fs.unlinkSync(fullPath);
            console.log('File deleted:', fullPath);
        }
    } catch (error) {
        console.error('Error deleting file:', error);
    }
};

const registerHandler = async (request, h) => {
    const { name, email, password } = request.payload;

    // Validasi password minimal 8 karakter
    if (password.length < 8) {
        const response = h.response({
            error: true,
            message: "Password harus minimal 8 karakter",
        });
        response.code(400);
        return response;
    }

    // Validasi format email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        const response = h.response({
            error: true,
            message: "Format email tidak valid",
        });
        response.code(400);
        return response;
    }

    // Cek apakah email sudah digunakan
    const existingUser = users.filter((user) => user.email === email)[0];
    if (existingUser) {
        const response = h.response({
            error: true,
            message: "Email sudah digunakan",
        });
        response.code(400);
        return response;
    }

    const id = nanoid(16);
    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;
    
    // Hash password dengan salt rounds 10
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = {
        id,
        name,
        email,
        password: hashedPassword,
        role: "user", // Default role untuk user baru
        createdAt,
        updatedAt,
    };

    users.push(newUser);

    const isSuccess = users.filter((user) => user.id === id).length > 0;

    if (isSuccess) {
        const response = h.response({
            error: false,
            message: "User berhasil ditambahkan",
        });
        response.code(201);
        return response;
    }

    const response = h.response({
        error: true,
        message: "User gagal ditambahkan",
    });
    response.code(500);
    return response;
};


const loginHandler = async (request, h) => {
    const { email, password } = request.payload;

    // Cari user berdasarkan email
    const user = users.filter((u) => u.email === email)[0];

    if (!user) {
        const response = h.response({
            error: true,
            message: "Email atau password salah",
        });
        response.code(401);
        return response;
    }

    // Verifikasi password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
        const response = h.response({
            error: true,
            message: "Email atau password salah",
        });
        response.code(401);
        return response;
    }

    // Generate JWT token
    const token = jwt.sign({ 
        userId: user.id,
        role: user.role 
    }, JWT_SECRET);

    const response = h.response({
        error: false,
        message: "success",
        loginResult: {
            userId: user.id,
            name: user.name,
            token: token
        }
    });
    response.code(200);
    return response;
};

// Middleware untuk verifikasi token
const verifyToken = (request) => {
    const authHeader = request.headers.authorization;
    if (!authHeader) {
        throw new Error('Token tidak ditemukan');
    }

    const token = authHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        return decoded;
    } catch (error) {
        throw new Error('Token tidak valid');
    }
};

const verifyAdmin = (request) => {
    const authHeader = request.headers.authorization;
    if (!authHeader) {
        throw new Error('Token tidak ditemukan');
    }

    const token = authHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        if (!decoded.adminId) {
            throw new Error('Akses ditolak');
        }
        return decoded;
    } catch (error) {
        throw new Error('Token tidak valid');
    }
};

// Handler untuk Home
const getHomeHandler = async (request, h) => {
    return h.response({
        error: false,
        message: 'success',
        data: {
            sliders,
            articles
        }
    }).code(200);
};

// Handlers untuk Slider
const createSliderHandler = async (request, h) => {
    try {
        verifyAdmin(request); // Menggunakan verifyAdmin

        const { title, description } = request.payload;
        const photo = request.payload.photo;
        
        if (!photo) {
            return h.response({
                error: true,
                message: 'Gambar harus diunggah'
            }).code(400);
        }

        // Debug photo object
        const originalFileName = photo.hapi ? photo.hapi.filename : photo.filename;
        
        // Validasi tipe file
        const filename = `${Date.now()}-${originalFileName}`;
        const allowedExtensions = ['.jpg', '.jpeg', '.png'];
        const fileExt = path.extname(originalFileName).toLowerCase();
        
        // Tambahkan informasi debugging ke response
        if (!allowedExtensions.includes(fileExt)) {
            return h.response({
                error: true,
                message: 'Format file tidak valid. Gunakan JPG, JPEG, atau PNG',
                debug: {
                    originalFileName,
                    filename: filename,
                    fileExtension: fileExt,
                    allowedExtensions: allowedExtensions,
                    photoInfo: {
                        hasHapi: !!photo.hapi,
                        hapiInfo: photo.hapi,
                        headers: photo.headers
                    }
                }
            }).code(400);
        }

        const imageUrl = await saveFile(photo, filename);
        
        const id = nanoid(16);
        const createdAt = new Date().toISOString();
        const updatedAt = createdAt;

        const newSlider = {
            id,
            title,
            description,
            imageUrl,
            createdAt,
            updatedAt,
        };

        sliders.push(newSlider);

        return h.response({
            error: false,
            message: 'Slider berhasil ditambahkan',
            data: { sliderId: id }
        }).code(201);
    } catch (error) {
        return h.response({
            error: true,
            message: error.message
        }).code(401);
    }
};

const updateSliderHandler = async (request, h) => {
    try {
        verifyAdmin(request);

        const { id } = request.params;
        const { title, description } = request.payload;
        const photo = request.payload.photo;
        
        const index = sliders.findIndex((slider) => slider.id === id);
        if (index === -1) {
            return h.response({
                error: true,
                message: 'Slider tidak ditemukan'
            }).code(404);
        }

        let imageUrl = sliders[index].imageUrl;
        
        if (photo) {
            const originalFileName = photo.hapi ? photo.hapi.filename : photo.filename;
            const filename = `${Date.now()}-${originalFileName}`;
            const allowedExtensions = ['.jpg', '.jpeg', '.png'];
            const fileExt = path.extname(originalFileName).toLowerCase();
            
            if (!allowedExtensions.includes(fileExt)) {
                return h.response({
                    error: true,
                    message: 'Format file tidak valid. Gunakan JPG, JPEG, atau PNG'
                }).code(400);
            }

            // Hapus file lama
            await deleteFile(sliders[index].imageUrl);

            imageUrl = await saveFile(photo, filename);
        }

        const updatedAt = new Date().toISOString();

        sliders[index] = {
            ...sliders[index],
            title,
            description,
            imageUrl,
            updatedAt,
        };

        return h.response({
            error: false,
            message: 'Slider berhasil diperbarui'
        }).code(200);
    } catch (error) {
        return h.response({
            error: true,
            message: error.message
        }).code(401);
    }
};

const deleteSliderHandler = async (request, h) => {
    try {
        verifyAdmin(request);

        const { id } = request.params;
        const index = sliders.findIndex((slider) => slider.id === id);

        if (index === -1) {
            return h.response({
                error: true,
                message: 'Slider tidak ditemukan'
            }).code(404);
        }

        // Hapus file gambar
        await deleteFile(sliders[index].imageUrl);

        sliders.splice(index, 1);

        return h.response({
            error: false,
            message: 'Slider berhasil dihapus'
        }).code(200);
    } catch (error) {
        return h.response({
            error: true,
            message: error.message
        }).code(401);
    }
};

// Handlers untuk Article
const createArticleHandler = async (request, h) => {
    try {
        verifyAdmin(request); // Menggunakan verifyAdmin

        const { title, content } = request.payload;
        const photo = request.payload.photo;
        
        if (!photo) {
            return h.response({
                error: true,
                message: 'Gambar harus diunggah'
            }).code(400);
        }

        const originalFileName = photo.hapi ? photo.hapi.filename : photo.filename;
        const filename = `${Date.now()}-${originalFileName}`;
        const allowedExtensions = ['.jpg', '.jpeg', '.png'];
        const fileExt = path.extname(originalFileName).toLowerCase();
        
        if (!allowedExtensions.includes(fileExt)) {
            return h.response({
                error: true,
                message: 'Format file tidak valid. Gunakan JPG, JPEG, atau PNG'
            }).code(400);
        }

        const imageUrl = await saveFile(photo, filename);
        
        const id = nanoid(16);
        const createdAt = new Date().toISOString();
        const updatedAt = createdAt;

        const newArticle = {
            id,
            title,
            content,
            imageUrl,
            createdAt,
            updatedAt,
        };

        articles.push(newArticle);

        return h.response({
            error: false,
            message: 'Artikel berhasil ditambahkan',
            data: { articleId: id }
        }).code(201);
    } catch (error) {
        return h.response({
            error: true,
            message: error.message
        }).code(401);
    }
};

const updateArticleHandler = async (request, h) => {
    try {
        verifyAdmin(request);

        const { id } = request.params;
        const { title, content } = request.payload;
        const photo = request.payload.photo;
        
        const index = articles.findIndex((article) => article.id === id);
        if (index === -1) {
            return h.response({
                error: true,
                message: 'Artikel tidak ditemukan'
            }).code(404);
        }

        let imageUrl = articles[index].imageUrl;
        
        if (photo) {
            const originalFileName = photo.hapi ? photo.hapi.filename : photo.filename;
            const filename = `${Date.now()}-${originalFileName}`;
            const allowedExtensions = ['.jpg', '.jpeg', '.png'];
            const fileExt = path.extname(originalFileName).toLowerCase();
            
            if (!allowedExtensions.includes(fileExt)) {
                return h.response({
                    error: true,
                    message: 'Format file tidak valid. Gunakan JPG, JPEG, atau PNG'
                }).code(400);
            }

            // Hapus file lama
            await deleteFile(articles[index].imageUrl);

            imageUrl = await saveFile(photo, filename);
        }

        const updatedAt = new Date().toISOString();

        articles[index] = {
            ...articles[index],
            title,
            content,
            imageUrl,
            updatedAt,
        };

        return h.response({
            error: false,
            message: 'Artikel berhasil diperbarui'
        }).code(200);
    } catch (error) {
        return h.response({
            error: true,
            message: error.message
        }).code(401);
    }
};

const deleteArticleHandler = async (request, h) => {
    try {
        verifyAdmin(request);

        const { id } = request.params;
        const index = articles.findIndex((article) => article.id === id);

        if (index === -1) {
            return h.response({
                error: true,
                message: 'Artikel tidak ditemukan'
            }).code(404);
        }

        // Hapus file gambar
        await deleteFile(articles[index].imageUrl);

        articles.splice(index, 1);

        return h.response({
            error: false,
            message: 'Artikel berhasil dihapus'
        }).code(200);
    } catch (error) {
        return h.response({
            error: true,
            message: error.message
        }).code(401);
    }
};

const adminLoginHandler = async (request, h) => {
    const { email, password } = request.payload;

    // Cari admin berdasarkan email
    const admin = admins.filter((a) => a.email === email)[0];

    if (!admin) {
        const response = h.response({
            error: true,
            message: "Email atau password salah",
        });
        response.code(401);
        return response;
    }

    // Verifikasi password
    const isPasswordValid = await bcrypt.compare(password, admin.password);

    if (!isPasswordValid) {
        const response = h.response({
            error: true,
            message: "Email atau password salah",
        });
        response.code(401);
        return response;
    }

    // Generate JWT token
    const token = jwt.sign({ 
        adminId: admin.id
    }, JWT_SECRET);

    const response = h.response({
        error: false,
        message: "success",
        loginResult: {
            adminId: admin.id,
            name: admin.name,
            token: token
        }
    });
    response.code(200);
    return response;
};

const getSlidersHandler = async (request, h) => {
    return h.response({
        error: false,
        message: 'success',
        data: sliders
    }).code(200);
};

const getSliderByIdHandler = async (request, h) => {
    const { id } = request.params;
    const slider = sliders.find((s) => s.id === id);

    if (!slider) {
        return h.response({
            error: true,
            message: 'Slider tidak ditemukan'
        }).code(404);
    }

    return h.response({
        error: false,
        message: 'success',
        data: slider
    }).code(200);
};

const getArticlesHandler = async (request, h) => {
    return h.response({
        error: false,
        message: 'success',
        data: articles
    }).code(200);
};

const getArticleByIdHandler = async (request, h) => {
    const { id } = request.params;
    const article = articles.find((a) => a.id === id);

    if (!article) {
        return h.response({
            error: true,
            message: 'Artikel tidak ditemukan'
        }).code(404);
    }

    return h.response({
        error: false,
        message: 'success',
        data: article
    }).code(200);
};

module.exports = {
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
};
