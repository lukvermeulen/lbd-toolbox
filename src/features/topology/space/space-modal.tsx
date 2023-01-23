import { Modal } from "~/components/modal/modal";
import { SpaceForm, SpaceFormValues } from "./space-form";

type SpaceModalProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  submitValues: (values: SpaceFormValues) => void;
};

export function SpaceModal({ open, setOpen, submitValues }: SpaceModalProps) {
  function submitFormValues(values: SpaceFormValues) {
    submitValues(values);
    setOpen(false);
  }

  return (
    <Modal open={open} setOpen={setOpen} title="Create bot:Space">
      <SpaceForm submitFormValues={submitFormValues} />
    </Modal>
  );
}
