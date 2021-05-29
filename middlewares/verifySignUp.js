const db = require('../models');
const ROLES = db.ROLES;
const User = db.user;

checkDuplicateUsernameOrEmail = (req, res, next) => {
    //Username
    User.findOne({
        username: req.body.username
    }).exec((err, user) => {
        //Any Error exist
        if (err) {
            res.status(500).send({ message: err });
            return;
        }

        //Another already used this username
        if (user) {
            res.status(400).send({ message: 'Username is already in use' });
            return;
        }

        //Email
        User.findOne({
            email: req.body.email
        }).exec((err, user) => {
            //Any Error occur
            if (err) {
                res.status(500).send({ message: err });
                return;
            }

            //Another already used this email
            if (user) {
                res.status(400).send({ message: 'Email is already in use' });
                return;
            }

            next();
        })
    })
}

checkRoleExisted = (req, res, next) => {
    //User enter a role
    //Check
    if (req.body.roles) {
        //Pass through user inputs
        for (let i = 0; i < req.body.roles.length; i++) {
            //Input doesn't match with provided role
            if (!ROLES.includes(req.body.roles[i])) {
                res.status(400).send({
                    message: `Role ${req.body.roles[i]} does not exist`
                })
                return;
            }
        }
    }
    next();
}

const verifySignUp = {
    checkDuplicateUsernameOrEmail,
    checkRoleExisted
};

module.exports = verifySignUp;