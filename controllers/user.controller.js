exports.allAccess = (req, res) => {
    res.status(200).send("Public content")
}
exports.userBoard = (req, res) => {
    res.status(200).send("Guest content")
}
exports.adminBoard = (req, res) => {
    res.status(200).send("Admin content")
}
exports.moderatorBoard = (req, res) => {
    res.status(200).send("Member content")
}