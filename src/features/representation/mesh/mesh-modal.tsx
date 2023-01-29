import { Modal } from "~/components/modal/modal";
import { MeshForm, MeshFormValues } from "./mesh-form";

type MeshModal = {
  open: boolean;
  setOpen: (open: boolean) => void;
  submitValues: (values: MeshFormValues) => void;
};

export function MeshModal({ open, setOpen, submitValues }: MeshModal) {
  function submitFormValues(values: MeshFormValues) {
    submitValues(values);
    setOpen(false);
  }

  return (
    <Modal open={open} setOpen={setOpen} title="Create mesh representation">
      <MeshForm submitFormValues={submitFormValues} />
    </Modal>
  );
}
