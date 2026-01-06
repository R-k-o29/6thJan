let {libraryModel} = require('../models/libraryModel.model')

let bookInsert = (req,res)=>{
    let {bCode,bName,bAuthor,bPrice} = req.body;
    let insertObj = new libraryModel({
        bCode,
        bName,
        bAuthor,
        bPrice
    });

    insertObj.save().then(()=>{
        res.send({
            status:1,
            msg:"Inserted successfully",
        })
    }).catch((err)=>{
        res.send({
            status:0,
            msg:"Data Not inserted",
            err
        })
    })
}


module.exports = {bookInsert};