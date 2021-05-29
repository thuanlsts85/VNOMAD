const Place = require('../models/place.model')

const placeCtrl = {
    getPlaces: async(req, res) =>{
        try {
            const places = await Place.find()
            res.json(places)
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    createPlace: async(req, res) =>{
        try {
            const {place_id, name, description, address, city, category, images, lat, lng, URLs} = req.body;
            if(!images) return res.status(400).json({msg: "No image upload"})

            const place = await Place.findOne({place_id})
            if(place)
                return res.status(400).json({msg:"This place already exists"})

            const newPlace = new Place({
                place_id, name: name.toLowerCase(), description, address, city, category, images, lat, lng, URLs
            })

            await newPlace.save()
            res.json({msg: "Created place"})

        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    deletePlace: async(req, res) =>{
        try {
            await Place.findByIdAndDelete(req.params.id)
            res.json({msg: "Deleted a place"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    updatePlace: async(req, res) =>{
        try {
            const {name, description, address, city, category, images, lat, lng, URLs} = req.body;
            if(!images) return res.status(400).json({msg: "No image upload"})

            await Place.findOneAndUpdate({_id: req.params.id}, {
                name: name.toLowerCase(), description, address, city, category, images, lat, lng, URLs
            })

            res.json({msg: "Updated a place"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    }
}


module.exports = placeCtrl