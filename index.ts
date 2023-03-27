import express from 'express';
const app = express();
const port = process.env.PORT || 3000;
import db from './models';
import bodyParser from 'body-parser';
import validateVehicle from './validations/vehicle-validation';
import ValidateSchedule from './validations/schedule-validation';
import ValidateCategory from './validations/category-validation';
import z from 'zod';
app.use(bodyParser.json());

app.get('/health', (req, res) => {
  return res.json({message:'Up and running',status:'Okay'})
});

app.get('/vehicle', (req, res) => {
        db.vehicle.findAll({
        include: [{model: db.categories,include: [
          {model: db.schedule}
        ] }]
    }).then((result: object) => res.status(200).json(result)).catch((err: object) => console.error(err));
});


app.post('/vehicle', async (req, res) => {
    let {vehicle,category,schedule} = req.body;
    const t = await db.sequelize.transaction();
    try {
      validateVehicle(vehicle);
      ValidateSchedule(schedule);
      ValidateCategory(category);
      let createdVehicle = await db.vehicle.create(vehicle);
      let createdCategory = await db.categories.create(category);
     
      let createdVehicleCategory = await db.VechicleCategories.create(
        {
        categoryId:createdCategory.id,
        vehicleId:createdVehicle.id
      });

      let createdSchedule = await db.schedule.create({...schedule,categoryId:createdCategory.id});
      await t.commit();
      return res.status(201).json({message:'created'});
    } catch (error) {
      await t.rollback();
      if(error  instanceof(z.ZodError)){
        return res.status(400).json(error);
      }
      else{
        return res.status(500).json(error);
      }
    }

    
});


db.sequelize.sync().then(() => {
    app.listen(port, () => {
        console.log(`App listening on port ${port}`)
    })
})