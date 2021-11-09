const EXPRESS = require('express');
const routing = EXPRESS.Router();
const admin = require('../Controller/AdminController.js')
const api = require('../Controller/APIController')


const initAPI = (APP) => {
    routing.get('/users', api.getAllUsers);
    return APP.use('/api/v1/', routing)
}
module.exports = { initAPI }