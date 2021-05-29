const router = require('express').Router()
const placeCtrl = require('../controllers/place.controller')
const { authJwt } = require("../middlewares")

router.route("/place")
    .get(placeCtrl.getPlaces)
    .post(placeCtrl.createPlace)

router.route('/place/:id')
    .delete(placeCtrl.deletePlace)
    .put(placeCtrl.updatePlace)

module.exports = router
