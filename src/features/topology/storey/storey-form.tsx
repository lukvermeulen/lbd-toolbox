import { Button, Group, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";

type StoreyFormProps = {
  submitFormValues: (values: StoreyFormValues) => void;
};

export type StoreyFormValues = {
  name: string;
};

export function StoreyForm({ submitFormValues }: StoreyFormProps) {
  const form = useForm<StoreyFormValues>({
    initialValues: {
      name: "",
    },
  });

  function submitForm(values: StoreyFormValues) {
    submitFormValues(values);
  }

  return (
    <form onSubmit={form.onSubmit(submitForm)}>
      <TextInput
        withAsterisk
        label="Name"
        placeholder="Storey name"
        {...form.getInputProps("name")}
      />

      <Group position="right" mt="md">
        <Button type="submit">Submit</Button>
      </Group>
    </form>
  );
}
