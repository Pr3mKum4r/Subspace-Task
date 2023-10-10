const express = require('express');
const app = express();
const router = express.Router();
const blogsController = require('../controllers/blogsController');

app.use('/api', router);

router.get('/blog-stats', blogsController.getBlogStats);
router.get('/blog-search', blogsController.getBlog);

app.use((req, res, next) => {
    res.status(500).json({ error: 'An unexpected error occurred' });
});

module.exports = router;