const Items = require("../model/todo.model")

module.exports = (app) => {

    app.get("/todo/:id", function(req, res) {
        const {
            id
        } = req.params;
        console.log(id)
        Items.findById(id, function(err, foundData) {
            if (err) {
                res.status(404)
                res.send("Task not found")
            } else {
                res.send(foundData)
            }
        })

    });

    app.get("/todo", function(req, res) {
        const findData = Items.find(function(err, foundData) {
            if (err) {
                res.status(400).send({
                    message: "Error getting todo list"
                })
            }
            return res.send([
                ...foundData
            ])
        })
    });

    app.delete("/todo/:id", function(req, res) {
        const {
            id
        } = req.params
        console.log(id)
        Items.findByIdAndRemove({
                _id: id
            },
            function(err, result) {
                if (!err) {
                    res.send("Successfully Deleted Task")
                } else {
                    res.status(500).send("Unable to delete task, ")
                }
            })
    });

    app.post("/todo", function(req, res) {
        const itemList = new Items({
            name: req.body.name,
            status: req.body.status
        })
        itemList.save().then(() => {
                return res.send("Successfully added task to list");
            })
            .catch((err) => {
                res.status(500)
            })
    })

    app.patch("/todo/:id", function(req, res) {
        const {
            id
        } = req.params;
        const {
            name
        } = req.body;
        console.log(id);
        Items.updateOne({
                _id: id
            }, {
                $set: {
                    name
                }
            },
            function(err) {
                if (!err) {
                    res.send("Successfully edited Task")
                } else {
                    res.send("Failed to edit task")
                }
            }
        )

    })
}