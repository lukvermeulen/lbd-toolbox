import { Modal } from "~/components/modal/modal";
import { ZoneForm, ZoneFormValues } from "./zone-form";

type SiteModalProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  submitValues: (values: ZoneFormValues) => void;
};

export function ZoneModal({ open, setOpen, submitValues }: SiteModalProps) {
  function submitFormValues(values: ZoneFormValues) {
    submitValues(values);
    setOpen(false);
  }

  return (
    <Modal open={open} setOpen={setOpen} title="Create bot:Zone">
      <ZoneForm submitFormValues={submitFormValues} />
    </Modal>
  );
}
