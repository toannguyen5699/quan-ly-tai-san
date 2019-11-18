const path = require('path');
const express = require('express');
const router = express.Router();
const userService = require('../api/user.service');
const employeeService = require('../api/employee.service');
const productInfoService = require('../api/productInfo.service');
const authorize = require('_helpers/authorize');
const Role = require('_helpers/role');
const authenticate = require('../controller/user.controller');


// routes user
router.post('/authenticate', authenticate)
router.get('/', authorize(Role.Admin), getAll); // admin only
router.get('/employeeAdmin', getAllAdmin );                       
router.get('/employee', getAllEmployee);       // admin only
router.get('/:id', getEmployeeByID);                     // all authenticated users
router.post('/register', (req, res) => {
  userService.create(req.body)
    .then(user => {
      let token = jwt.sign({ sub: user.id, role: user.role }, config.secret)
      res.json({ token: token })
    })
    .catch(err => {
      res.send('error: ' + err)
    })
});
router.post('/registerEmployee',authorize(Role.Admin) ,(req, res) => {
  employeeService.create(req.body)
    .then(employee => {
      let token = jwt.sign({ sub: employee.id }, config.secret)
      res.json({ token: token })
    })
    .catch(err => {
      res.send('error: ' + err)
    })
});

router.post('/updateEmployee',authorize(Role.Admin) ,(req, res) => {
  employeeService.update(req.body)
    .then(employee => res.json(employee))
    .catch(err => {
      res.send('error: ' + err)
    });
})



function getAll(req, res, next) {
  userService.getAll()
    .then(users => res.json(users))
    .catch(err => next(err));
}

function getAllAdmin(req, res, next) {
  userService.getAllAdmin()
    .then(users => res.json(users))
    .catch(err => next(err));
}

function getEmployeeByID(req, res, next) {
  const currentUser = req.user;
  const id = parseInt(req.params.id);

  // only allow admins to access other user records
  // if (id !== currentUser.sub && currentUser.role !== Role.Admin) {
  //   return res.status(401).json({ message: 'Unauthorized' });
  // }

  employeeService.getEmployeeByID(req.params.id)
    .then(user => user ? res.json(user) : res.sendStatus(404))
    .catch(err => next(err));
}



function getAllEmployee(req, res, next) {
  employeeService.getAllEmployee()
    .then(employees => res.json(employees))
    .catch(err => next(err));
}

// function getAllProduct(req, res, next) {
//   productInfoService.getAllProduct()
//     .then(products => res.json(products))
//     .catch(err => next(err));
// }

module.exports = router;