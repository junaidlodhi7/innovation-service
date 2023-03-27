'use strict';
import {
  Model, UUIDV4
} from 'sequelize';

interface ScheduleAttributes {
  id:string;
  to:string;
  from:string;
  startTime:Date;
  endTime:Date;
  categoryId:number;
  createdAt:Date;
  updatedAt:Date;
}

module.exports = (sequelize:any, DataTypes:any) => {
  class schedule extends Model<ScheduleAttributes> implements ScheduleAttributes {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    id!:string;
    to!:string;
    from!:string;
    startTime!:Date;
    endTime!:Date;
    categoryId!:number;
    createdAt!:Date;
    updatedAt!:Date;
    static associate(models:any) {
      // define association here
    }
  }
  schedule.init({
    to:{      
      type: DataTypes.STRING,
      allowNull: true,},
    from:{
      type: DataTypes.STRING,
      allowNull: true,
    },
    startTime:{
      type: DataTypes.STRING,
      allowNull: true,
    },
    endTime:{
      type: DataTypes.STRING,
      allowNull: true,
    },
    id:{
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement:true
    },
    categoryId:{
      type: DataTypes.INTEGER,
      references: {
        model: 'categories',
        key: 'id', 
     }
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
    modelName: 'schedule',
  });
  return schedule;
};