import z from 'zod';

const schema = z.object(
  {

  name: z.string({
    required_error: "Name is required",
    invalid_type_error: "Name must be a string"
  })
}
);

type ValidateCategory = z.infer<typeof schema>

const ValidateCategory = (props: ValidateCategory) => {
  return schema.parse(props)
}

export default ValidateCategory;