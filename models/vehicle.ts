'use strict';
import {
  Model, UUIDV4
} from 'sequelize';


interface VehicleAttributes {
  id:string;
  name:string;
  type:string;
  createdAt:Date;
  updatedAt:Date;
}

module.exports = (sequelize:any, DataTypes:any) => {
  class vehicle extends Model<VehicleAttributes>  implements VehicleAttributes {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
     id!:string;
     name!:string;
     type!:string; 
     createdAt!:Date;
     updatedAt!:Date;
    static associate(models:any) {
      // define association here
      vehicle.belongsToMany(models.categories ,{
        through:'VechicleCategories'
      })
    }
  }
  vehicle.init({
    name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    type:{
      type: DataTypes.STRING,
      allowNull: true,
    },
    id:{
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement:true
    },
    createdAt:{
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    updatedAt:{
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },

  }, {
    sequelize,
    modelName: 'vehicle',
  });
  return vehicle;
};