const City = require('../models/city.model')
const Place = require('../models/place.model')

const cityCtrl = {
    getCities: async(req, res) =>{
        try {
            const cities = await City.find()
            res.json(cities)
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    createCity: async(req, res) =>{
        try {
            const {city_id, name, description, images, lat, lng} = req.body;
            if(!images) return res.status(400).json({msg: "No image upload"})

            const city = await City.findOne({city_id})
            if(city)
                return res.status(400).json({msg:"This city already exists"})

            const newCity = new City({
                city_id, name: name.toLowerCase(), description, images, lat, lng
            })

            await newCity.save()
            res.json({msg: "Created city"})

        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    deleteCity: async(req, res) =>{
        try {
            const place = await Place.findOne({city: req.params.id})
            if(place) return res.status(400).json({
                msg: "Please delete all places with a relationship."
            })
            await City.findByIdAndDelete(req.params.id)
            res.json({msg: "Deleted a city"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    updateCity: async(req, res) =>{
        try {
            const {name, description, images, lat, lng} = req.body;
            if(!images) return res.status(400).json({msg: "No image upload"})

            await City.findOneAndUpdate({_id: req.params.id}, {
                name: name.toLowerCase(), description, images, lat, lng
            })

            res.json({msg: "Updated a city"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    }
}


module.exports = cityCtrl