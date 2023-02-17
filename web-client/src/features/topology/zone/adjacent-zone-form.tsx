import { Button, Group, MultiSelect } from "@mantine/core";
import { useForm } from "@mantine/form";

type AdjacentZoneFormProps = {
  data: { value: string; label: string }[];
  submitFormValues: (values: AdjacentZoneFormValues) => void;
};

export type AdjacentZoneFormValues = {
  zoneName: string[];
};

export function AdjacentZoneForm({
  data,
  submitFormValues,
}: AdjacentZoneFormProps) {
  const form = useForm<AdjacentZoneFormValues>({
    initialValues: {
      zoneName: [""],
    },
  });

  function submitForm(values: AdjacentZoneFormValues) {
    submitFormValues(values);
  }

  return (
    <form onSubmit={form.onSubmit(submitForm)}>
      <MultiSelect
        data={data}
        withAsterisk
        required
        label="Zone Name"
        placeholder="Zone name"
        {...form.getInputProps("zoneName")}
      />

      <Group position="right" mt="md">
        <Button type="submit">Submit</Button>
      </Group>
    </form>
  );
}
