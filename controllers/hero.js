const Hero = require("../models/Hero");
const Type = require("../models/Type");
const { QueryTypes } = require('sequelize');
const sequelize = require('../config/connect');

const fs = require('fs');
const path = require("path"); 

const getHeros = async(req,res) => {
    const query = `
    SELECT hero_tb.id,hero_tb.name AS name , photo , type_tb.name AS type FROM 
    hero_tb INNER JOIN type_tb
    ON hero_tb.type_id = type_tb.id
    `;

    try {
        const heros = await sequelize.query(query,{type:QueryTypes.SELECT});

        return res.status(201).send({
            status : "Success",
            data : {
                heros : heros.map(hero => {return {...hero,photo: "http://localhost:5000/" + hero.photo}})
            }
        });


    } catch(err) {

        return res.status(400).send({
            status : "Fail"
        });
    };
};

const getHero = async(req,res) => {
    const id = req.params.id;

    const query = `
    SELECT hero_tb.name AS name , photo , type_tb.name AS type FROM 
    hero_tb INNER JOIN type_tb 
    ON hero_tb.type_id = type_tb.id AND hero_tb.id = ${id}
    `;

    try {
        const hero = await sequelize.query(query,{type:QueryTypes.SELECT});

        return res.status(201).send({
            status : "Success",
            data : {
                hero : {...hero, photo: "http://localhost:5000/" + hero.photo}
            }
        });


    } catch(err) {

        return res.status(400).send({
            status : "Fail"
        });
    };
};

const postHero = async(req,res) => {
    const {name,type} = req.body;

    console.log(name,type,req.file)

    if(!req.file){
        return res.status(400).send({
            status : "Fail",
            message : "No image found"
        })
    }
    const photo = req.file.filename;
    

    const typeObj = await Type.findOne({where:{name:type},attributes:["id"]});

    if(!typeObj){
        return res.status(400).send({
            status : "Fail"
        })
    };

    const type_id = typeObj.id;

    try {
        //const query = ` INSERT INTO hero_tb (name,type_id,photo)
        // VALUES (${name},${type_id},${photo})`;

        // await sequelize.query(query,{type:QueryTypes.INSERT});
        await Hero.create({
               name,
               type_id,
               photo
        });

        return res.status(201).send({
            status : "Success"
        });

    } catch(err) {
        
        return res.status(400).send({
            status : "Fail"
        });
    }
};

const deleteHero = async(req,res) => {
    const id = req.params.id;

    try {
        await Hero.destroy({where:{id:id}})

        return res.status(201).send({
            status : "Success"
        });
    } catch(err) {
        return res.status(400).send({
            status : "Fail"
        });
    }
};

const updateHero = async(req,res) => {
    const id = req.params.id;
    const {name,type} = req.body;
    

    try {
      
        const typeObj = await Type.findOne({where:{name:type},attributes:["id"]});

        if(!typeObj){
            return res.status(400).send({
                status : "Fail"
            })
        };
    
        const type_id = typeObj.id;


        if(!req.file){
            await Hero.update({name,type_id},{where:{id:id}})
        } else {
            const old = await Hero.findOne({where:{id:id}});

            if(!old){
                return res.status(400).send({
                    status: "Fail"
                })
            };

            const oldImage = old.photo;

            await Hero.update({
                photo : req.file.filename,
                name : name,
                type_id
           },{
               where : {
                    id : id
               }
           });
   
           
           fs.unlink(path.join(__dirname,"..","uploads",oldImage),(err)=>{console.log(err)});
           
        }
       

        return res.status(201).send({
            status : "Success"
        });
    } catch(err) {
        return res.status(400).send({
            status : "Fail"
        });
    };
}

module.exports = {getHeros,getHero,postHero,deleteHero,updateHero}