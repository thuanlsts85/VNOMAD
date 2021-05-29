const router = require('express').Router()
const cityCtrl = require('../controllers/city.controller')
const { authJwt } = require("../middlewares")

router.route("/city")
    .get(cityCtrl.getCities)
    .post([authJwt.verifyToken, authJwt.isAdmin], cityCtrl.createCity)

router.route('/city/:id')
    .delete([authJwt.verifyToken, authJwt.isAdmin], cityCtrl.deleteCity)
    .put([authJwt.verifyToken, authJwt.isAdmin], cityCtrl.updateCity)

module.exports = router