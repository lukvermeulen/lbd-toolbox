import { Button, Group, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";

type PictureFormProps = {
  submitFormValues: (values: PictureFormValues) => void;
};

export type PictureFormValues = {
  name: string;
};

export function PictureForm({ submitFormValues }: PictureFormProps) {
  const form = useForm<PictureFormValues>({
    initialValues: {
      name: "",
    },
  });

  function submitForm(values: PictureFormValues) {
    submitFormValues(values);
  }

  return (
    <form onSubmit={form.onSubmit(submitForm)}>
      <TextInput
        withAsterisk
        required
        label="Name"
        placeholder="Picture name"
        {...form.getInputProps("name")}
      />

      <Group position="right" mt="md">
        <Button type="submit">Submit</Button>
      </Group>
    </form>
  );
}
