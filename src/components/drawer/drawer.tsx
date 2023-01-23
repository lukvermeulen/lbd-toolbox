import { useMantineTheme, Drawer as MantineDrawer } from "@mantine/core";

type DrawerProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  title: string;
  children?: React.ReactNode;
};

export function Drawer({ open, setOpen, title, children }: DrawerProps) {
  const theme = useMantineTheme();

  return (
    <MantineDrawer
      opened={open}
      onClose={() => setOpen(false)}
      title={title}
      padding="xl"
      size="xl"
      overlayColor={
        theme.colorScheme === "dark"
          ? theme.colors.dark[9]
          : theme.colors.gray[2]
      }
      overlayOpacity={0.5}
      overlayBlur={7}
    >
      {children}
    </MantineDrawer>
  );
}
