const Items = require("../model/todo.model")

module.exports = (app) => {
    app.get("/todo", function(req,res){
        const findData = Items.find(function(err,foundData){
            if (err) {
                res.status(400).send({message: "Error getting todo list"})
            }
            return res.send({
                foundData
            })
         })
        });  
    
    app.delete("/todo/:id", function(req,res){
        Items.findByIdAndRemove(
            {_id: ""},
        function(err){
            if (!err){
                res.send("Successfully Deleted Task")
            }else{
                res.send("Failed to Delete List Task")
            }
        })
    });

    app.post("/todo", function(req,res){
        const itemList = new Items({
            name: req.body.name,
            status: req.body.status
        })
        itemList.save()
    })

    app.patch("/todo/:id", function(req,res){
        const {id} = req.query;
        console.log(id);
        Items.updateOne(
            {id},
            {$set: {name: req.body}},
            function(err){
                if(!err){
                    res.send("Successfully edited Task")
                } else{
                    res.send("Failed to edit task")
                }
            }
        )

    })
    
}






// app.get("/todo/:id", function(req,res){
//     const {id} = req.params;
//     console.log(id);
//     const findData = Items.find(function(err,foundData){
//         if (err) {
//             res.status(400).send({message: "Error getting todo list"})
//         }
//         return res.send({
//             foundData
//         })
//      })
//     });  