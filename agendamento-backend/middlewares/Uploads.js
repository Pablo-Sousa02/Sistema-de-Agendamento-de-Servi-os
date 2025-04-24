    const multer = require("multer");
    const path = require("path");

    // Configuração do armazenamento
    const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/"); // Pasta onde será salva a imagem
    },
    filename: function (req, file, cb) {
        const ext = path.extname(file.originalname); // extensão do arquivo original
        const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
        cb(null, uniqueName);
    },
    });

    // Filtro para aceitar apenas imagens
    const fileFilter = (req, file, cb) => {
    const allowedTypes = ["image/jpeg", "image/png", "image/jpg", "image/webp"];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error("Tipo de arquivo não suportado. Apenas imagens são permitidas."), false);
    }
    };

    // Middleware final
    const upload = multer({
    storage,
    fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 }, // Limite: 5MB
    });

    module.exports = upload;
