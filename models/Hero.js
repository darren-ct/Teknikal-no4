const {DataTypes} = require("sequelize");
const sequelize = require("../config/connect");

const Hero = sequelize.define("hero_tb", {
    id:{type : DataTypes.INTEGER,autoIncrement:true,primaryKey:true},
    name:{type : DataTypes.STRING},
    type_id:{type : DataTypes.INTEGER},
    photo:{type : DataTypes.STRING}
   
},{
    timestamps:false,
    freezeTableName:true
})

Hero.sync()

module.exports = Hero;