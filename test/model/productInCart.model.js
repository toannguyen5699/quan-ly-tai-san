const Sequelize = require('sequelize')
const db = require('../config/db');
const sequelize = db.sequelize;
const Model = Sequelize.Model;

async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array)
  }
}

class ProductInCartModel extends Model {
  timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  createMulti(data) {
    return new Promise(async (resolve, reject) => {
      await asyncForEach(data, async (item) => {
        await this.timeout(300);
        let insert = {}
        insert.productOrderID = item.productOrderID;
        insert.productInfoID = item.productInfoID;
        insert.amount = item.amount;
        insert.status = item.status;
        // insert.timeCreated = new Date().getTime();
        ProductInCartModel.create(insert).then(result => {
          resolve(result);
        }).catch(err => {
          reject(err);
        })
      })
    })
  }

  create(data) {
    return new Promise((resolve, reject) => {
      data.timeCreated = new Date().getTime();
      ProductInfoModel.create(data).then(result => {
        resolve(result);
      }).catch(err => {
        reject(err);
      })
    })
  }

  getNotification() {
    return new Promise((resolve, reject) => {
      let sql = `SELECT productInCart.id, productInCart.productOrderID,productInCart.productInfoID,productInCart.amount, productInfo.name,productOrder.status, productOrder.employeeIDrequest,productOrder.dateBorrow, productOrder.dateReturn FROM productInCart
                  INNER JOIN productInfo ON productInfo.id = productInCart.productInfoID
                  INNER JOIN productOrder ON productOrder.id = productInCart.productOrderID 
                  WHERE productOrder.status = 'WAIT'`;
      this.sequelize.query(sql, {
        type: this.sequelize.QueryTypes.SELECT
      }).then(result => {
        resolve(result);
      }).catch(err => {
        reject(err)
      })
    })
  }
}


ProductInCartModel.init({
  id: {
    field: 'id',
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  productOrderID: {
    field: 'productOrderID',
    type: Sequelize.INTEGER
  },
  productInfoID: {
    field: 'productInfoID',
    type: Sequelize.INTEGER
  },
  amount: {
    field: 'amount',
    type: Sequelize.INTEGER
  },
  status: {
    field: 'status',
    type: Sequelize.STRING
  },
  timeCreated: {
    field: 'timeCreated',
    type: Sequelize.INTEGER
  },
  timeModified: {
    field: 'timeModified',
    type: Sequelize.INTEGER
  },
  createdBy: {
    field: 'createdBy',
    type: Sequelize.INTEGER
  },
  modifiedBy: {
    field: 'modifiedBy',
    type: Sequelize.INTEGER
  }
}, {
    sequelize: sequelize,
    tableName: 'productInCart'
  });

module.exports = new ProductInCartModel();