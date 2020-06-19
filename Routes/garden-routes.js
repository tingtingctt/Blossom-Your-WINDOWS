var db = require("../models");

module.exports = function(app) {
    // app.get("/api/garden", function(req, res) {
    //     db.User.findAll({
    //         include: [db.Chef]
    //     }).then(function(chefGetResults) {
    //         res.json(chefGetResults)
    //     })
    // })
    app.post("/api/garden/new/:uid", (req,res)=>{
        db.Plant.create({...req.body, UserId: req.params.uid}).then(data=>console.log(data))
})

    app.get("/api/garden/:uid", (req,res)=>{
    
    })
    
    app.put("/api/garden/location/:id", function(req, res) {

    })
}