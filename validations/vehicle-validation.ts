import z from 'zod';

const schema = z.object(
  {

  name: z.string({
    required_error: "Name is required",
    invalid_type_error: "Name must be a string"
  }),
  type: z.string({
    required_error: "Name is required",
    invalid_type_error: "Name must be a string"
  })
}
);

type ValidateVehicle = z.infer<typeof schema>

const validateVehicle = (props: ValidateVehicle) => {
  return schema.parse(props)
}

export default validateVehicle;