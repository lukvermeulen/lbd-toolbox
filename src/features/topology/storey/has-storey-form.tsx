import { Button, Group, MultiSelect, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";

type HasStoreyFormProps = {
  data: string[];
  submitFormValues: (values: HasStoreyFormValues) => void;
};

export type HasStoreyFormValues = {
  storeyName: string[];
};

export function HasStoreyForm({ data, submitFormValues }: HasStoreyFormProps) {
  const form = useForm<HasStoreyFormValues>({
    initialValues: {
      storeyName: [""],
    },
  });

  function submitForm(values: HasStoreyFormValues) {
    submitFormValues(values);
  }

  return (
    <form onSubmit={form.onSubmit(submitForm)}>
      <MultiSelect
        data={data}
        withAsterisk
        required
        label="Storey Name"
        placeholder="Storey name"
        {...form.getInputProps("storeyName")}
      />

      <Group position="right" mt="md">
        <Button type="submit">Submit</Button>
      </Group>
    </form>
  );
}
