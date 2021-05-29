const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = require('./user.model');
db.role = require('./role.model');
db.category = require('./category.model');
db.city = require('./city.model');
db.place = require('./place.model');
db.trip = require('./trip.model');

db.ROLES = ["user", "moderator", "admin"];

module.exports = db;