const ProductInfoModel = require('../model/productInfo.model');
const productInCart = require ('../model/productInCart.model');
const ProductOrderModel = require('../model/productOrder.model');

async function getAllProduct() {
  return new Promise((resolve, reject) => {
    ProductInfoModel.getAllProduct().then(resAllProduct => {
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

async function create(data) {
  return new Promise((resolve, reject) => {
    ProductInfoModel.create(data).then(resCreate => {
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

module.exports = {
  getAllProduct,
  create
}