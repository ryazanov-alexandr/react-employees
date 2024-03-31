const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth');
const { all, employee, add, edit, remove } = require('../controllers/employees'); 

// /api/employees
router.get('/', auth, all);
// /api/employees/:id
router.get('/:id', auth, employee);
// /api/employees/add
router.post('/', auth, add);
// /api/employees/:id
router.delete('/:id', auth, remove);
// /api/employees/:id
router.put('/:id', auth, edit);

module.exports = router;