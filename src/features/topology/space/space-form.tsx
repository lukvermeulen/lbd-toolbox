import { Button, Group, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";

type SpaceFormProps = {
  submitFormValues: (values: SpaceFormValues) => void;
};

export type SpaceFormValues = {
  name: string;
};

export function SpaceForm({ submitFormValues }: SpaceFormProps) {
  const form = useForm<SpaceFormValues>({
    initialValues: {
      name: "",
    },
  });

  function submitForm(values: SpaceFormValues) {
    submitFormValues(values);
  }

  return (
    <form onSubmit={form.onSubmit(submitForm)}>
      <TextInput
        withAsterisk
        label="Name"
        placeholder="Space name"
        {...form.getInputProps("name")}
      />

      <Group position="right" mt="md">
        <Button type="submit">Submit</Button>
      </Group>
    </form>
  );
}
