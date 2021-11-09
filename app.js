const EXPRESS = require('express')
const path = require('path');
const APP = EXPRESS();
const { routing } = require('./src/routes/index.js');
const { connection } = require('./src/Db.js')
var expressLayouts = require('express-ejs-layouts');
const { initAPI } = require('./src/routes/api')
var morgan = require('morgan')

APP.use(expressLayouts);
APP.use(EXPRESS.static(path.join(__dirname, 'public')));
APP.use(morgan('combined'))
APP.use(EXPRESS.urlencoded({ extended: true }))
APP.use(EXPRESS.json());
APP.set('view engine', 'ejs');
APP.set('views', path.join(__dirname, 'views'));
APP.set('view options', { layout: './layouts/main.ejs' });
initAPI(APP);
routing(APP);

APP.use((req, res) => {
    res.render('./admin/404', { layout: './layouts/main.ejs' })
})
const PORT = process.env.PORT || 5000;
APP.listen(PORT);