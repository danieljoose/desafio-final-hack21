const api = require('../controllers/card-controller')

module.exports = (app) => {
    app.route('/cards')
        .get(api.findAll)
        .post(api.save);
    app.route('/cards/:id')
        .delete(api.del)
        .get(api.findById)
        .put(api.update);
}