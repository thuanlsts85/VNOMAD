const Category = require('../models/category.model')
const Place = require('../models/place.model')

const categoryCtrl = {
    getCategories: async(req, res) =>{
        try {
            const categories = await Category.find()
            res.json(categories)
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    createCategory: async (req, res) =>{
        try {
            //only admin can create, delete and update category
            const {name} = req.body;
            const category = await Category.findOne({name})
            if(category) return res.status(400).json({msg:"This category already exist."})

            const newCategory = new Category({name})

            await newCategory.save()
            res.json({msg:"Created a category"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    deleteCategory: async (req, res) =>{
        try {
            const place = await Place.findOne({category: req.params.id})
            if(place) return res.status(400).json({
                msg: "Please delete all places with a relationship."
            })
            //only admin can create, delete and update category
            await Category.findByIdAndDelete(req.params.id)
            res.json({msg:"Deleted a category"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    updateCategory: async (req, res) =>{
        try {
            //only admin can create, delete and update category
            const {name} = req.body;
            await Category.findByIdAndUpdate({_id: req.params.id}, {name})

            res.json({msg: "Updated a category"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    }
}

module.exports = categoryCtrl