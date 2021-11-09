const { connection } = require('../Db.js')
const mysql = require('mysql2/promise')
const multer = require('multer');
const EXPRESS = require('express')
const path = require('path');
const APP = EXPRESS();
var appRoot = require('app-root-path')
class AdminController {
    //[HttpGet], render index
    async index(req, res) {
        const [rows, fields] = await connection.execute('SELECT * FROM `information`')
        res.render('../views/admin/index', { layout: 'layouts/main', abc: rows });
    }

    async abc(req, res) {
        var id = req.params.id;
        let [user] = await connection.execute('SELECT * FROM information WHERE id= ?', [id])
        console.log('check: ', user)
        res.render('../views/admin/edit', { data: user[0], layout: 'layouts/main' })
    }

    async delete(req, res) {
        var id = req.params.id;
        await connection.execute('DELETE FROM information WHERE id= ?', [id])
        res.redirect('/index')
    }

    async update(req, res) {
        var id = req.body.Id;
        var name = req.body.txtName;
        var age = req.body.txtAge;
        var email = req.body.txtEmail;
        var address = req.body.txtAddress;
        await connection.execute('UPDATE information SET name= ?, age= ?, email= ?, address= ? WHERE id= ?', [name, age, email, address, id])
        res.redirect('/index')
    }

    async def(req, res) {
        const name = req.body.txtName;
        const age = req.body.txtAge;
        const email = req.body.txtEmail;
        const address = req.body.txtAddress;
        console.log('def: ', name)
        await connection.execute('insert into information(name,email,age,address)values(?,?,?,?)', [name, email, age, address])
        res.redirect('/index')
    }

    async uploadFile(req, res) {
        let upload = multer().single('file')
        upload(req, res, function(err) {
            // req.file contains information of uploaded file
            // req.body contains information of text fields, if there were any

            if (req.fileValidationError) {
                return res.send(req.fileValidationError);
            } else if (!req.file) {
                return res.send('Please select an image to upload');
            } else if (err instanceof multer.MulterError) {
                return res.send(err);
            } else if (err) {
                return res.send(err);
            }

            // Display uploaded image for user validation
            res.send(`You have uploaded this image: <hr/><img src="/images/${req.file.filename}" width="500"><hr /><a href="./">Upload another image</a>`);
        });
    }
    async uploadMultiple(req, res) {
        const multiple = multer().array('mulFile');

        if (req.fileValidationError) {
            return res.send(req.fileValidationError);
        } else if (!req.files) {
            return res.send('Please select an image to upload');
        }

        let result = "You have uploaded these images: <hr />";
        const files = req.files;
        let index, len;

        // Loop through all the uploaded images and display them on frontend
        for (index = 0, len = files.length; index < len; ++index) {
            result += `<img src="/images/${files[index].filename}" width="300" style="margin-right: 20px;">`;
        }
        result += '<hr/><a href="./">Upload more images</a>';
        res.send(result);;



    }
}


module.exports = new AdminController;