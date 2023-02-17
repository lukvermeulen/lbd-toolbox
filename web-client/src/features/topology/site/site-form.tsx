import { Button, Group, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";

type SiteFormProps = {
  submitFormValues: (values: SiteFormValues) => void;
};

export type SiteFormValues = {
  name: string;
};

export function SiteForm({ submitFormValues }: SiteFormProps) {
  const form = useForm<SiteFormValues>({
    initialValues: {
      name: "",
    },
  });

  function submitForm(values: SiteFormValues) {
    submitFormValues(values);
  }

  return (
    <form onSubmit={form.onSubmit(submitForm)}>
      <TextInput
        withAsterisk
        required
        label="Name"
        placeholder="Site name"
        {...form.getInputProps("name")}
      />

      <Group position="right" mt="md">
        <Button type="submit">Submit</Button>
      </Group>
    </form>
  );
}
