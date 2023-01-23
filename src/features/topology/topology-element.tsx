import {
  Card,
  Group,
  Stack,
  Text,
  Menu,
  ActionIcon,
  Title,
  Tooltip,
} from "@mantine/core";
import { IconDots, IconInfoCircle, IconPencil, IconTrash } from "@tabler/icons";
import { useState } from "react";
import { trpc } from "~/utils/trpc";
import { InfoDrawer } from "./info-drawer";

type TopologyElementProps = {
  category: string;
  name: string;
  deleteAction: (input: { name: string }) => void;
  LinkMenu?: React.ElementType;
};
export function TopologyElement({
  category,
  name,
  deleteAction,
  LinkMenu,
}: TopologyElementProps) {
  const [infoOpen, setInfoOpen] = useState(false);
  const [id, ...displayName] = name.split("_");

  return (
    <>
      <Card shadow={"xs"}>
        <Stack>
          <Group position="apart">
            <Text>{category}</Text>
            <Menu withinPortal position="bottom-start" shadow="sm">
              <Menu.Target>
                <ActionIcon>
                  <IconDots size={18} />
                </ActionIcon>
              </Menu.Target>

              <Menu.Dropdown>
                <Menu.Item icon={<IconPencil size={14} />}>Edit</Menu.Item>
                <Menu.Item
                  icon={<IconTrash size={14} />}
                  color="red"
                  onClick={() => {
                    deleteAction({ name });
                  }}
                >
                  Delete
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </Group>

          <Group position="center">
            <Tooltip label={id} withinPortal>
              <Title order={3}>{displayName.join("_")}</Title>
            </Tooltip>
          </Group>

          <Group position="apart">
            <ActionIcon onClick={() => setInfoOpen(true)}>
              <IconInfoCircle size={18} />
            </ActionIcon>

            {LinkMenu && <LinkMenu />}
          </Group>
        </Stack>
      </Card>
      <InfoDrawer
        open={infoOpen}
        setOpen={setInfoOpen}
        elementInfo={{ displayName: displayName.join("_"), name: name }}
      />
    </>
  );
}
