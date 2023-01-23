import { Button, Group, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";

type ZoneFormProps = {
  submitFormValues: (values: ZoneFormValues) => void;
};

export type ZoneFormValues = {
  name: string;
};

export function ZoneForm({ submitFormValues }: ZoneFormProps) {
  const form = useForm<ZoneFormValues>({
    initialValues: {
      name: "",
    },
  });

  function submitForm(values: ZoneFormValues) {
    submitFormValues(values);
  }

  return (
    <form onSubmit={form.onSubmit(submitForm)}>
      <TextInput
        withAsterisk
        required
        label="Name"
        placeholder="Zone name"
        {...form.getInputProps("name")}
      />

      <Group position="right" mt="md">
        <Button type="submit">Submit</Button>
      </Group>
    </form>
  );
}
