const config = require('config.json');
const jwt = require('jsonwebtoken');
const Role = require('_helpers/role');
const UserModel = require('./user.model');
const db = require('../config/db');
const sequelize = db.sequelize;
// users hardcoded for simplicity, store in a db for production applications
// const users = [
//     { id: 1, username: 'admin', password: 'admin', firstName: 'Admin', lastName: 'User', role: Role.Admin },
//     { id: 2, username: 'user', password: 'user', firstName: 'Normal', lastName: 'User', role: Role.User }
// ];

module.exports = {
    authenticate,
    getAll,
    getById
};

async function authenticate({ username, password }) {
    // const user = UserModel.findOne(u => u.username === username && u.password === password);
    const user = await UserModel.findOne({
        where: {
            username: username,
            password: password
        }
    })
    // .then(user => {
    if (user.dataValues) {
        const token = jwt.sign({ sub: user.dataValues.id, role: user.dataValues.role }, config.secret);
        // console.log(user.dataValues);
        const { password, ...userWithoutPassword } = user.dataValues;
        // const users = user.dataValues;
        // console.log(userWithoutPassword)
        return {
            ...userWithoutPassword,
            token
        };
    }
    // })
}

async function getAll() {
    // return users.map(u => {
    //     const { password, ...userWithoutPassword } = u;
    //     return userWithoutPassword;
    // });

    // const users = await 
    let sql = `SELECT * FROM users`;
    let users = await sequelize.query(sql, {
        type: sequelize.QueryTypes.SELECT
    })
    console.log(users)
    return users.map(u => {
        const { password, ...userWithoutPassword } = u
        console.log(userWithoutPassword);
        console.log(typeof(userWithoutPassword));
        return userWithoutPassword
    })
    // return userData
    //   then(res => {
    //         console.log("data :", res);
    //         resolve(res)
    //     }).catch(err => {
    //       reject(err);
    //     })
    // UserModel.findAll({
    //     attributes: ['id', 'firstname', 'lastname', 'username', 'role']
    //   })
    //   console.log(userData)
    //   return users.dataValues;
    // const { password, ...userWithoutPassword } = users.dataValues;
    // console.log(userWithoutPassword);
    // return userWithoutPassword;
}

async function getById(userDeviceId) {
    // const user = users.find(u => u.id === parseInt(id));
    // if (!user) return;
    // const { password, ...userWithoutPassword } = user;
    // return userWithoutPassword;

    const device = await UserModel.findOne({
        where: {
            id: userDeviceId
        }
    })
    if (!device) {
        return 'not find';
    }
    const { password, ...userWithoutPassword } = device.dataValues;
    // console.log(device.dataValues);
    return userWithoutPassword;
}