const config = require('config.json');
const jwt = require('jsonwebtoken');
const Role = require('_helpers/role');
const UserModel = require('../model/user.model');

module.exports = {
    getAll,
    getById,
    login,
    create,
    getAllAdmin
};

async function getAll() {
    return new Promise((resolve, reject) => {
        UserModel.getAll().then(resAllUser => {
            return resolve ({
                status: 200,
                msg: 'success',
                data: resAllUser
            })
        }, err => {
            return resolve ({
                status: 500,
                msg: 'loi'
            })
        })
    })
}

async function getById(id) {
    return new Promise((resolve, reject) => {
        UserModel.checkUserID(id).then(resId => {
            return resolve ({
                status: 200,
                msg: 'success',
                data: resId[0]
            })
        })
    })
}

async function getAllAdmin() {
    return new Promise((resolve, reject) => {
        UserModel.getAllAdmin().then(resAllUser => {
            return resolve ({
                status: 200,
                msg: 'success',
                data: resAllUser
            })
        }, err => {
            return resolve ({
                status: 500,
                msg: 'loi'
            })
        })
    })
}

async function login({ username, password }) {
    return new Promise((resolve, reject) => {
        UserModel.checkUsername(username).then(resUsername => {
            if (resUsername && resUsername.length === 0) {
                return resolve({
                    status: 501
                })
            } else {
                UserModel.checkPassword(username, password).then(resPassword => {
                    if (!resPassword) {
                        return resolve({
                            status: 502
                        })
                    } else {
                        // console.log(resPassword[0]);
                        const token = jwt.sign({ sub: resPassword[0].id, role: resPassword[0].role }, config.secret, {
                            expiresIn: (Math.floor(new Date().getTime() / 1000) + (7 * 24 * 60 * 60)) * 1000
                        });
                        const { password, ...userWithoutPassword } = resPassword[0];
                        return resolve({
                            ...userWithoutPassword,
                            token
                        })
                    }
                }, err1 => {
                    log.error("------------------ err1 : ", err1);
                    return resolve({
                        status: 500,
                        err: err1
                    })
                })
            }
        }, err => {
            log.error("------------------ err : ", err);
            return resolve({
                status: 500,
                err: err
            })
        })
    })
}

async function create(data) {
    UserModel.create(data).then(resCreate => {
        console.log(resCreate.dataValues);
        return resolve({
            status: 200,
            msg: 'okk xong',
            data: resCreate.dataValues
        })
    }),err1 => {
        log.error("------------------ err1 : ", err1);
        return resolve({
            status: 500,
            err: err1
        })
    }
}

