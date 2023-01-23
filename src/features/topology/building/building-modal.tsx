import { Modal } from "~/components/modal/modal";
import { BuildingForm, BuildingFormValues } from "./building-form";

type BuildingModalProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  submitValues: (values: BuildingFormValues) => void;
};

export function BuildingModal({
  open,
  setOpen,
  submitValues,
}: BuildingModalProps) {
  function submitFormValues(values: BuildingFormValues) {
    submitValues(values);
    setOpen(false);
  }

  return (
    <Modal open={open} setOpen={setOpen} title="Create bot:Building">
      <BuildingForm submitFormValues={submitFormValues} />
    </Modal>
  );
}
