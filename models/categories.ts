'use strict';
import {
  Model, UUIDV4
} from 'sequelize';

interface CategoryAttributes {
  id:string;
  name:string;
  createdAt:Date;
  updatedAt:Date;
}

module.exports = (sequelize:any, DataTypes:any) => {
  class categories extends Model<CategoryAttributes> implements CategoryAttributes {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    id!:string;
    name!:string;
    createdAt!:Date;
    updatedAt!:Date;
    static associate(models:any) {
      // define association here
      categories.belongsToMany(models.vehicle,{
        through:'VechicleCategories'
      })
      categories.hasMany(models.schedule)
    }
  }
  categories.init({
    name:{
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
    modelName: 'categories',
  });
  return categories;
};