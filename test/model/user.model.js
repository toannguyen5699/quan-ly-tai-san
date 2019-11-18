const Sequelize = require('sequelize')
const db = require('../config/db');
const sequelize = db.sequelize;
const Model = Sequelize.Model;

class UserModel extends Model {
  create(data) {
    return new Promise((resolve, reject) => {
      data.created = new Date().getTime();
      UserModel.create(data).then(result => {
        resolve(result);
      }).catch(err => {
        reject(err);
      })
    })
  }

  checkUsername(username) {
    return new Promise((resolve, reject) => {
      let sql = `SELECT * FROM users WHERE LOWER(username) = LOWER('${username}')`;
      this.sequelize.query(sql, {
        type: this.sequelize.QueryTypes.SELECT
      }).then(result => {
        resolve(result);
      }).catch(err => {
        reject(err)
      })
    })
  }

  checkUserID(id) {
    return new Promise((resolve, reject) => {
      let sql = `SELECT * FROM users WHERE id = '${id}'`;
      this.sequelize.query(sql, {
        type: this.sequelize.QueryTypes.SELECT
      }).then(result => {
        resolve(result);
      }).catch(err => {
        reject(err)
      })
    })
  }

  checkEmployeeID(employeeID) {
    return new Promise((resolve, reject) => {
        let sql = `SELECT * FROM users WHERE employeeID = '${employeeID}'`;
        this.sequelize.query(sql, {
            type: this.sequelize.QueryTypes.SELECT
        }).then(result => {
            resolve(result);
        }).catch(err => {
            reject(err)
        })
    })
  }

  checkPassword(username, password) {
    return new Promise((resolve, reject) => {
      let sql = `SELECT * FROM users WHERE username = '${username}' AND password = '${password}'`;
      this.sequelize.query(sql, {
        type: this.sequelize.QueryTypes.SELECT
      }).then(result => {
        resolve(result);
      }).catch(err => {
        reject(err)
      })
    })
  }

  getAll() {
    return new Promise((resolve, reject) => {
      let sql = `SELECT * FROM users`;
      this.sequelize.query(sql, {
        type: this.sequelize.QueryTypes.SELECT
      }).then(result => {
        resolve(result);
      }).catch(err => {
        reject(err)
      })
    })
  }

  // search(data){
  //   return new Promise((resolve, reject) => {
  //     let sql = `SELECT * FROM users`;
  //     this.sequelize.query(sql, {
  //       type: this.sequelize.QueryTypes.SELECT
  //     }).then(res => {
  //         console.log("data :", res);
  //         resolve(res)
  //     }).catch(err => {
  //       reject(err);
  //     })
  //     })
  // }

  getAllAdmin() {
    return new Promise((resolve, reject) => {
      let sql = `SELECT employee.*, users.role FROM users
                  INNER JOIN employee ON users.employeeID = employee.id  
                  WHERE role = 'Admin'`;
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

UserModel.init({
  id: {
    field: 'id',
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  username: {
    field: 'username',
    type: Sequelize.STRING
  },
  password: {
    field: 'password',
    type: Sequelize.STRING
  },
  employeeID: {
    field: 'employeeID',
    type: Sequelize.INTEGER
  },
  timeCreated: {
    field: 'timeCreated',
    type: Sequelize.INTEGER
  },
  createdBy: {
    field: 'createdBy',
    type: Sequelize.INTEGER
  },
  modifiedBy: {
    field: 'modifiedBy',
    type: Sequelize.STRING
  },
  role: {
    field: 'role',
    type: Sequelize.STRING
  }
}, {
    sequelize,
    tableName: 'users',
    timestamps: false
  });

module.exports = new UserModel();
