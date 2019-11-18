const Sequelize = require('sequelize')
const db = require('../config/db');
const sequelize = db.sequelize;
const Model = Sequelize.Model;

class ProductInfoModel extends Model {
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

  getAllProduct() {
    return new Promise((resolve, reject) => {
      let sql = `SELECT * FROM productInfo`;
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

ProductInfoModel.init({
  id: {
    field: 'id',
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    field: 'name',
    type: Sequelize.STRING
  },
  description: {
    field: 'description',
    type: Sequelize.STRING
  },
  image: {
    field: 'image',
    type: Sequelize.STRING
  },
  type: {
    field: 'type',
    type: Sequelize.STRING
  },
  amountInWarehouse: {
    field: 'amountInWarehouse',
    type: Sequelize.INTEGER
  },
  employeeIDcreate: {
    field: 'employeeIDcreate',
    type: Sequelize.INTEGER
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
    tableName: 'productInfo',
    timestamps: false
  });

module.exports = new ProductInfoModel();