const { connection } = require('../Db.js')

let getAllUsers = async(req, res) => {

    const [rows, fields] = await connection.execute('SELECT * FROM information')
    return res.status(200).json({
        message: 'ok',
        data: rows
    })
}

let createNew = async(req, res) => {
    await connection.execute('insert into information(name,email,age,address)values(?,?,?,?)', [name, email, age, address])
    res.status(200).json({
        message: 'ok'
    })
}
module.exports = { getAllUsers, createNew };