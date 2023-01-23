import { Modal } from "~/components/modal/modal";
import { SiteForm, SiteFormValues } from "./site-form";

type SiteModalProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  submitValues: (values: SiteFormValues) => void;
};

export function SiteModal({ open, setOpen, submitValues }: SiteModalProps) {
  function submitFormValues(values: SiteFormValues) {
    submitValues(values);
    setOpen(false);
  }

  return (
    <Modal open={open} setOpen={setOpen} title="Create bot:Site">
      <SiteForm submitFormValues={submitFormValues} />
    </Modal>
  );
}
