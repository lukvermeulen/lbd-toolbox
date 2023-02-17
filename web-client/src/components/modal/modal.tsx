import { useMantineTheme, Modal as MantineModal } from "@mantine/core";

type ModalProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  title: string;
  children?: React.ReactNode;
};

export function Modal({ open, setOpen, title, children }: ModalProps) {
  const theme = useMantineTheme();

  return (
    <MantineModal
      opened={open}
      onClose={() => setOpen(false)}
      title={title}
      overlayColor={
        theme.colorScheme === "dark"
          ? theme.colors.dark[9]
          : theme.colors.gray[2]
      }
      overlayOpacity={0.5}
      overlayBlur={7}
    >
      {children}
    </MantineModal>
  );
}
