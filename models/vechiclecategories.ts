'use strict';
import {
  Model
} from 'sequelize';

interface VechicleCategoriesAttributes {
  categoryId:number;
  vehicleId:number;
  createdAt:Date;
  updatedAt:Date;

} 
module.exports = (sequelize:any, DataTypes:any) => {
  class VechicleCategories extends Model<VechicleCategoriesAttributes> implements VechicleCategoriesAttributes {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
     categoryId!:number;
     vehicleId!:number;
     createdAt!:Date;
     updatedAt!:Date;
    static associate(models:any) {
      // define association here
      VechicleCategories.belongsTo(models.vehicle);
    }
  }
  VechicleCategories.init({
    categoryId:{      
      type: DataTypes.INTEGER,
      allowNull: true,},

    vehicleId:{
      type: DataTypes.INTEGER,
      allowNull: true,
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
    modelName: 'VechicleCategories',
  });
  return VechicleCategories;
};