const { DataTypes } = require("sequelize");
const { sequelize } = require("../config.js");



const Items = sequelize.define('Item', {
    id: {
        type: DataTypes.INTEGER, 
        allowNull: false,
        autoIncrement: true, 
        primaryKey: true
    },
    itemNameId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    storagePlaceId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    isActive:{
        type: DataTypes.BOOLEAN,
        allowNull: false
    }
    },  
    {
        tableName: 'items',
        timestamps: false
    }
);

module.exports = {  
    Items 
};
    