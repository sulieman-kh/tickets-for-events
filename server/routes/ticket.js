const express = require('express');
const router = express.Router();
const ticketController = require('../controllers/ticketController');

// Router
router.get('/', ticketController.view);
router.get('/addticket', ticketController.form);
router.post('/addticket', ticketController.create);
router.get('/addcol', ticketController.formcol);
router.post('/addcol', ticketController.createcol);


module.exports = router;