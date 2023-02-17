import { Drawer } from "~/components/drawer/drawer";
import { Stack, Text, Title } from "@mantine/core";
import { VersionSection } from "./version-section";
import { RepresentedBySection } from "./represented-by-section";

type InfoDrawerProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  elementInfo: {
    displayName: string;
    name: string;
  };
  properties?: {
    [key: string]: string;
  };
};

export function InfoDrawer({
  open,
  setOpen,
  elementInfo,
  properties,
}: InfoDrawerProps) {
  return (
    <Drawer open={open} setOpen={setOpen} title="Information">
      <Stack>
        <Title order={2}>{elementInfo.displayName}</Title>
        <Text>Properties: </Text>
        <Text>IRI: {elementInfo.name}</Text>
        {properties &&
          Object.keys(properties).map((key, index) => (
            <Text key={index}>
              {key}: {properties[key]}
            </Text>
          ))}

        <VersionSection elementInfo={elementInfo} />
        <RepresentedBySection elementInfo={elementInfo} />
      </Stack>
    </Drawer>
  );
}
