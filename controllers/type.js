const Type = require("../models/Type");



const getTypes = async(req,res) => {

    try {
        const types = await Type.findAll();

        return res.status(201).send({
            status : "Success",
            data : {
                types : types
            }
        });


    } catch(err) {

        return res.status(400).send({
            status : "Fail"
        });
    };
};

const postType = async(req,res) => {
    const {name} = req.body;

    try {
        await Type.create({
            name
        });

        return res.status(201).send({
            status : "Success",
        });


    } catch(err) {

        return res.status(400).send({
            status : "Fail"
        });
    };
};

const deleteType = async(req,res) => {
    const id = req.params.id;

    try {
        await Type.destroy({
            where : {id}
        });

        return res.status(201).send({
            status : "Success",
        });


    } catch(err) {

        return res.status(400).send({
            status : "Fail"
        });
    };
};

const updateType = async(req,res) => {
    const id = req.params.id;
    const {name} = req.body;


    try {
         await Type.update({name:name},{where:{id:id}})
    } catch(err) {
        return res.status(400).send({
            status : "Fail"
        });
    };
};

module.exports = {getTypes,postType,deleteType,updateType}