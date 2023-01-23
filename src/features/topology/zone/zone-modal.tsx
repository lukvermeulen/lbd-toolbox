import { Modal, useMantineTheme } from "@mantine/core";
import { ZoneForm, ZoneFormValues } from "./zone-form";

type SiteModalProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  submitValues: (values: ZoneFormValues) => void;
};

export function ZoneModal({ open, setOpen, submitValues }: SiteModalProps) {
  const theme = useMantineTheme();

  function submitFormValues(values: ZoneFormValues) {
    submitValues(values);
    setOpen(false);
  }

  return (
    <Modal
      opened={open}
      onClose={() => setOpen(false)}
      title="Create bot:Zone"
      overlayColor={
        theme.colorScheme === "dark"
          ? theme.colors.dark[9]
          : theme.colors.gray[2]
      }
      overlayOpacity={0.5}
      overlayBlur={7}
    >
      <ZoneForm submitFormValues={submitFormValues} />
    </Modal>
  );
}
