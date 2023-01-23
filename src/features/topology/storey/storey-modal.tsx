import { Modal } from "~/components/modal/modal";
import { StoreyForm, StoreyFormValues } from "./storey-form";

type SiteModalProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  submitValues: (values: StoreyFormValues) => void;
};

export function StoreyModal({ open, setOpen, submitValues }: SiteModalProps) {
  function submitFormValues(values: StoreyFormValues) {
    submitValues(values);
    setOpen(false);
  }

  return (
    <Modal open={open} setOpen={setOpen} title="Create bot:Storey">
      <StoreyForm submitFormValues={submitFormValues} />
    </Modal>
  );
}
