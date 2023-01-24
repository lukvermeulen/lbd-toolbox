import { Button, FileInput, Group, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useState } from "react";

type PictureFormProps = {
  submitFormValues: (values: PictureFormValues) => void;
};

export type PictureFormValues = {
  name: string;
  pictureUrl: string;
};

export function PictureForm({ submitFormValues }: PictureFormProps) {
  const [file, setFile] = useState<File | null>();
  const [pictureUrl, setPictureUrl] = useState<string>();

  const form = useForm<PictureFormValues>({
    initialValues: {
      name: "",
      pictureUrl: "",
    },
  });

  function submitForm(values: PictureFormValues) {
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

    const response = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    }).then((res) => res.json());

    if (response.fileUrl) {
      console.log(response.fileUrl);

      setPictureUrl(response.fileUrl);
      form.setFieldValue("pictureUrl", response.fileUrl);
    }
  }

  return (
    <>
      <FileInput
        withAsterisk
        required
        label="Picture"
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
          placeholder="Picture name"
          {...form.getInputProps("name")}
        />

        <Group position="right" mt="md">
          <Button type="submit" disabled={!pictureUrl}>
            Submit
          </Button>
        </Group>
      </form>
    </>
  );
}
