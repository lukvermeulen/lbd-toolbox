import { Modal } from "~/components/modal/modal";
import { PlanForm, PlanFormValues } from "./plan-form";

type PlanModalProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  submitValues: (values: PlanFormValues) => void;
};

export function PlanModal({ open, setOpen, submitValues }: PlanModalProps) {
  function submitFormValues(values: PlanFormValues) {
    submitValues(values);
    setOpen(false);
  }

  return (
    <Modal open={open} setOpen={setOpen} title="Create plan representation">
      <PlanForm submitFormValues={submitFormValues} />
    </Modal>
  );
}
