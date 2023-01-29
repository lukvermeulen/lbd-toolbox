import { Modal } from "~/components/modal/modal";
import { BrepForm, BrepFormValues } from "./brep-form";

type BrepModalProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  submitValues: (values: BrepFormValues) => void;
};

export function BrepModal({ open, setOpen, submitValues }: BrepModalProps) {
  function submitFormValues(values: BrepFormValues) {
    submitValues(values);
    setOpen(false);
  }

  return (
    <Modal open={open} setOpen={setOpen} title="Create brep representation">
      <BrepForm submitFormValues={submitFormValues} />
    </Modal>
  );
}
