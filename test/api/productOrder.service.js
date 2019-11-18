const ProductInfoModel = require('../model/productInfo.model');
const productInCart = require ('../model/productInCart.model');
const ProductOrderModel = require('../model/productOrder.model');

async function create(data) {
  return new Promise((resolve, reject) => {
    ProductOrderModel.create(data).then(resCreate => {
      console.log(resCreate.dataValues);
      return resolve({
        status: 200,
        msg: 'okk xong',
        data: resCreate.dataValues
      })
    }), err1 => {
      log.error("------------------ err1 : ", err1);
      return resolve({
        status: 500,
        err: err1
      })
    }
  })
}

async function getAllProductOrder() {
  return new Promise((resolve, reject) => {
    ProductOrderModel.getAllProductOrder().then(resAllEmployee => {
      return resolve({
        status: 200,
        msg: 'success',
        data: resAllEmployee
      })
    }, err => {
      return resolve({
        status: 500,
        msg: 'loi'
      })
    })
  })
}

async function getAllOrderOfWait() {
  return new Promise((resolve, reject) => {
    ProductOrderModel.getAllOrderOfWait().then(resAllEmployee => {
      return resolve({
        status: 200,
        msg: 'success',
        data: resAllEmployee
      })
    }, err => {
      return resolve({
        status: 500,
        msg: 'loi'
      })
    })
  })
}

async function updateStatus(id) {
  return new Promise((resolve, reject) => {
    ProductOrderModel.updateStatus(id).then(res1 => {
      return resolve({
        status: 200,
        data: res1
      })
    }).catch(err1 => {
      return resolve({
        status: 500,
        err: err1
      })
    })
  })
}

module.exports = {
  create,
  getAllProductOrder,
  updateStatus,
  getAllOrderOfWait
}