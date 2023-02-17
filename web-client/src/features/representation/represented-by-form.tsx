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
  status: string;
};

export function RepresentedByForm({
  data,
  submitFormValues,
}: RepresentedByFormProps) {
  const form = useForm<RepresentedByFormValues>({
    initialValues: {
      representationType: "picture",
      representationName: [""],
      status: "active",
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
          label="Representation name"
          placeholder="Representation name"
          {...form.getInputProps("representationName")}
        />
        <Select
          data={["active", "inactive"]}
          withAsterisk
          required
          label="Representation status"
          {...form.getInputProps("status")}
        />
      </Stack>
      <Group position="right" mt="md">
        <Button type="submit">Submit</Button>
      </Group>
    </form>
  );
}
