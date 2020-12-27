const Items = require("../model/todo.model")

module.exports = (app) => {
    app.get("/", function(req,res){
        const findData = Items.find(function(err,foundData){
            if (err) {
                res.status(400).send({message: "Error getting todo list"})
            }
            return res.send({
                foundData
            })
         })    
        });  

    app.delete("/", function(req,res){
        Items.deleteOne(
            {_id: "5fe7e285a161e441dc78f0b2"}, 
        function(err){
            if (!err){
                res.send("Successfully Deleted Task")
            }else{
                console.log("Failed to Delete List Task")
            }
        })
    });

    app.post("/", function(req,res){
        const itemList = new Items({
            name: req.body.name
        })
        itemList.save()
    })

}

