import { Modal, useMantineTheme } from "@mantine/core";
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
  const theme = useMantineTheme();

  function submitFormValues(values: BuildingFormValues) {
    submitValues(values);
    setOpen(false);
  }

  return (
    <Modal
      opened={open}
      onClose={() => setOpen(false)}
      title="Create bot:Building"
      overlayColor={
        theme.colorScheme === "dark"
          ? theme.colors.dark[9]
          : theme.colors.gray[2]
      }
      overlayOpacity={0.5}
      overlayBlur={7}
    >
      <BuildingForm submitFormValues={submitFormValues} />
    </Modal>
  );
}
