const router = require('express').Router()
const tripCtrl = require('../controllers/trip.controller')

router.route("/trip")
    .get(tripCtrl.getTrips)
    .post(tripCtrl.createTrip)

router.route('/trip/:id')
    .delete(tripCtrl.deleteTrip)
    .put(tripCtrl.updateTrip)

module.exports = router