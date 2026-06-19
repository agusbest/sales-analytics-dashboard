const express = require("express");
const router = express.Router();

const salesController = require('../controllers/sales');
const upload = require('../middlewares/upload');

router.get('/', salesController.index);

router.post(
    '/import',
    upload.single('file'),
    salesController.importExcel
);

router.delete(
    '/:id',
    salesController.destroy
);

router.post(
    '/',
    salesController.store
);

router.put(
    '/:id',
    salesController.update
);

// export excel (test dulu)
router.get("/export", salesController.exportExcel);

module.exports = router;