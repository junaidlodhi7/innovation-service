import z from 'zod';

const schema = z.object(
  {

  to: z.string({
    required_error: "Name is required",
    invalid_type_error: "Name must be a string"
  }),
  from: z.string({
    required_error: "Name is required",
    invalid_type_error: "Name must be a string"
  }),
  startTime: z.string().datetime(),
  endTime: z.string().datetime()
}
);

type ValidateSchedule = z.infer<typeof schema>

const ValidateSchedule = (props: ValidateSchedule) => {
  return schema.parse(props)
}

export default ValidateSchedule;