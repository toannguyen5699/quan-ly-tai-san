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
}

UserModel.init({
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  firstname: {
    type: Sequelize.STRING
  },
  lastname: {
    type: Sequelize.STRING
  },
  username: {
    type: Sequelize.STRING
  },
  password: {
    type: Sequelize.STRING
  },
  role: {
    type: Sequelize.STRING
  }
},  {
    sequelize,
    tableName: 'users',
    timestamps: false
});

module.exports = UserModel;



// const Sequelize = require('sequelize')
// const db = require('../config/db')

// module.exports = db.sequelize.define(
//   'user',
//   {
//     id: {
//       type: Sequelize.INTEGER,
//       primaryKey: true,
//       autoIncrement: true
//     },
//     first_name: {
//       type: Sequelize.STRING
//     },
//     last_name: {
//       type: Sequelize.STRING
//     },
//     email: {
//       type: Sequelize.STRING
//     },
//     password: {
//       type: Sequelize.STRING
//     },
//     created: {
//       type: Sequelize.DATE,
//       defaultValue: Sequelize.NOW
//     }
//   },
//   {
//     timestamps: false
//   }
// )