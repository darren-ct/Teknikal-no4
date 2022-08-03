const Type = require("../models/Type");

const getType = async(req,res) => {
    const id = req.params.id;

    try {


        const type = await Type.findOne({where:{id}});

        if(!type) {
            return res.status(400).send({
                status:"fail"
            })
        };

        
        return res.status(201).send({
            status : "Success",
            data : {
                type : type
            }
        });


    } catch(err) {

        return res.status(400).send({
            status : "Fail"
        });
    };

}

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
    console.log(name)

    try {
         await Type.update({name:name},{where:{id:id}})

         console.log("masuk 2")

         return res.status(201).send({
            status:"Success"
         })
         
    } catch(err) {
        return res.status(400).send({
            status : "Fail"
        });
    };
};

module.exports = {getType,getTypes,postType,deleteType,updateType}