import { Modal } from "~/components/modal/modal";
import { ElementForm, ElementFormValues } from "./element-form";

type ElementModalProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  submitValues: (values: ElementFormValues) => void;
};

export function ElementModal({
  open,
  setOpen,
  submitValues,
}: ElementModalProps) {
  function submitFormValues(values: ElementFormValues) {
    submitValues(values);
    setOpen(false);
  }

  return (
    <Modal open={open} setOpen={setOpen} title="Create element">
      <ElementForm submitFormValues={submitFormValues} />
    </Modal>
  );
}
