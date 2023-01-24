import {
  Button,
  Checkbox,
  Group,
  MultiSelect,
  Select,
  Stack,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useState } from "react";

type RepresentedByFormProps = {
  data: { [key: string]: { value: string; label: string }[] | undefined };
  submitFormValues: (values: RepresentedByFormValues) => void;
};

export type RepresentedByFormValues = {
  representationType: string;
  representationName: string[];
  active: boolean;
};

export function RepresentedByForm({
  data,
  submitFormValues,
}: RepresentedByFormProps) {
  const form = useForm<RepresentedByFormValues>({
    initialValues: {
      representationType: "picture",
      representationName: [""],
      active: true,
    },
  });
  const [representationData, setRepresentationData] = useState(data.picture);

  function submitForm(values: RepresentedByFormValues) {
    submitFormValues(values);
  }

  return (
    <form onSubmit={form.onSubmit(submitForm)}>
      <Stack>
        <Select
          label="Representation type"
          placeholder="Representation type"
          defaultValue="picture"
          data={[
            { value: "picture", label: "Picture" },
            { value: "mesh", label: "Mesh" },
            { value: "brep", label: "BREP" },
            { value: "pointcloud", label: "Point cloud" },
            { value: "plan", label: "Plan" },
          ]}
          onChange={(value) => {
            setRepresentationData(data[value ?? "picture"]);
          }}
        />
        <MultiSelect
          data={representationData || []}
          withAsterisk
          required
          label="Representation Name"
          placeholder="Representation name"
          {...form.getInputProps("representationName")}
        />
        <Checkbox
          label="Active representations"
          defaultChecked={true}
          {...form.getInputProps("active")}
        />
      </Stack>
      <Group position="right" mt="md">
        <Button type="submit">Submit</Button>
      </Group>
    </form>
  );
}
