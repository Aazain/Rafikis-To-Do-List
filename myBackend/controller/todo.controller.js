
module.exports = (app) => {
    app.get("/", function(req,res){
        const findData = Items.find(function(err,foundData){
            return res.send({
                foundData
        })
    })        
})
    
    app.post("/", function(req,res){
        const itemList = ({
            name: req.body.name
        })
        itemList.save(function(err){
            if (!err){
                res.send("Successfully added to DB")
            }else{
                res.send("Failed to add name to DB")
            }
        })
    })
}

