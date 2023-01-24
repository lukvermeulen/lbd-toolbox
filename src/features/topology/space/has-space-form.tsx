import { Button, Group, MultiSelect } from "@mantine/core";
import { useForm } from "@mantine/form";

type HasSpaceFormProps = {
  data: { value: string; label: string }[];
  submitFormValues: (values: HasSpaceFormValues) => void;
};

export type HasSpaceFormValues = {
  spaceName: string[];
};

export function HasSpaceForm({ data, submitFormValues }: HasSpaceFormProps) {
  const form = useForm<HasSpaceFormValues>({
    initialValues: {
      spaceName: [""],
    },
  });

  function submitForm(values: HasSpaceFormValues) {
    submitFormValues(values);
  }

  return (
    <form onSubmit={form.onSubmit(submitForm)}>
      <MultiSelect
        data={data}
        withAsterisk
        required
        label="Space Name"
        placeholder="Space name"
        {...form.getInputProps("spaceName")}
      />

      <Group position="right" mt="md">
        <Button type="submit">Submit</Button>
      </Group>
    </form>
  );
}
