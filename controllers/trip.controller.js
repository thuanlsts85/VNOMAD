const Trip = require('../models/trip.model')

const tripCtrl = {
    getTrips: async (req, res) => {
        try {
            const trips = await Trip.find()
            res.json(trips)
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    createTrip: async (req, res) => {
        try {
            const { title, note, city, place, startDate, endDate, email } = req.body;
            const x = parseInt(startDate.replace(/-/g, ""))
            const y = parseInt(endDate.replace(/-/g, ""))
            if (y < x) {
                return res.status(400).json({ msg: "end date must be after start date" })
            }

            const newTrip = new Trip({
                title: title.toLowerCase(), note, city, place, startDate, endDate, email
            })

            await newTrip.save()
            res.json({ msg: "Created trip" })

        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    deleteTrip: async (req, res) => {
        try {
            await Trip.findByIdAndDelete(req.params.id)
            res.json({ msg: "Deleted a trip" })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    updateTrip: async (req, res) => {
        try {
            const { title, note, city, place, startDate, endDate, email } = req.body;
            const x = parseInt(startDate.replace(/-/g, ""))
            const y = parseInt(endDate.replace(/-/g, ""))
            if (y < x) {
                return res.status(400).json({ msg: "end date must be after start date" })
            }
            await Trip.findOneAndUpdate({ _id: req.params.id }, {
                title: title.toLowerCase(), note, city, place, startDate, endDate, email
            })

            res.json({ msg: "Updated a trip" })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    }
}


module.exports = tripCtrl