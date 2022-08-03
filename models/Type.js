const {DataTypes} = require("sequelize");
const sequelize = require("../config/connect");

const Type = sequelize.define("type_tb", {
    id : {
        type: DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
    },
    name : {
        type: DataTypes.STRING,
    }
},{
    timestamps:false,
    freezeTableName:true
})

Type.sync()

module.exports = Type;