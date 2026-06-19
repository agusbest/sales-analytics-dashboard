const router = require('express').Router();

const dashboard =
    require('../controllers/dashboard');


// console.log(dashboard);

router.get(
    '/months',
    dashboard.months
);

router.get(
    '/summary',
    dashboard.summary
);

router.get(
    '/trend',
    dashboard.trend
);

router.get(
    '/category',
    dashboard.category
);

router.get(
    '/branch',
    dashboard.branch
);

router.get(
    '/top-products',
    dashboard.topProducts
);

module.exports = router;