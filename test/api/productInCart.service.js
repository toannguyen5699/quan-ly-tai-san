const ProductInfoModel = require('../model/productInfo.model');
const ProductInCartModel = require ('../model/productInCart.model');
const ProductOrderModel = require('../model/productOrder.model');

async function createMulti(data) {
  return new Promise((resolve, reject) => {
    ProductInCartModel.createMulti(data).then(resCreate => {
      console.log("..........", resCreate);
      return resolve({
        status: 200,
        msg: 'okk xong',
        data: resCreate
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

async function getNotification() {
  return new Promise((resolve, reject) => {
    ProductInCartModel.getNotification().then(resAllProduct => {
      return resolve({
        status: 200,
        msg: 'success',
        data: resAllProduct
      })
    }, err => {
      return resolve({
        status: 500,
        msg: 'loi'
      })
    })
  })
}

module.exports = {
  createMulti,
  getNotification
}