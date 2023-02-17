import { Drawer } from "~/components/drawer/drawer";
import { Stack, Text, Title } from "@mantine/core";

type EditDrawerProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  elementInfo: {
    displayName: string;
    name: string;
  };
};

export function EditDrawer({ open, setOpen, elementInfo }: EditDrawerProps) {
  return (
    <Drawer
      open={open}
      setOpen={setOpen}
      title="Edit Information"
      position="right"
    >
      <Stack>
        <Title order={2}>{elementInfo.displayName}</Title>
      </Stack>
    </Drawer>
  );
}
