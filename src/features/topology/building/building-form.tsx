import { Button, Group, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";

type BuildingFormProps = {
  submitFormValues: (values: BuildingFormValues) => void;
};

export type BuildingFormValues = {
  name: string;
};

export function BuildingForm({ submitFormValues }: BuildingFormProps) {
  const form = useForm<BuildingFormValues>({
    initialValues: {
      name: "",
    },
  });

  function submitForm(values: BuildingFormValues) {
    submitFormValues(values);
  }

  return (
    <form onSubmit={form.onSubmit(submitForm)}>
      <TextInput
        withAsterisk
        label="Name"
        placeholder="Building name"
        {...form.getInputProps("name")}
      />

      <Group position="right" mt="md">
        <Button type="submit">Submit</Button>
      </Group>
    </form>
  );
}
