const path = require('path');
const express = require('express');
const router = express.Router();
const userService = require('../api/user.service');
const employeeService = require('../api/employee.service');
const productInfoService = require('../api/productInfo.service');
const productOrderService = require('../api/productOrder.service');
const productInCartService = require('../api/productInCart.service');
const authorize = require('_helpers/authorize');
const Role = require('_helpers/role');
const authenticate = require('../controller/user.controller');

router.post('/registerProduct',(req, res) => {
  productInfoService.create(req.body)
    .then(products => res.json(products))
    .catch(err => {
      res.send('error: ' + err)
    })
});

router.post('/borrowProduct',(req, res) => {
  console.log(req.body);
  productInCartService.createMulti(req.body)
    .then(products => res.json(products))
    .catch(err => {
      res.send('error: ' + err)
    })
});

router.get('/list-product', getAllProduct);
router.get('/product-order', getAllProductOrder);
router.get('/order-detail', getAllOrderOfWait)
router.get('/notification', getNotification);
router.post('/update-status', (req, res) => {
  console.log(req.body);
  productOrderService.updateStatus(req.body.id)
    .then(notification => res.json(notification))
    .catch(err => {
      res.send('error: ' + err)
    });
  })

function getAllOrderOfWait(req, res, next) {
  productOrderService.getAllOrderOfWait() 
    .then(orders => res.json(orders))
    .catch(err => next(err))
}


function getNotification(req, res, next) {
  productInCartService.getNotification()
    .then(notifications => res.json(notifications))
    .catch(err => next(err));
}

function getAllProduct(req, res, next) {
  productInfoService.getAllProduct()
    .then(products => res.json(products))
    .catch(err => next(err));
}

function getAllProductOrder(req, res, next) {
  productOrderService.getAllProductOrder()
    .then(productOrders => res.json(productOrders))
    .catch(err => next(err));
}

router.post('/registerProductOrder',(req, res) => {
  productOrderService.create(req.body)
    .then(products => res.json(products))
    .catch(err => {
      res.send('error: ' + err)
    })
});

module.exports = router;

