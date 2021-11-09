const { router, initAPIS } = require('./admin.js')

function routing(APP) {
    APP.get('/', (req, res) => {
        res.render('login', { layout: 'layouts/main' })
    })

    // APP.get('/admin', (req, res) => {
    //     res.render('index', { layout: 'layouts/main' })
    // })
    initAPIS(APP);
    APP.use('/index', router)
}
module.exports = { routing }