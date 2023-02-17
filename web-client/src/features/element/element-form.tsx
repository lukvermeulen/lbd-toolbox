import {
  Button,
  FileInput,
  Group,
  Select,
  Stack,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useState } from "react";
import { elementClasses } from "./buildingelement_vocabulary";

type ElementFormProps = {
  submitFormValues: (values: ElementFormValues) => void;
};

export type ElementFormValues = {
  name: string;
  buildingelementClass?: string;
};

export function ElementForm({ submitFormValues }: ElementFormProps) {
  const form = useForm<ElementFormValues>({
    initialValues: {
      name: "",
      buildingelementClass: undefined,
    },
  });

  function submitForm(values: ElementFormValues) {
    submitFormValues(values);
  }

  return (
    <>
      <form onSubmit={form.onSubmit(submitForm)}>
        <Stack>
          <TextInput
            withAsterisk
            required
            label="Name"
            placeholder="Element name"
            {...form.getInputProps("name")}
          />
          <Select
            data={elementClasses}
            label="Buildingelement Class"
            placeholder="Class name"
            searchable
            nothingFound="No options"
            clearable
            {...form.getInputProps("buildingelementClass")}
          />

          <Group position="right" mt="md">
            <Button type="submit">Submit</Button>
          </Group>
        </Stack>
      </form>
    </>
  );
}
