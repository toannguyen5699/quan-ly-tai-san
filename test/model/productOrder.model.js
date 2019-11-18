const Sequelize = require('sequelize')
const db = require('../config/db');
const sequelize = db.sequelize;
const Model = Sequelize.Model;

class ProductOrderModel extends Model {
  create(data) {
    return new Promise((resolve, reject) => {
      data.timeCreated = new Date().getTime();
      ProductOrderModel.create(data).then(result => {
        resolve(result);
      }).catch(err => {
        reject(err);
      })
    })
  }

  getAllProductOrder() {
    return new Promise((resolve, reject) => {
      let sql = `SELECT * FROM productOrder`;
      this.sequelize.query(sql, {
        type: this.sequelize.QueryTypes.SELECT
      }).then(result => {
        resolve(result);
      }).catch(err => {
        reject(err)
      })
    })
  }

  updateStatus(id) {
    return new Promise((resolve, reject) => {
      let sql = `UPDATE productOrder
                  SET status = 'ACCEPT'
                  WHERE id = '${id}'`;
      this.sequelize.query(sql, {
        type: this.sequelize.QueryTypes.SELECT
      }).then(result => {
        resolve(result);
      }).catch(err => {
        reject(err);
      })
    })
  }

  getAllOrderOfWait() {
    return new Promise((resolve, reject) => {
      let sql = `SELECT * FROM productOrder
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

ProductOrderModel.init({
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
  employeeIDrequest: {
    field: 'employeeIDrequest',
    type: Sequelize.INTEGER
  },
  employeeIDresponse: {
    field: 'employeeIDresponse',
    type: Sequelize.INTEGER
  },
  dateBorrow: {
    field: 'dateBorrow',
    type: Sequelize.INTEGER
  },
  dateReturn: {
    field: 'dateReturn',
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
    tableName: 'productOrder'
  });

module.exports = new ProductOrderModel();