import { Modal, useMantineTheme } from "@mantine/core";
import { SpaceForm, SpaceFormValues } from "./space-form";

type SpaceModalProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  submitValues: (values: SpaceFormValues) => void;
};

export function SpaceModal({ open, setOpen, submitValues }: SpaceModalProps) {
  const theme = useMantineTheme();

  function submitFormValues(values: SpaceFormValues) {
    submitValues(values);
    setOpen(false);
  }

  return (
    <Modal
      opened={open}
      onClose={() => setOpen(false)}
      title="Create bot:Space"
      overlayColor={
        theme.colorScheme === "dark"
          ? theme.colors.dark[9]
          : theme.colors.gray[2]
      }
      overlayOpacity={0.5}
      overlayBlur={7}
    >
      <SpaceForm submitFormValues={submitFormValues} />
    </Modal>
  );
}
