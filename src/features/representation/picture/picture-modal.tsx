import { Modal } from "~/components/modal/modal";
import { PictureForm, PictureFormValues } from "./picture-form";

type PictureModalProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  submitValues: (values: PictureFormValues) => void;
};

export function PictureModal({
  open,
  setOpen,
  submitValues,
}: PictureModalProps) {
  function submitFormValues(values: PictureFormValues) {
    submitValues(values);
    setOpen(false);
  }

  return (
    <Modal open={open} setOpen={setOpen} title="Create picture representation">
      <PictureForm submitFormValues={submitFormValues} />
    </Modal>
  );
}
