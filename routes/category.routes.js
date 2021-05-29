const router = require('express').Router()
const categoryCtrl = require('../controllers/category.controller')
const { authJwt } = require("../middlewares")

router.route("/category")
    .get(categoryCtrl.getCategories)
    .post( categoryCtrl.createCategory)

router.route('/category/:id')
    .delete( categoryCtrl.deleteCategory)
    .put( categoryCtrl.updateCategory)

module.exports = router