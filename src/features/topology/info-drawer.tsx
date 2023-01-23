import { Drawer } from "~/components/drawer/drawer";
import { Stack, Text, Title } from "@mantine/core";

type InfoDrawerProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  elementInfo: {
    displayName: string;
    name: string;
  };
};

export function InfoDrawer({ open, setOpen, elementInfo }: InfoDrawerProps) {
  return (
    <Drawer open={open} setOpen={setOpen} title="Information">
      <Stack>
        <Title order={2}>{elementInfo.displayName}</Title>
        <Text>IRI: {elementInfo.name}</Text>
      </Stack>
    </Drawer>
  );
}
