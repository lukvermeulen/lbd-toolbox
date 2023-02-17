import { Button, FileInput, Group, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useState } from "react";

type MeshFormProps = {
  submitFormValues: (values: MeshFormValues) => void;
};

export type MeshFormValues = {
  name: string;
  fileUrl: string;
};

export function MeshForm({ submitFormValues }: MeshFormProps) {
  const [file, setFile] = useState<File | null>();
  const [fileUrl, setFileUrl] = useState<string>();

  const form = useForm<MeshFormValues>({
    initialValues: {
      name: "",
      fileUrl: "",
    },
  });

  function submitForm(values: MeshFormValues) {
    submitFormValues(values);
  }

  async function uploadFile() {
    const formData = new FormData();

    if (!file) {
      console.log("No file selected!");
      return;
    }
    formData.append("file", file);
    formData.append("filetype", "mesh");

    const response = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    }).then((res) => res.json());

    if (response.fileUrl) {
      setFileUrl(response.fileUrl);
      form.setFieldValue("fileUrl", response.fileUrl);
    }
  }

  return (
    <>
      <FileInput
        withAsterisk
        required
        label="Mesh"
        placeholder="Pick file"
        onChange={(file) => setFile(file)}
      />

      <Group position="right" mt="md">
        <Button type="button" variant="outline" onClick={uploadFile}>
          Upload
        </Button>
      </Group>

      <form onSubmit={form.onSubmit(submitForm)}>
        <TextInput
          withAsterisk
          required
          label="Name"
          placeholder="Mesh name"
          {...form.getInputProps("name")}
        />

        <Group position="right" mt="md">
          <Button type="submit" disabled={!fileUrl}>
            Submit
          </Button>
        </Group>
      </form>
    </>
  );
}
