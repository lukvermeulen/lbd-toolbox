import { Button, Group, MultiSelect } from "@mantine/core";
import { useForm } from "@mantine/form";

type HasBuildingFormProps = {
  data: { value: string; label: string }[];
  submitFormValues: (values: HasBuildingFormValues) => void;
};

export type HasBuildingFormValues = {
  buildingName: string[];
};

export function HasBuildingForm({
  data,
  submitFormValues,
}: HasBuildingFormProps) {
  const form = useForm<HasBuildingFormValues>({
    initialValues: {
      buildingName: [""],
    },
  });

  function submitForm(values: HasBuildingFormValues) {
    submitFormValues(values);
  }

  return (
    <form onSubmit={form.onSubmit(submitForm)}>
      <MultiSelect
        data={data}
        withAsterisk
        required
        label="Building Name"
        placeholder="Building name"
        {...form.getInputProps("buildingName")}
      />

      <Group position="right" mt="md">
        <Button type="submit">Submit</Button>
      </Group>
    </form>
  );
}
