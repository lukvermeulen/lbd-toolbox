import { Button, FileInput, Group, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useState } from "react";

type BrepFormProps = {
  submitFormValues: (values: BrepFormValues) => void;
};

export type BrepFormValues = {
  name: string;
  fileUrl: string;
};

export function BrepForm({ submitFormValues }: BrepFormProps) {
  const [file, setFile] = useState<File | null>();
  const [fileUrl, setFileUrl] = useState<string>();

  const form = useForm<BrepFormValues>({
    initialValues: {
      name: "",
      fileUrl: "",
    },
  });

  function submitForm(values: BrepFormValues) {
    console.log(values);
    submitFormValues(values);
  }

  async function uploadFile() {
    const formData = new FormData();

    if (!file) {
      console.log("No file selected!");
      return;
    }
    formData.append("file", file);
    formData.append("filetype", "brep");

    const response = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    }).then((res) => res.json());

    if (response.fileUrl) {
      console.log(response.fileUrl);

      setFileUrl(response.fileUrl);
      form.setFieldValue("fileUrl", response.fileUrl);
    }
  }

  return (
    <>
      <FileInput
        withAsterisk
        required
        label="BREP"
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
          placeholder="BREP name"
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
