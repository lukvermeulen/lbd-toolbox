import { Modal } from "~/components/modal/modal";
import {
  NewPictureVersionForm,
  NewPictureVersionFormValues,
} from "./new-picture-version-form";
import { Text } from "@mantine/core";
import { trpc } from "~/utils/trpc";

type NewPictureVersionModalProps = {
  name: string;
  open: boolean;
  setOpen: (open: boolean) => void;
};

export function NewPictureVersionModal({
  name,
  open,
  setOpen,
}: NewPictureVersionModalProps) {
  const pictures = trpc.representation.picture.list.useQuery();
  const newPictureVersionMutation =
    trpc.representation.picture.newVersion.useMutation({
      onSuccess: pictures.refetch,
    });

  function submitFormValues(values: NewPictureVersionFormValues) {
    console.log(values);
    newPictureVersionMutation.mutate({
      name: values.name,
      fileUrl: values.fileUrl,
      previousName: name,
    });
    setOpen(false);
  }

  return (
    <Modal
      open={open}
      setOpen={setOpen}
      title="Create new picture representation version"
    >
      <Text>Previous IRI: {name}</Text>
      <NewPictureVersionForm submitFormValues={submitFormValues} />
    </Modal>
  );
}
