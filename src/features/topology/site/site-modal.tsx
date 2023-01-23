import { Modal, useMantineTheme } from "@mantine/core";
import { SiteForm, SiteFormValues } from "./site-form";

type SiteModalProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  submitValues: (values: SiteFormValues) => void;
};

export function SiteModal({ open, setOpen, submitValues }: SiteModalProps) {
  const theme = useMantineTheme();

  function submitFormValues(values: SiteFormValues) {
    submitValues(values);
    setOpen(false);
  }

  return (
    <Modal
      opened={open}
      onClose={() => setOpen(false)}
      title="Create bot:Site"
      overlayColor={
        theme.colorScheme === "dark"
          ? theme.colors.dark[9]
          : theme.colors.gray[2]
      }
      overlayOpacity={0.5}
      overlayBlur={7}
    >
      <SiteForm submitFormValues={submitFormValues} />
    </Modal>
  );
}
