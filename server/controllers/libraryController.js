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

let bookView = async(req,res) =>{
    let viewObj = await libraryModel.find();
    res.send({
        status:1,
        msg:"Available Books",
        viewObj
    })
}

let bookDelete = async(req,res)=>{
    let bookId = req.params.id;
    let delRes = await libraryModel.deleteOne({_id:bookId});

    res.send({
        status:1,
        msg:"Deleted succesfully",
        delRes
    })
}

let bookUpdate = async(req,res)=>{
    let bookId = req.params.id;
    let {bCode,bName,bAuthor,bPrice} = req.body;
    let newObj = {bCode,bName,bAuthor,bPrice};

    let updateRes = await libraryModel.updateOne({_id:bookId},newObj);
    res.send({
        status:1,
        msg:"Updated the book details",
        updateRes
    })
}

let getSingleBook = async(req,res)=>{
    let id=req.params.id;
    let viewRes = await libraryModel.findOne({_id:id});
    res.send({
        status:1,
        msg:"Book details",
        viewRes
    })
}

module.exports = {bookInsert,bookView,bookDelete,bookUpdate,getSingleBook};